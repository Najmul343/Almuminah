import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import { SEO } from '../components/SEO';
import { Skeleton, ErrorState, EmptyState } from '../components/Feedback';
import { fetchBlogs } from '../services/googleSheets';
import { ArrowLeft, ArrowRight, Calendar, Quote, ChevronRight, BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

export const Blog = () => {
  const [selectedBlogId, setSelectedBlogId] = React.useState<string | null>(null);

  const { data: blogs, isLoading, isError, refetch } = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  });

  const selectedBlog = blogs?.find(b => b.id === selectedBlogId);

  // Scroll to top when view changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedBlogId]);

  if (isLoading) {
    return (
      <div className="py-24 bg-brand-cream/10 min-h-screen pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex flex-col md:flex-row gap-8 items-center bg-white p-6 rounded-3xl animate-pulse">
                <div className="w-full md:w-1/3 aspect-video bg-gray-200 rounded-2xl" />
                <div className="flex-1 space-y-4">
                  <div className="h-4 bg-gray-200 w-1/4 rounded" />
                  <div className="h-8 bg-gray-200 w-3/4 rounded" />
                  <div className="h-4 bg-gray-200 w-full rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) return <ErrorState message="Failed to load blogs" onRetry={refetch} />;
  if (!blogs || blogs.length === 0) return <EmptyState />;

  return (
    <div className="min-h-screen bg-brand-cream/10 pt-32 pb-24">
      <SEO 
        title={selectedBlog ? `${selectedBlog.title} | Al-Mu'minah School Blog` : "Islamic Educational Blog | Al-Mu'minah School Surat"}
        description={selectedBlog ? selectedBlog.shortDescription : "Read our latest blog posts on Islamic education, girls' academic progress, and parenting from Al-Mu'minah Group of Schools, Surat."}
        keywords={selectedBlog ? `${selectedBlog.title}, islamic blog surat, girls education blog` : "islamic education blog, surat school blog, girls school gujarat blog, al-muminah school articles"}
        schemaData={selectedBlog ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": selectedBlog.title,
          "description": selectedBlog.shortDescription,
          "articleBody": selectedBlog.content,
          "image": selectedBlog.mainImage,
          "author": { "@type": "Organization", "name": "Al-Mu'minah School" }
        } : {
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Al-Mu'minah School Educational Blog",
          "description": "Insights and articles from the top Islamic girls school in Surat."
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!selectedBlogId ? (
            <motion.div
              key="blog-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="text-center mb-16">
                <span className="text-brand-gold font-bold uppercase tracking-widest text-xs">Knowledge Base</span>
                <h1 className="text-5xl md:text-6xl font-serif text-brand-green mt-4 leading-tight">Educational Insights</h1>
                <p className="max-w-2xl mx-auto text-brand-green/60 mt-6 text-lg">
                  Empowering our community through articles on faith, academics, and nurturing the next generation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, idx) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-brand-green/5">
                      <img 
                        src={blog.mainImage} 
                        alt={blog.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80";
                        }}
                      />
                      <div className="absolute inset-0 bg-brand-green/10" />
                    </div>
                    <div className="p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center space-x-3 text-brand-gold mb-3">
                          <Calendar size={14} />
                          <span className="text-[10px] font-bold uppercase tracking-widest">{blog.date}</span>
                        </div>
                        <h2 className="text-2xl font-serif text-brand-green mb-3 group-hover:text-brand-gold transition-colors line-clamp-2">
                          {blog.title}
                        </h2>
                        {blog.subtitle && (
                          <p className="text-brand-gold/60 text-xs font-semibold uppercase tracking-wider mb-4">
                            {blog.subtitle}
                          </p>
                        )}
                        <p className="text-brand-green/60 text-sm leading-relaxed line-clamp-3 mb-6">
                          {blog.shortDescription}
                        </p>
                      </div>
                      <button 
                        onClick={() => setSelectedBlogId(blog.id)}
                        className="w-full py-4 rounded-xl border border-brand-green/10 text-brand-green font-bold text-sm uppercase tracking-widest hover:bg-brand-green hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 bg-brand-cream/5"
                      >
                        <span>Read Fully</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Added internal links for SEO and CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-20 p-10 md:p-16 bg-brand-green rounded-[3rem] text-white relative overflow-hidden group shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-gold/10 rounded-full -ml-24 -mb-24 transition-transform duration-700 group-hover:scale-125" />
                
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
                  <div className="max-w-xl">
                    <span className="text-brand-gold font-bold uppercase tracking-[0.2em] text-[10px] mb-4 block">Admission Open 2026-27</span>
                    <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">Start Your Daughter's Journey at Al-Mu'minah</h2>
                    <p className="text-brand-cream/70 text-lg">Join the leading Islamic English medium school in Surat today.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
                    <Link 
                      to="/admissions" 
                      className="px-10 py-5 bg-white text-brand-green rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-brand-gold hover:text-white transition-all shadow-xl flex items-center justify-center whitespace-nowrap"
                    >
                      Apply for Admission
                    </Link>
                    <Link 
                      to="/contact" 
                      className="px-10 py-5 border-2 border-white/20 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center justify-center whitespace-nowrap"
                    >
                      Contact Our School in Surat
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="blog-detail"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-4xl mx-auto"
            >
              <button 
                onClick={() => setSelectedBlogId(null)}
                className="flex items-center space-x-2 text-brand-green/60 hover:text-brand-gold transition-colors mb-12 group"
              >
                <div className="bg-brand-green/5 p-2 rounded-full group-hover:bg-brand-gold/10 transition-colors">
                  <ArrowLeft size={18} />
                </div>
                <span className="font-bold uppercase tracking-widest text-xs">Back to Articles</span>
              </button>

              <div className="space-y-12">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-4 text-brand-gold mb-6">
                    <span className="h-px w-8 bg-brand-gold/30" />
                    <span className="text-xs font-bold uppercase tracking-widest tracking-[0.3em]">{selectedBlog.date}</span>
                    <span className="h-px w-8 bg-brand-gold/30" />
                  </div>
                  <h1 className="text-5xl md:text-6xl font-serif text-brand-green leading-tight mb-6">
                    {selectedBlog.title}
                  </h1>
                  {selectedBlog.subtitle && (
                    <p className="text-xl md:text-2xl text-brand-gold italic font-serif opacity-80">
                      {selectedBlog.subtitle}
                    </p>
                  )}
                </div>

                <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl relative bg-brand-green/5">
                  <img 
                    src={selectedBlog.mainImage} 
                    alt={selectedBlog.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-brand-green/10" />
                </div>

                {selectedBlog.quote && (
                  <div className="bg-white p-12 rounded-[2.5rem] border-l-8 border-brand-gold shadow-xl flex items-start space-x-6">
                    <Quote size={48} className="text-brand-gold/20 shrink-0" />
                    <p className="text-2xl font-serif text-brand-green italic leading-relaxed">
                      "{selectedBlog.quote}"
                    </p>
                  </div>
                )}

                <div className="prose prose-brand max-w-none">
                  <div 
                    className="text-brand-green/80 text-xl leading-[1.8] space-y-8 blog-content-area transition-all"
                    dir="auto"
                    dangerouslySetInnerHTML={{ __html: selectedBlog.content.replace(/\n/g, '<br />') }}
                  />
                </div>

                {selectedBlog.images.length > 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                    {selectedBlog.images.slice(1).map((img, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="aspect-square rounded-[2rem] overflow-hidden shadow-lg"
                      >
                        <img src={img} alt={`${selectedBlog.title} gallery ${i}`} className="w-full h-full object-cover" loading="lazy" />
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Internal Links for SEO/CTA in Detail View */}
                <div className="mt-24 p-12 bg-white rounded-[3rem] border border-brand-green/5 shadow-xl relative overflow-hidden group">
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-gold/5 rounded-full group-hover:scale-110 transition-transform duration-700" />
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                      <h3 className="text-2xl md:text-3xl font-serif text-brand-green mb-3 italic">Inspired by this reading?</h3>
                      <p className="text-brand-green/60 text-base">Al-Mu'minah School is more than just academic excellence.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                      <Link 
                        to="/admissions" 
                        className="px-10 py-5 bg-brand-green text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-brand-gold transition-all shadow-lg flex items-center justify-center whitespace-nowrap"
                      >
                        Apply for Admission
                      </Link>
                      <Link 
                        to="/contact" 
                        className="px-10 py-5 border border-brand-green/20 text-brand-green rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-brand-cream/50 transition-all flex items-center justify-center whitespace-nowrap"
                      >
                        Contact Our School in Surat
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="pt-20 border-t border-brand-green/10 flex flex-col items-center">
                  <button 
                    onClick={() => setSelectedBlogId(null)}
                    className="px-12 py-5 rounded-full bg-brand-green text-white font-bold uppercase tracking-widest text-xs hover:bg-brand-gold transition-all duration-300 shadow-xl"
                  >
                    Return to Knowledge Base
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
