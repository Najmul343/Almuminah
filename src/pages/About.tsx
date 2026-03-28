import React from 'react';
import { motion } from 'motion/react';

export const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-brand-gold font-semibold uppercase tracking-widest text-base mb-4 block">About Us</span>
        <h1 className="text-6xl md:text-7xl font-serif text-brand-green mb-12 leading-tight">
          Pioneering <span className="italic">Islamic Excellence</span> Since Inception
        </h1>
        
        <div className="prose prose-xl prose-brand-green max-w-none space-y-16 text-brand-green/80 leading-relaxed">
          <section className="space-y-6">
            <h2 className="text-4xl font-serif text-brand-green">Our Ideology</h2>
            <div className="space-y-6 text-lg md:text-xl">
              <p>
                Al-Mu'minah School is an Islamic school, founded on the belief that worldly academic education alone is not sufficient for true and lasting success. For a believer, ultimate success lies in success in the Hereafter.
              </p>
              <p>
                Over the past century, a growing divide has emerged between religious education and modern academic education. In reality, both are equally vital and complementary, and together they form the foundation for the holistic development of an individual.
              </p>
              <p>
                At Al-Mu'minah School, we are committed to integrating Islamic (Deeni) education with modern academic learning, enabling our students to excel in both domains.
              </p>
              <p>
                Our aim is to nurture young girls of strong faith, upright character, and high academic calibre - confident, knowledgeable, and capable Muslims who are prepared to contribute positively to society while remaining firmly grounded in Islamic values.
              </p>
            </div>
          </section>

          <section className="bg-brand-cream/50 p-12 rounded-3xl border border-brand-gold/20">
            <h3 className="text-3xl font-serif text-brand-green mb-6">Our Vision</h3>
            <p className="text-xl md:text-2xl font-serif italic text-brand-green leading-relaxed">
              "To nurture students who grow into righteous, responsible, and compassionate human beings - guided by the Qur'an and Sunnah, inspired by the character of Prophet Muhammad (PBUH), and committed to justice, honesty, humility, and integrity."
            </p>
          </section>

          <section className="space-y-10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-4xl font-serif text-brand-green mb-4">The Pathway</h2>
              <p className="text-brand-green/60">How We Achieve Our Vision</p>
              <p className="mt-4">We build our educational model on two strong, interconnected pillars:</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-green/5 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold mb-6 font-bold text-xl">1</div>
                <h4 className="text-2xl font-serif text-brand-green mb-4">A Rigorous Academic Curriculum</h4>
                <p className="text-base text-brand-green/70 leading-relaxed">
                  Strong foundation with English as the medium, using proven resources from ICSE, Oxford, and NCERT.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-green/5 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold mb-6 font-bold text-xl">2</div>
                <h4 className="text-2xl font-serif text-brand-green mb-4">A Comprehensive Academic Islamic Curriculum</h4>
                <p className="text-base text-brand-green/70 leading-relaxed">
                  A deep early immersion in the Quran, Sunnah, Arabic language, and Islamic values.
                </p>
              </div>
            </div>
          </section>

          <div className="bg-brand-green text-brand-cream p-12 rounded-2xl mt-16">
            <h3 className="text-3xl font-serif mb-6 italic text-brand-gold">A Message from the Founder</h3>
            <p className="font-light italic leading-relaxed text-xl md:text-2xl">
              "We believe that every girl has the potential to be a beacon of light for her family and community. Our role is to provide the tools—both academic and spiritual—to help her shine."
            </p>
            <p className="mt-8 font-semibold text-lg">— Dr Shehnaz Shaikh, Founder & Director</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
