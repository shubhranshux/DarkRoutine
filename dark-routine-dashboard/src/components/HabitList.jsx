import { motion, AnimatePresence } from 'framer-motion';
import { HabitCard } from './HabitCard';
import { useAppSounds } from '@/hooks/useAppSounds';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function HabitList({
  habits,
  routines,
  selectedDate,
  isCompleted,
  getStreak,
  onToggle,
  onDelete,
}) {
  const { playSound } = useAppSounds();
  const enabledRoutines = routines.filter(r => r.enabled);

  const handleToggle = (id) => {
    const wasCompleted = isCompleted(id, selectedDate);
    onToggle(id);
    
    if (!wasCompleted) {
      playSound('complete');
      
      // Check if this completes all habits for the day = Perfect Day!
      const totalHabits = habits.length;
      const completedCount = habits.filter(h => isCompleted(h.id, selectedDate)).length;
      // Note: completedCount will be updated in next render, so current + 1
      
      if (completedCount + 1 === totalHabits && totalHabits > 0) {
        setTimeout(() => {
          playSound('perfect');
          toast.success('Perfect Day Achieved!', {
            description: 'All missions completed. Excellent work, vigilante.',
            duration: 3000,
          });
        }, 500);
      }
    }
  };
  
  return (
    <div className="space-y-8">
      {enabledRoutines.map((routine, routineIndex) => {
        const routineHabits = habits.filter(h => h.routineId === routine.id);
        if (routineHabits.length === 0) return null;

        return (
          <motion.div
            key={routine.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: routineIndex * 0.1, duration: 0.4 }}
            className="space-y-4"
          >
            {/* Routine header */}
            <div className="flex items-center gap-3">
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: routine.color }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: routineIndex * 0.5 }}
              />
              <h3 className="text-lg font-semibold">{routine.name}</h3>
              <span className="text-sm text-muted-foreground">
                {routineHabits.filter(h => isCompleted(h.id, selectedDate)).length}/{routineHabits.length}
              </span>
            </div>

            {/* Habits grid */}
            <div className="grid gap-3">
              <AnimatePresence mode="popLayout">
                {routineHabits.map((habit, index) => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    isCompleted={isCompleted(habit.id, selectedDate)}
                    streak={getStreak(habit.id)}
                    onToggle={() => handleToggle(habit.id)}
                    onDelete={() => onDelete(habit.id)}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}

      {/* Empty state */}
      {habits.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            🎯
          </motion.div>
          <h3 className="text-xl font-semibold mb-2">No habits yet</h3>
          <p className="text-muted-foreground">
            Add your first habit to begin your journey
          </p>
        </motion.div>
      )}
    </div>
  );
}
