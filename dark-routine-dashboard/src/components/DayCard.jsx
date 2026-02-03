import { motion } from 'framer-motion';
import { Check, Zap, Calendar } from 'lucide-react';

export function DayCard({ day, isSelected, onSelect, index }) {
  const isComplete = day.percentage === 100;
  const hasProgress = day.percentage > 0;
  const circumference = 2 * Math.PI * 28; // radius 28
  
  return (
    <motion.button
      onClick={onSelect}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`
        group relative flex flex-col items-center justify-center
        w-[120px] sm:w-[130px] h-[160px] sm:h-[180px]
        rounded-2xl border transition-all duration-300
        snap-center
        ${isSelected 
          ? 'bg-gradient-to-b from-sky-500/15 via-slate-900/80 to-slate-900/90 border-sky-400/50 shadow-xl shadow-sky-500/15' 
          : isComplete
            ? 'bg-gradient-to-b from-emerald-500/10 via-slate-900/80 to-slate-900/90 border-emerald-500/30'
            : 'bg-slate-900/70 border-slate-700/40 hover:border-slate-600/60 hover:bg-slate-800/60'
        }
        ${day.isToday && !isSelected ? 'ring-2 ring-sky-400/30 ring-offset-1 ring-offset-background' : ''}
      `}
    >
      {/* Top glow line */}
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent 
        ${isComplete ? 'via-emerald-400/50' : isSelected ? 'via-sky-400/50' : 'via-slate-600/30'} 
        to-transparent`} 
      />
      
      {/* Today badge */}
      {day.isToday && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-3 px-3 py-1 
                     bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full
                     text-[10px] font-bold text-slate-900 tracking-wider 
                     shadow-lg shadow-sky-500/40"
        >
          TONIGHT
        </motion.div>
      )}
      
      {/* Day name */}
      <span className={`text-xs font-semibold tracking-wider uppercase mb-1
        ${day.isToday ? 'mt-8 text-sky-400' : isSelected ? 'text-sky-300' : 'text-slate-500'}
      `}>
        {day.dayName}
      </span>
      
      {/* Date number */}
      <motion.span 
        className={`text-3xl font-bold mb-2
          ${isSelected ? 'text-white' : isComplete ? 'text-emerald-300' : 'text-slate-100'}
        `}
      >
        {day.dayNumber}
      </motion.span>
      
      {/* Progress Ring - Larger */}
      <div className="relative w-16 h-16 mb-2">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
          {/* Background ring */}
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-slate-700/40"
          />
          {/* Progress arc */}
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke={isComplete ? "url(#completeGrad)" : "url(#progressGrad)"}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - (circumference * day.percentage / 100) }}
            transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.05 + 0.2 }}
          />
          <defs>
            <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#818CF8" />
            </linearGradient>
            <linearGradient id="completeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center icon/text */}
        <div className="absolute inset-0 flex items-center justify-center">
          {isComplete ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.3 }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 
                         flex items-center justify-center shadow-lg shadow-emerald-500/30"
            >
              <Check className="w-5 h-5 text-white" strokeWidth={3} />
            </motion.div>
          ) : hasProgress ? (
            <span className={`text-lg font-bold ${isSelected ? 'text-sky-400' : 'text-slate-300'}`}>
              {day.percentage}%
            </span>
          ) : (
            <Calendar className="w-5 h-5 text-slate-600" />
          )}
        </div>
      </div>
      
      {/* Perfect day badge */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-1 px-2 py-0.5 rounded-full 
                     bg-gradient-to-r from-amber-500/20 to-orange-500/20 
                     border border-amber-400/30"
        >
          <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span className="text-[10px] font-bold text-amber-400 tracking-wide">PERFECT</span>
        </motion.div>
      )}
      
      {/* Bottom accent line */}
      <motion.div 
        className={`absolute bottom-0 left-0 right-0 h-1 
          ${isComplete 
            ? 'bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-500' 
            : 'bg-gradient-to-r from-sky-500 via-violet-500 to-sky-500'}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isSelected || isComplete ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.button>
  );
}
