import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export function AnimatedCheckbox({ checked, onChange, className = '' }) {
  return (
    <motion.button
      onClick={onChange}
      className={`relative w-7 h-7 rounded-lg border-2 transition-all duration-300
        ${checked 
          ? 'bg-gradient-to-br from-emerald-500 to-cyan-500 border-emerald-500/50' 
          : 'bg-slate-800/50 border-slate-600 hover:border-slate-500'
        }
        ${className}
      `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        initial={false}
        animate={checked ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Check className="w-4 h-4 text-white" strokeWidth={3} />
      </motion.div>
      
      {/* Glow effect when checked */}
      {checked && (
        <motion.div
          className="absolute inset-0 rounded-lg bg-emerald-500 blur-md opacity-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
        />
      )}
    </motion.button>
  );
}
