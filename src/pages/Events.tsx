import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, ChevronRight, X, ChevronLeft, Volume2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { fetchAnnouncements, fetchEvents } from '../services/googleSheets';

export const Events = () => {
  const [announcements, setAnnouncements] = React.useState<any[]>([]);
  const [events, setEvents] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedEvent, setSelectedEvent] = React.useState<any | null>(null);

  React.useEffect(() => {
    const loadData = async () => {
      const [annData, eventData] = await Promise.all([
        fetchAnnouncements(),
        fetchEvents()
      ]);
      setAnnouncements(annData);
      setEvents(eventData);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-cream/30 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Announcements Section */}
        {announcements.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center space-x-3 mb-8">
              <Volume2 className="text-brand-gold" size={28} />
              <h2 className="text-3xl font-serif text-brand-green">Latest Announcements</h2>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {announcements.map((ann, i) => (
                <motion.div
                  key={`ann-${ann.title}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-brand-green text-brand-cream p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150" />
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-3xl font-serif text-brand-gold">{ann.title}</h3>
                      <span className="text-xs uppercase tracking-widest opacity-60 bg-white/10 px-4 py-1.5 rounded-full">{ann.date}</span>
                    </div>
                    <p className="text-brand-cream/80 text-lg leading-relaxed mb-8 max-w-4xl">{ann.content}</p>
                    <div className="flex items-center space-x-2 text-brand-gold/80 text-sm font-bold uppercase tracking-widest">
                      <User size={16} />
                      <span>From: {ann.author}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Events Section */}
        <section>
          <div className="flex items-center space-x-3 mb-12">
            <Calendar className="text-brand-gold" size={28} />
            <h2 className="text-4xl font-serif text-brand-green">School Events</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {events.map((event, i) => (
              <motion.div
                key={`event-${event.title}-${i}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedEvent(event)}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-brand-green/5 cursor-pointer group hover:border-brand-gold/30 hover:shadow-2xl transition-all duration-300"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={event.images?.split(',')[0] || 'https://images.unsplash.com/photo-1511629091441-ee46146481b6'} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-green/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 right-4 bg-brand-gold text-brand-green text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    {event.date}
                  </div>
                </div>
                <div className="p-10">
                  <h3 className="text-3xl font-serif text-brand-green mb-3 group-hover:text-brand-gold transition-colors">{event.title}</h3>
                  <p className="text-brand-gold text-sm font-bold uppercase tracking-widest mb-5">{event.subtitle}</p>
                  <p className="text-brand-green/60 text-base leading-relaxed line-clamp-3">{event.shortDesc}</p>
                  <div className="mt-8 flex items-center text-brand-green font-bold text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                    Read More <ChevronRight size={16} className="ml-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Event Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-brand-green/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[3rem] overflow-hidden shadow-2xl relative flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-brand-green text-white rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors"
              >
                <X size={24} />
              </button>

              {/* Image Slider Component */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-brand-green/5">
                <EventImageSlider images={(selectedEvent.images || '').split(',').filter(Boolean)} />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
                <div className="mb-8">
                  <span className="text-brand-gold font-bold uppercase tracking-widest text-xs">{selectedEvent.date}</span>
                  <h2 className="text-4xl font-serif text-brand-green mt-2">{selectedEvent.title}</h2>
                  <p className="text-brand-gold font-bold uppercase tracking-widest text-sm mt-1">{selectedEvent.subtitle}</p>
                </div>
                <div className="prose prose-brand-green max-w-none">
                  <p className="text-brand-green/80 leading-relaxed text-lg whitespace-pre-wrap">
                    {selectedEvent.fullDesc || selectedEvent.shortDesc}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const EventImageSlider = ({ images }: { images: string[] }) => {
  const [idx, setIdx] = React.useState(0);

  if (images.length <= 1) {
    return <img src={images[0]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />;
  }

  return (
    <div className="relative w-full h-full group">
      <AnimatePresence mode="wait">
        <motion.img
          key={idx}
          src={images[idx]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>
      
      <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => setIdx((prev) => (prev - 1 + images.length) % images.length)}
          className="w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/40"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={() => setIdx((prev) => (prev + 1) % images.length)}
          className="w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/40"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, i) => (
          <div 
            key={`dot-${i}`} 
            className={`w-2 h-2 rounded-full transition-all ${i === idx ? 'bg-brand-gold w-6' : 'bg-white/50'}`} 
          />
        ))}
      </div>
    </div>
  );
};
