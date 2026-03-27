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
            <h1 className="text-5xl md:text-6xl font-serif text-brand-green mb-8 leading-tight">
              Get in <span className="italic">Touch</span>
            </h1>
            <p className="text-brand-green/70 mb-12 max-w-md">
              Have questions about admissions or our curriculum? We are here to help. Reach out to us through any of the channels below.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-serif text-brand-green mb-1">Our Location</h4>
                  <p className="text-brand-green/60 text-sm leading-relaxed">
                    {contactInfo?.address || (
                      <>
                        Surat, Gujarat – 395003
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-serif text-brand-green mb-1">Phone Numbers</h4>
                  <p className="text-brand-green/60 text-sm">
                    {contactInfo?.primaryphone || '+91-261-2345678'}
                  </p>
                  {contactInfo?.secondaryphone && (
                    <p className="text-brand-green/60 text-sm">{contactInfo.secondaryphone}</p>
                  )}
                  {!contactInfo && <p className="text-brand-green/60 text-sm">+91-9082805794</p>}
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-serif text-brand-green mb-1">Email Address</h4>
                  <p className="text-brand-green/60 text-sm">
                    {contactInfo?.email || 'almuminah_school@yahoo.com'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-serif text-brand-green mb-1">Office Hours</h4>
                  <p className="text-brand-green/60 text-sm">{contactInfo?.officehours || 'Monday – Friday: 9:00 AM – 4:00 PM'}</p>
                  {contactInfo?.saturdayhours && (
                    <p className="text-brand-green/60 text-sm">{contactInfo.saturdayhours}</p>
                  )}
                  {!contactInfo?.saturdayhours && !contactInfo?.officehours && (
                    <p className="text-brand-green/60 text-sm">Saturday: 9:00 AM – 1:00 PM</p>
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

          <div className="bg-white p-10 rounded-3xl shadow-xl border border-brand-green/5">
            <h3 className="text-2xl font-serif text-brand-green mb-8">Send us a Message</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-semibold text-brand-green/60">First Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full bg-brand-cream/50 border border-brand-green/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-semibold text-brand-green/60">Last Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full bg-brand-cream/50 border border-brand-green/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-semibold text-brand-green/60">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-brand-cream/50 border border-brand-green/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-semibold text-brand-green/60">Message</label>
                <textarea 
                  rows={4} 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-brand-cream/50 border border-brand-green/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors" 
                />
              </div>
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-brand-green text-brand-cream font-bold py-4 rounded-lg hover:bg-brand-gold transition-colors uppercase tracking-widest text-sm flex items-center justify-center space-x-2"
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
      </div>
    </motion.div>
  );
};
