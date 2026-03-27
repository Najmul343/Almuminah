import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, Target, Award, Users } from 'lucide-react';
import { fetchTrustDetails, fetchFaculty } from '../services/googleSheets';

const Management = () => {
  const [trust, setTrust] = React.useState<any>(null);
  const [faculty, setFaculty] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadData = async () => {
      const [trustData, facultyData] = await Promise.all([
        fetchTrustDetails(),
        fetchFaculty()
      ]);
      setTrust(trustData);
      setFaculty(facultyData);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream/20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
      </div>
    );
  }

  return (
    <div className="bg-white">
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

      {/* Trust Details */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center space-x-3 text-brand-gold">
                <Award size={24} />
                <span className="font-bold uppercase tracking-widest text-sm">About the Trust</span>
              </div>
              <h2 className="text-4xl font-serif text-brand-green leading-tight">
                Empowering Communities Through <span className="italic">Quality Education</span>
              </h2>
              <div className="text-brand-green/70 space-y-6 leading-relaxed">
                <p>{trust?.abouttrust || "MEER EDUCATION TRUST is dedicated to providing holistic education that blends academic excellence with strong moral values. Under our umbrella, we run several prestigious institutions including AL-MU'MINAH School Surat, Madni School Surat, and M.A. Meer School."}</p>
                <div className="bg-brand-cream/30 p-8 rounded-2xl border-l-4 border-brand-gold">
                  <div className="flex items-center space-x-3 text-brand-gold mb-4">
                    <Target size={20} />
                    <span className="font-bold uppercase tracking-widest text-xs">Our Vision</span>
                  </div>
                  <p className="text-brand-green italic font-serif text-lg">
                    "{trust?.vision || "To create an educational ecosystem where every child can achieve their full potential while staying rooted in their cultural and spiritual identity."}"
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10">
                <img 
                  src={trust?.trusteephoto || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"} 
                  alt="Maulana Arshad Meer" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-3xl font-serif mb-1">{trust?.trusteename || "Maulana Arshad Meer"}</h3>
                  <p className="text-brand-gold font-bold uppercase tracking-widest text-xs">Trustee / Chairman</p>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-gold/10 rounded-full -z-10 blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-green/10 rounded-full -z-10 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trustee Message */}
      <section className="py-24 bg-brand-cream/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Quote size={48} className="text-brand-gold/30 mx-auto mb-8" />
          <h2 className="text-3xl font-serif text-brand-green mb-8">Chairman's Message</h2>
          <p className="text-xl text-brand-green/70 leading-relaxed italic font-serif">
            "{trust?.trusteemessage || "Education is the most powerful weapon which you can use to change the world. At MEER EDUCATION TRUST, we strive to provide our students with the tools they need to succeed not just in their careers, but in life as compassionate and responsible human beings."}"
          </p>
          <div className="mt-12">
            <div className="w-20 h-1 bg-brand-gold mx-auto mb-4" />
            <p className="font-bold text-brand-green uppercase tracking-widest">{trust?.trusteename || "Maulana Arshad Meer"}</p>
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
            {faculty.map((member, i) => (
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
            ))}
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
