/**
 * Service to handle Google Sheets integration for forms, gallery, toppers, and events.
 * Uses Google Visualization API for fetching to avoid CORS issues.
 */

// Use environment variable for the Apps Script URL
const APPS_SCRIPT_URL = (import.meta.env.VITE_APPS_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbyHEiXjWynu4E02ulUfQxjzR1LdFhWclsmL8jfnfIp57QfnszJkH1tbBOYtXGPuO7wP/exec').trim();
const SHEET_ID = '1xGnhNgSHR-JE7uAXM5xvsPX4bYB1uNBXwYBLtVoYgIo';

export const submitInquiry = async (data: any) => {
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return { success: true };
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    throw error;
  }
};

const fetchData = async (tabName: string) => {
  try {
    // Using Google Visualization API for reading as it has better CORS support than custom Apps Script Web Apps in browsers
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(tabName)}&headers=1`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const text = await response.text();
    const match = text.match(/google\.visualization\.Query\.setResponse\((.*)\);/);
    if (!match) throw new Error('Invalid JSON response from Google Sheets');
    
    const json = JSON.parse(match[1]);
    const table = json.table;
    
    // Extract column labels (e.g., "url", "caption" or "A", "B")
    const cols = table.cols.map((col: any) => col.label || col.id);
    
    let rows = table.rows;

    // Map rows to objects
    return rows.map((row: any) => {
      const obj: any = {};
      row.c.forEach((cell: any, i: number) => {
        if (cols[i]) {
          const value = cell ? (cell.v !== null ? cell.v : null) : null;
          obj[cols[i]] = value;
          // Also store by index (0, 1, 2) and letter (A, B, C) as fallbacks
          obj[i] = value;
          const letter = String.fromCharCode(65 + i); // 0 -> A, 1 -> B
          obj[letter] = value;
        }
      });
      
      const normalized: any = {};
      Object.keys(obj).forEach(key => {
        if (typeof key === 'string') {
          normalized[key.toLowerCase().replace(/\s+/g, '')] = obj[key];
        }
      });

      const fixUrl = (url: any) => {
        if (!url || typeof url !== 'string') return url;
        const urls = url.split(',').map(u => u.trim());
        const fixedUrls = urls.map(u => {
          if (u.includes('drive.google.com')) {
            const idMatch = u.match(/\/d\/(.+?)\//) || u.match(/id=(.+?)(&|$)/);
            if (idMatch && idMatch[1]) return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
          }
          return u;
        });
        return fixedUrls.join(',');
      };

      const findKey = (keywords: string[]) => {
        const keys = Object.keys(normalized).filter(k => normalized[k] !== null && normalized[k] !== '');
        const exactMatch = keys.find(k => keywords.includes(k));
        if (exactMatch) return exactMatch;
        return keys.find(k => keywords.some(kw => k.includes(kw)));
      };

      const imageKey = findKey(['logo', 'image', 'url', 'images', 'photo', 'picture', 'img', 'src']);
      // Fallback to Column A (index 0) if no image keyword found
      const rawImage = imageKey ? normalized[imageKey] : (obj.image || obj.url || obj[0] || obj['A'] || '');
      const finalImages = fixUrl(rawImage);
      const firstImage = (finalImages || '').split(',')[0].trim();

      const captionKey = findKey(['caption', 'desc', 'text', 'info']);
      const titleKey = findKey(['title', 'name', 'heading']);
      const dateKey = findKey(['date', 'time', 'year', 'academic']);

      return { 
        ...obj,
        image: firstImage,
        url: firstImage,
        images: String(finalImages || ''),
        caption: obj.caption || (captionKey ? normalized[captionKey] : '') || (obj[1] || obj['B'] || ''),
        title: obj.title || (titleKey ? normalized[titleKey] : '') || (obj[0] || obj['A'] || ''),
        subtitle: obj.subtitle || normalized.subtitle || '',
        date: obj.date || (dateKey ? normalized[dateKey] : '') || (obj[3] || obj['D'] || ''),
        content: obj.content || normalized.content || normalized.description || (captionKey ? normalized[captionKey] : '') || '',
        shortDesc: obj.shortDesc || normalized.shortdesc || normalized.description || (captionKey ? normalized[captionKey] : '') || '',
        fullDesc: obj.fullDesc || normalized.fulldesc || (captionKey ? normalized[captionKey] : '') || '',
      };
    }).filter((item: any) => Object.values(item).some(v => v !== null && v !== ''));
  } catch (error) {
    console.error(`Error fetching ${tabName}:`, error);
    return null;
  }
};

export const fetchGalleryImages = async () => {
  const data = await fetchData('Gallery');
  if (!data || data.length === 0) {
    return [
      { url: 'https://images.unsplash.com/photo-1523050853064-85a17f009c5d', caption: 'School Campus' },
      { url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7', caption: 'Science Lab' },
    ];
  }
  return data;
};

export const fetchToppers = async () => {
  const data = await fetchData('Toppers');
  if (!data || data.length === 0) {
    return [
      { name: "Rajlaxmi Kanhe", nickname: "The Photographer", percentage: "96.20%", year: "2025", std: "X", tagline: "Capturing Excellence", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80" },
      { name: "Ojas Dnyaneshwar", nickname: "The Painter", percentage: "96.40%", year: "2025", std: "X", tagline: "Artistic Brilliance", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80" },
    ];
  }
  return data;
};

export const fetchAnnouncements = async () => {
  const data = await fetchData('Announcements');
  if (!data || data.length === 0) {
    return [
      { title: "Admission Open for 2026-27", date: "March 20, 2026", content: "We are pleased to announce that admissions are now open for all grades. Visit our admissions page for more details.", author: "Principal" },
    ];
  }
  return data;
};

export const fetchEvents = async () => {
  const data = await fetchData('Events');
  if (!data || data.length === 0) {
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
  return data;
};

export const fetchPrograms = async () => {
  const data = await fetchData('Programs');
  return data || [];
};

export const fetchTrustDetails = async () => {
  const data = await fetchData('Trust');
  return data && data.length > 0 ? data[0] : null;
};

export const fetchFaculty = async () => {
  const data = await fetchData('Faculty');
  return data || [];
};

export const fetchSocialMedia = async () => {
  const data = await fetchData('SocialMedia');
  return data || [];
};

export const fetchContactDetails = async () => {
  const data = await fetchData('Contact');
  return data && data.length > 0 ? data[0] : null;
};
