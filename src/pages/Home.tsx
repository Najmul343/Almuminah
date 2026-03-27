import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, BookOpen, GraduationCap, Heart, Star, CheckCircle, ChevronLeft, ChevronRight, Send, Camera, Palette, Shield, Zap, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { submitInquiry, fetchToppers, fetchEvents, fetchPrograms, fetchFaculty } from '../services/googleSheets';

const TopperCarousel = () => {
  const [toppers, setToppers] = React.useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadToppers = async () => {
      const data = await fetchToppers();
      setToppers(data);
      setLoading(false);
    };
    loadToppers();
  }, []);

  const next = () => toppers.length > 0 && setCurrentIndex((prev) => (prev + 1) % toppers.length);
  const prev = () => toppers.length > 0 && setCurrentIndex((prev) => (prev - 1 + toppers.length) % toppers.length);

  if (loading) return (
    <div className="py-24 bg-brand-gold/10 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
    </div>
  );

  if (toppers.length === 0) return null;

  return (
    <section className="py-24 bg-brand-gold/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-bold uppercase tracking-widest text-xs">Academic Excellence</span>
          <h2 className="text-4xl font-serif text-brand-green mt-4">Our Proud Toppers</h2>
        </div>

        <div className="relative flex items-center justify-center px-4 md:px-12">
          <button onClick={prev} className="absolute left-0 md:-left-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-brand-green hover:bg-brand-gold hover:text-white transition-all">
            <ChevronLeft size={24} />
          </button>

          <div className="flex space-x-8 transition-transform duration-500 ease-in-out w-full max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
              >
                {(toppers.length > 1 
                  ? [toppers[currentIndex], toppers[(currentIndex + 1) % toppers.length]]
                  : [toppers[currentIndex]]
                ).filter(Boolean).map((topper, i) => (
                  <div key={`${topper.name}-${i}`} className={cn(
                    "group relative bg-white rounded-[1.5rem] overflow-hidden shadow-lg border border-brand-green/5 p-3 transition-all hover:scale-[1.02]",
                    i === 1 && "hidden md:block",
                    toppers.length === 1 && "mx-auto max-w-sm"
                  )}>
                    <div className="aspect-square rounded-[1rem] overflow-hidden relative">
                      <img 
                        src={topper.image || 'https://images.unsplash.com/photo-1523050853064-85a17f009c5d'} 
                        alt={topper.name} 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-serif font-bold">{topper.name}</h3>
                        <p className="text-[10px] opacity-80 uppercase tracking-widest">{topper.nickname || topper.title}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center px-1">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold">Board Score ({topper.year})</span>
                        <span className="text-xl font-serif font-bold text-brand-green">{topper.percentage || topper.score}</span>
                        <span className="text-[9px] text-brand-green/60 uppercase font-bold">Class {topper.std}</span>
                      </div>
                      <div className={`w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center text-white shadow-md`}>
                        <Star size={16} fill="currentColor" />
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button onClick={next} className="absolute right-0 md:-right-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-brand-green hover:bg-brand-gold hover:text-white transition-all">
            <ChevronRight size={24} />
          </button>
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

  return (
    <section className="py-24 bg-brand-green text-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-brand-gold font-bold uppercase tracking-widest text-xs">Our Core Values</span>
          <h2 className="text-4xl font-serif mt-4">The SHARP Philosophy</h2>
        </div>

        <div className="space-y-12 max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.letter}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center space-x-12 group"
            >
              <div className="text-8xl font-serif font-bold text-brand-cream/10 group-hover:text-brand-gold/20 transition-colors duration-500 min-w-[120px]">
                {step.letter}
              </div>
              <div className="flex-1 relative">
                <div className="absolute -left-16 top-1/2 w-12 h-[1px] bg-brand-gold/30" />
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all">
                  <h3 className="text-xl font-serif text-brand-gold mb-2">{step.title}</h3>
                  <p className="text-sm text-brand-cream/60">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PetalsOfPurpose = () => {
  const petals = [
    { title: "A Fortress of Care", desc: "Zero compromise on your child's safety and well-being.", icon: Shield, color: "bg-blue-500/10 text-blue-500" },
    { title: "Cultivating the X Factor", desc: "Excellence and unique talents needed to thrive.", icon: Zap, color: "bg-yellow-500/10 text-yellow-500" },
    { title: "State-of-the-art Infrastructure", desc: "Modern facilities because your child deserves the best.", icon: Cpu, color: "bg-purple-500/10 text-purple-500" },
    { title: "Never A Dull Day", desc: "Diverse interests and niches created together.", icon: Palette, color: "bg-pink-500/10 text-pink-500" },
    { title: "From ABC to AI", desc: "Solid academic foundation with access to latest tech.", icon: Cpu, color: "bg-emerald-500/10 text-emerald-500" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-bold uppercase tracking-widest text-xs">Holistic Growth</span>
          <h2 className="text-4xl font-serif text-brand-green mt-4">5 Petals of Purpose</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {petals.map((petal, i) => (
            <motion.div
              key={petal.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-[2.5rem] bg-brand-cream/20 border border-brand-green/5 hover:bg-white hover:shadow-2xl hover:shadow-brand-green/10 transition-all duration-500"
            >
              <div className={`w-16 h-16 ${petal.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <petal.icon size={32} />
              </div>
              <h3 className="text-2xl font-serif text-brand-green mb-4">{petal.title}</h3>
              <p className="text-brand-green/60 leading-relaxed">{petal.desc}</p>
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-8 border border-brand-gold/30">
              <Star size={12} fill="currentColor" /> <span>Top Rated Girls' School in Mumbai</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-brand-cream leading-[1.05] mb-8">
              Where <span className="text-brand-gold italic">Faith</span> Meets <span className="underline decoration-brand-gold/50 underline-offset-8">Academic Excellence</span>
            </h1>
            <p className="text-lg text-brand-cream/80 mb-10 font-light leading-relaxed max-w-xl">
              Pioneers in teaching Quranic Arabic with word-for-word translation. 
              Providing a nurturing environment for girls to excel in SSC academics 
              and spiritual growth.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link to="/admissions" className="px-10 py-5 bg-brand-gold text-brand-green font-bold rounded-full hover:bg-brand-cream transition-all flex items-center group shadow-xl shadow-brand-gold/20">
                Apply for 2026-27 <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link to="/contact" className="px-10 py-5 border-2 border-brand-cream/30 text-brand-cream font-bold rounded-full hover:bg-brand-cream/10 transition-all">
                Enquire Now
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-serif text-brand-cream mb-6 text-center">Quick Inquiry</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  required
                  value={formData.parentName}
                  onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                  placeholder="Parent Name" 
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-brand-cream placeholder:text-brand-cream/40 focus:outline-none focus:border-brand-gold" 
                />
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Email Address" 
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-brand-cream placeholder:text-brand-cream/40 focus:outline-none focus:border-brand-gold" 
                />
                <input 
                  type="tel" 
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  placeholder="Phone Number" 
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-brand-cream placeholder:text-brand-cream/40 focus:outline-none focus:border-brand-gold" 
                />
                <select 
                  required
                  value={formData.branch}
                  onChange={(e) => setFormData({...formData, branch: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-brand-cream/60 focus:outline-none focus:border-brand-gold"
                >
                  <option value="">Select Branch</option>
                  <option value="mumbai">Mumbai Central</option>
                  <option value="bandra">Bandra West</option>
                  <option value="andheri">Andheri East</option>
                </select>
                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-brand-gold text-brand-green font-bold py-5 rounded-xl hover:bg-brand-cream transition-all uppercase tracking-widest text-sm flex items-center justify-center space-x-2"
                >
                  {status === 'loading' ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-green"></div>
                  ) : (
                    <>
                      <span>Enquire Now</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
                {status === 'success' && <p className="text-center text-emerald-400 text-xs font-bold uppercase tracking-widest">Inquiry Sent Successfully!</p>}
                {status === 'error' && <p className="text-center text-red-400 text-xs font-bold uppercase tracking-widest">Error Sending Inquiry.</p>}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: "Years of Excellence", value: "20+" },
    { label: "Students Enrolled", value: "1000+" },
    { label: "SSC Toppers", value: "100%" },
    { label: "Islamic Competitions", value: "50+" }
  ];

  return (
    <div className="bg-brand-cream py-12 border-b border-brand-green/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-serif font-bold text-brand-green mb-1">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Programs = () => {
  const [levels, setLevels] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadPrograms = async () => {
      const data = await fetchPrograms();
      if (data && data.length > 0) {
        setLevels(data);
      } else {
        setLevels([
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
        ]);
      }
      setLoading(false);
    };
    loadPrograms();
  }, []);

  if (loading) return (
    <div className="py-24 bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-gold"></div>
    </div>
  );

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-bold uppercase tracking-widest text-xs">Our Programs</span>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-green mt-4">A Nurturing Journey</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {levels.map((level, i) => (
            <motion.div 
              key={`program-${level.title}-${i}`}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] rounded-3xl overflow-hidden relative mb-6 shadow-lg">
                <img src={level.image} alt={level.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
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
      </div>
    </section>
  );
};

const Mission = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80" 
                alt="Students" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-gold rounded-2xl -z-10 hidden lg:block" />
          </div>
          
          <div className="space-y-8">
            <span className="text-brand-gold font-semibold uppercase tracking-widest text-sm">Our Mission</span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-green leading-tight">
              A Visionary Approach to <span className="italic">Islamic Education</span>
            </h2>
            <p className="text-brand-green/70 leading-relaxed italic text-lg">
              "يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنْفُسَكُمْ وَأَهْلِيكُمْ نَارًا"
            </p>
            <p className="text-brand-green/70 leading-relaxed">
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
  const [members, setMembers] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadManagement = async () => {
      const data = await fetchFaculty();
      if (data && data.length > 0) {
        // Filter members who have "Yes" in "show on homepage" (case-insensitive)
        const homeMembers = data.filter(m => 
          m.showOnHomepage?.toLowerCase() === 'yes' || 
          m['Show on Homepage']?.toLowerCase() === 'yes'
        );
        setMembers(homeMembers);
      } else {
        setMembers([
          { name: "Dr Shehnaz Shaikh", role: "Founder & Director", qualification: "MBBS, MD" },
          { name: "Shabana Latif Shaikh", role: "Principal", qualification: "B.A, B.Ed" },
          { name: "Kausar Mohsin Sayed", role: "Management", qualification: "B.Com, B.A.B.Ed" },
          { name: "Shehnaaz Kazi", role: "Management", qualification: "B.Com, B.A.B.Ed" }
        ]);
      }
      setLoading(false);
    };
    loadManagement();
  }, []);

  if (loading) return (
    <div className="py-24 bg-brand-cream/50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-gold"></div>
    </div>
  );

  if (members.length === 0) return null;

  return (
    <section className="py-24 bg-brand-cream/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-brand-green mb-4">Our Management</h2>
          <p className="text-brand-green/60 max-w-2xl mx-auto">Guided by experienced educators and visionaries dedicated to the school's mission.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((leader, i) => (
            <motion.div 
              key={`management-${leader.name}-${i}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-brand-green/5 text-center group hover:shadow-md transition-shadow"
            >
              <div className="w-24 h-24 bg-brand-green/5 rounded-full mx-auto mb-6 flex items-center justify-center text-brand-gold group-hover:bg-brand-green group-hover:text-brand-cream transition-colors overflow-hidden">
                {leader.image ? (
                  <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const reasons = [
    { title: "Safe Environment", desc: "A girls-only campus that provides a secure and comfortable space for learning and growth." },
    { title: "Islamic Integration", desc: "Seamlessly blending academic excellence with deep-rooted Islamic values and Quranic studies." },
    { title: "Expert Faculty", desc: "Dedicated educators who are experts in their fields and passionate about student success." },
    { title: "Holistic Development", desc: "Focusing on physical, intellectual, and spiritual growth through diverse activities." }
  ];

  return (
    <section className="py-24 bg-brand-green text-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-brand-gold font-bold uppercase tracking-widest text-xs">Why AL-MU'MINAH?</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-8">Why Parents Choose Us Over Other Schools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {reasons.map((reason, i) => (
                <div key={reason.title} className="space-y-3">
                  <div className="w-10 h-10 bg-brand-gold/20 rounded-lg flex items-center justify-center text-brand-gold">
                    <CheckCircle size={20} />
                  </div>
                  <h4 className="text-xl font-serif text-brand-gold">{reason.title}</h4>
                  <p className="text-brand-cream/60 text-sm leading-relaxed">{reason.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-8 border-white/10">
              <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80" alt="Students" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-gold rounded-full flex items-center justify-center text-brand-green font-serif text-2xl font-bold text-center p-4">
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
    <section className="py-24 bg-brand-cream/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-bold uppercase tracking-widest text-xs">Parent Reviews</span>
          <h2 className="text-4xl font-serif text-brand-green mt-4">What Our Parents Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={review.name} className="bg-white p-10 rounded-3xl shadow-sm border border-brand-green/5 italic">
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
    <div className="py-24 bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-gold"></div>
    </div>
  );

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-16">
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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <Stats />
      <TopperCarousel />
      <PhilosophySHARP />
      <PetalsOfPurpose />
      <Programs />
      <WhyChooseUs />
      <Mission />
      <Testimonials />
      <Management />
      <News />
    </motion.div>
  );
};
