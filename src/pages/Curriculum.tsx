import React from 'react';
import { motion } from 'motion/react';
import { Book, Globe, Languages, Microscope, CheckCircle, GraduationCap, Star, BookOpen, PenTool } from 'lucide-react';

export const Curriculum = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-20 bg-brand-cream/20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-semibold uppercase tracking-widest text-sm mb-4 block">Our Curriculum</span>
          <h1 className="text-5xl md:text-7xl font-serif text-brand-green mb-6 leading-tight">
            A Journey of <span className="italic">Knowledge & Faith</span>
          </h1>
          <p className="text-xl text-brand-green/70 max-w-2xl mx-auto font-serif italic">
            Medium of Instruction: English
          </p>
        </div>

        {/* Interactive Progression */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line for Desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-brand-gold/20 -z-10" />
            
            {[
              {
                stage: "Pre-Primary",
                desc: "ICSE-based textbooks build a strong foundation in English and grammar.",
                delay: 0.1
              },
              {
                stage: "From Std. I & II",
                desc: "Students are taught Gujarati, Computer, and Karate, along with Mathematics and Science.",
                delay: 0.2
              },
              {
                stage: "From Std. III onwards",
                desc: "The curriculum expands to include History, Geography, and Hindi, Qur’anic Arabic",
                delay: 0.3
              }
            ].map((item, i) => (
              <motion.div
                key={item.stage}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-brand-green/5 text-center relative group hover:shadow-xl transition-all duration-500"
              >
                <div className="w-12 h-12 bg-brand-gold text-brand-green rounded-full flex items-center justify-center mx-auto mb-6 font-serif text-xl font-bold group-hover:scale-110 transition-transform">
                  {i + 1}
                </div>
                <h3 className="text-2xl font-serif text-brand-green mb-4">{item.stage}</h3>
                <p className="text-brand-green/70 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Academic Curriculum */}
          <motion.section 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-brand-green text-brand-cream rounded-2xl">
                <BookOpen size={28} />
              </div>
              <h2 className="text-4xl font-serif text-brand-green">Academic Curriculum</h2>
            </div>
            
            <div className="space-y-6 text-brand-green/80 leading-relaxed">
              <p className="text-lg font-medium text-brand-green">
                We provide a strong academic foundation with English as the medium of instruction.
              </p>
              
              <div className="grid grid-cols-1 gap-4">
                {[
                  "ICSE-based textbooks are used in Pre-Primary classes to build a strong foundation in English communication and grammar.",
                  "From Std. I onwards, students are taught Gujarati, Computer, and Karate along with English, Arabic, Mathematics, and Science.",
                  "Oxford Mathematics textbooks are used for Std. I and Std. II.",
                  "Oxford textbooks are used for Science, Geography, and History up to Std. V.",
                  "From Std. III onwards, History, Geography, Hindi, and Quranic Arabic are introduced.",
                  "NCERT textbooks are followed from Std. I to Std. VIII"
                ].map((text, i) => (
                  <div key={i} className="flex items-start space-x-3 p-4 bg-white rounded-2xl border border-brand-green/5">
                    <CheckCircle className="text-brand-gold mt-1 shrink-0" size={18} />
                    <span className="text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Islamic Curriculum */}
          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-brand-gold text-brand-green rounded-2xl">
                <Star size={28} />
              </div>
              <h2 className="text-4xl font-serif text-brand-green">Islamic Curriculum</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: "☪", text: "Memorization of Surahs from the 30th Para and daily Duas with English meanings from Nursery." },
                { icon: "®", text: "Teaching of Arabic letters (Alif to Ya) with correct pronunciation from Nursery." },
                { icon: "📖", text: "Introduction to basic Arabic vocabulary from Nursery." },
                { icon: "✨", text: "Learning the Names of Allah (Asma-ul-Husna) with meanings from Nursery." },
                { icon: "📜", text: "Ahadeeth are taught from Senior KG." },
                { icon: "🕌", text: "Islamic Studies is formally taught from Std. I onwards." },
                { icon: "🌎", text: "Islamic Studies textbooks from the USA are used from Std. V onwards." }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-4 p-5 bg-brand-green text-brand-cream rounded-2xl shadow-sm hover:translate-x-2 transition-transform">
                  <span className="text-2xl text-brand-gold leading-none">{item.icon}</span>
                  <p className="text-sm font-light leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Arabic Language Pathway */}
        <section className="mt-24 bg-brand-green text-brand-cream p-12 rounded-[3rem] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-3 text-brand-gold mb-4">
                <Languages size={24} />
                <span className="font-bold uppercase tracking-widest text-xs">Growth Pathway</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Mastering the Arabic Language</h2>
              <p className="text-brand-cream/60 italic">The Language of the Qur'an</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-12">
              {[
                {
                  level: "Nursery",
                  title: "Foundations",
                  desc: "Alphabet recognition, correct pronunciation, and foundational vocabulary.",
                  icon: <Star className="text-brand-gold" />
                },
                {
                  level: "Junior KG",
                  title: "Writing Skills",
                  desc: "Arabic writing begins, covering letters from Alif to Ya.",
                  icon: <PenTool className="text-brand-gold" />
                },
                {
                  level: "From Std. I",
                  title: "Advanced Tajweed",
                  desc: "Tajweed rules are systematically taught for correct Quranic recitation, and students advance to sentence writing.",
                  icon: <GraduationCap className="text-brand-gold" />
                }
              ].map((item, i) => (
                <motion.div
                  key={item.level}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
                >
                  <div className="w-24 h-24 shrink-0 bg-white/10 rounded-full flex flex-col items-center justify-center text-center border border-white/20">
                    <span className="text-xs font-bold uppercase tracking-tighter text-brand-gold">{item.level}</span>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                      {item.icon}
                      <h4 className="text-2xl font-serif text-brand-gold">{item.title}</h4>
                    </div>
                    <p className="text-brand-cream/70 text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

