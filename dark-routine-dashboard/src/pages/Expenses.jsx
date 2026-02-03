import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Trash2, DollarSign, Calendar, TrendingDown, Wallet, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useExpenses } from '@/hooks/useExpenses';

export default function Expenses() {
  const { addExpense, deleteExpense, getExpensesForDate, getTotalForDate, getMonthlyTotal } = useExpenses();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const todayExpenses = getExpensesForDate(selectedDate);
  const todayTotal = getTotalForDate(selectedDate);
  const monthlyTotal = getMonthlyTotal(selectedDate.getFullYear(), selectedDate.getMonth());

  const handleAddExpense = (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (numAmount > 0 && description.trim()) {
      addExpense(numAmount, description.trim(), selectedDate);
      setAmount('');
      setDescription('');
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(num);
  };

  const navigateDate = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(newDate);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-8 relative overflow-hidden theme-transition">
      {/* Background Effects */}
      <div className="aurora-bg"></div>
      <div className="bg-cinematic"></div>
      <div className="flying-bats"></div>
      <div className="gotham-skyline"></div>
      <div className="gear-pattern"></div>
      <div className="bg-orb w-[500px] h-[500px] top-[-10%] right-[10%]"></div>
      <div className="bg-orb w-[400px] h-[400px] bottom-[20%] left-[10%]" style={{ animationDelay: '-7s' }}></div>

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
            className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/10 border border-emerald-500/30"
            animate={{ 
              boxShadow: ['0 0 20px rgba(16, 185, 129, 0.2)', '0 0 40px rgba(16, 185, 129, 0.4)', '0 0 20px rgba(16, 185, 129, 0.2)']
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Wallet className="w-6 h-6 text-emerald-400" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
              Expense Tracker
            </h1>
            <p className="text-sm text-slate-500">Track your spending</p>
          </div>
        </div>
      </motion.header>

      <div className="max-w-2xl mx-auto space-y-6 relative z-10">
        {/* Date Navigator */}
        <motion.div 
          className="glass-card rounded-2xl p-4 border border-slate-700/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => navigateDate(-1)}
              className="p-3 rounded-xl hover:bg-slate-800/50 transition-colors"
              whileHover={{ scale: 1.1, x: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5 text-slate-400" />
            </motion.button>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-emerald-400" />
              <span className="font-semibold text-slate-200">{formatDate(selectedDate)}</span>
            </div>
            <motion.button
              onClick={() => navigateDate(1)}
              className="p-3 rounded-xl hover:bg-slate-800/50 transition-colors"
              whileHover={{ scale: 1.1, x: 3 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </motion.button>
          </div>
        </motion.div>

        {/* Add Expense Form */}
        <motion.div 
          className="glass-card rounded-2xl p-6 border border-emerald-500/20 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
          
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-emerald-300">Add Expense</h2>
          </div>
          
          <form onSubmit={handleAddExpense} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-500 mb-2 block">Amount (₹)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50
                             focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 
                             outline-none transition-all duration-300 text-xl text-slate-200
                             placeholder:text-slate-600"
                  step="0.01"
                  min="0"
                />
              </div>
              <div>
                <label className="text-sm text-slate-500 mb-2 block">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What is it for?"
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50
                             focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 
                             outline-none transition-all duration-300 text-slate-200
                             placeholder:text-slate-600"
                />
              </div>
            </div>
            <motion.button
              type="submit"
              disabled={!amount || !description.trim()}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl
                        bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600
                        text-white font-semibold
                        disabled:opacity-50 disabled:cursor-not-allowed
                        hover:shadow-lg hover:shadow-emerald-500/25
                        transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Plus className="w-5 h-5" />
              <span>Add Expense</span>
            </motion.button>
          </form>
        </motion.div>

        {/* Expenses List */}
        <motion.div 
          className="glass-card rounded-2xl p-6 border border-sky-500/20 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />
          
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500">
                <TrendingDown className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-sky-300">Today's Expenses</h2>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
              {formatCurrency(todayTotal)}
            </span>
          </div>
          
          {todayExpenses.length === 0 ? (
            <div className="text-center py-10">
              <DollarSign className="w-12 h-12 text-slate-700 mx-auto mb-3" />
              <p className="text-slate-500">No expenses recorded for this day</p>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {todayExpenses.map((expense, index) => (
                  <motion.div
                    key={expense.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ delay: index * 0.05 }}
                    className="group flex items-center justify-between p-4 rounded-xl 
                               bg-slate-800/30 border border-slate-700/40
                               hover:border-sky-500/30 hover:bg-slate-800/50
                               transition-all duration-300"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-slate-200">{expense.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-semibold text-sky-400">
                        {formatCurrency(expense.amount)}
                      </span>
                      <motion.button
                        onClick={() => deleteExpense(expense.id, selectedDate)}
                        className="p-2 rounded-lg text-red-400/60 hover:text-red-400 
                                   hover:bg-red-500/10 transition-all
                                   opacity-0 group-hover:opacity-100"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Monthly Summary */}
        <motion.div 
          className="glass-card rounded-2xl p-6 border border-orange-500/20 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-slate-400">
                {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} Total
              </span>
            </div>
            <motion.span 
              className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {formatCurrency(monthlyTotal)}
            </motion.span>
          </div>
        </motion.div>

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
