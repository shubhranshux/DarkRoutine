import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  ArrowLeft, Moon, Sun, Volume2, Bell, Calendar, Flame, 
  Download, Upload, Trash2, Settings2, Zap, ChevronRight,
  Palette, Database, Shield
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useAuth } from '@/contexts/AuthContext';

// Custom hook for user-specific persisted settings
function useUserSettings(key, defaultValue) {
  const { user } = useAuth();
  const storageKey = user ? `settings_${user.id}_${key}` : `settings_guest_${key}`;
  
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved !== null ? JSON.parse(saved) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [storageKey, value]);

  // Re-read when user changes
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved !== null) {
      setValue(JSON.parse(saved));
    } else {
      setValue(defaultValue);
    }
  }, [storageKey]);

  return [value, setValue];
}

const SettingItem = ({ icon: Icon, title, description, children, color = 'slate' }) => {
  const colorClasses = {
    slate: 'from-slate-500 to-slate-600',
    sky: 'from-sky-500 to-cyan-500',
    emerald: 'from-emerald-500 to-green-500',
    violet: 'from-violet-500 to-purple-500',
    orange: 'from-orange-500 to-amber-500',
    rose: 'from-rose-500 to-pink-500',
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/20 
                    border border-slate-700/30 hover:border-slate-600/50 
                    transition-all duration-200 group">
      <div className="flex items-center gap-4">
        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${colorClasses[color]} 
                        shadow-lg group-hover:scale-105 transition-transform`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="font-medium text-slate-200">{title}</p>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
};

const SettingSection = ({ icon: Icon, title, description, children, color = 'slate', delay = 0 }) => {
  const borderColors = {
    slate: 'border-slate-500/20',
    sky: 'border-sky-500/20',
    emerald: 'border-emerald-500/20',
    violet: 'border-violet-500/20',
    orange: 'border-orange-500/20',
    rose: 'border-rose-500/20',
  };

  const glowColors = {
    slate: 'via-slate-500/30',
    sky: 'via-sky-500/30',
    emerald: 'via-emerald-500/30',
    violet: 'via-violet-500/30',
    orange: 'via-orange-500/30',
    rose: 'via-rose-500/30',
  };

  const iconColors = {
    slate: 'from-slate-500 to-slate-600',
    sky: 'from-sky-500 to-cyan-500',
    emerald: 'from-emerald-500 to-green-500',
    violet: 'from-violet-500 to-purple-500',
    orange: 'from-orange-500 to-amber-500',
    rose: 'from-rose-500 to-pink-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`relative rounded-2xl bg-slate-900/40 backdrop-blur-sm 
                  border ${borderColors[color]} overflow-hidden`}
    >
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${glowColors[color]} to-transparent`} />
      
      <div className="p-5 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${iconColors[color]}`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-200">{title}</h3>
            <p className="text-sm text-slate-500">{description}</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        {children}
      </div>
    </motion.div>
  );
};

const ActionButton = ({ icon: Icon, title, description, onClick, variant = 'default' }) => {
  const variants = {
    default: 'bg-slate-800/30 border-slate-700/30 hover:bg-slate-700/40 hover:border-slate-600/50',
    danger: 'bg-red-950/20 border-red-500/20 hover:bg-red-900/30 hover:border-red-500/40',
  };

  const iconVariants = {
    default: 'from-violet-500 to-purple-500',
    danger: 'from-red-500 to-rose-500',
  };

  const textVariants = {
    default: 'text-slate-200',
    danger: 'text-red-300',
  };

  return (
    <motion.button
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 rounded-xl border 
                 transition-all duration-200 group ${variants[variant]}`}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className={`p-2.5 rounded-xl bg-gradient-to-br ${iconVariants[variant]}
                      shadow-lg group-hover:scale-105 transition-transform`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div className="text-left flex-1">
        <p className={`font-medium ${textVariants[variant]}`}>{title}</p>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
    </motion.button>
  );
};

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  
  // User-specific settings - each user gets their own preferences
  const [reduceMotion, setReduceMotion] = useUserSettings('reduceMotion', false);
  const [pushNotifications, setPushNotifications] = useUserSettings('pushNotifications', true);
  const [soundEffects, setSoundEffects] = useUserSettings('soundEffects', true);
  const [reminderTime, setReminderTime] = useUserSettings('reminderTime', '20:00');
  const [weekStartsMonday, setWeekStartsMonday] = useUserSettings('weekStartsMonday', false);
  const [showStreakCount, setShowStreakCount] = useUserSettings('showStreakCount', true);

  const handleExportData = () => {
    const userId = user?.id || 'guest';
    const data = {
      habits: JSON.parse(localStorage.getItem('habits') || '[]'),
      completions: JSON.parse(localStorage.getItem('completions') || '[]'),
      routines: JSON.parse(localStorage.getItem('routines') || '[]'),
      settings: {
        reduceMotion,
        pushNotifications,
        soundEffects,
        reminderTime,
        weekStartsMonday,
        showStreakCount,
      },
      userId,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `darkroutine-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          if (data.habits) localStorage.setItem('habits', JSON.stringify(data.habits));
          if (data.completions) localStorage.setItem('completions', JSON.stringify(data.completions));
          if (data.routines) localStorage.setItem('routines', JSON.stringify(data.routines));
          
          // Import user-specific settings
          const userId = user?.id || 'guest';
          if (data.settings) {
            Object.entries(data.settings).forEach(([key, value]) => {
              localStorage.setItem(`settings_${userId}_${key}`, JSON.stringify(value));
            });
          }
          window.location.reload();
        } catch (err) {
          alert('Invalid backup file');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleClearData = () => {
    if (confirm('Are you sure? This will delete all your habits and progress. This action cannot be undone.')) {
      localStorage.removeItem('habits');
      localStorage.removeItem('completions');
      localStorage.removeItem('routines');
      // Clear user-specific settings too
      const userId = user?.id || 'guest';
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(`settings_${userId}_`)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden theme-transition">
      {/* Background Effects */}
      <div className="aurora-bg"></div>
      <div className="bg-cinematic"></div>
      <div className="gear-pattern"></div>
      <div className="gotham-skyline"></div>
      <div className="bg-orb w-[500px] h-[500px] top-[5%] right-[20%]"></div>
      <div className="bg-orb w-[400px] h-[400px] bottom-[20%] left-[10%]" style={{ animationDelay: '-8s' }}></div>

      <div className="relative z-10 p-4 sm:p-8 max-w-3xl mx-auto">
        {/* Header */}
        <motion.header 
          className="flex items-center gap-4 mb-10"
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
              className="p-3 rounded-2xl bg-gradient-to-br from-slate-500/20 to-slate-600/10 border border-slate-500/30"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Settings2 className="w-6 h-6 text-slate-400" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold text-gradient-metallic">Configuration</h1>
              <p className="text-sm text-slate-500">
                {user ? `Settings for ${user.name}` : 'Guest preferences'}
              </p>
            </div>
          </div>
        </motion.header>

        {/* Settings Grid */}
        <div className="space-y-6">
          {/* Appearance */}
          <SettingSection 
            icon={Palette} 
            title="Appearance" 
            description="Visual preferences"
            color="sky"
            delay={0.1}
          >
            <SettingItem 
              icon={theme === 'dark' ? Moon : Sun} 
              title="Night Mode" 
              description="Toggle dark/light theme"
              color="sky"
            >
              <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
            </SettingItem>
            <SettingItem 
              icon={Zap} 
              title="Reduce Motion" 
              description="Disable animations"
              color="sky"
            >
              <Switch checked={reduceMotion} onCheckedChange={setReduceMotion} />
            </SettingItem>
          </SettingSection>

          {/* Notifications */}
          <SettingSection 
            icon={Bell} 
            title="Notifications" 
            description="Alert preferences"
            color="emerald"
            delay={0.2}
          >
            <SettingItem 
              icon={Bell} 
              title="Push Notifications" 
              description="Bat signal alerts"
              color="emerald"
            >
              <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
            </SettingItem>
            <SettingItem 
              icon={Volume2} 
              title="Sound Effects" 
              description="Audio feedback"
              color="emerald"
            >
              <Switch checked={soundEffects} onCheckedChange={setSoundEffects} />
            </SettingItem>
            <SettingItem 
              icon={Calendar} 
              title="Daily Reminder" 
              description="Patrol reminder time"
              color="emerald"
            >
              <input 
                type="time" 
                value={reminderTime} 
                onChange={(e) => setReminderTime(e.target.value)}
                className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-1.5 
                          text-sm text-slate-200 focus:border-emerald-500/50 focus:outline-none"
              />
            </SettingItem>
          </SettingSection>

          {/* Habits */}
          <SettingSection 
            icon={Shield} 
            title="Mission Settings" 
            description="Habit tracking options"
            color="orange"
            delay={0.3}
          >
            <SettingItem 
              icon={Calendar} 
              title="Week Starts Monday" 
              description="Change week start day"
              color="orange"
            >
              <Switch checked={weekStartsMonday} onCheckedChange={setWeekStartsMonday} />
            </SettingItem>
            <SettingItem 
              icon={Flame} 
              title="Show Streaks" 
              description="Display vigilance counters"
              color="orange"
            >
              <Switch checked={showStreakCount} onCheckedChange={setShowStreakCount} />
            </SettingItem>
          </SettingSection>

          {/* Data & Backup */}
          <SettingSection 
            icon={Database} 
            title="Data Vault" 
            description="Backup and restore"
            color="violet"
            delay={0.4}
          >
            <ActionButton
              icon={Download}
              title="Export Data"
              description="Download your mission logs"
              onClick={handleExportData}
            />
            <ActionButton
              icon={Upload}
              title="Import Data"
              description="Restore from backup"
              onClick={handleImportData}
            />
            <ActionButton
              icon={Trash2}
              title="Clear All Data"
              description="This action cannot be undone"
              onClick={handleClearData}
              variant="danger"
            />
          </SettingSection>
        </div>
        
        {/* Footer */}
        <motion.div 
          className="text-center pt-12 pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
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
    </div>
  );
}
