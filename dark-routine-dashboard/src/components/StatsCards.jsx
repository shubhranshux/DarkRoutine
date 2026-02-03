import { motion } from 'framer-motion';
import { Target, TrendingUp, Flame, CheckCircle2, Sparkles, ArrowUpRight, Shield } from 'lucide-react';

export function StatsCards({ todayStats, weeklyAverage, currentStreak, totalCompleted }) {
  const stats = [
    {
      label: "Today's Mission",
      value: `${todayStats.percentage}%`,
      subtext: `${todayStats.completed}/${todayStats.total} targets`,
      icon: Target,
      gradient: 'from-sky-500 via-cyan-400 to-sky-600',
      bgGradient: 'from-sky-500/15 via-cyan-500/10 to-transparent',
      iconBg: 'from-sky-500 to-cyan-400',
      shadowColor: 'shadow-sky-500/15',
      borderColor: 'border-sky-500/20 hover:border-sky-400/40',
      trend: todayStats.percentage >= 50 ? '+' : '',
    },
    {
      label: 'Weekly Protocol',
      value: `${weeklyAverage}%`,
      subtext: 'success rate',
      icon: TrendingUp,
      gradient: 'from-emerald-500 via-green-400 to-emerald-600',
      bgGradient: 'from-emerald-500/15 via-green-500/10 to-transparent',
      iconBg: 'from-emerald-500 to-green-400',
      shadowColor: 'shadow-emerald-500/15',
      borderColor: 'border-emerald-500/20 hover:border-emerald-400/40',
      trend: weeklyAverage >= 70 ? '↑' : '',
    },
    {
      label: 'Vigilance Streak',
      value: currentStreak.toString(),
      subtext: 'nights active',
      icon: Flame,
      gradient: 'from-orange-500 via-amber-400 to-red-500',
      bgGradient: 'from-orange-500/15 via-amber-500/10 to-transparent',
      iconBg: 'from-orange-500 to-amber-400',
      shadowColor: 'shadow-orange-500/15',
      borderColor: 'border-orange-500/20 hover:border-orange-400/40',
      trend: currentStreak >= 7 ? '🦇' : '',
    },
    {
      label: 'Total Victories',
      value: totalCompleted.toString(),
      subtext: 'missions done',
      icon: Shield,
      gradient: 'from-violet-500 via-purple-400 to-fuchsia-500',
      bgGradient: 'from-violet-500/15 via-purple-500/10 to-transparent',
      iconBg: 'from-violet-500 to-purple-400',
      shadowColor: 'shadow-violet-500/15',
      borderColor: 'border-violet-500/20 hover:border-violet-400/40',
      trend: totalCompleted >= 50 ? '⭐' : '',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          whileHover={{ scale: 1.03, y: -8 }}
          className={`group relative p-5 sm:p-6 rounded-2xl bg-slate-900/60 backdrop-blur-sm
                     border ${stat.borderColor}
                     transition-all duration-500 overflow-hidden
                     ${stat.shadowColor} hover:shadow-xl`}
        >
          {/* Animated gradient background */}
          <motion.div 
            className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-40`}
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ repeat: Infinity, duration: 3, delay: index * 0.5 }}
          />
          
          {/* Corner metallic glow */}
          <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${stat.iconBg} rounded-full blur-3xl opacity-15 group-hover:opacity-30 transition-opacity duration-500`} />
          
          {/* Top edge metallic line */}
          <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-slate-400/30 to-transparent" />
          
          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          
          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <motion.div 
                className={`p-3 rounded-xl bg-gradient-to-br ${stat.iconBg} shadow-lg ${stat.shadowColor}`}
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.div>
              
              {/* Trend/Achievement indicator */}
              {stat.trend && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 px-2 py-1 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700/50"
                >
                  <span className="text-sm">{stat.trend}</span>
                  {stat.trend === '+' && <ArrowUpRight className="w-3 h-3 text-emerald-400" />}
                </motion.div>
              )}
            </div>
            
            <motion.div
              className="space-y-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <p className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
              <p className="text-sm font-semibold text-slate-200">{stat.label}</p>
              <p className="text-xs text-slate-500">{stat.subtext}</p>
            </motion.div>

            {/* Sparkle removed based on user feedback */}
          </div>
          
          {/* Bottom accent gradient line */}
          <motion.div 
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
          />
        </motion.div>
      ))}
    </div>
  );
}
