import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Mail, MapPin, Instagram, Facebook, Youtube, FileText, Twitter, Linkedin, ChevronUp, ChevronDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { cn } from './lib/utils';
import { fetchSocialMedia, fetchContactDetails, fetchGlobalSettings, prefetchData } from './services/googleSheets';

// Start pre-fetching immediately
prefetchData();

const Navbar = ({ brochure, logo, contact }: { brochure: string; logo: string; contact: any }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Management', path: '/management' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Curriculum', path: '/curriculum' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Events', path: '/events' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-brand-green/5 shadow-sm">
      {/* Top Bar for Mobile/Desktop Contact */}
      <div className="bg-brand-green text-brand-cream py-1.5 px-4 text-[10px] md:text-xs font-bold uppercase tracking-widest">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href={`tel:${contact?.primaryphone || '+912612345678'}`} className="flex items-center hover:text-brand-gold transition-colors">
              <Phone size={12} className="mr-1.5" /> <span className="hidden sm:inline">{contact?.primaryphone || '+91-261-2345678'}</span>
            </a>
            <a href={`mailto:${contact?.email || 'almuminah_school@yahoo.com'}`} className="flex items-center hover:text-brand-gold transition-colors">
              <Mail size={12} className="mr-1.5" /> <span className="hidden sm:inline">{contact?.email || 'Email Us'}</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden lg:inline">Education for both worlds</span>
            <Link to="/contact" className="flex items-center hover:text-brand-gold transition-colors">
              <MapPin size={12} className="mr-1.5" /> <span>Surat</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 xl:px-8">
        <div className="flex justify-between h-20 lg:h-24 xl:h-32 items-center">
          <Link to="/" className="flex items-center space-x-2 xl:space-x-4 shrink-0">
            <div className="w-10 h-10 lg:w-16 lg:h-16 xl:w-20 xl:h-20 bg-white rounded-full flex items-center justify-center text-brand-green font-georgia text-base lg:text-xl xl:text-2xl font-bold border-2 border-brand-gold overflow-hidden shrink-0 shadow-sm">
              {logo || contact?.logo || contact?.image ? (
                <img 
                  src={logo || contact?.logo || contact?.image} 
                  alt="School Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                "M"
              )}
            </div>
            <div className="flex flex-col w-fit">
              <span className="text-sm lg:text-xl xl:text-3xl font-georgia font-bold tracking-tight text-brand-green leading-none whitespace-nowrap">
                AL-MU'MINAH SCHOOL
              </span>
              <div className="h-[1px] bg-brand-green/20 w-full my-1 md:my-2" />
              <div className="flex justify-between text-[8px] lg:text-[11px] xl:text-[16px] uppercase font-bold text-brand-gold font-georgia tracking-tighter">
                <span>EDUCATION</span>
                <span>FOR</span>
                <span>BOTH</span>
                <span>WORLDS</span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-8">
            <div className="flex space-x-1.5 xl:space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-[9px] xl:text-[12px] font-bold uppercase tracking-tighter xl:tracking-widest transition-all hover:text-brand-gold relative py-2",
                    location.pathname === link.path ? "text-brand-gold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-brand-gold" : "text-brand-green/80"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            {brochure ? (
              <a 
                href={brochure} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-2 py-1.5 xl:px-6 xl:py-3 bg-brand-green text-brand-cream text-[9px] xl:text-xs font-bold uppercase tracking-widest rounded-full hover:bg-brand-gold transition-all shadow-lg shadow-brand-green/20 flex items-center shrink-0"
              >
                <FileText size={12} className="mr-1 xl:mr-2" /> <span className="hidden xl:inline">Brochure</span><span className="xl:hidden">PDF</span>
              </a>
            ) : (
              <Link to="/admissions" className="px-2 py-1.5 xl:px-6 xl:py-3 bg-brand-green text-brand-cream text-[9px] xl:text-xs font-bold uppercase tracking-widest rounded-full hover:bg-brand-gold transition-all shadow-lg shadow-brand-green/20 shrink-0">
                Admissions
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-green p-2 hover:bg-brand-gold/10 rounded-full transition-colors">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-brand-cream border-b border-brand-green/10 overflow-y-auto max-h-[calc(100vh-120px)]"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block text-lg font-serif transition-colors",
                    location.pathname === link.path ? "text-brand-gold" : "text-brand-green"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-brand-green/10 space-y-4">
                <div className="flex items-center space-x-3 text-brand-green/70 text-sm">
                  <Phone size={18} className="text-brand-gold" />
                  <span>{contact?.primaryphone || '+91-261-2345678'}</span>
                </div>
                <div className="flex items-center space-x-3 text-brand-green/70 text-sm">
                  <Mail size={18} className="text-brand-gold" />
                  <span>{contact?.email || 'almuminah_school@yahoo.com'}</span>
                </div>
                <div className="flex items-center space-x-3 text-brand-green/70 text-sm">
                  <MapPin size={18} className="text-brand-gold" />
                  <span className="line-clamp-1">{contact?.address || 'Surat, Gujarat'}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ logo, socials, contact }: { logo: string; socials: any[]; contact: any }) => {
  const getIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('instagram')) return <Instagram size={20} />;
    if (n.includes('facebook')) return <Facebook size={20} />;
    if (n.includes('youtube')) return <Youtube size={20} />;
    if (n.includes('twitter')) return <Twitter size={20} />;
    if (n.includes('linkedin')) return <Linkedin size={20} />;
    return <FileText size={20} />;
  };

  return (
    <footer className="bg-brand-green text-brand-cream pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 lg:gap-x-24 mb-20">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center space-x-6 mb-8">
              <div className="w-20 h-20 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center text-brand-green font-georgia text-3xl md:text-4xl font-bold border-2 border-brand-gold overflow-hidden shrink-0 shadow-lg shadow-black/20">
                {logo || contact?.logo || contact?.image ? (
                  <img 
                    src={logo || contact?.logo || contact?.image} 
                    alt="School Logo" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  "M"
                )}
              </div>
              <div className="flex flex-col w-fit">
                <span className="text-xl md:text-4xl font-georgia font-bold tracking-tight leading-none text-brand-cream whitespace-nowrap">
                  AL-MU'MINAH SCHOOL
                </span>
                <div className="h-[1px] bg-brand-cream/20 w-full my-2" />
                <div className="flex justify-between text-[12px] md:text-[18px] uppercase font-bold text-brand-gold font-georgia tracking-tighter">
                  <span>EDUCATION</span>
                  <span>FOR</span>
                  <span>BOTH</span>
                  <span>WORLDS</span>
                </div>
              </div>
            </div>
            <p className="text-brand-cream/60 text-sm leading-relaxed max-w-xs">
              Pioneers in teaching Quranic Arabic with word-for-word translation. Dedicated to empowering girls through holistic education.
            </p>
            <div className="flex space-x-4">
              {socials.length > 0 ? socials.map((social, i) => (
                <a key={social.url || `social-${i}`} href={social.url} target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">
                  {getIcon(social.name || social.title)}
                </a>
              )) : (
                <>
                  <a key="insta-fallback" href="#" className="hover:text-brand-gold transition-colors"><Instagram size={20} /></a>
                  <a key="fb-fallback" href="#" className="hover:text-brand-gold transition-colors"><Facebook size={20} /></a>
                  <a key="yt-fallback" href="https://www.youtube.com/channel/UCfCW6OI3T-Lmt2EOTQkvw-Q" target="_blank" className="hover:text-brand-gold transition-colors"><Youtube size={20} /></a>
                </>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-serif font-medium text-brand-gold">Quick Links</h4>
            <ul className="space-y-3 text-sm text-brand-cream/70">
              <li><Link to="/about" className="hover:text-brand-cream transition-colors">About Our Vision</Link></li>
              <li><Link to="/management" className="hover:text-brand-cream transition-colors">Trust & Management</Link></li>
              <li><Link to="/curriculum" className="hover:text-brand-cream transition-colors">Academic Curriculum</Link></li>
              <li><Link to="/admissions" className="hover:text-brand-cream transition-colors">Admissions Process</Link></li>
              <li><Link to="/blog" className="hover:text-brand-cream transition-colors">Educational Blog</Link></li>
              <li><Link to="/contact" className="hover:text-brand-cream transition-colors">Get in Touch</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-serif font-medium text-brand-gold">Contact Us</h4>
            <ul className="space-y-4 text-sm text-brand-cream/70">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-brand-gold shrink-0" />
                <span>{contact?.address || "Surat, Gujarat – 395003"}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-brand-gold shrink-0" />
                <span>{contact?.primaryphone || contact?.phone || "+91-261-2345678"}</span>
              </li>
              {contact?.secondaryphone && (
                <li className="flex items-center space-x-3">
                  <Phone size={18} className="text-brand-gold shrink-0 opacity-0" />
                  <span>{contact.secondaryphone}</span>
                </li>
              )}
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-brand-gold shrink-0" />
                <span>{contact?.email || "almuminah_school@yahoo.com"}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-brand-cream/10 pt-8 text-center text-xs text-brand-cream/40 uppercase tracking-widest font-georgia">
          © {new Date().getFullYear()} AL-MU'MINAH SCHOOL,SURAT. Managed by Meer Education Trust .All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

const ScrollNavigation = ({ whatsapp }: { whatsapp: string }) => {
  const [showTop, setShowTop] = React.useState(false);
  const [showBottom, setShowBottom] = React.useState(true);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show "Scroll to Top" after scrolling down 400px
      setShowTop(scrollY > 400);

      // Show "Scroll to Bottom" if not near the bottom (within 400px)
      setShowBottom(scrollY + windowHeight < documentHeight - 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="fixed right-6 bottom-24 lg:bottom-10 z-50 flex flex-col space-y-3">
      <AnimatePresence>
        {whatsapp && (
          <motion.a
            key="whatsapp"
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="w-12 h-12 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all border-2 border-white"
            title="Chat on WhatsApp"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </motion.a>
        )}
        {showTop && (
          <motion.button
            key="scroll-to-top"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="w-12 h-12 bg-brand-gold text-brand-green rounded-full shadow-lg flex items-center justify-center hover:bg-brand-green hover:text-brand-gold transition-all border-2 border-brand-gold"
            title="Scroll to Top"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
        {showBottom && (
          <motion.button
            key="scroll-to-bottom"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToBottom}
            className="w-12 h-12 bg-brand-green text-brand-gold rounded-full shadow-lg flex items-center justify-center hover:bg-brand-gold hover:text-brand-green transition-all border-2 border-brand-gold"
            title="Scroll to Bottom"
          >
            <ChevronDown size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: settings } = useQuery({
    queryKey: ['globalSettings'],
    queryFn: fetchGlobalSettings,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const { data: contact } = useQuery({
    queryKey: ['contactDetails'],
    queryFn: fetchContactDetails,
    staleTime: 10 * 60 * 1000,
  });

  const { data: socials } = useQuery({
    queryKey: ['socialMedia'],
    queryFn: fetchSocialMedia,
    staleTime: 10 * 60 * 1000,
  });

  const logo = settings?.logo || contact?.logo || '';
  const brochure = settings?.brochure || '';
  const whatsapp = settings?.whatsapp ? settings.whatsapp.toString().replace(/\D/g, '') : '';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollToTop />
      <Navbar brochure={brochure} logo={logo} contact={contact} />
      <main className="flex-grow pt-28 md:pt-32">
        {children}
      </main>
      
      <ScrollNavigation whatsapp={whatsapp} />
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden grid grid-cols-2 border-t border-brand-green/10">
        <Link to="/contact" className="bg-white text-brand-green py-4 text-center font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-2">
          <Mail size={16} /> <span>Enquire</span>
        </Link>
        <a 
          href={brochure || '#'} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-brand-gold text-brand-green py-4 text-center font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-2"
        >
          <FileText size={16} /> <span>Brochure</span>
        </a>
      </div>

      {/* Sticky Desktop CTA */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col space-y-1">
        <Link to="/contact" className="bg-brand-green text-brand-cream p-4 hover:bg-brand-gold transition-all group flex items-center space-x-3 -mr-32 hover:mr-0 rounded-l-xl">
          <Mail size={20} /> <span className="font-bold uppercase tracking-widest text-xs">Enquiry Form</span>
        </Link>
        <a 
          href={brochure || '#'} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-brand-gold text-brand-green p-4 hover:bg-brand-green hover:text-brand-cream transition-all group flex items-center space-x-3 -mr-32 hover:mr-0 rounded-l-xl"
        >
          <FileText size={20} /> <span className="font-bold uppercase tracking-widest text-xs">Download Brochure</span>
        </a>
      </div>

      <Footer logo={logo} socials={socials || []} contact={contact} />
    </div>
  );
};
