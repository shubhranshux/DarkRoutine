import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedCheckbox } from '@/components/ui/AnimatedCheckbox';
import { Trash2, Flame, Sparkles, Shield, Zap } from 'lucide-react';
import { useState } from 'react';

export function HabitCard({ habit, isCompleted, streak, onToggle, onDelete }) {
  const [showDelete, setShowDelete] = useState(false);
  const hasStreak = streak > 0;
  const isHotStreak = streak >= 7;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: -100 }}
      whileHover={{ scale: 1.01 }}
      onHoverStart={() => setShowDelete(true)}
      onHoverEnd={() => setShowDelete(false)}
      className={`
        group relative flex items-center gap-4 p-4 sm:p-5 rounded-2xl border backdrop-blur-sm
        transition-all duration-300 overflow-hidden
        ${isCompleted 
          ? 'bg-gradient-to-r from-emerald-500/10 via-cyan-500/5 to-transparent border-emerald-500/30 shadow-lg shadow-emerald-500/10' 
          : 'bg-slate-900/50 border-slate-700/40 hover:border-sky-500/30 hover:bg-slate-900/70'
        }
      `}
    >
      {/* Top metallic edge */}
      <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-slate-500/20 to-transparent" />
      
      {/* Shimmer effect on completion */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/15 to-transparent pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Checkbox */}
      <AnimatedCheckbox 
        checked={isCompleted} 
        onChange={onToggle}
        className="shrink-0"
      />

      {/* Habit Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl">{habit.emoji}</span>
          <span className={`font-medium text-sm sm:text-base truncate transition-all duration-300
            ${isCompleted ? 'text-emerald-300' : 'text-slate-200'}
          `}>
            {habit.name}
          </span>
          
          {/* Vigilante badge for hot streaks */}
          {isHotStreak && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500/15 to-red-500/10 border border-orange-500/30"
            >
              <Zap className="w-3 h-3 text-orange-400" />
              <span className="text-[10px] font-bold text-orange-400">VIGILANT</span>
            </motion.div>
          )}
        </div>
        
        {/* Streak indicator */}
        {hasStreak && (
          <motion.div 
            className="flex items-center gap-2 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-center gap-1">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-semibold text-orange-400">{streak} night streak</span>
            </div>
            
            {/* Streak dots */}
            <div className="flex gap-0.5">
              {[...Array(Math.min(streak, 7))].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`w-1.5 h-1.5 rounded-full ${
                    i < 3 ? 'bg-sky-400' : i < 5 ? 'bg-cyan-400' : 'bg-emerald-400'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Completion shield */}
      {isCompleted && (
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Shield className="w-5 h-5 text-emerald-400" />
        </motion.div>
      )}

      {/* Delete button */}
      <AnimatePresence>
        {showDelete && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 10 }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 
                       text-red-400 hover:bg-red-500/20 hover:border-red-500/50 
                       transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Left accent line */}
      <motion.div 
        className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-full
          ${isCompleted ? 'bg-gradient-to-b from-emerald-400 to-cyan-500' : 'bg-gradient-to-b from-sky-500/50 to-transparent'}
        `}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
