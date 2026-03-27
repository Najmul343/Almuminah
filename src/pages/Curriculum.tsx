import React from 'react';
import { motion } from 'motion/react';
import { Book, Globe, Languages, Microscope, CheckCircle } from 'lucide-react';

export const Curriculum = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-brand-gold font-semibold uppercase tracking-widest text-sm mb-4 block">Curriculum</span>
        <h1 className="text-5xl md:text-6xl font-serif text-brand-green mb-12 leading-tight">
          A Balanced <span className="italic">Educational Path</span>
        </h1>

        <div className="space-y-16">
          <section className="space-y-6">
            <p className="text-xl text-brand-green/70 leading-relaxed">
              Our curriculum is uniquely designed to provide a seamless integration of the Maharashtra State Board (SSC) academic requirements with a deep, meaningful Islamic education.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 bg-brand-green text-brand-cream rounded-3xl space-y-6">
              <div className="w-14 h-14 bg-brand-gold/20 rounded-2xl flex items-center justify-center text-brand-gold">
                <Languages size={32} />
              </div>
              <h3 className="text-3xl font-serif">Quranic Arabic</h3>
              <p className="font-light leading-relaxed">
                We are pioneers in teaching word-for-word English translation of the Qur’an. Our students don't just recite; they understand the message of Allah in its original language.
              </p>
              <ul className="space-y-2 text-sm text-brand-cream/70">
                <li>• Word-for-word translation</li>
                <li>• Basic Tajweed rules</li>
                <li>• Memorization of selected Surahs</li>
                <li>• Understanding Quranic vocabulary</li>
              </ul>
            </div>

            <div className="p-10 bg-white border border-brand-green/10 rounded-3xl space-y-6">
              <div className="w-14 h-14 bg-brand-green/5 rounded-2xl flex items-center justify-center text-brand-green">
                <Microscope size={32} />
              </div>
              <h3 className="text-3xl font-serif text-brand-green">Academic SSC</h3>
              <p className="text-brand-green/70 leading-relaxed">
                Following the Maharashtra State Board curriculum, we ensure our students are prepared for competitive academic environments with a strong foundation in core subjects.
              </p>
              <ul className="space-y-2 text-sm text-brand-green/60">
                <li>• English, Mathematics, Science</li>
                <li>• Social Studies & Environmental Science</li>
                <li>• Information Technology</li>
                <li>• Marathi & Hindi as secondary languages</li>
              </ul>
            </div>
          </div>

          <section className="space-y-8 py-12 border-t border-brand-green/10">
            <h3 className="text-3xl font-serif text-brand-green">Beyond the Classroom</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { icon: <Globe size={24} />, title: "Science Exhibitions", desc: "Participating in district and national level science fairs." },
                { icon: <Book size={24} />, title: "Islamic Competitions", desc: "Qira'at, Naat, and Islamic quiz competitions." },
                { icon: <CheckCircle size={24} />, title: "Student Council", desc: "Developing leadership skills through active participation." }
              ].map((item, i) => (
                <div key={item.title} className="space-y-3">
                  <div className="text-brand-gold">{item.icon}</div>
                  <h4 className="text-lg font-serif text-brand-green">{item.title}</h4>
                  <p className="text-brand-green/60 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};
