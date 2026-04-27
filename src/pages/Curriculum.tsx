import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SEO } from '../components/SEO';
import { Book, Globe, Languages, Microscope, CheckCircle, GraduationCap, Star, BookOpen, PenTool, MousePointer2, X, Maximize2 } from 'lucide-react';
import { fetchBooks } from '../services/googleSheets';
import { cn } from '../lib/utils';

const SPINE_COLORS = [
  "#1a5c4a", "#8b5e1a", "#1a4a7a", "#3a1a6a", "#1a5a6a",
  "#6a3a1a", "#2a5a3a", "#5a3a2a", "#1a3a5a", "#4a2a4a"
];

interface BookCardProps {
  book: any;
  index: number;
  onEnlarge?: (book: any) => void;
}

// Image Preloader Utility
const preloadImage = (url: string) => {
  if (!url) return;
  const img = new Image();
  img.src = url;
};

const BookCard: React.FC<BookCardProps & { isStacked?: boolean; stackIndex?: number; isExpanded?: boolean }> = React.memo(({ book, index, isStacked, stackIndex = 0, isExpanded, onEnlarge }) => {
  const spineColor = SPINE_COLORS[index % SPINE_COLORS.length];
  
  // Professional Stack Physics: Slight rotation and offset for physical feel
  // Optimized for cleaner look with multiple books
  const stackRotate = (stackIndex * 2) - 2;
  const stackY = stackIndex * -3;
  const stackX = stackIndex * 1.5;

  const [isHovered, setIsHovered] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isStacked && !isExpanded) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setMousePos({ x, y });
  };

  React.useEffect(() => {
    setImageError(false);
  }, [book.image, book.url]);

  // Only render top 5 books in stack for performance and visual clarity
  if (isStacked && !isExpanded && stackIndex > 5) return null;

  return (
    <motion.div
      layoutId={`book-${book.title}-${book.std}-${index}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        zIndex: isHovered ? 100 : (isStacked && !isExpanded ? 50 - stackIndex : 10),
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 25,
        mass: 0.8
      }}
      className={cn(
        "relative flex-shrink-0 group will-change-transform",
        isStacked && !isExpanded && "absolute top-0 left-0"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={(e) => {
        if (!isStacked || isExpanded) {
          e.stopPropagation();
          onEnlarge?.(book);
        }
      }}
    >
      <motion.div
        animate={{
          rotate: isStacked && !isExpanded ? (isHovered ? stackRotate + 1 : stackRotate) : (isHovered ? 2 : 0),
          y: isHovered ? -30 : (isStacked && !isExpanded ? stackY : 0),
          x: isStacked && !isExpanded ? stackX : 0,
          scale: isHovered ? 1.05 : 1,
          rotateX: isHovered && !isStacked ? mousePos.y * -8 : 0,
          rotateY: isHovered && !isStacked ? mousePos.x * 10 : 0,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 30,
          restDelta: 0.001
        }}
        className="relative cursor-pointer perspective-1000"
      >
        {/* Book Shadow - Dynamic based on stack position */}
        <div className={cn(
          "absolute bottom-[-10px] left-[10%] w-[80%] h-[15px] rounded-[50%] bg-brand-green/30 blur-md opacity-20 transition-all duration-500 pointer-events-none",
          isHovered && "blur-xl opacity-40 bottom-[-20px]",
          isStacked && !isExpanded && stackIndex > 0 && "hidden" // Only bottom book has shadow in stack
        )} />

        {/* Book Body */}
        <div className={cn(
          "flex rounded-l-[4px] rounded-r-[10px] overflow-hidden relative shadow-md transition-shadow duration-500",
          isHovered ? "shadow-2xl" : "shadow-brand-green/10",
          isStacked && !isExpanded && "border border-white/10"
        )}>
          {/* Spine */}
          <div 
            className="w-3.5 shrink-0 flex items-center justify-center rounded-l-[4px] shadow-[inset_-2px_0_6px_rgba(0,0,0,0.3)]"
            style={{ background: `linear-gradient(180deg, ${spineColor} 0%, rgba(0,0,0,0.4) 100%)` }}
          >
            <span className="[writing-mode:vertical-rl] text-[5px] text-white/40 tracking-widest uppercase font-serif select-none">
              Al-Mu'minah
            </span>
          </div>

          {/* Cover */}
          <div className="relative overflow-hidden rounded-r-[10px] w-[180px] h-[250px] md:w-[220px] md:h-[310px] bg-brand-cream-dark shadow-inner">
            <img 
              key={book.image || book.url}
              src={imageError ? "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80" : (book.image || book.url)} 
              alt={isStacked && !isExpanded && stackIndex > 0 ? "" : book.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 [image-rendering:high-quality]"
              loading={isStacked && !isExpanded && stackIndex > 1 ? "lazy" : "eager"}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/20 group-hover:from-brand-gold/5 group-hover:to-black/10 transition-colors duration-500 pointer-events-none" />
            
            {/* Page Edges Effect (Stacked) */}
            {isStacked && !isExpanded && (
              <div className="absolute right-0 top-0 h-full w-1.5 bg-white/30 border-l border-black/10" />
            )}

            {/* Enlarge Icon on Hover */}
            {isHovered && !isStacked && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] pointer-events-none">
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.1, opacity: 1 }}
                  className="bg-brand-gold/90 p-3 rounded-full shadow-xl"
                >
                  <Maximize2 className="text-brand-green" size={24} />
                </motion.div>
              </div>
            )}
          </div>
        </div>

        {/* Floating Label (Visible on Hover or when Expanded) */}
        <AnimatePresence>
          {(isHovered || isExpanded) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -top-10 left-0 right-0 z-20 text-center pointer-events-none"
            >
              <span className="bg-brand-green text-brand-gold text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-lg border border-brand-gold/20 backdrop-blur-sm">
                {book.title}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
});

export const Curriculum = () => {
  const [books, setBooks] = React.useState<any[]>([]);

  const [activeClass, setActiveClass] = React.useState("All");

  const [expandedStack, setExpandedStack] = React.useState<string | null>(null);

  const [selectedBook, setSelectedBook] = React.useState<any | null>(null);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
        // Preload images for instant display
        data.forEach((book: any) => {
          preloadImage(book.image || book.url);
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, []);

  // Memoize sorted classes
  const classes = React.useMemo(() => {
    return ["All", ...Array.from(new Set(books.map(b => String(b.std || b.standard || "")))).filter(Boolean).sort((a: string, b: string) => {
      const numA = parseInt(a.replace(/[^0-9]/g, "")) || 0;
      const numB = parseInt(b.replace(/[^0-9]/g, "")) || 0;
      return numA - numB;
    })];
  }, [books]);

  // Memoize filtered books
  const filteredBooks = React.useMemo(() => {
    return activeClass === "All" 
      ? books 
      : books.filter(b => String(b.std || b.standard || "") === activeClass);
  }, [books, activeClass]);

  // Memoize grouped books
  const groupedBooks = React.useMemo(() => {
    return filteredBooks.reduce((acc: any, book) => {
      const std = String(book.std || book.standard || "Other");
      if (!acc[std]) acc[std] = [];
      acc[std].push(book);
      return acc;
    }, {});
  }, [filteredBooks]);

  const sortedGroups = React.useMemo(() => {
    return Object.keys(groupedBooks).sort((a, b) => {
      const numA = parseInt(a.replace(/[^0-9]/g, "")) || 0;
      const numB = parseInt(b.replace(/[^0-9]/g, "")) || 0;
      return numA - numB;
    });
  }, [groupedBooks]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-20 bg-brand-cream/20 overflow-hidden relative"
    >
      <SEO 
        title="Modern Islamic Curriculum | Arabic & English Medium School Surat"
        description="Explore the unique curriculum at Al-Mu'minah School. We integrate modern academic subjects (SSC) with Quranic Arabic, Tajweed, and Islamic Studies for girls in Surat."
        keywords="modern islamic school curriculum, Arabic language teaching Surat, Quranic Arabic for girls, English medium Islamic education, best school curriculum in Surat"
      />
      {/* HD Enlarged View Modal */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-brand-green/98 backdrop-blur-xl"
            onClick={() => setSelectedBook(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prominent Back Button */}
              <button 
                onClick={() => setSelectedBook(null)}
                className="absolute top-0 left-0 md:-top-12 md:left-0 flex items-center gap-2 text-brand-gold hover:text-white transition-all bg-brand-green/50 px-4 py-2 rounded-full border border-brand-gold/30 backdrop-blur-md z-50"
              >
                <X size={20} />
                <span className="text-xs uppercase tracking-widest font-bold">Back to Library</span>
              </button>
              
              <div className="bg-white p-3 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden max-h-[75vh] flex items-center justify-center relative group">
                <img 
                  src={selectedBook.image || selectedBook.url} 
                  alt={selectedBook.title}
                  className="max-w-full max-h-full object-contain [image-rendering:high-quality]"
                  referrerPolicy="no-referrer"
                />
                {/* Click image to close too */}
                <div 
                  className="absolute inset-0 cursor-zoom-out" 
                  onClick={() => setSelectedBook(null)}
                />
              </div>

              <div className="mt-8 text-center">
                <h3 className="text-3xl md:text-4xl font-serif text-brand-gold mb-3">{selectedBook.title}</h3>
                <div className="flex items-center justify-center gap-4">
                  <span className="h-px w-8 bg-brand-gold/30" />
                  <p className="text-white/80 font-serif uppercase tracking-[0.3em] text-sm font-bold">{selectedBook.std || selectedBook.standard}</p>
                  <span className="h-px w-8 bg-brand-gold/30" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Background Ornaments */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/islamic-art.png')] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

        {/* 3D Books Section */}
        <section className="mb-32">
          <div className="text-center mb-12">
            <div className="text-brand-gold font-serif text-lg mb-2">✦ المنهج الدراسي ✦</div>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-green mb-4">Our Bespoke Textbooks</h2>
            <p className="text-brand-green/60 max-w-2xl mx-auto">
              We provide custom-designed, engaging textbooks for each class level, supporting a complete Islamic and Academic journey.
            </p>
          </div>

          {/* Class Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {classes.map((cls) => (
              <button
                key={cls}
                onClick={() => {
                  setActiveClass(cls);
                  setExpandedStack(null);
                }}
                className={cn(
                  "px-6 py-2 rounded-xl text-sm font-serif font-bold tracking-wider uppercase transition-all duration-300 border",
                  activeClass === cls 
                    ? "bg-brand-gold text-brand-green border-brand-gold shadow-lg shadow-brand-gold/20" 
                    : "bg-white/50 text-brand-green/60 border-brand-green/10 hover:border-brand-gold hover:text-brand-green"
                )}
              >
                {cls}
                {cls !== "All" && (
                  <span className="ml-2 opacity-50 text-[10px]">
                    ({books.filter(b => (b.std || b.standard) === cls).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Books Grid */}
          <div className="min-h-[500px] flex flex-col items-center">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-12 h-12 border-4 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin" />
                <p className="text-brand-green/60 font-serif">Loading textbooks...</p>
              </div>
            ) : (
              <>
                <div className="mb-12 text-brand-green/60 text-sm font-serif">
                  Showing <span className="text-brand-gold font-bold text-lg">{filteredBooks.length}</span> textbooks in <span className="text-brand-gold font-bold text-lg">{sortedGroups.length}</span> bundles
                </div>
                
                <div className="w-full max-w-6xl mx-auto flex flex-wrap justify-center gap-x-12 gap-y-24 px-4 py-10">
                  <AnimatePresence mode="popLayout">
                    {sortedGroups.map((std) => {
                      const stackBooks = groupedBooks[std];
                      const isExpanded = expandedStack === std;
                      
                      return (
                        <motion.div 
                          key={std}
                          layout
                          initial={false}
                          className={cn(
                            "relative flex flex-col items-center",
                            isExpanded 
                              ? "w-full py-16 bg-brand-green/[0.02] rounded-[3rem] border border-brand-gold/10 shadow-sm" 
                              : "w-[180px] h-[250px] md:w-[220px] md:h-[310px] cursor-pointer"
                          )}
                          onClick={() => setExpandedStack(isExpanded ? null : std)}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                          {/* Stack Label (Only when collapsed) */}
                          {!isExpanded && (
                            <motion.div 
                              layoutId={`label-${std}`}
                              className="absolute -bottom-14 left-1/2 -translate-x-1/2 text-center w-full"
                            >
                              <div className="text-brand-green font-serif font-bold text-xl mb-1">{std}</div>
                              <div className="flex items-center justify-center gap-2">
                                <span className="h-px w-4 bg-brand-gold/30" />
                                <span className="text-brand-gold text-[10px] uppercase tracking-[0.2em] font-bold">
                                  {stackBooks.length} Books
                                </span>
                                <span className="h-px w-4 bg-brand-gold/30" />
                              </div>
                            </motion.div>
                          )}

                          {/* Expanded Header */}
                          {isExpanded && (
                            <motion.div 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="w-full text-center mb-12"
                            >
                              <h3 className="text-3xl font-serif text-brand-green mb-2">{std} Collection</h3>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedStack(null);
                                }}
                                className="inline-flex items-center gap-2 text-brand-gold text-[10px] uppercase tracking-widest font-bold hover:bg-brand-gold hover:text-brand-green px-4 py-2 rounded-full border border-brand-gold/30 transition-all"
                              >
                                ✕ Close Collection
                              </button>
                            </motion.div>
                          )}

                          <motion.div 
                            layout
                            className={cn(
                              "relative",
                              isExpanded ? "flex flex-wrap justify-center gap-8 md:gap-12 px-8" : "w-full h-full"
                            )}
                          >
                            {stackBooks.map((book: any, idx: number) => (
                              <BookCard 
                                key={`${book.title}-${idx}`} 
                                book={book} 
                                index={idx}
                                isStacked={!isExpanded}
                                stackIndex={idx}
                                isExpanded={isExpanded}
                                onEnlarge={setSelectedBook}
                              />
                            ))}
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                <div className="mt-24 flex items-center justify-center space-x-4 bg-brand-green/5 border border-brand-gold/20 px-10 py-5 rounded-full">
                  <MousePointer2 className="text-brand-gold animate-bounce" size={20} />
                  <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-green/70">
                    {expandedStack ? "Tap a book to see it in HD" : "Tap a bundle to explore the collection"}
                  </span>
                </div>
              </>
            )}
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
                  "Oxford Mathematics textbooks are used for Std. I and Std.V.",
                  "Oxford textbooks are used for Science, Geography, and History up to Std. V.",
                  "From Std. III onwards, History, Geography, and Quranic Arabic are introduced.",
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

