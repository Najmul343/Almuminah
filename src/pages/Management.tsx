import React from 'react';
import { motion } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import { SEO } from '../components/SEO';
import { Skeleton, ErrorState, EmptyState } from '../components/Feedback';
import { Star, Quote, Target, Award, Users, GraduationCap } from 'lucide-react';
import { fetchTrustDetails, fetchFaculty } from '../services/googleSheets';

const Management = () => {
  const { data: trust, isLoading: isLoadingTrust } = useQuery({
    queryKey: ['trust-details'],
    queryFn: fetchTrustDetails,
  });

  const { data: faculty, isLoading: isLoadingFaculty, isError, refetch } = useQuery({
    queryKey: ['faculty'],
    queryFn: fetchFaculty,
  });

  if (isLoadingTrust || isLoadingFaculty) {
    return (
      <div className="bg-white">
        {/* Hero Skeleton */}
        <section className="py-24 bg-brand-green">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <Skeleton className="h-4 w-32 mx-auto mb-4 bg-white/10" />
            <Skeleton className="h-16 w-3/4 mx-auto mb-8 bg-white/10" />
            <Skeleton className="h-6 w-1/2 mx-auto bg-white/10" />
          </div>
        </section>
        
        {/* Content Skeletons */}
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-6">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-40 w-full" />
            </div>
            <Skeleton className="aspect-[4/5] w-full rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorState onRetry={() => refetch()} />
      </div>
    );
  }

  return (
    <div className="bg-white">
      <SEO 
        title="Our Management & Leadership | Meer Education Trust Surat"
        description="Meet the leadership of Al-Mu'minah School and Meer Education Trust. Guided by Maulana Arshad Ahmed Meer and Dr. Shehnaz Shaikh, we provide high-quality Islamic education."
        keywords="Maulana Arshad Ahmed Meer, Dr Shehnaz Shaikh, Meer Education Trust, board of directors surat schools, Islamic school management"
      />
      {/* Hero Section */}
      <section className="relative py-24 bg-brand-green overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-gold rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block"
          >
            Our Foundation
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif text-brand-cream mb-8"
          >
            MEER EDUCATION TRUST
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-brand-cream/70 max-w-3xl mx-auto text-lg leading-relaxed"
          >
            A legacy of excellence in education, nurturing the next generation of leaders under the visionary guidance of our trust.
          </motion.p>
        </div>
      </section>

      {/* Owner and Managing Trustee Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center space-x-3 text-brand-gold">
                <Award size={24} />
                <span className="font-bold uppercase tracking-widest text-sm">Owner & Managing Trustee</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-green leading-tight">
                Maulana Arshad Ahmed Meer
              </h2>
              <div className="text-brand-green/80 space-y-6 text-lg leading-relaxed">
                <p>
                  By the grace and mercy of Allah Tabarak wa Ta‘ala, and through the sincere duas of elders, Maulana was inspired by a noble vision: to establish an educational institution where modern, contemporary education could be imparted within a complete Islamic environment. Although many schools existed, Maulana observed that most were deprived of true Islamic values, leading to deep concern and reflection.
                </p>
                <p>
                  Guided by this vision, in 2004, Maulana first established Jamia Faiz-e-Subhani. Taking a step further, in 2007, he founded the first school, Muhammad Ahmed (M.A.) Meer School, integrating Islamic values with modern education. To further strengthen and organize this mission, the Meer Education Trust was established in 2009. Continuing this journey of service to the Ummah, Madni Islamic English Medium School was founded in 2014.
                </p>
                <p>
                  Founded in 2010, Al-Mu’minah English Medium School continues to progress steadily and is now also under the guidance of Maulana Arshad Ahmed Meer, functioning under the same trust. Through his leadership, Al-Mu’minah stands aligned with the broader vision of imparting modern education rooted firmly in Islamic values, discipline, and moral character. In 2016, Maulana was chosen as the President of Jamiat Ulama-I-Hind, Surat, the largest community involved in social work.
                </p>
                <p>
                  Today, all these institutions operate under the banner of the Meer Education Trust, providing quality education to more than 1,800 students in a nurturing Islamic atmosphere. Under Maulana’s guidance and vision, Al-Mu’minah School continues to grow with dedication, discipline, and excellence. Maulana’s heartfelt dua and aspiration is that, Insha Allah, these institutions continue to expand to the Secondary, Higher Secondary, College, and University levels, producing generations strong in both Imaan and knowledge.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative lg:sticky lg:top-24"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10">
                <img 
                  src={trust?.trusteephoto || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"} 
                  alt="Maulana Arshad Ahmed Meer" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-3xl font-serif mb-1">Maulana Arshad Ahmed Meer</h3>
                  <p className="text-brand-gold font-bold uppercase tracking-widest text-xs">Owner & Managing Trustee</p>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-gold/10 rounded-full -z-10 blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-green/10 rounded-full -z-10 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Principal Section */}
      <section className="py-24 bg-brand-green text-brand-cream overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative border-4 border-brand-gold/20">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80" 
                  alt="Bushra Meer" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green/90 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-3xl font-serif text-brand-gold mb-1">Bushra Meer</h3>
                  <p className="text-brand-cream/70 font-bold uppercase tracking-widest text-xs">Principal, Al-Mu'minah School</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 order-1 lg:order-2"
            >
              <div className="inline-flex items-center space-x-3 text-brand-gold">
                <GraduationCap size={24} />
                <span className="font-bold uppercase tracking-widest text-sm">Principal's Message</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-cream leading-tight">
                Bushra Meer <span className="text-2xl block text-brand-gold mt-2">(B.A, B.Ed)</span>
              </h2>
              <div className="text-brand-cream/80 space-y-6 text-lg leading-relaxed">
                <p>
                  As the Principal of Al-Mu'minah English Medium School, Bushra Meer brings years of academic expertise and a deep commitment to the holistic development of every student. Her leadership is defined by a passion for excellence and a firm belief in the power of value-based education.
                </p>
                <p>
                  She works tirelessly to ensure that the school's vision—integrating modern academic standards with Islamic principles—is reflected in every classroom. Under her guidance, the school has flourished as a space where discipline, creativity, and spiritual growth go hand in hand.
                </p>
                <div className="bg-white/5 p-8 rounded-2xl border-l-4 border-brand-gold backdrop-blur-sm">
                  <Quote size={32} className="text-brand-gold/30 mb-4" />
                  <p className="text-brand-cream italic font-serif text-xl">
                    "Education is not just about academic excellence; it is about nurturing the soul and building a character that reflects the beauty of our faith. At Al-Mu'minah, we strive to empower every student with knowledge that serves them in both worlds."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 bg-brand-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="aspect-square rounded-full overflow-hidden border-8 border-white shadow-2xl max-w-md mx-auto relative">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" 
                  alt="Dr. Shehnaz Shaikh" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-green/10" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 order-1 lg:order-2"
            >
              <div className="inline-flex items-center space-x-3 text-brand-gold">
                <Star size={24} />
                <span className="font-bold uppercase tracking-widest text-sm">Founder</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-green leading-tight">
                Dr. Shehnaz Shaikh <span className="text-2xl block text-brand-gold mt-2">(MBBS, MD)</span>
              </h2>
              <div className="text-brand-green/80 space-y-6 text-lg leading-relaxed">
                <p>
                  The founder of Al-Mu'minah Group of Schools is Dr. Shehnaz Shaikh (MBBS, MD), a dedicated educationist committed to establishing quality Islamic academic schools for girls.
                </p>
                <p>
                  She has compiled a word-for-word English translation of the Qur'an and is a pioneer in teaching this method to children, enabling them to understand the Qur'an deeply while developing strong academic and Islamic foundations.
                </p>
                <div className="bg-white p-8 rounded-2xl border-l-4 border-brand-gold shadow-sm">
                  <Quote size={32} className="text-brand-gold/30 mb-4" />
                  <p className="text-brand-green italic font-serif text-xl">
                    "We believe that every girl has the potential to be a beacon of light for her family and community. Our role is to provide the tools—both academic and spiritual—to help her shine."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-bold uppercase tracking-widest text-xs">Our Dedicated Team</span>
            <h2 className="text-4xl font-serif text-brand-green mt-4">Faculty Members</h2>
            <p className="text-brand-green/60 mt-4 max-w-2xl mx-auto">Our educators are the backbone of our institution, bringing expertise and passion to the classroom every day.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {(!faculty || faculty.length === 0) ? (
              <div className="col-span-full">
                <EmptyState title="No Faculty Found" message="We are currently updating our faculty list." />
              </div>
            ) : (
              faculty.map((member, i) => (
                <motion.div
                  key={member.name || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-green/5 hover:shadow-xl transition-all duration-500"
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img 
                      src={member.image || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"} 
                      alt={member.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-brand-green/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-6 text-center">
                    <h4 className="text-xl font-serif text-brand-green mb-1">{member.name}</h4>
                    <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-2">{member.qualification}</p>
                    <p className="text-brand-green/40 text-[10px] uppercase tracking-widest">{member.role || "Faculty Member"}</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Schools Under Trust */}
      <section className="py-24 bg-brand-green text-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Users size={48} className="text-brand-gold/30 mx-auto mb-6" />
            <h2 className="text-4xl font-serif mb-4">Institutions Under Our Trust</h2>
            <p className="text-brand-cream/60">Spreading the light of knowledge across multiple campuses.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "AL-MU'MINAH School", location: "Surat" },
              { name: "Madni School", location: "Surat" },
              { name: "M.A. Meer School", location: "Surat" }
            ].map((school, i) => (
              <div key={school.name} className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center hover:bg-white/10 transition-all group">
                <h4 className="text-2xl font-serif text-brand-gold mb-2 group-hover:scale-105 transition-transform">{school.name}</h4>
                <p className="text-brand-cream/40 uppercase tracking-widest text-xs">{school.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Management;
