import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const sizeClasses = {
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

const iconSizes = {
  sm: 12,
  md: 14,
  lg: 18,
};

export function AnimatedCheckbox({ checked, onChange, size = 'md' }) {
  return (
    <motion.button
      onClick={onChange}
      className={`
        ${sizeClasses[size]} 
        rounded-lg border-2 flex items-center justify-center
        transition-colors duration-200 relative overflow-hidden
        ${checked 
          ? 'bg-primary border-primary' 
          : 'bg-transparent border-muted-foreground/30 hover:border-primary/50'
        }
      `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence mode="wait">
        {checked && (
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 45 }}
            transition={{ 
              type: 'spring', 
              stiffness: 500, 
              damping: 25 
            }}
          >
            <Check 
              size={iconSizes[size]} 
              className="text-primary-foreground" 
              strokeWidth={3} 
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Ripple effect */}
      <AnimatePresence>
        {checked && (
          <motion.span
            className="absolute inset-0 bg-primary rounded-lg"
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}
