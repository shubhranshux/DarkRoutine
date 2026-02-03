import { motion } from 'framer-motion';

export function BatLoader({ message = "Loading..." }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="aurora-bg"></div>
      <div className="gotham-skyline"></div>
      
      <motion.div
        className="flex flex-col items-center gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Bat symbol loader */}
        <motion.div
          className="relative w-28 h-28"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-slate-600/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Animated arc */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <motion.circle
              cx="56"
              cy="56"
              r="50"
              fill="none"
              stroke="url(#loaderGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="314"
              animate={{ strokeDashoffset: [314, 0, 314] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#818CF8" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Bat symbol */}
          <svg viewBox="0 0 100 60" className="absolute inset-4 w-20 h-12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <defs>
              <linearGradient id="batLoaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#94A3B8" />
                <stop offset="100%" stopColor="#64748B" />
              </linearGradient>
            </defs>
            <motion.path
              d="M50 5C35 5 25 18 25 32c-15-10-25-5-25 5 0 12 20 20 50 20s50-8 50-20c0-10-10-15-25-5C75 18 65 5 50 5z"
              fill="url(#batLoaderGrad)"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>
        </motion.div>
        
        {/* Loading text */}
        <div className="text-center">
          <motion.p 
            className="text-lg font-medium text-gradient-metallic"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {message}
          </motion.p>
          
          {/* Loading dots */}
          <div className="flex justify-center gap-1.5 mt-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-sky-400/60"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 1, 0.4] 
                }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  delay: i * 0.2 
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Smaller inline loader for components
export function MiniLoader({ size = 24, className = "" }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className="relative"
        style={{ width: size, height: size }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-slate-700"
          />
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke="url(#miniGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="62.8"
            strokeDashoffset="45"
          />
          <defs>
            <linearGradient id="miniGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#818CF8" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}

// Skeleton loader for cards
export function SkeletonCard({ className = "" }) {
  return (
    <div className={`rounded-2xl bg-slate-800/30 border border-slate-700/30 p-6 ${className}`}>
      <div className="animate-pulse space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-700/50"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-24 rounded bg-slate-700/50"></div>
            <div className="h-3 w-16 rounded bg-slate-700/30"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-slate-700/30"></div>
          <div className="h-3 w-3/4 rounded bg-slate-700/30"></div>
        </div>
      </div>
    </div>
  );
}
