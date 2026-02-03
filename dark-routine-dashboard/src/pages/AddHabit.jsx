import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useHabits } from '@/hooks/useHabits';

const suggestedEmojis = ['🧘', '💪', '📚', '✍️', '💧', '🚿', '🏃', '😴', '🥗', '📵', '🧠', '🎯'];
const weekdays = [
  { id: 0, short: 'S', full: 'Sunday' },
  { id: 1, short: 'M', full: 'Monday' },
  { id: 2, short: 'T', full: 'Tuesday' },
  { id: 3, short: 'W', full: 'Wednesday' },
  { id: 4, short: 'T', full: 'Thursday' },
  { id: 5, short: 'F', full: 'Friday' },
  { id: 6, short: 'S', full: 'Saturday' },
];

export default function AddHabit() {
  const navigate = useNavigate();
  const { routines, addHabit } = useHabits();
  
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('🎯');
  const [routineId, setRoutineId] = useState(routines[0]?.id || '');
  const [selectedDays, setSelectedDays] = useState([1, 2, 3, 4, 5]); // Mon-Fri default
  const [isRecurring, setIsRecurring] = useState(true);

  const toggleDay = (dayId) => {
    setSelectedDays(prev => 
      prev.includes(dayId) 
        ? prev.filter(d => d !== dayId) 
        : [...prev, dayId].sort()
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && routineId && selectedDays.length > 0) {
      addHabit(name.trim(), emoji, routineId, selectedDays, isRecurring);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-8 animate-fade-in relative overflow-hidden theme-transition">
      {/* AddHabit Background Effects */}
      <div className="bg-cinematic"></div>
      <div className="habit-pattern"></div>
      <div className="flying-bats"></div>
      <div className="gotham-skyline"></div>
      <div className="bg-orb w-[400px] h-[400px] top-[-10%] right-[20%]"></div>

      {/* Header */}
      <header className="flex items-center gap-4 mb-8 relative z-10">
        <Link to="/">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">New Habit</h1>
        </div>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 relative z-10">
        {/* Habit Name */}
        <Card className="matte-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-primary">Habit Name</CardTitle>
          </CardHeader>
          <CardContent>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Morning meditation"
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border
                         focus:border-primary focus:ring-2 focus:ring-primary/20 
                         outline-none transition-all duration-200
                         placeholder:text-muted-foreground/50 text-lg"
              autoFocus
            />
          </CardContent>
        </Card>

        {/* Icon Selection */}
        <Card className="matte-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-primary">Choose an Icon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {suggestedEmojis.map((e) => (
                <motion.button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center
                              transition-all duration-150 border
                              ${emoji === e 
                                ? 'bg-primary/20 border-primary ring-2 ring-primary/50' 
                                : 'bg-muted border-transparent hover:border-primary/30'
                              }`}
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.8, rotate: [0, -10, 10, 0] }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  {e}
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekday Selection */}
        <Card className="matte-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-primary">Schedule Days</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Select which days this habit should appear.</p>
            <div className="flex justify-between gap-2">
              {weekdays.map((day) => (
                <motion.button
                  key={day.id}
                  type="button"
                  onClick={() => toggleDay(day.id)}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-150 border
                              ${selectedDays.includes(day.id)
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-muted border-transparent text-muted-foreground hover:border-primary/30'
                              }`}
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.8, rotate: [0, -5, 5, 0] }}
                  animate={selectedDays.includes(day.id) ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  title={day.full}
                >
                  {day.short}
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recurring Toggle */}
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Continue for next week</p>
                <p className="text-sm text-muted-foreground">Automatically repeat this habit every week.</p>
              </div>
              <motion.button
                type="button"
                onClick={() => setIsRecurring(!isRecurring)}
                className={`w-14 h-8 rounded-full p-1 transition-colors duration-200
                            ${isRecurring ? 'bg-primary' : 'bg-muted'}`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
                  animate={{ x: isRecurring ? 22 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  {isRecurring && <Check className="w-4 h-4 text-primary" />}
                </motion.div>
              </motion.button>
            </div>
          </CardContent>
        </Card>

        {/* Routine Selection */}
        <Card className="matte-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-primary">Add to Routine</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {routines.filter(r => r.enabled).map((routine) => (
                <motion.button
                  key={routine.id}
                  type="button"
                  onClick={() => setRoutineId(routine.id)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium
                              transition-all duration-150 border
                              ${routineId === routine.id 
                                ? 'bg-primary text-primary-foreground border-primary' 
                                : 'bg-muted border-transparent hover:border-primary/30'
                              }`}
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.8, rotate: [0, -5, 5, 0] }}
                  animate={routineId === routine.id ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  {routine.name}
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={!name.trim() || !routineId || selectedDays.length === 0}
          className="w-full py-4 px-6 rounded-xl bg-primary text-primary-foreground
                     font-semibold text-lg flex items-center justify-center gap-2
                     hover:bg-primary/90 transition-all duration-150
                     disabled:opacity-50 disabled:cursor-not-allowed
                     shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.95, y: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <Sparkles className="w-5 h-5" />
          Create Habit
        </motion.button>
      </form>

      {/* Footer */}
        <footer className="text-center text-xs text-muted-foreground pt-8">
          <p className="text-muted-foreground/40 text-sm">made by</p>
          <p 
            className="watermark-gradient text-lg font-semibold tracking-wider mt-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Shubhranshu
          </p>
        </footer>
    </div>
  );
}
