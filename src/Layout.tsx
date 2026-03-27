import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Mail, MapPin, Instagram, Facebook, Youtube, FileText, Twitter, Linkedin, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from './lib/utils';
import { fetchSocialMedia, fetchContactDetails } from './services/googleSheets';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [contact, setContact] = React.useState<any>(null);
  const location = useLocation();

  React.useEffect(() => {
    const loadContact = async () => {
      const data = await fetchContactDetails();
      setContact(data);
    };
    loadContact();
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Management', path: '/management' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Curriculum', path: '/curriculum' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Events', path: '/events' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-brand-green/5 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          <Link to="/" className="flex items-center space-x-3 shrink-0 mr-4">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center text-brand-green font-georgia text-xl font-bold border-2 border-brand-gold overflow-hidden shrink-0 shadow-sm">
              {contact?.logo || contact?.image ? (
                <img 
                  src={contact.logo || contact.image} 
                  alt="School Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                "M"
              )}
            </div>
            <div className="flex flex-col w-fit">
              <span className="text-base md:text-lg font-georgia font-bold tracking-tight text-brand-green leading-none whitespace-nowrap">
                AL-MU'MINAH SCHOOL
              </span>
              <div className="h-[1px] bg-brand-green/20 w-full my-1" />
              <div className="flex justify-between text-[10px] md:text-[12px] uppercase font-bold text-brand-gold font-georgia tracking-tighter">
                <span>EDUCATION</span>
                <span>FOR</span>
                <span>BOTH</span>
                <span>WORLDS</span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-10">
            <div className="flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-[13px] font-bold uppercase tracking-widest transition-all hover:text-brand-gold relative py-2",
                    location.pathname === link.path ? "text-brand-gold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-brand-gold" : "text-brand-green/80"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Link to="/admissions" className="px-6 py-3 bg-brand-green text-brand-cream text-xs font-bold uppercase tracking-widest rounded-full hover:bg-brand-gold transition-all shadow-lg shadow-brand-green/20">
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <Link to="/admissions" className="px-4 py-2 bg-brand-green text-brand-cream text-[10px] font-bold uppercase tracking-widest rounded-full">
              Apply
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-green p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="md:hidden bg-brand-cream border-b border-brand-green/10 overflow-hidden"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  const [socials, setSocials] = React.useState<any[]>([]);
  const [contact, setContact] = React.useState<any>(null);

  React.useEffect(() => {
    const loadData = async () => {
      const [socialData, contactData] = await Promise.all([
        fetchSocialMedia(),
        fetchContactDetails()
      ]);
      setSocials(socialData);
      setContact(contactData);
    };
    loadData();
  }, []);

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
    <footer className="bg-brand-green text-brand-cream pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center text-brand-green font-georgia text-2xl font-bold border-2 border-brand-gold overflow-hidden shrink-0 shadow-lg shadow-black/20">
                {contact?.logo || contact?.image ? (
                  <img 
                    src={contact.logo || contact.image} 
                    alt="School Logo" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  "M"
                )}
              </div>
              <div className="flex flex-col w-fit">
                <span className="text-base md:text-lg font-georgia font-bold tracking-tight leading-none text-brand-cream whitespace-nowrap">
                  AL-MU'MINAH SCHOOL
                </span>
                <div className="h-[1px] bg-brand-cream/20 w-full my-1" />
                <div className="flex justify-between text-[10px] md:text-[12px] uppercase font-bold text-brand-gold font-georgia tracking-tighter">
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
              <li><Link to="/contact" className="hover:text-brand-cream transition-colors">Get in Touch</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-serif font-medium text-brand-gold">Contact Us</h4>
            <ul className="space-y-4 text-sm text-brand-cream/70">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-brand-gold shrink-0" />
                <span>{contact?.address || "45/47, Sheriff Devji Street (Chakla Street), Near Zakaria Masjid, Mohammad Ali Road, Mumbai – 400003"}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-brand-gold shrink-0" />
                <span>{contact?.primaryphone || contact?.phone || "+91-022-23450702 / 03"}</span>
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
          © {new Date().getFullYear()} AL-MU'MINAH GROUP OF SCHOOLS. All Rights Reserved.
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

const ScrollNavigation = () => {
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
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow pt-24">
        {children}
      </main>
      
      <ScrollNavigation />
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden grid grid-cols-2 border-t border-brand-green/10">
        <Link to="/contact" className="bg-white text-brand-green py-4 text-center font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-2">
          <Mail size={16} /> <span>Enquire</span>
        </Link>
        <Link to="/admissions" className="bg-brand-gold text-brand-green py-4 text-center font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-2">
          <FileText size={16} /> <span>Apply Now</span>
        </Link>
      </div>

      {/* Sticky Desktop CTA */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col space-y-1">
        <Link to="/contact" className="bg-brand-green text-brand-cream p-4 hover:bg-brand-gold transition-all group flex items-center space-x-3 -mr-32 hover:mr-0 rounded-l-xl">
          <Mail size={20} /> <span className="font-bold uppercase tracking-widest text-xs">Enquiry Form</span>
        </Link>
        <Link to="/admissions" className="bg-brand-gold text-brand-green p-4 hover:bg-brand-green hover:text-brand-cream transition-all group flex items-center space-x-3 -mr-32 hover:mr-0 rounded-l-xl">
          <FileText size={20} /> <span className="font-bold uppercase tracking-widest text-xs">Admission Form</span>
        </Link>
      </div>

      <Footer />
    </div>
  );
};
