import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'motion/react';
import { Skeleton, EmptyState, ErrorState } from '../components/Feedback';
import { SEO } from '../components/SEO';
import { ArrowRight, BookOpen, GraduationCap, Heart, Star, CheckCircle, ChevronLeft, ChevronRight, Send, Camera, Palette, Shield, Zap, Cpu, FileText, UserCheck, Video, ShieldCheck, Users, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { submitInquiry, fetchToppers, fetchEvents, fetchPrograms, fetchFaculty, fetchGlobalSettings, fetchStats, fixUrl } from '../services/googleSheets';

const TopperCarousel = () => {
  const [toppers, setToppers] = React.useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const loadToppers = async () => {
      const data = await fetchToppers();
      setToppers(data);
      setLoading(false);
    };
    loadToppers();
  }, []);

  const next = () => {
    if (toppers.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % toppers.length);
  };

  const prev = () => {
    if (toppers.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + toppers.length) % toppers.length);
  };

  if (loading) return (
    <div className="py-16 bg-brand-gold/10 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
    </div>
  );

  if (toppers.length === 0) return null;

  return (
    <section className="py-12 bg-brand-gold/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="text-center md:text-left">
            <span className="text-brand-gold font-bold uppercase tracking-widest text-sm">Academic Excellence</span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-green mt-2">Our Proud Toppers</h2>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={prev}
              className="w-10 h-10 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-green transition-all"
              aria-label="Previous topper"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={next}
              className="w-10 h-10 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-green transition-all"
              aria-label="Next topper"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative group">
          <div className="overflow-visible">
            <motion.div 
              className="flex gap-4 md:gap-6 cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ right: 0, left: -((toppers.length - 1) * 300) }}
              animate={{
                x: -currentIndex * (window.innerWidth < 768 ? 216 : 304), // card width + gap
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            >
              {toppers.map((topper, i) => (
                <div 
                  key={`${topper.name}-${i}`} 
                  className={cn(
                    "flex-shrink-0 w-[200px] md:w-[280px] group relative bg-white rounded-2xl overflow-hidden shadow-md border border-brand-green/5 p-2 transition-all hover:shadow-xl",
                    currentIndex === i ? "ring-2 ring-brand-gold ring-offset-4" : "opacity-60 scale-95"
                  )}
                >
                  <div className="aspect-[4/5] rounded-xl overflow-hidden relative">
                    <img 
                      src={topper.image ? fixUrl(topper.image) : 'https://images.unsplash.com/photo-1523050853064-85a17f009c5d'} 
                      alt={topper.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      referrerPolicy="no-referrer" 
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1523050853064-85a17f009c5d";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <h3 className="text-sm md:text-base font-serif font-bold leading-tight">{topper.name}</h3>
                      <p className="text-[8px] md:text-[10px] opacity-80 uppercase tracking-widest">{topper.nickname || topper.title}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between items-center px-1">
                    <div className="flex flex-col">
                      <span className="text-[7px] md:text-[8px] uppercase tracking-widest text-brand-gold font-bold">Board Score ({topper.year})</span>
                      <span className="text-base md:text-lg font-serif font-bold text-brand-green">{topper.percentage || topper.score}</span>
                      <span className="text-[7px] md:text-[8px] text-brand-green/60 uppercase font-bold">Class {topper.std}</span>
                    </div>
                    <div className="w-7 h-7 md:w-8 md:h-8 bg-brand-gold rounded-full flex items-center justify-center text-white shadow-sm">
                      <Star size={12} fill="currentColor" />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Gradient Overlays for smooth fade */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-brand-gold/10 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-brand-gold/10 to-transparent z-10 pointer-events-none" />
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {toppers.map((_, i) => (
            <button
              key={`dot-${i}`}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                currentIndex === i ? "w-8 bg-brand-gold" : "bg-brand-gold/20"
              )}
              aria-label={`Go to topper ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const PhilosophySHARP = () => {
  const steps = [
    { letter: "S", title: "Self-discipline", desc: "Cultivating inner strength and moral character." },
    { letter: "H", title: "Hard Work", desc: "Embracing effort as the path to true achievement." },
    { letter: "A", title: "Applied Science", desc: "Bridging theory with practical, real-world knowledge." },
    { letter: "R", title: "Research", desc: "Fostering a spirit of inquiry and lifelong learning." },
    { letter: "P", title: "Physical Fitness", desc: "Nurturing the body as a vessel for the soul." },
  ];

  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  return (
    <section className="py-12 bg-brand-green text-brand-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <span className="text-brand-gold font-bold uppercase tracking-widest text-sm">Our Core Values</span>
          <h2 className="text-5xl font-serif mt-4">The SHARP Philosophy</h2>
        </div>

        {/* Desktop Layout: Compact Grid */}
        <div className="hidden lg:grid grid-cols-5 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.letter}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setActiveIndex(i)}
              className="relative group cursor-default"
            >
              <div className="flex flex-col items-center text-center">
                <div className={cn(
                  "text-7xl font-serif font-bold transition-all duration-500 mb-4",
                  activeIndex === i ? "text-brand-gold scale-110" : "text-brand-cream/10"
                )}>
                  {step.letter}
                </div>
                <div className={cn(
                  "h-0.5 transition-all duration-500 mb-4",
                  activeIndex === i ? "w-16 bg-brand-gold" : "w-8 bg-brand-gold/30"
                )} />
                <h3 className="text-lg font-serif text-brand-gold mb-2">{step.title}</h3>
                <p className={cn(
                  "text-xs text-brand-cream/60 transition-all duration-500 leading-relaxed px-2",
                  activeIndex === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                )}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile/Tablet Layout: Interactive Radial Dial */}
        <div className="lg:hidden flex flex-col items-center">
          <div className="relative w-full aspect-square max-w-[300px] mx-auto mb-8">
            {/* Central Content Display */}
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="text-brand-gold font-serif text-5xl font-bold mb-2 opacity-20">
                    {steps[activeIndex].letter}
                  </div>
                  <h3 className="text-xl font-serif text-brand-gold mb-2 leading-tight">
                    {steps[activeIndex].title}
                  </h3>
                  <p className="text-[11px] text-brand-cream/70 leading-relaxed max-w-[180px] mx-auto">
                    {steps[activeIndex].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Orbiting Buttons */}
            {steps.map((step, i) => {
              const angle = (i * 360) / steps.length;
              const radius = 130;
              return (
                <motion.button
                  key={`mob-sharp-${i}`}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "absolute w-12 h-12 rounded-full flex items-center justify-center font-serif font-bold transition-all duration-500 z-20",
                    activeIndex === i 
                      ? "bg-brand-gold text-brand-green scale-125 shadow-xl shadow-brand-gold/40 border-2 border-white" 
                      : "bg-white/5 text-brand-cream border border-white/20"
                  )}
                  style={{
                    left: `calc(50% + ${Math.cos((angle - 90) * (Math.PI / 180)) * radius}px - 24px)`,
                    top: `calc(50% + ${Math.sin((angle - 90) * (Math.PI / 180)) * radius}px - 24px)`,
                  }}
                >
                  {step.letter}
                </motion.button>
              );
            })}

            {/* Decorative Rings */}
            <div className="absolute inset-0 border border-white/5 rounded-full" />
            <div className="absolute inset-4 border border-white/10 rounded-full border-dashed animate-spin-slow" />
          </div>
          
          <div className="flex space-x-2 mt-8">
            {steps.map((_, i) => (
              <button 
                key={`dot-${i}`}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-300",
                  activeIndex === i ? "w-6 bg-brand-gold" : "bg-white/20"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const PetalsOfPurpose = () => {
  const petals = [
    { title: "A Fortress of Care", desc: "Zero compromise on your child's safety and well-being.", icon: Shield, color: "bg-blue-500/10 text-blue-600" },
    { title: "Cultivating the X Factor", desc: "Excellence and unique talents needed to thrive.", icon: Star, color: "bg-yellow-500/10 text-yellow-600" },
    { title: "Modern Infrastructure", desc: "State-of-the-art facilities for the best learning.", icon: GraduationCap, color: "bg-purple-500/10 text-purple-600" },
    { title: "Never A Dull Day", desc: "Diverse interests and niches created together.", icon: Palette, color: "bg-pink-500/10 text-pink-600" },
    { title: "From ABC to AI", desc: "Solid academic foundation with access to latest tech.", icon: Cpu, color: "bg-emerald-500/10 text-emerald-600" },
  ];

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-brand-gold font-bold uppercase tracking-widest text-sm">Holistic Growth</span>
          <h2 className="text-5xl md:text-6xl font-serif text-brand-green mt-4">5 Petals of Purpose</h2>
        </div>

        {/* Desktop: Horizontal Layout */}
        <div className="hidden lg:grid grid-cols-5 gap-4 relative">
          {petals.map((petal, i) => (
            <motion.div
              key={`petal-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="group relative"
            >
              <div className="h-full bg-brand-cream/20 rounded-[2rem] p-8 border border-brand-green/5 flex flex-col items-center text-center transition-all duration-500 hover:bg-white hover:shadow-2xl hover:-translate-y-2">
                <div className={cn("w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-sm transition-transform duration-500 group-hover:scale-110", petal.color, "bg-white")}>
                  <petal.icon size={36} strokeWidth={1.5} />
                </div>
                <h4 className="text-xl font-serif font-bold text-brand-green mb-4 leading-tight min-h-[3.5rem] flex items-center justify-center">{petal.title}</h4>
                <p className="text-sm text-brand-green/60 leading-relaxed">
                  {petal.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Elegant Vertical Petal Stack */}
        <div className="lg:hidden space-y-6">
          {petals.map((petal, i) => (
            <motion.div
              key={`mob-petal-${i}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex items-center"
            >
              <div className={cn(
                "flex-1 bg-brand-cream/30 p-6 rounded-3xl border border-brand-green/5 flex items-center space-x-4",
                i % 2 === 1 && "flex-row-reverse space-x-reverse"
              )}>
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm", petal.color, "bg-white")}>
                  <petal.icon size={24} />
                </div>
                <div className={i % 2 === 1 ? "text-right" : "text-left"}>
                  <h4 className="text-lg font-serif text-brand-green mb-1">{petal.title}</h4>
                  <p className="text-xs text-brand-green/60 leading-relaxed">{petal.desc}</p>
                </div>
              </div>
              {/* Decorative Connector Dot */}
              <div className={cn(
                "absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-brand-gold rounded-full",
                i % 2 === 0 ? "-right-1" : "-left-1"
              )} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Hero = () => {
  const [formData, setFormData] = React.useState({
    parentName: '',
    mobile: '',
    email: '',
    branch: ''
  });
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [brochure, setBrochure] = React.useState('');

  React.useEffect(() => {
    const loadSettings = async () => {
      const settings = await fetchGlobalSettings();
      if (settings?.brochure) setBrochure(settings.brochure);
    };
    loadSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await submitInquiry(formData);
      setStatus('success');
      setFormData({ parentName: '', mobile: '', email: '', branch: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-brand-green">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1523050853064-85a17f009c5d?auto=format&fit=crop&q=80" 
          alt="School Background" 
          className="w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-green/50 to-brand-green" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-8 border border-brand-gold/30">
              <Star size={14} fill="currentColor" /> <span>Top Rated Girls' School in Surat</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif text-brand-cream leading-[1.05] mb-8">
              Where <span className="text-brand-gold italic">Faith</span> Meets <span className="underline decoration-brand-gold/50 underline-offset-8">Academic Excellence</span>
            </h1>
            <p className="text-xl md:text-2xl text-brand-cream/80 mb-10 font-light leading-relaxed max-w-3xl mx-auto">
              Pioneers in teaching Quranic Arabic with word-for-word translation. 
              Providing a nurturing environment for girls to excel in SSC academics 
              and spiritual growth.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              {brochure && (
                <a 
                  href={brochure} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-10 py-5 bg-brand-gold text-brand-green font-bold rounded-full hover:bg-brand-cream transition-all flex items-center group shadow-xl shadow-brand-gold/20"
                >
                  Download Brochure <FileText className="ml-2" size={20} />
                </a>
              )}
              <Link to="/contact" className="px-10 py-5 border-2 border-brand-cream/30 text-brand-cream font-bold rounded-full hover:bg-brand-cream/10 transition-all">
                Enquire Now
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const { data: stats, isLoading, isError, refetch } = useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
  });

  if (isLoading) return (
    <div className="bg-brand-cream py-6 md:py-12 border-b border-brand-green/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={`stat-skeleton-${i}`} className="flex flex-col items-center space-y-2">
              <Skeleton className="h-12 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (isError) return (
    <div className="bg-brand-cream py-4 border-b border-brand-green/5">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <button onClick={() => refetch()} className="text-brand-gold text-xs font-bold uppercase hover:underline">
          Failed to load stats. Click to retry.
        </button>
      </div>
    </div>
  );

  if (!stats || stats.length === 0) return null;

  return (
    <div className="bg-brand-cream py-6 md:py-12 border-b border-brand-green/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, i) => (
            <div key={`stat-${i}`} className="text-center p-2 md:p-0">
              <div className="text-3xl md:text-5xl font-serif font-bold text-brand-green mb-1 md:mb-2">{stat.title || stat.value}</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-brand-gold font-bold">{stat.subtitle || stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Programs = () => {
  const { data: levels, isLoading, isError, refetch } = useQuery({
    queryKey: ['programs'],
    queryFn: async () => {
      const data = await fetchPrograms();
      if (data && data.length > 0) return data;
      return [
        {
          title: "Early Years",
          grades: "Nursery - KG",
          desc: "A nurturing start with a focus on play-based learning and basic Islamic values.",
          image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80"
        },
        {
          title: "Primary School",
          grades: "Grade 1 - 5",
          desc: "Strong academic foundation integrated with Quranic Arabic and word-for-word translation.",
          image: "https://images.unsplash.com/photo-1577891729319-828d0055523f?auto=format&fit=crop&q=80"
        },
        {
          title: "Middle School",
          grades: "Grade 6 - 8",
          desc: "Developing critical thinking and deep spiritual understanding during formative years.",
          image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80"
        },
        {
          title: "High School",
          grades: "Grade 9 - 12",
          desc: "Excellence in SSC curriculum with a focus on leadership and Islamic identity.",
          image: "https://images.unsplash.com/photo-1511629091441-ee46146481b6?auto=format&fit=crop&q=80"
        }
      ];
    },
  });

  if (isLoading) return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={`prog-skeleton-${i}`} className="space-y-4">
              <Skeleton className="aspect-[3/4] w-full rounded-3xl" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (isError) return (
    <div className="py-16 bg-white">
      <ErrorState onRetry={() => refetch()} />
    </div>
  );

  if (!levels || levels.length === 0) return (
    <div className="py-16 bg-white">
      <EmptyState title="No Programs Available" message="Our educational programs will be listed here soon." />
    </div>
  );

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-brand-gold font-bold uppercase tracking-widest text-sm">Our Programs</span>
          <h2 className="text-5xl md:text-6xl font-serif text-brand-green mt-4">A Nurturing Journey</h2>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:flex flex-wrap justify-center gap-6">
          {levels.map((level, i) => (
            <motion.div 
              key={`program-${level.title}-${i}`}
              whileHover={{ y: -10 }}
              className="group cursor-pointer w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)] max-w-sm"
            >
              <div className="aspect-[3/4] rounded-3xl overflow-hidden relative mb-6 shadow-lg">
                <img 
                  src={level.image ? fixUrl(level.image) : "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80"} 
                  alt={level.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  referrerPolicy="no-referrer" 
                  loading="lazy" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-1">{level.grades || level.subtitle}</div>
                  <h4 className="text-2xl font-serif text-brand-cream">{level.title}</h4>
                </div>
              </div>
              <p className="text-brand-green/60 text-sm leading-relaxed px-2">{level.desc || level.content || level.caption}</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar space-x-4 pb-8">
            {levels.map((level, i) => (
              <div key={`mob-program-${i}`} className="min-w-[85%] snap-center">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden relative mb-6 shadow-lg">
                  <img 
                    src={level.image ? fixUrl(level.image) : "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80"} 
                    alt={level.title} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer" 
                    loading="lazy" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-green via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-1">{level.grades || level.subtitle}</div>
                    <h4 className="text-2xl font-serif text-brand-cream">{level.title}</h4>
                  </div>
                </div>
                <p className="text-brand-green/60 text-sm leading-relaxed px-2">{level.desc || level.content || level.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Mission = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80" 
                alt="Students" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-gold rounded-2xl -z-10 hidden lg:block" />
          </div>
          
          <div className="space-y-8">
            <span className="text-brand-gold font-semibold uppercase tracking-widest text-base">Our Mission</span>
            <h2 className="text-5xl md:text-6xl font-serif text-brand-green leading-tight">
              A Visionary Approach to <span className="italic">Islamic Education</span>
            </h2>
            <p className="text-brand-green/70 leading-relaxed italic text-xl md:text-2xl">
              "يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنْفُسَكُمْ وَأَهْلِيكُمْ نَارًا"
            </p>
            <p className="text-brand-green/70 leading-relaxed text-lg md:text-xl">
              AL-MU’MINAH GROUP OF SCHOOLS is an Islamic School; born out of the ideology that only worldly academic education is not sufficient for the ultimate success of a believer. Our mission is to provide excellence in both academic and Islamic education, preparing our girls for success in this world and the hereafter.
            </p>
            <div className="pt-4">
              <Link to="/about" className="text-brand-green font-bold border-b-2 border-brand-gold pb-1 hover:text-brand-gold transition-colors">
                Read Our Full Story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Management = () => {
  const { data: members, isLoading, isError, refetch } = useQuery({
    queryKey: ['management-home'],
    queryFn: async () => {
      const data = await fetchFaculty();
      if (data && data.length > 0) {
        return data.filter(m => 
          m.showOnHomepage?.toLowerCase() === 'yes' || 
          m['Show on Homepage']?.toLowerCase() === 'yes'
        );
      }
      return [
        { name: "Dr Shehnaz Shaikh", role: "Founder & Director", qualification: "MBBS, MD" },
        { name: "Bushra Meer", role: "Principal", qualification: "B.A, B.Ed" },
        { name: "Kausar Mohsin Sayed", role: "Management", qualification: "B.Com, B.A.B.Ed" },
        { name: "Shehnaaz Kazi", role: "Management", qualification: "B.Com, B.A.B.Ed" }
      ];
    },
  });

  if (isLoading) return (
    <div className="py-16 bg-brand-cream/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={`mgmt-skeleton-${i}`} className="bg-white p-8 rounded-xl space-y-4">
              <Skeleton className="w-24 h-24 rounded-full mx-auto" />
              <Skeleton className="h-6 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (isError) return (
    <div className="py-16 bg-brand-cream/50">
      <ErrorState onRetry={() => refetch()} />
    </div>
  );

  if (!members || members.length === 0) return null;

  return (
    <section className="py-12 bg-brand-cream/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-serif text-brand-green mb-4">Our Management</h2>
          <p className="text-brand-green/60 max-w-2xl mx-auto">Guided by experienced educators and visionaries dedicated to the school's mission.</p>
        </div>
        
        {/* Desktop Grid */}
        <div className="hidden sm:flex flex-wrap justify-center gap-8">
          {members.map((leader, i) => (
            <motion.div 
              key={`management-${leader.name}-${i}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-brand-green/5 text-center group hover:shadow-md transition-shadow w-full sm:w-[calc(50%-2rem)] lg:w-[calc(25%-2rem)] max-w-xs"
            >
              <div className="w-24 h-24 bg-brand-green/5 rounded-full mx-auto mb-6 flex items-center justify-center text-brand-gold group-hover:bg-brand-green group-hover:text-brand-cream transition-colors overflow-hidden">
                {leader.image ? (
                  <img 
                    src={fixUrl(leader.image)} 
                    alt={leader.name} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer" 
                    loading="lazy" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80";
                    }}
                  />
                ) : (
                  <Star size={32} />
                )}
              </div>
              <h4 className="text-xl font-serif text-brand-green mb-1">{leader.name}</h4>
              <p className="text-brand-gold text-sm font-semibold uppercase tracking-wider mb-2">{leader.role || leader.designation}</p>
              <p className="text-brand-green/40 text-xs">{leader.qualification}</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="sm:hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar space-x-4 pb-8">
            {members.map((leader, i) => (
              <div key={`mob-mgmt-${i}`} className="min-w-[80%] snap-center bg-white p-8 rounded-xl shadow-sm border border-brand-green/5 text-center">
                <div className="w-20 h-20 bg-brand-green/5 rounded-full mx-auto mb-6 flex items-center justify-center text-brand-gold overflow-hidden">
                  {leader.image ? (
                    <img 
                      src={fixUrl(leader.image)} 
                      alt={leader.name} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer" 
                      loading="lazy" 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80";
                      }}
                    />
                  ) : (
                    <Star size={24} />
                  )}
                </div>
                <h4 className="text-lg font-serif text-brand-green mb-1">{leader.name}</h4>
                <p className="text-brand-gold text-[10px] font-semibold uppercase tracking-wider mb-2">{leader.role || leader.designation}</p>
                <p className="text-brand-green/40 text-[10px]">{leader.qualification}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SalientFeatures = () => {
  const features = [
    { icon: UserCheck, title: "All Ladies Staff", desc: "A safe, comfortable, and nurturing environment for girls." },
    { icon: MessageSquare, title: "Fluency in English", desc: "Developing confident communication skills for global success." },
    { icon: Zap, title: "Strong Foundation", desc: "Excellence in Science, Mathematics & Technology." },
    { icon: Heart, title: "Child-Friendly Islamic Studies", desc: "Developing love for Islam through modern methods." },
    { icon: BookOpen, title: "Tajweed & Makhraj", desc: "Focus on correct Quranic pronunciation and recitation." },
    { icon: ShieldCheck, title: "Quran & Sunnah", desc: "Emphasis on understanding core Islamic values and ethics." },
    { icon: GraduationCap, title: "Karate Classes", desc: "Physical fitness, discipline, and self-defense training." },
    { icon: Users, title: "Guidance & Counselling", desc: "Continuous support for student well-being and growth." },
    { icon: Video, title: "24/7 Security", desc: "CCTV surveillance ensuring a safe learning environment." }
  ];

  return (
    <section className="py-20 bg-brand-green text-brand-cream relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-gold/5 via-transparent to-brand-green/20 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-bold uppercase tracking-widest text-sm mb-4 block">Why Choose Us</span>
          <h2 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">Salient Features</h2>
          <p className="text-brand-gold text-xl md:text-2xl font-serif italic max-w-3xl mx-auto opacity-90">
            Preparing Students for Modern Academic & Professional Excellence
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl md:rounded-3xl hover:bg-white/10 hover:border-brand-gold/30 transition-all duration-500 shadow-xl hover:shadow-brand-gold/5"
            >
              <div className="flex items-center space-x-5">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-brand-gold/20 rounded-xl flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform duration-500 shrink-0">
                  <feature.icon size={26} className="md:w-7 md:h-7" />
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-serif text-brand-gold mb-1">{feature.title}</h4>
                  <p className="text-brand-cream/60 text-xs md:text-sm leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">{feature.desc}</p>
                </div>
              </div>
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-brand-gold/0 group-hover:bg-brand-gold/5 transition-colors pointer-events-none" />
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-block p-1 rounded-full bg-brand-gold/20 border border-brand-gold/30">
            <div className="px-8 py-3 rounded-full bg-brand-gold text-brand-green font-bold text-sm uppercase tracking-widest">
              20+ Years of Excellence
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Mrs. Fatima Khan", role: "Parent", text: "AL-MU'MINAH has been a blessing for my daughter. The way they teach Quranic Arabic is truly unique and effective." },
    { name: "Mr. Ahmed Shaikh", role: "Parent", text: "I am impressed by the academic standards. My daughter is not only excelling in her studies but also growing spiritually." },
    { name: "Mrs. Zainab Sayed", role: "Parent", text: "The safe and nurturing environment for girls is what makes this school stand out. Highly recommended!" }
  ];

  return (
    <section className="py-12 bg-brand-cream/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-brand-gold font-bold uppercase tracking-widest text-xs">Parent Reviews</span>
          <h2 className="text-4xl font-serif text-brand-green mt-4">What Our Parents Say</h2>
        </div>
        
        {/* Desktop Grid */}
        <div className="hidden md:flex flex-wrap justify-center gap-8">
          {reviews.map((review, i) => (
            <div key={review.name} className="bg-white p-10 rounded-3xl shadow-sm border border-brand-green/5 italic w-full md:w-[calc(33.333%-2rem)] max-w-md">
              <p className="text-brand-green/70 mb-6 leading-relaxed">"{review.text}"</p>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-brand-gold/20 rounded-full flex items-center justify-center text-brand-gold font-bold">
                  {review.name[0]}
                </div>
                <div>
                  <div className="text-sm font-bold text-brand-green">{review.name}</div>
                  <div className="text-[10px] uppercase tracking-widest text-brand-gold">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar space-x-4 pb-8">
            {reviews.map((review, i) => (
              <div key={`mob-rev-${i}`} className="min-w-[90%] snap-center bg-white p-8 rounded-3xl shadow-sm border border-brand-green/5 italic">
                <p className="text-brand-green/70 mb-6 text-sm leading-relaxed">"{review.text}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-brand-gold/20 rounded-full flex items-center justify-center text-brand-gold font-bold text-xs">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-green">{review.name}</div>
                    <div className="text-[8px] uppercase tracking-widest text-brand-gold">{review.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const News = () => {
  const [items, setItems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadEvents = async () => {
      const data = await fetchEvents();
      // Take the latest 3 events
      setItems(data.slice(0, 3));
      setLoading(false);
    };
    loadEvents();
  }, []);

  if (loading) return (
    <div className="py-16 bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-gold"></div>
    </div>
  );

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-brand-gold font-bold uppercase tracking-widest text-xs">Latest Updates</span>
            <h2 className="text-4xl font-serif text-brand-green mt-4">School News & Events</h2>
          </div>
          <Link to="/events" className="hidden sm:flex items-center text-brand-gold font-bold uppercase tracking-widest text-xs hover:text-brand-green transition-colors">
            View All News <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {items.map((item, i) => (
            <Link to="/events" key={`news-${item.title}-${i}`} className="group cursor-pointer block">
              <div className="aspect-video rounded-2xl bg-brand-green/5 mb-6 overflow-hidden relative">
                <img 
                  src={(item.images || '').split(',')[0] || 'https://images.unsplash.com/photo-1511629091441-ee46146481b6'} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-brand-green/10 group-hover:bg-brand-gold/10 transition-colors" />
              </div>
              <div className="text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-2">{item.date}</div>
              <h4 className="text-xl font-serif text-brand-green mb-3 group-hover:text-brand-gold transition-colors">{item.title}</h4>
              <p className="text-brand-green/60 text-sm leading-relaxed line-clamp-2">{item.shortDesc || item.content}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Home = () => {
  const schoolSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Al-Mu'minah School",
    "alternateName": "Al-Mu'minah Group of Schools Surat",
    "url": "https://almuminah.com",
    "logo": "https://almuminah.com/logo.png",
    "image": "https://almuminah.com/og-image.jpg",
    "description": "Al-Mu'minah Group of Schools is the leading English medium Islamic girls school in Surat. Modern SSC academics integrated with Quranic Arabic, Tajweed, and Islamic values.",
    "telephone": "+91 75743 87345",
    "email": "almuminah.psurat@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rampura, Kankra Street",
      "addressLocality": "Surat",
      "addressRegion": "Gujarat",
      "postalCode": "395003",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 21.2023,
      "longitude": 72.8311
    },
    "sameAs": [
      "https://facebook.com/almuminahschool",
      "https://instagram.com/almuminahschool"
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <SEO 
        title="Islamic English Medium School in Surat | Al-Mu'minah School"
        description="Al-Mu'minah Group of Schools is the leading English medium Islamic girls school in Surat. Modern SSC academics integrated with Quranic Arabic, Tajweed, and Islamic values in a secure environment."
        keywords="Islamic school Surat, Muslim girls school Surat, English medium Islamic school Surat, best girls school in Surat, school in Rander Surat, top school in Surat 2026, Arabic education Surat, hijab allowed school, Islamic English school near me, school with Islamic education Surat"
        schemaData={schoolSchema}
      />
      <Hero />
      <Stats />
      <TopperCarousel />
      <PhilosophySHARP />
      <PetalsOfPurpose />
      <Programs />
      <SalientFeatures />
      <Mission />
      <Testimonials />
      <Management />
      <News />
    </motion.div>
  );
};
