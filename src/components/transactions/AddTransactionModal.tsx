import { useState } from 'react';
import type { FormEvent } from 'react';
import { useFinance } from '../../context/FinanceContext';
import type { TransactionCategory, TransactionType } from '../../types';
import { X, Plus, DollarSign, Calendar, Tag, AlignLeft } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTransactionModal({ isOpen, onClose }: Props) {
  const { dispatch } = useFinance();
  
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState<TransactionCategory>('Housing');
  const [type, setType] = useState<TransactionType>('expense');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !date) return;

    const newTx = {
      id: Math.random().toString(36).substring(2, 12),
      description,
      amount: parseFloat(amount),
      date,
      category,
      type
    };

    dispatch({ type: 'ADD_TRANSACTION', payload: newTx });
    
    // Reset and close
    setDescription('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    setCategory('Housing');
    setType('expense');
    onClose();
  };

  const categories: TransactionCategory[] = ['Housing', 'Food', 'Transport', 'Entertainment', 'Income', 'Utilities'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative glass-modal rounded-[2rem] w-full max-w-md overflow-hidden"
          >
            <div className="flex items-center justify-between px-8 py-7 border-b border-white/40 dark:border-slate-700/50 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md">
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight drop-shadow-sm">New Transaction</h3>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-1.5">Fill in the details below to add a record.</p>
              </div>
              <button 
                onClick={onClose} 
                className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-700 p-2.5 rounded-full transition-colors shadow-sm ring-1 ring-slate-200/50 dark:ring-white/10 self-start backdrop-blur-md"
              >
                <X className="w-5 h-5 stroke-[2.5px]" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white/10 dark:bg-slate-900/20 backdrop-blur-3xl">
              {/* Type Switcher */}
              <div className="glass-input p-1.5 rounded-2xl flex gap-1 shadow-inner relative z-10">
                <button
                  type="button"
                  className={cn("flex-1 py-3 text-[15px] font-black tracking-wide rounded-xl transition-all duration-300", type === 'expense' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200/50 dark:ring-white/5' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300')}
                  onClick={() => { setType('expense'); setCategory('Housing'); }}
                >
                  Expense
                </button>
                <button
                  type="button"
                  className={cn("flex-1 py-3 text-[15px] font-black tracking-wide rounded-xl transition-all duration-300", type === 'income' ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300')}
                  onClick={() => { setType('income'); setCategory('Income'); }}
                >
                  Income
                </button>
              </div>
              
              <div className="space-y-5">
                {/* Description */}
                <div className="relative group">
                  <label className="block text-[11px] font-extrabold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-2">Description</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <AlignLeft className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    </div>
                    <input 
                      type="text" required
                      className="glass-input w-full pl-12 pr-4 py-3.5 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all font-bold sm:text-[15px] shadow-sm"
                      value={description} onChange={(e) => setDescription(e.target.value)}
                      placeholder="e.g. Weekly Groceries"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  {/* Amount */}
                  <div className="relative group">
                    <label className="block text-[11px] font-extrabold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-2">Amount</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                      </div>
                      <input 
                        type="number" required min="0.01" step="0.01"
                        className="glass-input w-full pl-12 pr-4 py-3.5 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all font-black sm:text-[15px] shadow-sm"
                        value={amount} onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  
                  {/* Date */}
                  <div className="relative group">
                    <label className="block text-[11px] font-extrabold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-2">Date</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Calendar className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                      </div>
                      <input 
                        type="date" required
                        className="glass-input w-full pl-10 pr-4 py-3.5 rounded-2xl text-slate-900 dark:text-white focus:outline-none transition-all font-bold sm:text-[15px] shadow-sm cursor-text"
                        value={date} onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="relative group">
                  <label className="block text-[11px] font-extrabold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-2">Category</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Tag className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    </div>
                    <select 
                      className="glass-input w-full pl-12 pr-10 py-3.5 rounded-2xl text-slate-900 dark:text-white focus:outline-none disabled:opacity-60 transition-all font-bold sm:text-[15px] shadow-sm cursor-pointer appearance-none"
                      value={category} onChange={(e) => setCategory(e.target.value as TransactionCategory)}
                      disabled={type === 'income'}
                    >
                      {categories.filter(cat => type === 'income' ? cat === 'Income' : cat !== 'Income').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex gap-4">
                <button 
                  type="button" 
                  onClick={onClose}
                  className="px-6 py-4 text-[15px] font-bold text-slate-600 dark:text-slate-300 bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-700/80 rounded-2xl transition-colors flex-1 backdrop-blur-md shadow-sm border border-white/40 dark:border-white/10"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-4 text-[15px] font-black text-white bg-indigo-600 hover:bg-indigo-500 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:shadow-indigo-500/30 active:scale-[0.98] flex-auto flex items-center justify-center gap-2 border border-indigo-400/50"
                >
                  <Plus className="w-5 h-5 stroke-[3px]" />
                  Add Transaction
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
