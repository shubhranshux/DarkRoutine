import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/components/ThemeProvider';

export default function SignIn() {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      {/* Background effects */}
      <div className="aurora-bg"></div>
      <div className="bg-cinematic"></div>
      <div className="gotham-skyline"></div>
      <div className="gotham-moon"></div>
      <div className="bg-orb w-[600px] h-[600px] top-[-200px] left-[30%]"></div>
      <div className="bg-orb w-[400px] h-[400px] bottom-[10%] right-[10%]" style={{ animationDelay: '-5s' }}></div>

      {/* Left side - Branding */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md"
        >
          {/* Bat logo */}
          <motion.div 
            className="w-20 h-20 mb-8"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <img 
              src="/bat-logo.png" 
              alt="Bat Logo" 
              className={`w-full h-full object-contain transition-all duration-300 ${
                theme === 'dark' ? 'invert brightness-0 invert' : ''
              }`}
              style={{ filter: theme === 'dark' ? 'invert(1)' : 'none' }}
            />
          </motion.div>
          
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-slate-300">Dark</span>
            <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">Routine</span>
          </h1>
          
          <p className="text-xl text-slate-400 mb-6 leading-relaxed">
            The night is darkest just before the dawn. Build habits that last.
          </p>
          
          <div className="flex items-center gap-4 text-slate-500">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-sky-400" />
              <span>Secure</span>
            </div>
            <div className="h-4 w-px bg-slate-700"></div>
            <div className="flex items-center gap-2">
              <span>🦇</span>
              <span>Gotham Edition</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold">
              <span className="text-slate-300">Dark</span>
              <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">Routine</span>
            </h1>
            <p className="text-sm text-slate-500 mt-1">Gotham Edition</p>
          </div>

          {/* Sign In Card */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-200 mb-2">Welcome Back</h2>
              <p className="text-slate-500">Sign in to continue your night patrol</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-800/50 border border-slate-700/50 
                             text-slate-200 placeholder:text-slate-600
                             focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 
                             transition-all duration-200 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-12 py-4 rounded-xl bg-slate-800/50 border border-slate-700/50 
                             text-slate-200 placeholder:text-slate-600
                             focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 
                             transition-all duration-200 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500
                         text-white font-semibold text-base
                         hover:shadow-lg hover:shadow-sky-500/25 
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {loading ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-500">
                Don't have an account?{' '}
                <Link to="/signup" className="text-sky-400 hover:text-sky-300 font-medium transition-colors">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>

          {/* Continue without account */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-6"
          >
            <Link 
              to="/" 
              className="text-sm text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center gap-2"
            >
              <span>🦇</span>
              Continue as vigilante
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
