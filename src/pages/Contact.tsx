import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send, FileText } from 'lucide-react';
import { submitInquiry, fetchContactDetails, fetchGlobalSettings } from '../services/googleSheets';

export const Contact = () => {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // Map Contact Form fields to the keys expected by your script
      await submitInquiry({
        parentName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        mobile: 'N/A', 
        branch: 'Contact Form',
        message: formData.message 
      });
      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const mapAddress = contactInfo?.address || "Al-Mu'minah School, Surat, Gujarat 395003";
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <span className="text-brand-gold font-semibold uppercase tracking-widest text-sm mb-4 block">Contact Us</span>
            <h1 className="text-6xl md:text-8xl font-serif text-brand-green mb-8 leading-tight">
              Get in <span className="italic">Touch</span>
            </h1>
            <p className="text-brand-green/70 mb-12 max-w-md text-xl md:text-2xl leading-relaxed">
              Have questions about admissions or our curriculum? We are here to help. Reach out to us through any of the channels below.
            </p>

            <div className="space-y-12">
              <div className="flex items-start space-x-8">
                <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold shrink-0">
                  <MapPin size={32} />
                </div>
                <div>
                  <h4 className="text-2xl md:text-4xl font-serif text-brand-green mb-3">Our Location</h4>
                  <p className="text-brand-green/60 text-lg md:text-2xl leading-relaxed">
                    {contactInfo?.address || (
                      <>
                        Surat, Gujarat – 395003
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-8">
                <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold shrink-0">
                  <Phone size={32} />
                </div>
                <div>
                  <h4 className="text-2xl md:text-4xl font-serif text-brand-green mb-3">Phone Numbers</h4>
                  <p className="text-brand-green/60 text-lg md:text-2xl">
                    {contactInfo?.primaryphone || '+91-261-2345678'}
                  </p>
                  {contactInfo?.secondaryphone && (
                    <p className="text-brand-green/60 text-lg md:text-2xl">{contactInfo.secondaryphone}</p>
                  )}
                  {!contactInfo && <p className="text-brand-green/60 text-lg md:text-2xl">+91-9082805794</p>}
                </div>
              </div>

              <div className="flex items-start space-x-8">
                <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold shrink-0">
                  <Mail size={32} />
                </div>
                <div>
                  <h4 className="text-2xl md:text-4xl font-serif text-brand-green mb-3">Email Address</h4>
                  <p className="text-brand-green/60 text-lg md:text-2xl">
                    {contactInfo?.email || 'almuminah_school@yahoo.com'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-8">
                <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold shrink-0">
                  <Clock size={32} />
                </div>
                <div>
                  <h4 className="text-2xl md:text-4xl font-serif text-brand-green mb-3">Office Hours</h4>
                  <p className="text-brand-green/60 text-lg md:text-2xl">{contactInfo?.officehours || 'Monday – Friday: 9:00 AM – 4:00 PM'}</p>
                  {contactInfo?.saturdayhours && (
                    <p className="text-brand-green/60 text-lg md:text-2xl">{contactInfo.saturdayhours}</p>
                  )}
                  {!contactInfo?.saturdayhours && !contactInfo?.officehours && (
                    <p className="text-brand-green/60 text-lg md:text-2xl">Saturday: 9:00 AM – 1:00 PM</p>
                  )}
                </div>
              </div>

              {brochure && (
                <div className="pt-8">
                  <a 
                    href={brochure} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center px-8 py-4 bg-brand-gold text-brand-green font-bold rounded-xl hover:bg-brand-green hover:text-brand-cream transition-all shadow-lg shadow-brand-gold/20"
                  >
                    <FileText className="mr-3" size={24} /> Download School Brochure
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-12 rounded-3xl shadow-xl border border-brand-green/5">
            <h3 className="text-4xl font-serif text-brand-green mb-10">Send us a Message</h3>
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-base uppercase tracking-widest font-semibold text-brand-green/60">First Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full bg-brand-cream/50 border border-brand-green/10 rounded-xl px-6 py-4 focus:outline-none focus:border-brand-gold transition-colors text-xl" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-base uppercase tracking-widest font-semibold text-brand-green/60">Last Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full bg-brand-cream/50 border border-brand-green/10 rounded-xl px-6 py-4 focus:outline-none focus:border-brand-gold transition-colors text-xl" 
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-base uppercase tracking-widest font-semibold text-brand-green/60">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-brand-cream/50 border border-brand-green/10 rounded-xl px-6 py-4 focus:outline-none focus:border-brand-gold transition-colors text-xl" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-base uppercase tracking-widest font-semibold text-brand-green/60">Message</label>
                <textarea 
                  rows={5} 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-brand-cream/50 border border-brand-green/10 rounded-xl px-6 py-4 focus:outline-none focus:border-brand-gold transition-colors text-xl" 
                />
              </div>
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-brand-green text-brand-cream font-bold py-6 rounded-xl hover:bg-brand-gold transition-colors uppercase tracking-widest text-lg flex items-center justify-center space-x-3"
              >
                {status === 'loading' ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-cream"></div>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={18} />
                  </>
                )}
              </button>
              {status === 'success' && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-emerald-600 font-bold text-sm"
                >
                  Thank you! Your message has been sent successfully.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-red-600 font-bold text-sm"
                >
                  Sorry, there was an error sending your message. Please try again.
                </motion.p>
              )}
            </form>
          </div>
        </div>

        {/* Map Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl font-serif text-brand-green mb-2">Find Us on the Map</h3>
            <p className="text-brand-green/60">Visit our campus in Surat</p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white/10 h-[450px] relative">
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
