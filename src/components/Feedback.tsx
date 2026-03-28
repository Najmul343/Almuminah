import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, FileQuestion, RefreshCw } from 'lucide-react';

export const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-brand-green/10 rounded-lg ${className}`} />
);

export const EmptyState = ({ 
  title = "No data found", 
  message = "We couldn't find any information at the moment.",
  icon: Icon = FileQuestion
}: { 
  title?: string; 
  message?: string;
  icon?: any;
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-12 px-4 text-center"
  >
    <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mb-4">
      <Icon className="text-brand-gold" size={32} />
    </div>
    <h3 className="text-xl font-serif text-brand-green mb-2">{title}</h3>
    <p className="text-brand-green/60 max-w-xs mx-auto">{message}</p>
  </motion.div>
);

export const ErrorState = ({ 
  message = "Something went wrong while fetching data.",
  onRetry 
}: { 
  message?: string;
  onRetry?: () => void;
}) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center py-12 px-4 text-center bg-red-50 rounded-3xl border border-red-100"
  >
    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
      <AlertCircle className="text-red-600" size={32} />
    </div>
    <h3 className="text-xl font-serif text-red-900 mb-2">Oops! Fetching Failed</h3>
    <p className="text-red-700/70 max-w-xs mx-auto mb-6">{message}</p>
    {onRetry && (
      <button 
        onClick={onRetry}
        className="flex items-center space-x-2 bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
      >
        <RefreshCw size={18} />
        <span>Try Again</span>
      </button>
    )}
  </motion.div>
);
