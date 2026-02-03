import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Trash2, Sparkles, Check, Star, Moon, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useManifestations } from '@/hooks/useManifestations';

export default function Manifestation() {
  const { items, addManifestation, deleteManifestation, toggleAchieved } = useManifestations();
  const [newText, setNewText] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (newText.trim()) {
      addManifestation(newText.trim());
      setNewText('');
    }
  };

  const pendingItems = items.filter(i => !i.achieved);
  const achievedItems = items.filter(i => i.achieved);

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-8 relative overflow-hidden theme-transition">
      {/* Background Effects */}
      <div className="aurora-bg"></div>
      <div className="bg-cinematic"></div>
      <div className="gotham-moon"></div>
      <div className="flying-bats"></div>
      <div className="gotham-skyline"></div>
      <div className="bg-orb w-[500px] h-[500px] top-[10%] left-[30%]"></div>
      <div className="bg-orb w-[400px] h-[400px] bottom-[20%] right-[20%]" style={{ animationDelay: '-8s' }}></div>
      
      {/* Floating sparkles */}
      <div className="particle-bg">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>

      {/* Header */}
      <motion.header 
        className="flex items-center gap-4 mb-8 relative z-10"
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
            className="p-3 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/10 border border-violet-500/30"
            animate={{ 
              boxShadow: ['0 0 20px rgba(139, 92, 246, 0.2)', '0 0 40px rgba(139, 92, 246, 0.4)', '0 0 20px rgba(139, 92, 246, 0.2)']
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Wand2 className="w-6 h-6 text-violet-400" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Manifestation
            </h1>
            <p className="text-sm text-slate-500">Shape your destiny</p>
          </div>
        </div>
      </motion.header>

      <div className="max-w-2xl mx-auto space-y-8 relative z-10">
        {/* Inspirational Quote */}
        <motion.div 
          className="text-center py-6 px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="relative inline-block"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Moon className="w-12 h-12 text-slate-600 mx-auto mb-4 opacity-60" />
          </motion.div>
          <p className="text-xl text-slate-400 italic font-light leading-relaxed">
            "What you think, you become. What you feel, you attract. What you imagine, you create."
          </p>
          <p className="text-sm text-slate-600 mt-3">— Buddha</p>
        </motion.div>

        {/* Add Manifestation Form */}
        <motion.div 
          className="glass-card rounded-2xl p-6 border border-violet-500/20 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600">
              <Star className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-violet-300">I Manifest...</h2>
          </div>
          
          <form onSubmit={handleAdd} className="space-y-4">
            <textarea
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="Write what you want to manifest into your life..."
              className="w-full px-5 py-4 rounded-xl bg-slate-800/50 border border-slate-700/50
                         focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 
                         outline-none transition-all duration-300
                         min-h-[140px] resize-none text-lg text-slate-200
                         placeholder:text-slate-600"
            />
            <motion.button
              type="submit"
              disabled={!newText.trim()}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl
                        bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600
                        text-white font-semibold
                        disabled:opacity-50 disabled:cursor-not-allowed
                        hover:shadow-lg hover:shadow-violet-500/25
                        transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Plus className="w-5 h-5" />
              <span>Add to My Manifestations</span>
            </motion.button>
          </form>
        </motion.div>

        {/* Pending Manifestations */}
        {pendingItems.length > 0 && (
          <motion.div 
            className="glass-card rounded-2xl p-6 border border-sky-500/20 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />
            
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-sky-300">
                My Manifestations ({pendingItems.length})
              </h2>
            </div>
            
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {pendingItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.05 }}
                    className="group p-5 rounded-xl bg-slate-800/30 border border-slate-700/40 
                               hover:border-sky-500/30 hover:bg-slate-800/50
                               transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <motion.button
                        onClick={() => toggleAchieved(item.id)}
                        className="mt-1 shrink-0"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <div className="w-7 h-7 rounded-full border-2 border-slate-500 
                                       hover:border-sky-400 hover:bg-sky-500/10
                                       transition-all duration-200 flex items-center justify-center">
                        </div>
                      </motion.button>
                      <p className="flex-1 text-lg text-slate-200 leading-relaxed">
                        {item.text}
                      </p>
                      <motion.button
                        onClick={() => deleteManifestation(item.id)}
                        className="p-2 rounded-lg text-red-400/60 hover:text-red-400 
                                   hover:bg-red-500/10 transition-all shrink-0
                                   opacity-0 group-hover:opacity-100"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                    <p className="text-xs text-slate-600 mt-3 ml-11">
                      {new Date(item.createdAt).toLocaleDateString('en-US', { 
                        month: 'long', day: 'numeric', year: 'numeric' 
                      })}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Achieved Manifestations */}
        {achievedItems.length > 0 && (
          <motion.div 
            className="glass-card rounded-2xl p-6 border border-emerald-500/20 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
            
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500">
                <Check className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-emerald-400">
                Manifested ✨ ({achievedItems.length})
              </h2>
            </div>
            
            <div className="space-y-3">
              {achievedItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="group p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20"
                >
                  <div className="flex items-start gap-4">
                    <motion.button
                      onClick={() => toggleAchieved(item.id)}
                      className="mt-1 shrink-0"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 
                                     flex items-center justify-center shadow-lg shadow-emerald-500/30">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </motion.button>
                    <p className="flex-1 text-lg text-slate-500 leading-relaxed line-through">
                      {item.text}
                    </p>
                    <motion.button
                      onClick={() => deleteManifestation(item.id)}
                      className="p-2 rounded-lg text-red-400/40 hover:text-red-400 
                                 hover:bg-red-500/10 transition-all shrink-0
                                 opacity-0 group-hover:opacity-100"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {items.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles className="w-20 h-20 text-violet-500/30 mx-auto mb-6" />
            </motion.div>
            <p className="text-xl text-slate-400">Your manifestation board is empty</p>
            <p className="text-sm text-slate-600 mt-2">Write your desires and watch them come to life</p>
          </motion.div>
        )}

        {/* Footer */}
        <motion.footer 
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
        </motion.footer>
      </div>
    </div>
  );
}
