import React from 'react';
import { motion } from 'motion/react';
import { SEO } from '../components/SEO';
import { Phone, Mail, MapPin, Clock, FileText } from 'lucide-react';
import { fetchContactDetails, fetchGlobalSettings } from '../services/googleSheets';
import { cn } from '../lib/utils';

export const Contact = () => {
  const [contactInfo, setContactInfo] = React.useState<any>(null);

  const [brochure, setBrochure] = React.useState('');

  React.useEffect(() => {
    const loadData = async () => {
      const [contactData, settings] = await Promise.all([
        fetchContactDetails(),
        fetchGlobalSettings()
      ]);
      if (contactData) setContactInfo(contactData);
      if (settings?.brochure) setBrochure(settings.brochure);
    };
    loadData();
  }, []);

  const getMapUrl = () => {
    if (contactInfo?.mapLink) {
      const link = contactInfo.mapLink;
      if (link.includes('google.com/maps/embed')) return link;
      // Try to extract coordinates or place name if possible, otherwise use as query
      return `https://maps.google.com/maps?q=${encodeURIComponent(link)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    }
    const mapAddress = contactInfo?.addresses?.[0] || contactInfo?.address || "Al-Mu'minah School, Surat, Gujarat 395003";
    return `https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  const mapUrl = getMapUrl();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-20"
    >
      <SEO 
        title="Contact Us | School in Rampura Rander Udhna Surat | Al-Mu'minah School"
        description="Visit Al-Mu'minah Group of Schools in Surat. Located near Rampura, Katargam Darwaja, and Rander. Contact us for admissions in the best Islamic girls school in Gujarat."
        keywords="school in Rander Surat, school near Rampura Surat, English medium school in Udhna Surat, school near Katargam Darwaja, best school near me for girls Surat, Al-Mu'minah School contact"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <span className="text-brand-gold font-semibold uppercase tracking-widest text-sm mb-4 block text-center">Contact Us</span>
          <h1 className="text-6xl md:text-8xl font-serif text-brand-green mb-8 leading-tight">
            Get in <span className="italic">Touch</span>
          </h1>
          <p className="text-brand-green/70 mb-12 text-xl md:text-2xl leading-relaxed mx-auto max-w-2xl">
            Have questions about admissions or our curriculum? We are here to help. Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="space-y-16">
          {(contactInfo?.branches || []).map((branch: any, idx: number) => (
            <div 
              key={`branch-${idx}`} 
              className={cn(
                "bg-white rounded-[2.5rem] p-10 md:p-16 shadow-xl border relative overflow-hidden group hover:shadow-2xl transition-all duration-500",
                branch.name.toLowerCase().includes('pre') 
                  ? "border-brand-gold/20" 
                  : "border-brand-green/20"
              )}
            >
              {/* Distinctive Background Accents */}
              <div className={cn(
                "absolute top-0 right-0 w-80 h-80 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500",
                branch.name.toLowerCase().includes('pre') ? "bg-brand-gold" : "bg-brand-green"
              )} />
              
              <div className="relative z-10 text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className={cn(
                        "w-3 h-3 rounded-full animate-pulse",
                        branch.name.toLowerCase().includes('pre') ? "bg-brand-gold" : "bg-brand-green"
                      )} />
                      <span className="text-brand-gold font-semibold uppercase tracking-[0.2em] text-sm block">
                        Official Branch
                      </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-serif text-brand-green leading-tight">
                      {branch.name}
                    </h2>
                  </div>
                  <div className="h-0.5 md:h-24 w-24 md:w-0.5 bg-brand-gold/20" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                  {/* Address */}
                  <div className="flex flex-col space-y-4">
                    <div className="w-14 h-14 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform duration-500">
                      <MapPin size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-brand-green uppercase tracking-wider mb-2">Location</h4>
                      <p className="text-brand-green/70 text-lg leading-relaxed">
                        {branch.address}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col space-y-4">
                    <div className="w-14 h-14 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform duration-500">
                      <Phone size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-brand-green uppercase tracking-wider mb-2">Call Directly</h4>
                      <div className="space-y-3">
                        {branch.phone && (
                          <a 
                            href={`tel:${branch.phone.replace(/[^0-9+]/g, '')}`}
                            className="flex items-center gap-2 text-brand-green/70 text-lg hover:text-brand-gold transition-all font-medium group/link"
                          >
                            <span className="underline decoration-brand-gold/20 underline-offset-4 group-hover/link:decoration-brand-gold transition-all">{branch.phone}</span>
                            <span className="text-xs bg-brand-gold/10 px-2 py-0.5 rounded text-brand-gold uppercase">
                              {branch.name.toLowerCase().includes('pre') ? 'Pre-Primary' : 'Primary'}
                            </span>
                          </a>
                        )}
                        {branch.secondaryPhone && (
                          <a 
                            href={`tel:${branch.secondaryPhone.replace(/[^0-9+]/g, '')}`}
                            className="flex items-center gap-2 text-brand-green/70 text-lg hover:text-brand-gold transition-all font-medium group/link"
                          >
                            <span className="underline decoration-brand-gold/20 underline-offset-4 group-hover/link:decoration-brand-gold transition-all">{branch.secondaryPhone}</span>
                            <span className="text-xs bg-brand-gold/10 px-2 py-0.5 rounded text-brand-gold uppercase">Secondary</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col space-y-4">
                    <div className="w-14 h-14 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform duration-500">
                      <Mail size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-brand-green uppercase tracking-wider mb-2">Write to Us</h4>
                      <a 
                        href={`mailto:${branch.email}`}
                        className="block text-brand-green/70 text-lg hover:text-brand-gold transition-all font-medium break-all underline decoration-brand-gold/20 underline-offset-4"
                      >
                        {branch.email}
                      </a>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="flex flex-col space-y-4">
                    <div className="w-14 h-14 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform duration-500">
                      <Clock size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-brand-green uppercase tracking-wider mb-2">Office Hours</h4>
                      <div className="space-y-1">
                        {branch.officeHours.map((h: string, i: number) => (
                          <p key={i} className="text-brand-green/70 text-lg italic bg-brand-cream/30 px-2 py-1 rounded border-l-2 border-brand-gold/20">
                            {h}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {(!contactInfo || !contactInfo.branches || contactInfo.branches.length === 0) && (
            <div className="text-center py-20 text-brand-green/40 italic text-xl">
              Updating contact information...
            </div>
          )}
        </div>

        {brochure && (
          <div className="text-center mb-20">
            <a 
              href={brochure} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center px-10 py-5 bg-brand-gold text-brand-green font-bold rounded-2xl hover:bg-brand-green hover:text-brand-cream transition-all shadow-xl shadow-brand-gold/20 text-lg"
            >
              <FileText className="mr-3" size={28} /> Download School Brochure
            </a>
          </div>
        )}

        {/* Map Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-5xl font-serif text-brand-green mb-2">Find Us on the Map</h3>
            <p className="text-brand-green/60 text-lg">Visit our campus in Surat</p>
          </div>
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white/10 h-[500px] relative">
            <iframe 
              src={mapUrl} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Al-Mu'minah School Surat Location"
              className="grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
