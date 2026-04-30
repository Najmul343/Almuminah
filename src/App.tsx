import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './Layout';
import { AnimatePresence, motion } from 'motion/react';

// Code Splitting - Lazy Loading Pages
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Admissions = lazy(() => import('./pages/Admissions').then(m => ({ default: m.Admissions })));
const Curriculum = lazy(() => import('./pages/Curriculum').then(m => ({ default: m.Curriculum })));
const Gallery = lazy(() => import('./pages/Gallery').then(m => ({ default: m.Gallery })));
const Events = lazy(() => import('./pages/Events').then(m => ({ default: m.Events })));
const Management = lazy(() => import('./pages/Management'));
const Blog = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    },
  },
});

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-brand-cream/20">
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="rounded-full h-12 w-12 border-b-2 border-brand-gold"
    />
  </div>
);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/admissions" element={<Admissions />} />
                <Route path="/curriculum" element={<Curriculum />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/events" element={<Events />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/management" element={<Management />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<Blog />} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}
