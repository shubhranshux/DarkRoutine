import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, TrendingUp, Calendar, CheckCircle2, Flame, Target, 
  Award, Zap, BarChart3, Activity, Clock, Star, Trophy
} from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Line, LineChart, Area, AreaChart, PieChart, Pie, Cell } from "recharts";
import { useHabits } from "@/hooks/useHabits";

// Premium Circular Progress Component
function CircularProgress({ percentage, size = 150, strokeWidth = 12, color = "blue" }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const gradientColors = {
    blue: { start: '#3B82F6', end: '#06B6D4' },
    emerald: { start: '#10B981', end: '#22D3EE' },
    orange: { start: '#F97316', end: '#FBBF24' },
    violet: { start: '#8B5CF6', end: '#EC4899' },
  };

  const colors = gradientColors[color];

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id={`progress-gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.start} />
            <stop offset="100%" stopColor={colors.end} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          fill="transparent"
          opacity={0.3}
        />
        
        {/* Progress circle with gradient */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#progress-gradient-${color})`}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          {percentage}%
        </motion.span>
        <span className="text-sm text-muted-foreground mt-1">complete</span>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, subtitle, icon: Icon, color, delay = 0 }) {
  const colorClasses = {
    blue: { bg: 'from-blue-500/20 to-cyan-500/10', border: 'border-blue-500/30', icon: 'from-blue-500 to-cyan-400', text: 'text-blue-400' },
    emerald: { bg: 'from-emerald-500/20 to-green-500/10', border: 'border-emerald-500/30', icon: 'from-emerald-500 to-green-400', text: 'text-emerald-400' },
    orange: { bg: 'from-orange-500/20 to-amber-500/10', border: 'border-orange-500/30', icon: 'from-orange-500 to-amber-400', text: 'text-orange-400' },
    violet: { bg: 'from-violet-500/20 to-purple-500/10', border: 'border-violet-500/30', icon: 'from-violet-500 to-purple-400', text: 'text-violet-400' },
    pink: { bg: 'from-pink-500/20 to-rose-500/10', border: 'border-pink-500/30', icon: 'from-pink-500 to-rose-400', text: 'text-pink-400' },
  };
  
  const classes = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`relative p-5 rounded-2xl bg-gradient-to-br ${classes.bg} border ${classes.border}
                 backdrop-blur-sm overflow-hidden group`}
    >
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br opacity-20 blur-2xl rounded-full" />
      
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <motion.p 
            className="text-3xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.2 }}
          >
            {value}
          </motion.p>
          <p className={`text-sm mt-1 ${classes.text}`}>{subtitle}</p>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${classes.icon}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </motion.div>
  );
}

// Habit Performance Row
function HabitPerformanceRow({ habit, streak, completion, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
    >
      <span className="text-2xl">{habit.emoji}</span>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{habit.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${completion}%` }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
            />
          </div>
          <span className="text-sm text-muted-foreground">{completion}%</span>
        </div>
      </div>
      <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20">
        <Flame className="w-4 h-4 text-orange-400" />
        <span className="text-sm font-medium text-orange-400">{streak}</span>
      </div>
    </motion.div>
  );
}

export default function Analytics() {
  const { habits, routines, completions, getCompletionStats, getStreak } = useHabits();
  const today = new Date();
  const todayStats = getCompletionStats(today);
  
  const enabledRoutineIds = routines.filter(r => r.enabled).map(r => r.id);
  const activeHabits = habits.filter(h => enabledRoutineIds.includes(h.routineId));

  // Generate real weekly data
  const weeklyData = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const data = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const stats = getCompletionStats(date);
      data.push({
        name: days[date.getDay()],
        completed: stats.completed,
        total: stats.total,
        percentage: stats.percentage,
      });
    }
    return data;
  }, [getCompletionStats]);

  // Calculate weekly average
  const weeklyAverage = useMemo(() => {
    const sum = weeklyData.reduce((acc, day) => acc + day.percentage, 0);
    return Math.round(sum / 7);
  }, [weeklyData]);

  // Best streak across all habits
  const bestStreak = useMemo(() => {
    return habits.reduce((max, habit) => Math.max(max, getStreak(habit.id)), 0);
  }, [habits, getStreak]);

  // Total completions this week
  const totalWeekCompletions = useMemo(() => {
    return weeklyData.reduce((sum, day) => sum + day.completed, 0);
  }, [weeklyData]);

  // Habit breakdown by routine
  const routineBreakdown = useMemo(() => {
    return routines
      .filter(r => r.enabled)
      .map(routine => ({
        name: routine.name,
        count: habits.filter(h => h.routineId === routine.id).length,
        color: routine.color,
      }))
      .filter(r => r.count > 0);
  }, [routines, habits]);

  const pieColors = ['#3B82F6', '#10B981', '#F97316', '#8B5CF6', '#EC4899'];

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-8 space-y-8 relative overflow-hidden theme-transition">
      {/* Background Effects */}
      <div className="aurora-bg"></div>
      <div className="bg-cinematic"></div>
      <div className="gotham-skyline"></div>
      <div className="bg-orb w-[600px] h-[600px] top-[-20%] left-[-10%]"></div>
      <div className="bg-orb w-[400px] h-[400px] bottom-[10%] right-[-5%]" style={{ animationDelay: '-7s' }}></div>

      <motion.header 
        className="flex items-center gap-4 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link to="/">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-800/50">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </motion.div>
        </Link>
        <div className="flex items-center gap-3">
          <motion.div 
            className="p-3 rounded-2xl bg-gradient-to-br from-sky-500/20 to-cyan-500/10 border border-sky-500/30"
            animate={{ 
              boxShadow: ['0 0 20px rgba(56, 189, 248, 0.2)', '0 0 40px rgba(56, 189, 248, 0.4)', '0 0 20px rgba(56, 189, 248, 0.2)']
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <BarChart3 className="w-6 h-6 text-sky-400" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Mission Analytics
            </h1>
            <p className="text-sm text-slate-500">Track your vigilance performance</p>
          </div>
        </div>
      </motion.header>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        <StatCard 
          title="Today's Progress" 
          value={`${todayStats.percentage}%`}
          subtitle={`${todayStats.completed}/${todayStats.total} habits`}
          icon={Target}
          color="blue"
          delay={0.1}
        />
        <StatCard 
          title="Weekly Average" 
          value={`${weeklyAverage}%`}
          subtitle="Completion rate"
          icon={TrendingUp}
          color="emerald"
          delay={0.15}
        />
        <StatCard 
          title="Best Streak" 
          value={bestStreak}
          subtitle="Days in a row"
          icon={Flame}
          color="orange"
          delay={0.2}
        />
        <StatCard 
          title="Week Total" 
          value={totalWeekCompletions}
          subtitle="Completions this week"
          icon={Trophy}
          color="violet"
          delay={0.25}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3 relative z-10">
        {/* Today's Progress Circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card border-blue-500/20 h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Today's Focus</CardTitle>
                  <CardDescription>{todayStats.completed} of {todayStats.total} completed</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
              <CircularProgress percentage={todayStats.percentage} size={180} strokeWidth={14} color="blue" />
              
              {todayStats.completed === todayStats.total && todayStats.total > 0 && (
                <motion.div 
                  className="text-center p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                >
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-emerald-400">All habits completed! 🎉</p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Weekly Performance Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="glass-card border-emerald-500/20 h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-green-400">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Weekly Performance</CardTitle>
                  <CardDescription>Your habit completions over the last 7 days</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyData}>
                    <defs>
                      <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                      itemStyle={{ color: '#10B981' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="completed" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorCompleted)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 relative z-10">
        {/* Habit Performance List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass-card border-violet-500/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-400">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Habit Performance</CardTitle>
                  <CardDescription>Individual habit streaks and completion rates</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[300px] overflow-y-auto scrollbar-hide">
              {activeHabits.length > 0 ? (
                activeHabits.map((habit, index) => (
                  <HabitPerformanceRow 
                    key={habit.id}
                    habit={habit}
                    streak={getStreak(habit.id)}
                    completion={Math.min(100, getStreak(habit.id) * 15 + 20)}
                    index={index}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Zap className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No habits yet. Add some to track!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Routine Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="glass-card border-orange-500/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Routine Distribution</CardTitle>
                  <CardDescription>Habits organized by routine</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {routineBreakdown.length > 0 ? (
                <div className="flex items-center justify-center">
                  <div className="w-[200px] h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={routineBreakdown}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="count"
                        >
                          {routineBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2 ml-4">
                    {routineBreakdown.map((routine, index) => (
                      <div key={routine.name} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: pieColors[index % pieColors.length] }}
                        />
                        <span className="text-sm">{routine.name}</span>
                        <span className="text-sm text-muted-foreground">({routine.count})</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No routines configured yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div 
        className="text-center pt-8 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <p className="text-slate-600 text-xs mb-1">forged in the shadows by</p>
        <p 
          className="watermark-gradient text-lg font-semibold tracking-widest"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          SHUBHRANSHU
        </p>
      </motion.div>
    </div>
  );
}
