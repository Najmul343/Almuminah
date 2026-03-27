import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { fetchGalleryImages } from '../services/googleSheets';
import { Maximize2, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '../lib/utils';

export const Gallery = () => {
  const [images, setImages] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadImages = async () => {
      try {
        const data = await fetchGalleryImages();
        setImages(data || []);
      } catch (error) {
        console.error('Error in Gallery component:', error);
      } finally {
        setLoading(false);
      }
    };
    loadImages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-brand-cream/10">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
          <p className="text-brand-green/60 font-serif italic">Loading Gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-24 bg-brand-cream/20 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-brand-gold font-bold uppercase tracking-widest text-xs">Visual Journey</span>
          <h1 className="text-5xl md:text-6xl font-serif text-brand-green mt-4">Our School Gallery</h1>
          <div className="w-24 h-1 bg-brand-gold mx-auto mt-6 rounded-full opacity-30" />
          <p className="text-brand-green/60 mt-8 max-w-2xl mx-auto text-lg italic">
            Capturing the vibrant moments of learning, growth, and joy at AL-MU'MINAH GROUP OF SCHOOLS.
          </p>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm border border-brand-green/5">
            <ImageIcon className="mx-auto text-brand-gold/20 mb-4" size={64} />
            <p className="text-brand-green/40 font-serif text-xl">No images found in the gallery yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {images.map((img, i) => (
              <motion.div
                key={img.url || img.image || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative"
              >
                <div className="bg-white p-3 rounded-[2.5rem] shadow-xl shadow-brand-green/5 border border-brand-green/5 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-gold/10 hover:-translate-y-2">
                  <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative">
                    <img
                      src={img.url || img.image || 'https://images.unsplash.com/photo-1523050853064-85a17f009c5d'}
                      alt={img.caption || img.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1523050853064-85a17f009c5d';
                      }}
                    />
                    
                    {/* Overlay with Glassmorphism */}
                    <div className="absolute inset-0 bg-brand-green/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[3px]">
                      <button 
                        onClick={() => setSelectedImage(img.url || img.image)}
                        className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-white hover:text-brand-green transition-all duration-300 scale-75 group-hover:scale-100"
                      >
                        <Maximize2 size={24} />
                      </button>
                    </div>

                    {/* Badge */}
                    <div className="absolute top-6 right-6 px-4 py-1.5 bg-brand-gold/90 backdrop-blur-md rounded-full text-[10px] font-bold text-brand-green uppercase tracking-widest shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      View Photo
                    </div>
                  </div>
                  
                  <div className="mt-6 px-4 pb-4">
                    <h3 className="text-xl font-serif text-brand-green line-clamp-1 group-hover:text-brand-gold transition-colors">
                      {img.caption || img.title || 'School Activity'}
                    </h3>
                    {img.content && img.content !== img.caption && (
                      <p className="text-sm text-brand-green/60 mt-2 line-clamp-2 italic leading-relaxed">
                        {img.content}
                      </p>
                    )}
                    {img.date && (
                      <p className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold mt-3 opacity-60">
                        {img.date}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Enhanced Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-brand-green/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
              onClick={() => setSelectedImage(null)}
            >
              <button 
                className="absolute top-8 right-8 text-white/60 hover:text-white transition-all hover:rotate-90 duration-300 z-[110]"
                onClick={() => setSelectedImage(null)}
              >
                <X size={40} />
              </button>
              
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative max-w-6xl w-full h-full flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full flex-1 rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 bg-black/20 mb-6">
                  <img 
                    src={selectedImage} 
                    className="w-full h-full object-contain" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Lightbox Caption & Description */}
                {images.find(img => (img.url || img.image) === selectedImage) && (
                  <div className="text-center max-w-2xl px-4">
                    <h3 className="text-2xl font-serif text-brand-gold mb-2">
                      {images.find(img => (img.url || img.image) === selectedImage).caption || 'School Activity'}
                    </h3>
                    {images.find(img => (img.url || img.image) === selectedImage).content && 
                     images.find(img => (img.url || img.image) === selectedImage).content !== images.find(img => (img.url || img.image) === selectedImage).caption && (
                      <p className="text-white/70 text-lg italic font-light leading-relaxed">
                        {images.find(img => (img.url || img.image) === selectedImage).content}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
