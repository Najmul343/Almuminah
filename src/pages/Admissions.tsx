import React from 'react';
import { motion } from 'motion/react';
import { FileText, CheckCircle, Info } from 'lucide-react';

export const Admissions = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-brand-gold font-semibold uppercase tracking-widest text-sm mb-4 block">Admissions</span>
        <h1 className="text-5xl md:text-6xl font-serif text-brand-green mb-12 leading-tight">
          Join Our <span className="italic">Learning Community</span>
        </h1>

        <div className="space-y-16">
          <section className="bg-brand-green text-brand-cream p-10 rounded-3xl">
            <div className="flex items-center space-x-4 mb-6">
              <Info className="text-brand-gold" size={32} />
              <h2 className="text-3xl font-serif">Admission Notice</h2>
            </div>
            <p className="text-lg font-light leading-relaxed mb-6">
              Admissions for the upcoming academic year are now open for selected grades. As an Islamic English Medium School for Girls, we prioritize students who align with our vision of excellence in both academic and spiritual growth.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-brand-gold text-brand-green font-bold rounded-lg hover:bg-brand-cream transition-colors">
                Download Inquiry Form
              </button>
              <button className="px-6 py-3 border border-brand-cream/30 text-brand-cream font-bold rounded-lg hover:bg-brand-cream/10 transition-colors">
                View Fee Structure
              </button>
            </div>
          </section>

          <section className="space-y-8">
            <h3 className="text-3xl font-serif text-brand-green">The Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Inquiry", desc: "Visit the school office or fill out the online inquiry form to express interest." },
                { step: "02", title: "Assessment", desc: "Students undergo a basic academic assessment to determine their current level." },
                { step: "03", title: "Interview", desc: "A brief interaction with the parents and student to understand alignment with school values." }
              ].map((item, i) => (
                <div key={item.title} className="space-y-4">
                  <span className="text-4xl font-serif text-brand-gold/30">{item.step}</span>
                  <h4 className="text-xl font-serif text-brand-green">{item.title}</h4>
                  <p className="text-brand-green/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-3xl font-serif text-brand-green">Required Documents</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Original Birth Certificate",
                "Previous School Leaving Certificate",
                "Recent Passport Size Photographs (3)",
                "Aadhar Card Copy of Student & Parents",
                "Previous Year's Report Card",
                "Address Proof"
              ].map((doc, i) => (
                <div key={doc} className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-brand-green/5 shadow-sm">
                  <CheckCircle className="text-brand-gold" size={18} />
                  <span className="text-brand-green/80 text-sm">{doc}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};
