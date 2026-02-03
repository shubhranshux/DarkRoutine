import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Sparkles } from 'lucide-react';

const suggestedEmojis = ['🧘', '💪', '📚', '✍️', '💧', '🚿', '🏃', '😴', '🥗', '📵', '🧠', '🎯'];

export function AddHabitModal({ isOpen, onClose, onAdd, routines }) {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('🎯');
  const [routineId, setRoutineId] = useState(routines[0]?.id || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && routineId) {
      onAdd(name.trim(), emoji, routineId);
      setName('');
      setEmoji('🎯');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50
                       w-full max-w-md max-h-[90vh] overflow-y-auto p-6 bg-card border border-border rounded-3xl shadow-lg"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">New Habit</h2>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-accent transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name input - Moved to Top */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Habit name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Morning meditation"
                  className="w-full px-4 py-3 rounded-xl bg-accent border border-border
                             focus:border-primary focus:ring-2 focus:ring-primary/20 
                             outline-none transition-all duration-200
                             placeholder:text-muted-foreground/50"
                  autoFocus
                />
              </div>

              {/* Emoji selector */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-3">
                  Choose an icon
                </label>
                <div className="flex flex-wrap gap-2">
                  {suggestedEmojis.map((e) => (
                    <motion.button
                      key={e}
                      type="button"
                      onClick={() => setEmoji(e)}
                      className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center
                                  transition-all duration-200 border
                                  ${emoji === e 
                                    ? 'bg-primary/20 border-primary shadow-glow' 
                                    : 'bg-accent border-transparent hover:border-primary/30'
                                  }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {e}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Routine selector */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Add to routine
                </label>
                <div className="flex flex-wrap gap-2">
                  {routines.filter(r => r.enabled).map((routine) => (
                    <motion.button
                      key={routine.id}
                      type="button"
                      onClick={() => setRoutineId(routine.id)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium
                                  transition-all duration-200 border
                                  ${routineId === routine.id 
                                    ? 'bg-primary text-primary-foreground border-primary' 
                                    : 'bg-accent border-transparent hover:border-primary/30'
                                  }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {routine.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={!name.trim() || !routineId}
                className="w-full py-3 px-4 rounded-xl bg-primary text-primary-foreground
                           font-semibold flex items-center justify-center gap-2
                           hover:shadow-glow transition-all duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-5 h-5" />
                Add Habit
              </motion.button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
