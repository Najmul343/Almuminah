import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SEO } from '../components/SEO';
import { fetchGalleryImages } from '../services/googleSheets';
import { Maximize2, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '../lib/utils';

export const Gallery = () => {
  const [images, setImages] = React.useState<any[]>([]);

  const [loading, setLoading] = React.useState(true);

  const [selectedGalleryItem, setSelectedGalleryItem] = React.useState<any | null>(null);
  const [zoomedImage, setZoomedImage] = React.useState<string | null>(null);

  const getImagesList = (item: any) => {
    if (!item) return [];
    // Prefer the explicit images field or fallback to url/image
    const raw = item.images || item.url || item.image || '';
    return raw.split(',').map((s: string) => s.trim()).filter(Boolean);
  };

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
      <SEO 
        title="School Gallery | Glimpses of Al-Mu'minah School Surat"
        description="Browse photos of Al-Mu'minah School, Surat. See our modern infrastructure, Islamic environment, sports events, and classroom activities for girls."
        keywords="school gallery Surat, Al-Mu'minah school photos, Islamic school campus Surat, girls school activities photos, best school infrastructure Surat"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-brand-gold font-bold uppercase tracking-widest text-xs">Visual Journey</span>
          <h1 className="text-5xl md:text-6xl font-serif text-brand-green mt-4">Our School Gallery</h1>
          <div className="w-24 h-1 bg-brand-gold mx-auto mt-6 rounded-full opacity-30" />
          <p className="text-brand-green/60 mt-8 max-w-2xl mx-auto text-lg italic">
            Capturing the vibrant moments of learning, growth, and joy at AL-MU'MINAH SCHOOL.
          </p>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm border border-brand-green/5">
            <ImageIcon className="mx-auto text-brand-gold/20 mb-4" size={64} />
            <p className="text-brand-green/40 font-serif text-xl">No images found in the gallery yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {images.map((img, i) => {
              const imgList = getImagesList(img);
              const hasMultiple = imgList.length > 1;
              return (
                <motion.div
                  key={img.url || img.image || i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative cursor-pointer"
                  onClick={() => setSelectedGalleryItem(img)}
                >
                  <div className="bg-white p-3 rounded-[2.5rem] shadow-xl shadow-brand-green/5 border border-brand-green/5 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-gold/10 hover:-translate-y-2">
                    <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative">
                      <img
                        src={imgList[0] || 'https://images.unsplash.com/photo-1523050853064-85a17f009c5d'}
                        alt={img.caption || img.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1523050853064-85a17f009c5d';
                        }}
                      />
                      
                      {/* Overlay with Glassmorphism */}
                      <div className="absolute inset-0 bg-brand-green/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[3px]">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedGalleryItem(img);
                          }}
                          className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-white hover:text-brand-green transition-all duration-300 scale-75 group-hover:scale-100"
                        >
                          <Maximize2 size={24} />
                        </button>
                      </div>

                      {/* Multiple Images Badge Indicator */}
                      {hasMultiple && (
                        <div className="absolute top-6 left-6 px-4 py-1.5 bg-brand-green/90 backdrop-blur-md rounded-full text-[10px] font-bold text-brand-gold uppercase tracking-widest shadow-lg">
                          {imgList.length} Photos
                        </div>
                      )}
  
                      {/* Badge */}
                      <div className="absolute top-6 right-6 px-4 py-1.5 bg-brand-gold/90 backdrop-blur-md rounded-full text-[10px] font-bold text-brand-green uppercase tracking-widest shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        {hasMultiple ? "View Gallery" : "View Photo"}
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
              );
            })}
          </div>
        )}

        {/* Gallery Item Modal (for multi-image grid or single image presentation) */}
        <AnimatePresence>
          {selectedGalleryItem && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-brand-green/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
              onClick={() => setSelectedGalleryItem(null)}
            >
              <button 
                className="absolute top-6 right-6 text-white/60 hover:text-white transition-all hover:rotate-90 duration-300 z-[110] bg-brand-green/80 p-2 rounded-full"
                onClick={() => setSelectedGalleryItem(null)}
              >
                <X size={32} />
              </button>
              
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className={cn(
                  "relative bg-white/5 border border-white/10 rounded-[3rem] p-6 md:p-10 w-full max-h-[85vh] flex flex-col items-center shadow-2xl",
                  getImagesList(selectedGalleryItem).length === 1 ? "max-w-4xl" : "max-w-5xl"
                )}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header info */}
                <div className="text-center mb-6 w-full px-4">
                  <h3 className="text-2xl md:text-3xl font-serif text-brand-gold mb-1">
                    {selectedGalleryItem.caption || selectedGalleryItem.title || 'School Activity'}
                  </h3>
                  {selectedGalleryItem.date && (
                    <span className="text-[10px] uppercase tracking-widest text-brand-gold/60 font-bold block mt-1">
                      {selectedGalleryItem.date}
                    </span>
                  )}
                  {selectedGalleryItem.content && 
                   selectedGalleryItem.content !== selectedGalleryItem.caption && (
                    <p className="text-white/70 text-sm md:text-base italic font-light mt-2 max-w-2xl mx-auto leading-relaxed">
                      {selectedGalleryItem.content}
                    </p>
                  )}
                </div>

                {/* If multiple images, show an elegant photo grid */}
                {getImagesList(selectedGalleryItem).length > 1 ? (
                  <div className="w-full overflow-y-auto flex-1 pr-2 custom-scrollbar">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-1">
                      {getImagesList(selectedGalleryItem).map((imageUrl, idx) => (
                        <div 
                          key={imageUrl + idx}
                          onClick={() => setZoomedImage(imageUrl)}
                          className="group/gridItem aspect-square rounded-[2rem] overflow-hidden relative cursor-pointer border border-white/5 shadow-lg bg-black/20 hover:border-brand-gold/40 transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <img 
                            src={imageUrl} 
                            alt={`${selectedGalleryItem.caption || 'Photo'} - ${idx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/gridItem:scale-105"
                            referrerPolicy="no-referrer"
                            crossOrigin="anonymous"
                          />
                          <div className="absolute inset-0 bg-brand-green/30 opacity-0 group-hover/gridItem:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-xs text-white border border-white/20 font-bold">Click to Zoom</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  // If single image, show beautiful full display
                  <div className="relative w-full flex-1 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-black/25">
                    <img 
                      src={getImagesList(selectedGalleryItem)[0] || 'https://images.unsplash.com/photo-1523050853064-85a17f009c5d'} 
                      className="w-full h-full object-contain cursor-zoom-in mx-auto" 
                      alt={selectedGalleryItem.caption}
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                      onClick={() => setZoomedImage(getImagesList(selectedGalleryItem)[0])}
                    />
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Zoom Lightbox for Single Image */}
        <AnimatePresence>
          {zoomedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[150] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
              onClick={() => setZoomedImage(null)}
            >
              <button 
                className="absolute top-6 right-6 text-white/60 hover:text-white transition-all hover:rotate-90 duration-300 z-[160]"
                onClick={() => setZoomedImage(null)}
              >
                <X size={40} />
              </button>
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-6xl w-full h-full max-h-[90vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={zoomedImage} 
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl" 
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  alt="Zoomed View"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
