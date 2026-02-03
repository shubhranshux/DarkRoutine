import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayCard } from './DayCard';

export function WeekView({ 
  selectedDate, 
  onSelectDate, 
  getCompletionStats,
  weekOffset,
  onWeekChange 
}) {
  const weekData = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentDay = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay + (weekOffset * 7));
    
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      
      const stats = getCompletionStats(date);
      
      days.push({
        date,
        dayName: dayNames[i],
        dayNumber: date.getDate(),
        isToday: date.toDateString() === today.toDateString(),
        completedCount: stats.completed,
        totalCount: stats.total,
        percentage: stats.percentage,
      });
    }
    
    return { days, startDate: startOfWeek };
  }, [getCompletionStats, weekOffset]);

  const formatWeekRange = () => {
    const start = weekData.days[0].date;
    const end = weekData.days[6].date;
    const options = { month: 'short', day: 'numeric' };
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
  };

  return (
    <div className="space-y-6">
      {/* Week navigation */}
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.button
          onClick={() => onWeekChange(weekOffset - 1)}
          className="p-2 rounded-xl bg-card border border-border hover:border-primary/30 
                     hover:bg-card-elevated transition-all duration-200"
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        
        <motion.div 
          key={weekOffset}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h3 className="text-lg font-semibold">{formatWeekRange()}</h3>
          <p className="text-sm text-muted-foreground">
            {weekOffset === 0 ? 'This Week' : weekOffset === -1 ? 'Last Week' : weekOffset === 1 ? 'Next Week' : ''}
          </p>
        </motion.div>
        
        <motion.button
          onClick={() => onWeekChange(weekOffset + 1)}
          className="p-2 rounded-xl bg-card border border-border hover:border-primary/30 
                     hover:bg-card-elevated transition-all duration-200"
          whileHover={{ scale: 1.05, x: 2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Day cards */}
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
        {weekData.days.map((day, index) => (
          <DayCard
            key={day.date.toISOString()}
            day={day}
            isSelected={day.date.toDateString() === selectedDate.toDateString()}
            onSelect={() => onSelectDate(day.date)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
