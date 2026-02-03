import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { WeekView } from "@/components/WeekView";
import { HabitList } from "@/components/HabitList";
import { StatsCards } from "@/components/StatsCards";
import { AddHabitModal } from "@/components/AddHabitModal";
import { useHabits } from "@/hooks/useHabits";
import { Calendar, Zap, Shield, Target } from "lucide-react";

const pageVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const sectionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekOffset, setWeekOffset] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    habits,
    routines,
    completions,
    isLoaded,
    addHabit,
    deleteHabit,
    toggleCompletion,
    isCompleted,
    getCompletionStats,
    getStreak,
  } = useHabits();

  const todayStats = useMemo(
    () => getCompletionStats(new Date()),
    [getCompletionStats],
  );

  const weeklyAverage = useMemo(() => {
    let total = 0;
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      total += getCompletionStats(date).percentage;
    }
    return Math.round(total / 7);
  }, [getCompletionStats]);

  const bestStreak = useMemo(() => {
    return habits.reduce((max, habit) => Math.max(max, getStreak(habit.id)), 0);
  }, [habits, getStreak]);

  const totalCompleted = useMemo(() => {
    return completions.filter((c) => c.completed).length;
  }, [completions]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
        {/* Loading background */}
        <div className="aurora-bg"></div>
        <div className="gotham-skyline"></div>
        <div className="bat-signal"></div>
        
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Animated bat loader */}
          <motion.div
            className="relative w-24 h-24"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg viewBox="0 0 100 60" className="w-full h-full">
              <defs>
                <linearGradient id="batGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#94A3B8" />
                  <stop offset="100%" stopColor="#475569" />
                </linearGradient>
              </defs>
              <motion.path
                d="M50 0C35 0 25 15 25 30c-15-10-25-5-25 5 0 15 20 25 50 25s50-10 50-25c0-10-10-15-25-5C75 15 65 0 50 0z"
                fill="url(#batGradient)"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </svg>
          </motion.div>
          
          <motion.p 
            className="text-lg font-semibold text-gradient-metallic"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            Initializing Night Protocol...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden theme-transition">
      {/* Premium Gotham Background */}
      <div className="aurora-bg"></div>
      <div className="bg-cinematic"></div>
      
      {/* Floating particles */}
      <div className="particle-bg">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>
      
      {/* Gotham elements */}
      <div className="bat-signal"></div>
      <div className="flying-bats"></div>
      <div className="gotham-skyline"></div>
      <div className="gotham-moon"></div>
      <div className="gear-pattern"></div>

      {/* Gradient orbs */}
      <div className="bg-orb w-[600px] h-[600px] top-[-200px] left-[10%]"></div>
      <div className="bg-orb w-[400px] h-[400px] bottom-[5%] right-[5%]" style={{ animationDelay: '-5s' }}></div>
      <div className="bg-orb w-[300px] h-[300px] top-[50%] right-[30%]" style={{ animationDelay: '-10s' }}></div>

      <Header onAddHabit={() => setIsModalOpen(true)} />

      <motion.main
        className="container mx-auto px-4 sm:px-6 py-8 space-y-12 relative z-10"
        variants={pageVariants}
        initial="initial"
        animate="animate"
      >
        {/* Mission Briefing Header */}
        <motion.div
          variants={sectionVariants}
          className="flex items-center gap-4 mb-2"
        >
          <div className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50">
            <Shield className="w-7 h-7 text-slate-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gradient-metallic">
              Mission Control
            </h1>
            <p className="text-sm text-slate-500">
              "It's not who I am underneath, but what I do that defines me."
            </p>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.section variants={sectionVariants}>
          <StatsCards
            todayStats={todayStats}
            weeklyAverage={weeklyAverage}
            currentStreak={bestStreak}
            totalCompleted={totalCompleted}
          />
        </motion.section>

        {/* Week View */}
        <motion.section variants={sectionVariants}>
          <div className="flex items-center gap-4 mb-6">
            <motion.div 
              className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/20"
              whileHover={{ scale: 1.05 }}
            >
              <Calendar className="w-6 h-6 text-sky-400" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold text-slate-100">
                Weekly Surveillance
              </h2>
              <p className="text-sm text-slate-500">
                Monitor your patrol progress
              </p>
            </div>
          </div>
          <WeekView
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            getCompletionStats={getCompletionStats}
            weekOffset={weekOffset}
            onWeekChange={setWeekOffset}
          />
        </motion.section>

        {/* Habits List */}
        <motion.section variants={sectionVariants}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.div 
                className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
                whileHover={{ scale: 1.05 }}
              >
                <Target className="w-6 h-6 text-emerald-400" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-slate-100">
                  {selectedDate.toDateString() === new Date().toDateString()
                    ? "Tonight's Objectives"
                    : selectedDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}
                </h2>
                <p className="text-sm text-slate-500">
                  <span className="text-emerald-400 font-semibold">{getCompletionStats(selectedDate).completed}</span> of{" "}
                  <span className="font-semibold text-slate-300">{getCompletionStats(selectedDate).total}</span> targets acquired
                </p>
              </div>
            </div>
            
            {/* Progress indicator */}
            <motion.div 
              className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-800/50 border border-slate-700/50"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="w-32 h-2 rounded-full bg-slate-700 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${getCompletionStats(selectedDate).percentage}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
              <span className="text-sm font-semibold text-emerald-400">
                {getCompletionStats(selectedDate).percentage}%
              </span>
            </motion.div>
          </div>

          <HabitList
            habits={habits}
            routines={routines}
            selectedDate={selectedDate}
            isCompleted={isCompleted}
            getStreak={getStreak}
            onToggle={(habitId) => toggleCompletion(habitId, selectedDate)}
            onDelete={deleteHabit}
          />
        </motion.section>
      </motion.main>

      <footer className="py-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-slate-600 text-xs mb-1">forged in the shadows by</p>
          <p
            className="watermark-gradient text-xl font-semibold tracking-widest"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            SHUBHRANSHU
          </p>
        </motion.div>
      </footer>

      {/* Add Habit Modal */}
      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addHabit}
        routines={routines}
      />

      {/* Ambient glow effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.015]"
          style={{
            background: "radial-gradient(circle, hsl(200 80% 55%) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [-30, 30, -30],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.01]"
          style={{
            background: "radial-gradient(circle, hsl(280 60% 60%) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [30, -30, 30],
          }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};

export default Index;
