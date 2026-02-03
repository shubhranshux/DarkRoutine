import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Trash2, ShoppingCart, Check, Star, ExternalLink, Heart, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/hooks/useWishlist';

const priorityConfig = {
  low: { 
    border: 'border-slate-600/40', 
    bg: 'bg-slate-800/20',
    badge: 'bg-slate-600/30 text-slate-400',
    glow: '' 
  },
  medium: { 
    border: 'border-sky-500/30', 
    bg: 'bg-sky-500/5',
    badge: 'bg-sky-500/20 text-sky-400',
    glow: 'hover:shadow-sky-500/10' 
  },
  high: { 
    border: 'border-rose-500/30', 
    bg: 'bg-rose-500/5',
    badge: 'bg-rose-500/20 text-rose-400',
    glow: 'hover:shadow-rose-500/10' 
  },
};

export default function Wishlist() {
  const { items, addItem, deleteItem, togglePurchased, getTotalWishlistValue, getPurchasedTotal } = useWishlist();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [priority, setPriority] = useState('medium');
  const [link, setLink] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    const numPrice = parseFloat(price);
    if (name.trim() && numPrice > 0) {
      addItem(name.trim(), numPrice, priority, link.trim() || undefined);
      setName('');
      setPrice('');
      setLink('');
      setPriority('medium');
    }
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(num);
  };

  const pendingItems = items.filter(i => !i.purchased);
  const purchasedItems = items.filter(i => i.purchased);

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-8 relative overflow-hidden theme-transition">
      {/* Background Effects */}
      <div className="aurora-bg"></div>
      <div className="bg-cinematic"></div>
      <div className="flying-bats"></div>
      <div className="gotham-skyline"></div>
      <div className="gotham-moon"></div>
      <div className="bg-orb w-[500px] h-[500px] bottom-[-10%] left-[10%]"></div>
      <div className="bg-orb w-[400px] h-[400px] top-[20%] right-[20%]" style={{ animationDelay: '-6s' }}></div>

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
            className="p-3 rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-500/10 border border-rose-500/30"
            animate={{ 
              boxShadow: ['0 0 20px rgba(244, 63, 94, 0.2)', '0 0 40px rgba(244, 63, 94, 0.4)', '0 0 20px rgba(244, 63, 94, 0.2)']
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Heart className="w-6 h-6 text-rose-400" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
              Wishlist
            </h1>
            <p className="text-sm text-slate-500">Track your desires</p>
          </div>
        </div>
      </motion.header>

      <div className="max-w-2xl mx-auto space-y-6 relative z-10">
        {/* Add Item Form */}
        <motion.div 
          className="glass-card rounded-2xl p-6 border border-rose-500/20 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-rose-500/40 to-transparent" />
          
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-rose-300">Add to Wishlist</h2>
          </div>
          
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-500 mb-2 block">Item Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="What do you want?"
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50
                             focus:border-rose-500/50 focus:ring-2 focus:ring-rose-500/20 
                             outline-none transition-all duration-300 text-slate-200
                             placeholder:text-slate-600"
                />
              </div>
              <div>
                <label className="text-sm text-slate-500 mb-2 block">Price (₹)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50
                             focus:border-rose-500/50 focus:ring-2 focus:ring-rose-500/20 
                             outline-none transition-all duration-300 text-xl text-slate-200
                             placeholder:text-slate-600"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-500 mb-2 block">Link (optional)</label>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50
                           focus:border-rose-500/50 focus:ring-2 focus:ring-rose-500/20 
                           outline-none transition-all duration-300 text-slate-200
                           placeholder:text-slate-600"
              />
            </div>

            {/* Priority */}
            <div>
              <label className="text-sm text-slate-500 mb-3 block">Priority</label>
              <div className="flex gap-3">
                {[
                  { value: 'low', label: 'Low', color: 'slate' },
                  { value: 'medium', label: 'Medium', color: 'sky' },
                  { value: 'high', label: 'High', color: 'rose' },
                ].map((p) => (
                  <motion.button
                    key={p.value}
                    type="button"
                    onClick={() => setPriority(p.value)}
                    className={`flex-1 py-3.5 rounded-xl text-sm font-semibold capitalize
                                transition-all duration-300 border
                                ${priority === p.value
                                  ? p.color === 'slate' 
                                    ? 'bg-slate-600 text-white border-slate-500'
                                    : p.color === 'sky'
                                      ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white border-sky-400'
                                      : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white border-rose-400'
                                  : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-600'
                                }`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {p.label}
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={!name.trim() || !price}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl
                        bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600
                        text-white font-semibold
                        disabled:opacity-50 disabled:cursor-not-allowed
                        hover:shadow-lg hover:shadow-rose-500/25
                        transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Plus className="w-5 h-5" />
              <span>Add to Wishlist</span>
            </motion.button>
          </form>
        </motion.div>

        {/* Total Value */}
        <motion.div 
          className="glass-card rounded-2xl p-6 border border-violet-500/20 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <span className="text-slate-400">Total Wishlist Value</span>
            </div>
            <motion.span 
              className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {formatCurrency(getTotalWishlistValue())}
            </motion.span>
          </div>
        </motion.div>

        {/* Pending Items */}
        {pendingItems.length > 0 && (
          <motion.div 
            className="glass-card rounded-2xl p-6 border border-sky-500/20 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />
            
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-sky-300">
                Want to Buy ({pendingItems.length})
              </h2>
            </div>
            
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {pendingItems.map((item, index) => {
                  const config = priorityConfig[item.priority];
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ delay: index * 0.05 }}
                      className={`group flex items-center gap-4 p-4 rounded-xl 
                                 ${config.bg} border ${config.border}
                                 hover:bg-slate-800/50 ${config.glow}
                                 transition-all duration-300`}
                    >
                      <motion.button
                        onClick={() => togglePurchased(item.id)}
                        className="shrink-0"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <div className="w-7 h-7 rounded-full border-2 border-slate-500 
                                       hover:border-sky-400 hover:bg-sky-500/10
                                       transition-all duration-200 flex items-center justify-center">
                        </div>
                      </motion.button>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-medium text-slate-200 truncate">{item.name}</p>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${config.badge} capitalize`}>
                            {item.priority}
                          </span>
                          {item.priority === 'high' && <Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
                          {item.link && (
                            <a 
                              href={item.link} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-sky-400 hover:text-sky-300 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                      <span className="text-lg font-semibold text-sky-400 shrink-0">
                        {formatCurrency(item.price)}
                      </span>
                      <motion.button
                        onClick={() => deleteItem(item.id)}
                        className="p-2 rounded-lg text-red-400/60 hover:text-red-400 
                                   hover:bg-red-500/10 transition-all shrink-0
                                   opacity-0 group-hover:opacity-100"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Purchased Items */}
        {purchasedItems.length > 0 && (
          <motion.div 
            className="glass-card rounded-2xl p-6 border border-emerald-500/20 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
            
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-emerald-400">
                  Purchased ({purchasedItems.length})
                </h2>
              </div>
              <span className="text-emerald-400 font-semibold">{formatCurrency(getPurchasedTotal())}</span>
            </div>
            
            <div className="space-y-3">
              {purchasedItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="group flex items-center gap-4 p-4 rounded-xl 
                             bg-emerald-500/5 border border-emerald-500/20"
                >
                  <motion.button
                    onClick={() => togglePurchased(item.id)}
                    className="shrink-0"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 
                                   flex items-center justify-center shadow-lg shadow-emerald-500/30">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </motion.button>
                  <p className="flex-1 font-medium line-through text-slate-500 truncate">{item.name}</p>
                  <span className="text-slate-500 line-through shrink-0">
                    {formatCurrency(item.price)}
                  </span>
                  <motion.button
                    onClick={() => deleteItem(item.id)}
                    className="p-2 rounded-lg text-red-400/40 hover:text-red-400 
                               hover:bg-red-500/10 transition-all shrink-0
                               opacity-0 group-hover:opacity-100"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
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
            transition={{ delay: 0.2 }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <ShoppingCart className="w-20 h-20 text-rose-500/30 mx-auto mb-6" />
            </motion.div>
            <p className="text-xl text-slate-400">Your wishlist is empty</p>
            <p className="text-sm text-slate-600 mt-2">Add items you want to buy in the future</p>
          </motion.div>
        )}

        {/* Footer */}
        <motion.footer 
          className="text-center pt-8 pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
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
