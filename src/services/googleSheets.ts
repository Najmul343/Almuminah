/**
 * Service to handle Google Sheets integration for forms, gallery, toppers, and events.
 * Uses Google Visualization API for fetching to avoid CORS issues.
 */

// Use environment variable for the Apps Script URL
const APPS_SCRIPT_URL = (import.meta.env.VITE_APPS_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbyHEiXjWynu4E02ulUfQxjzR1LdFhWclsmL8jfnfIp57QfnszJkH1tbBOYtXGPuO7wP/exec').trim();
const SHEET_ID = '1xGnhNgSHR-JE7uAXM5xvsPX4bYB1uNBXwYBLtVoYgIo';

// Simple in-memory cache
const cache: { [key: string]: { data: any; timestamp: number } } = {};
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
const pendingRequests: { [key: string]: Promise<any> } = {};

// Persistent Cache Helpers
const getPersistentCache = (key: string) => {
  try {
    const saved = localStorage.getItem(`school_cache_${key}`);
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    return null;
  }
};

const setPersistentCache = (key: string, data: any) => {
  try {
    localStorage.setItem(`school_cache_${key}`, JSON.stringify(data));
  } catch (e) {
    // Ignore storage errors (e.g. quota exceeded)
  }
};

export const submitInquiry = async (data: any) => {
  try {
    const formData = new URLSearchParams();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    // Add timestamp automatically
    formData.append('timestamp', new Date().toLocaleString());

    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    throw error;
  }
};

// Helper to fix Google Drive links and ensure they are direct image links or document view links
export const fixUrl = (url: any, isImage: boolean = true): string => {
  if (!url || typeof url !== 'string') return url || '';
  
  const urls = url.split(',').map(u => u.trim()).filter(Boolean);
  const fixedUrls = urls.map(u => {
    // Handle Google Drive links
    if (u.includes('drive.google.com')) {
      // Robust ID extraction
      let fileId = '';
      const dMatch = u.match(/\/d\/([\w-]{25,})/);
      const idParamMatch = u.match(/[?&]id=([\w-]{25,})/);
      
      if (dMatch) fileId = dMatch[1];
      else if (idParamMatch) fileId = idParamMatch[1];
      
      if (fileId) {
        // Cleaning potential residues from ID
        fileId = fileId.split(/[/?&]/)[0];
        
        // Return reliable direct link for images using the specific LH3 format that works best with no-referrer
        // This format is often more stable for hotlinking when Referrer is stripped.
        return isImage 
          ? `https://lh3.googleusercontent.com/u/0/d/${fileId}=w1600-iv1`
          : `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
      }
    }
    return u;
  });
  
  return fixedUrls.join(',');
};

const fetchData = async (tabName: string) => {
  const now = Date.now();
  
  // 1. Check In-Memory Cache (Fastest)
  if (cache[tabName] && (now - cache[tabName].timestamp < CACHE_DURATION)) {
    return cache[tabName].data;
  }

  // 2. Check Pending Requests (Prevents duplicate fetches)
  if (pendingRequests[tabName]) {
    return pendingRequests[tabName];
  }

  // 3. Check Persistent Cache (Instant Load for new sessions)
  const persistentData = getPersistentCache(tabName);
  
  // Create the fetch promise
  const fetchPromise = (async () => {
    try {
      // Using Google Visualization API for reading as it has better CORS support than custom Apps Script Web Apps in browsers
      const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(tabName)}&headers=1`;
      const response = await fetch(url, { priority: 'high' });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const text = await response.text();
      const match = text.match(/google\.visualization\.Query\.setResponse\((.*)\);/);
      if (!match) throw new Error('Invalid JSON response from Google Sheets');
      
      const json = JSON.parse(match[1]);
      if (json.status === 'error') {
        throw new Error(json.errors[0].detailed_message || 'Google Sheets API error');
      }
      
      const table = json.table;
      
      // Extract column labels (e.g., "url", "caption" or "A", "B")
      const cols = table.cols.map((col: any) => (col.label || col.id).toLowerCase().replace(/\s+/g, ''));
      
      let rows = table.rows;

      // Map rows to objects
      const data = rows.map((row: any) => {
        const obj: any = {};
        if (!row || !row.c) return obj;

        row.c.forEach((cell: any, i: number) => {
          if (cols[i]) {
            const value = cell ? (cell.v !== null ? cell.v : null) : null;
            obj[cols[i]] = value;
            // Also store by index
            obj[i] = value;
          }
        });

        // Specialized Image/Link Fixing
        Object.keys(obj).forEach(key => {
          const val = obj[key];
          if (typeof val === 'string' && (key.includes('image') || key.includes('photo') || key.includes('url') || key.includes('picture') || key.includes('brochure') || key.includes('pdf') || key.includes('link') || val.startsWith('http'))) {
            // Only explicitly labeled document/download columns are treated as non-images
            const isImage = !(key.includes('brochure') || key.includes('pdf') || key.includes('download'));
            obj[key] = fixUrl(val, isImage);
          }
        });

        const findKey = (keywords: string[]) => {
          const keys = Object.keys(obj).filter(k => isNaN(Number(k)));
          return keys.find(k => keywords.some(kw => String(k).includes(kw)));
        };

        const logoKey = findKey(['logo']);
        const imageKey = findKey(['image', 'url', 'photo', 'picture', 'img', 'src']);
        const finalImages = (logoKey && obj[logoKey]) || (imageKey && obj[imageKey]) || obj[0] || '';
        const firstImage = (String(finalImages) || '').split(',')[0].trim();

        const captionKey = findKey(['caption', 'desc', 'text', 'info']);
        const titleKey = findKey(['title', 'name', 'heading']);
        const dateKey = findKey(['date', 'time', 'year', 'academic']);
        const whatsappKey = findKey(['whatsapp', 'wa', 'phone', 'mobile', 'contact']);
        const brochureKey = findKey(['brochure', 'pdf', 'link', 'download']);
        const stdKey = findKey(['std', 'standard', 'class', 'grade', 'level']);

        return { 
          ...obj,
          logo: fixUrl((logoKey ? obj[logoKey] : null) || obj.logo || '', true),
          image: firstImage,
          url: firstImage,
          images: String(finalImages || ''),
          caption: obj.caption || (captionKey ? obj[captionKey] : '') || (obj[1] || ''),
          title: obj.title || (titleKey ? obj[titleKey] : '') || (obj[0] || ''),
          std: obj.std || (stdKey ? obj[stdKey] : '') || (obj[1] || ''),
          date: obj.date || (dateKey ? obj[dateKey] : '') || (obj[3] || ''),
          whatsapp: obj.whatsapp || (whatsappKey ? obj[whatsappKey] : '') || '',
          brochure: fixUrl(obj.brochure || (brochureKey ? obj[brochureKey] : '') || '', false),
        };
      }).filter((item: any) => Object.values(item).some(v => v !== null && v !== ''));

      // Update Caches
      cache[tabName] = { data, timestamp: now };
      setPersistentCache(tabName, data);
      
      return data;
    } catch (error) {
      throw error;
    } finally {
      delete pendingRequests[tabName];
    }
  })();

  // 4. Stale-While-Revalidate Logic
  if (persistentData) {
    // If we have persistent data, return it immediately
    // The fetchPromise will continue in the background to update the cache for next time
    pendingRequests[tabName] = fetchPromise; 
    return persistentData;
  }

  // If no persistent data, wait for the fetch
  pendingRequests[tabName] = fetchPromise;
  return fetchPromise;
};

// Pre-fetch common tabs in parallel
export const prefetchData = () => {
  const tabs = ['Settings', 'Contact', 'Stats', 'Toppers', 'SocialMedia'];
  tabs.forEach(tab => fetchData(tab));
};

// Call prefetch immediately
if (typeof window !== 'undefined') {
  prefetchData();
}

export const fetchStats = async () => {
  try {
    const data = await fetchData('Stats');
    if (!data || data.length === 0) throw new Error('No stats data');
    return data;
  } catch (error) {
    return [
      { title: "20+", subtitle: "Years of Excellence" },
      { title: "1000+", subtitle: "Students Enrolled" },
      { title: "100%", subtitle: "SSC Toppers" },
      { title: "50+", subtitle: "Islamic Competitions" },
    ];
  }
};

export const fetchGalleryImages = async () => {
  try {
    const data = await fetchData('Gallery');
    if (!data || data.length === 0) throw new Error('No gallery data');
    return data;
  } catch (error) {
    return [
      { url: 'https://images.unsplash.com/photo-1523050853064-85a17f009c5d', caption: 'School Campus' },
      { url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7', caption: 'Science Lab' },
    ];
  }
};

export const fetchToppers = async () => {
  try {
    const data = await fetchData('Toppers');
    if (!data || data.length === 0) throw new Error('No toppers data');
    return data;
  } catch (error) {
    return [
      { name: "Rajlaxmi Kanhe", nickname: "The Photographer", percentage: "96.20%", year: "2025", std: "X", tagline: "Capturing Excellence", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80" },
      { name: "Ojas Dnyaneshwar", nickname: "The Painter", percentage: "96.40%", year: "2025", std: "X", tagline: "Artistic Brilliance", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80" },
    ];
  }
};

export const fetchAnnouncements = async () => {
  try {
    const data = await fetchData('Announcements');
    if (!data || data.length === 0) throw new Error('No announcements data');
    return data;
  } catch (error) {
    return [
      { title: "Admission Open for 2026-27", date: "March 20, 2026", content: "We are pleased to announce that admissions are now open for all grades. Visit our admissions page for more details.", author: "Principal" },
    ];
  }
};

export const fetchEvents = async () => {
  try {
    const data = await fetchData('Events');
    if (!data || data.length === 0) throw new Error('No events data');
    return data;
  } catch (error) {
    return [
      { 
        title: "Annual Sports Day 2026", 
        subtitle: "A Day of Athletic Spirit", 
        date: "Feb 15, 2026", 
        shortDesc: "A grand celebration of sportsmanship and talent.", 
        fullDesc: "Our Annual Sports Day was a massive success with over 500 students participating in various track and field events. The spirit of competition and camaraderie was truly inspiring.", 
        images: "https://images.unsplash.com/photo-1511629091441-ee46146481b6,https://images.unsplash.com/photo-1523050853064-85a17f009c5d" 
      },
    ];
  }
};

export const fetchPrograms = async () => {
  const data = await fetchData('Programs');
  return data || [];
};

const mergeRows = (data: any[]) => {
  if (!data || data.length === 0) return null;
  return data.reduce((acc: any, curr: any) => {
    const merged = { ...acc };
    Object.entries(curr).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        merged[key] = value;
      }
    });
    return merged;
  }, {});
};

export const fetchTrustDetails = async () => {
  try {
    const data = await fetchData('Trust');
    const merged = mergeRows(data);
    if (!merged) throw new Error('No trust data');
    
    // Safety fix for any remaining drive links
    if (merged.trusteephoto) merged.trusteephoto = fixUrl(merged.trusteephoto);
    if (merged.logo) merged.logo = fixUrl(merged.logo);
    
    return merged;
  } catch (error) {
    return {
      name: "MEER EDUCATION TRUST",
      trustee: "Maulana Arshad Ahmed Meer",
      trusteephoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
      history: "Established in 2009 to provide quality education rooted in Islamic values.",
    };
  }
};

export const fetchFaculty = async () => {
  const data = await fetchData('Faculty');
  return data || [];
};

export const fetchSocialMedia = async () => {
  const data = await fetchData('SocialMedia');
  return data || [];
};

export const fetchPrincipalDetails = async () => {
  try {
    const data = await fetchData('Principal');
    const merged = mergeRows(data);
    if (!merged) throw new Error('No principal data');
    
    // Normalize data and ensure URLs are fixed
    const rawImage = merged.image || merged.principalphoto || merged.url || "";
    const name = merged.name || merged.principalname || "Bushra Meer";
    
    return {
      name,
      qualification: merged.qualification || merged.eduqualification || "B.A, B.Ed",
      image: fixUrl(rawImage) || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80",
      description: merged.description || merged.about || "As the Principal of Al-Mu'minah English Medium School, she brings years of academic expertise and a deep commitment to the holistic development of every student.",
      quote: merged.quote || merged.message || "Education is not just about academic excellence; it is about nurturing the soul and building a character that reflects the beauty of our faith."
    };
  } catch (error) {
    return {
      name: "Bushra Meer",
      qualification: "B.A, B.Ed",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80",
      description: "As the Principal of Al-Mu'minah English Medium School, Bushra Meer brings years of academic expertise and a deep commitment to the holistic development of every student. Her leadership is defined by a passion for excellence and a firm belief in the power of value-based education.",
      quote: "Education is not just about academic excellence; it is about nurturing the soul and building a character that reflects the beauty of our faith. At Al-Mu'minah, we strive to empower every student with knowledge that serves them in both worlds."
    };
  }
};

export const fetchBlogs = async () => {
  const data = await fetchData('Blogs');
  if (!data || data.length === 0) return [];

  // Each row is a blog post
  return data.map((row: any, idx: number) => {
    // Normalize keys to lowercase for easier access
    const normalizedRow: any = {};
    Object.keys(row).forEach(key => {
      normalizedRow[key.toLowerCase().replace(/\s+/g, '')] = row[key];
    });

    // Handle multiple image columns (any keys not matching standard text fields)
    const standardKeys = ['title', 'subtitle', 'shortdescription', 'quote', 'blogcontent'];
    const images: string[] = [];
    
    // Check all keys for potential image URLs
    Object.keys(normalizedRow).forEach(key => {
      const val = normalizedRow[key];
      if (!standardKeys.includes(key) && val && typeof val === 'string' && (val.trim().startsWith('http') || key.includes('image') || key.includes('photo'))) {
        const fixed = fixUrl(val.trim());
        fixed.split(',').forEach(img => {
          if (img.trim()) images.push(img.trim());
        });
      }
    });

    const uniqueImages = [...new Set(images)];

    return {
      id: idx.toString(),
      slug: (normalizedRow.title || "Untitled Blog").toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'),
      title: normalizedRow.title || "Untitled Blog",
      subtitle: normalizedRow.subtitle || "",
      shortDescription: normalizedRow.shortdescription || normalizedRow.shortdesc || "",
      quote: normalizedRow.quote || "",
      content: normalizedRow.blogcontent || normalizedRow.content || "",
      images: uniqueImages,
      mainImage: uniqueImages[0] || "https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&q=80",
      date: normalizedRow.date || new Date().toLocaleDateString()
    };
  });
};

export const fetchContactDetails = async () => {
  try {
    const data = await fetchData('Contact');
    if (!data || data.length === 0) throw new Error('No contact data');
    
    // Helper to find value by normalized key
    const getVal = (row: any, ...keys: string[]) => {
      const rowKeys = Object.keys(row);
      for (const key of keys) {
        const foundKey = rowKeys.find(rk => rk.toLowerCase().replace(/\s+/g, '') === key.toLowerCase().replace(/\s+/g, ''));
        if (foundKey && row[foundKey]) return row[foundKey];
      }
      return '';
    };

    // If we have multiple rows, they might represent different branches
    // Alternatively, if there is only one row, it might contain info for both branches
    let branches = data.map(row => ({
      name: getVal(row, 'branch', 'name', 'schoolname') || (data.indexOf(row) === 0 ? 'Primary School' : 'Pre Primary School'),
      address: String(getVal(row, 'address', 'location') || '').trim(),
      phone: String(getVal(row, 'primaryphone', 'phone', 'mobile', 'primary') || '').trim(),
      secondaryPhone: String(getVal(row, 'secondaryphone', 'whatsapp', 'contact', 'secondary') || '').trim(),
      email: String(getVal(row, 'email', 'mail') || '').trim(),
      officeHours: String(getVal(row, 'officehours', 'hours', 'timing') || '').split('\n').map(h => h.trim()).filter(Boolean),
      mapLink: getVal(row, 'map', 'maplink', 'googlemap', 'location')
    }));

    // Logic to handle single-row split if needed
    if (branches.length === 1) {
      const b = branches[0];
      const emails = b.email.split(/[\n,]/).map(e => e.trim()).filter(Boolean);
      const addresses = b.address.split(/(?=\(Pre Primary|Pre-Primary)/i).map(a => a.trim()).filter(Boolean);
      
      // If we have distinct info for both schools in one row
      if (emails.length >= 2 || b.secondaryPhone || addresses.length >= 2) {
        branches = [
          {
            name: 'Primary School',
            address: addresses[0],
            phone: b.phone,
            secondaryPhone: '',
            email: emails[0],
            officeHours: b.officeHours,
            mapLink: b.mapLink
          },
          {
            name: 'Pre Primary School',
            address: addresses[1] || addresses[0],
            phone: b.secondaryPhone || b.phone,
            secondaryPhone: '',
            email: emails[1] || emails[0],
            officeHours: b.officeHours,
            mapLink: b.mapLink
          }
        ];
      }
    }

    // For backward compatibility and specialized UI, we return both structured branches and merged fallbacks
    const addresses = [...new Set(branches.map(b => b.address).filter(Boolean))];
    const phones = [...new Set(branches.flatMap(b => [b.phone, b.secondaryPhone]).filter(Boolean))];
    const emails = [...new Set(branches.map(b => b.email).filter(Boolean))];
    const hours = [...new Set(branches.flatMap(b => b.officeHours).filter(Boolean))];

    return {
      branches,
      addresses,
      primaryPhones: phones,
      emails,
      officeHours: hours,
      mapLink: branches[0]?.mapLink || '',
      logo: data[0]?.logo || '',
      brochure: data[0]?.brochure || '',
      whatsapp: data[0]?.whatsapp || '',
      // Backward compatibility
      primaryphone: phones[0] || '',
      secondaryphone: phones[1] || '',
      email: emails[0] || '',
      address: addresses[0] || '',
      officehours: hours[0] || ''
    };
  } catch (error) {
    return {
      branches: [
        {
          name: 'Primary School',
          address: '7/2262, 2263, Kadiya Sheri, Rampura, Kankra Street, Katargam Darwaja, Surat, Gujarat 395003',
          phone: '+91 7874387345',
          email: 'almuminah.psurat@gmail.com',
          officeHours: ["Monday – Friday: 10:00 AM – 5:00 PM", "Saturday: 9:00 AM – 1:00 PM"],
          mapLink: ""
        },
        {
          name: 'Pre Primary School',
          address: '7/2262, 2263, Kadiya Sheri, Rampura, Kankra Street, Katargam Darwaja, Surat, Gujarat 395003',
          phone: '+91 9737239456',
          email: 'almuminah.ppsurat@gmail.com',
          officeHours: ["Monday – Friday: 10:00 AM – 5:00 PM", "Saturday: 9:00 AM – 1:00 PM"],
          mapLink: ""
        }
      ],
      addresses: ["7/2262, 2263, Kadiya Sheri, Rampura, Kankra Street, Katargam Darwaja, Surat, Gujarat 395003"],
      primaryPhones: ["+91 7874387345", "+91 9737239456"],
      emails: ["almuminah.psurat@gmail.com", "almuminah.ppsurat@gmail.com"],
      officeHours: ["Monday – Friday: 10:00 AM – 5:00 PM", "Saturday: 9:00 AM – 1:00 PM"],
      mapLink: "",
      logo: 'https://lh3.googleusercontent.com/d/1xGnhNgSHR-JE7uAXM5xvsPX4bYB1uNBXwYBLtVoYgIo',
      brochure: '',
      whatsapp: '',
      primaryphone: "+91 7874387345",
      secondaryphone: "+91 9737239456",
      email: "almuminah.psurat@gmail.com",
      address: "7/2262, 2263, Kadiya Sheri, Rampura, Kankra Street, Katargam Darwaja, Surat, Gujarat 395003",
      officehours: "Monday – Friday: 10:00 AM – 5:00 PM"
    };
  }
};

export const fetchGlobalSettings = async () => {
  const settings = await fetchData('Settings');
  const trust = await fetchTrustDetails();
  const contact = await fetchContactDetails();
  
  const primary = mergeRows(settings) || {};
  
  const defaultLogo = 'https://lh3.googleusercontent.com/d/1xGnhNgSHR-JE7uAXM5xvsPX4bYB1uNBXwYBLtVoYgIo'; // Replace with a real default if needed, or use a placeholder

  return {
    ...contact,
    ...trust,
    ...primary,
    logo: contact?.logo || primary?.logo || trust?.logo || defaultLogo,
    brochure: primary.brochure || trust?.brochure || contact?.brochure || '',
    whatsapp: primary.whatsapp || contact?.whatsapp || contact?.primaryphone || '',
  };
};

export const fetchBooks = async () => {
  try {
    const data = await fetchData('Books Link');
    if (!data || data.length === 0) throw new Error('No books data');
    return data;
  } catch (error) {
    // Return some placeholder books if fetch fails
    return [
      { title: "Islamic Studies Vol 1", std: "Std. I", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80" },
      { title: "Arabic Foundations", std: "Nursery", image: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80" },
      { title: "Daily Duas", std: "Junior KG", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80" },
    ];
  }
};
