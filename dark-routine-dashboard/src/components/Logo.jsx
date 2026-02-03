import { motion } from 'framer-motion';

import { useTheme } from './ThemeProvider';

export function Logo() {
  const { theme } = useTheme();

  return (
    <motion.div 
      className="flex items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Minimal Bat Icon */}
      <motion.div 
        className="relative w-12 h-12"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <img 
          src="/bat-logo.png" 
          alt="Bat Logo" 
          className={`w-full h-full object-contain transition-all duration-300 ${
            theme === 'dark' ? 'invert brightness-0 invert' : ''
          }`} 
          // Note: tailwind 'invert' equals filter: invert(100%).
          // If original image is black:
          // Light Mode (Black): No filter needed.
          // Dark Mode (White): 'invert' (black -> white).
          // We can use style={{ filter: theme === 'dark' ? 'invert(1)' : 'none' }} for explicit control.
          style={{ filter: theme === 'dark' ? 'invert(1)' : 'none' }}
        />
      </motion.div>

      {/* Logo Text */}
      <div className="flex flex-col">
        <div className="flex items-baseline">
          <span className="text-xl font-bold text-slate-300 tracking-tight">Dark</span>
          <span className="text-xl font-bold bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">Routine</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-[1px] w-3 bg-slate-600" />
          <span className="text-[8px] text-slate-500 tracking-[0.2em] uppercase font-medium">
            Gotham Edition
          </span>
          <div className="h-[1px] w-3 bg-slate-600" />
        </div>
      </div>
    </motion.div>
  );
}
