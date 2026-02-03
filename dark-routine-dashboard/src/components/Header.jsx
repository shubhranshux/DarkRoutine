import { motion } from 'framer-motion';
import { Plus, BarChart3, Settings, Sun, Moon, DollarSign, ShoppingCart, Sparkles, User, LogOut, Menu, X, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { useTheme } from './ThemeProvider';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

export function Header({ onAddHabit }) {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navItems = [
    { to: '/manifestation', icon: Sparkles, label: 'Manifest', color: 'violet' },
    { to: '/expenses', icon: DollarSign, label: 'Expenses', color: 'emerald' },
    { to: '/wishlist', icon: ShoppingCart, label: 'Wishlist', color: 'rose' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics', color: 'blue' },
    { to: '/settings', icon: Settings, label: 'Settings', color: 'slate' },
  ];

  const getColorClasses = (color) => {
    const colors = {
      violet: { 
        bg: 'bg-violet-500/10', 
        border: 'border-violet-500/20', 
        hover: 'hover:bg-violet-500/20 hover:border-violet-400/40', 
        icon: 'text-violet-400',
        glow: 'hover:shadow-violet-500/20'
      },
      emerald: { 
        bg: 'bg-emerald-500/10', 
        border: 'border-emerald-500/20', 
        hover: 'hover:bg-emerald-500/20 hover:border-emerald-400/40', 
        icon: 'text-emerald-400',
        glow: 'hover:shadow-emerald-500/20'
      },
      rose: { 
        bg: 'bg-rose-500/10', 
        border: 'border-rose-500/20', 
        hover: 'hover:bg-rose-500/20 hover:border-rose-400/40', 
        icon: 'text-rose-400',
        glow: 'hover:shadow-rose-500/20'
      },
      blue: { 
        bg: 'bg-sky-500/10', 
        border: 'border-sky-500/20', 
        hover: 'hover:bg-sky-500/20 hover:border-sky-400/40', 
        icon: 'text-sky-400',
        glow: 'hover:shadow-sky-500/20'
      },
      slate: { 
        bg: 'bg-slate-400/10', 
        border: 'border-slate-400/20', 
        hover: 'hover:bg-slate-400/20 hover:border-slate-300/40', 
        icon: 'text-slate-400',
        glow: 'hover:shadow-slate-400/20'
      },
    };
    return colors[color];
  };

  return (
    <motion.header 
      className="sticky top-0 z-50 backdrop-blur-2xl bg-background/80 border-b border-slate-700/30 theme-transition"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Top metallic accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-500/40 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>

          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Theme Toggle - Metallic Style */}
            <motion.button
              onClick={toggleTheme}
              className="group p-2.5 rounded-xl bg-slate-500/10 border border-slate-500/20 
                         hover:bg-slate-400/15 hover:border-slate-400/30
                         transition-all duration-300 shadow-lg hover:shadow-slate-400/10"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                transition={{ duration: 0.4, type: 'spring' }}
              >
                {theme === 'dark' ? (
                  <Sun className="w-[18px] h-[18px] text-slate-300" />
                ) : (
                  <Moon className="w-[18px] h-[18px] text-slate-600" />
                )}
              </motion.div>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item, index) => {
                const colorClasses = getColorClasses(item.color);
                return (
                  <Link key={item.to} to={item.to}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={`group p-2.5 rounded-xl ${colorClasses.bg} border ${colorClasses.border} 
                                 ${colorClasses.hover} transition-all duration-300 shadow-lg ${colorClasses.glow}`}
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      title={item.label}
                    >
                      <item.icon className={`w-[18px] h-[18px] ${colorClasses.icon}`} />
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-500/10 border border-slate-500/20 hover:border-slate-400/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showMobileMenu ? <X className="w-[18px] h-[18px] text-slate-300" /> : <Menu className="w-[18px] h-[18px] text-slate-300" />}
            </motion.button>

            {/* User Auth Button */}
            {isAuthenticated ? (
              <div className="relative">
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2.5 p-1 pr-3 rounded-xl
                             bg-emerald-500/10 border border-emerald-500/20 
                             hover:bg-emerald-500/20 hover:border-emerald-400/40
                             transition-all duration-300 shadow-lg hover:shadow-emerald-500/10"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-slate-900 font-bold text-sm shadow-md">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="hidden sm:inline font-medium text-sm text-emerald-400 truncate max-w-[80px]">
                    {user?.name || 'User'}
                  </span>
                </motion.button>

                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute right-0 top-full mt-2 w-52 py-2 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl z-50"
                  >
                    <div className="px-4 py-3 border-b border-slate-700/50">
                      <p className="font-semibold text-slate-200 truncate">{user?.name}</p>
                      <p className="text-sm text-slate-500 truncate">{user?.email}</p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => { logout(); setShowUserMenu(false); }}
                        className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-red-500/10 rounded-xl flex items-center gap-3 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link to="/signin">
                <motion.div
                  className="flex items-center gap-2 px-4 py-2 rounded-xl
                             bg-slate-500/10 border border-slate-500/20 
                             hover:bg-slate-400/15 hover:border-slate-400/30
                             transition-all duration-300 shadow-lg hover:shadow-slate-400/10"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Shield className="w-[18px] h-[18px] text-slate-400" />
                  <span className="hidden sm:inline font-semibold text-sm text-slate-300">Sign In</span>
                </motion.div>
              </Link>
            )}

            {/* Add Habit Button - Premium Blue */}
            <Link to="/add-habit">
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-xl
                           bg-gradient-to-r from-sky-600 via-cyan-500 to-sky-600
                           text-white font-semibold text-sm
                           shadow-lg shadow-sky-500/25 
                           hover:shadow-xl hover:shadow-sky-500/35
                           transition-all duration-300 relative overflow-hidden group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Metallic shine sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <Plus className="w-[18px] h-[18px] relative z-10" />
                <span className="hidden sm:inline relative z-10">Add Habit</span>
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="lg:hidden mt-4 pb-2"
          >
            <div className="grid grid-cols-5 gap-2">
              {navItems.map((item) => {
                const colorClasses = getColorClasses(item.color);
                return (
                  <Link key={item.to} to={item.to} onClick={() => setShowMobileMenu(false)}>
                    <motion.div
                      className={`flex flex-col items-center p-3 rounded-xl ${colorClasses.bg} border ${colorClasses.border}`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <item.icon className={`w-5 h-5 mb-1 ${colorClasses.icon}`} />
                      <span className="text-xs text-slate-400">{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
