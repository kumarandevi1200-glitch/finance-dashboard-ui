import { useFinance } from '../../context/FinanceContext';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { motion } from 'framer-motion';

export function TransactionControls() {
  const { state, dispatch } = useFinance();

  const categories = ['All', 'Housing', 'Food', 'Transport', 'Entertainment', 'Utilities', 'Income'];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
      className="glass-card p-6 rounded-3xl mb-6 flex flex-col md:flex-row gap-5 items-center justify-between"
    >
      <div className="relative w-full md:w-[400px] flex-shrink-0 group">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
        </div>
        <input
          type="text"
          className="glass-input block w-full pl-12 pr-5 py-3 rounded-2xl leading-5 text-slate-900 dark:text-slate-100 placeholder-slate-400 font-medium sm:text-[15px]"
          placeholder="Search transactions..."
          value={state.filters.search}
          onChange={(e) => dispatch({ type: 'SET_FILTERS', payload: { search: e.target.value } })}
        />
      </div>

      <div className="flex w-full md:w-auto flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:w-56 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <SlidersHorizontal className="h-4 w-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
          </div>
          <select
            className="glass-input block w-full pl-11 pr-11 py-3 rounded-2xl leading-5 text-slate-700 dark:text-slate-300 cursor-pointer appearance-none font-medium sm:text-[15px] relative"
            value={state.filters.category || 'All'}
            onChange={(e) => dispatch({ type: 'SET_FILTERS', payload: { category: e.target.value === 'All' ? '' : e.target.value } })}
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-10">
             <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>

        <div className="relative w-full md:w-60 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <ArrowUpDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
          </div>
          <select
            className="glass-input block w-full pl-11 pr-11 py-3 rounded-2xl leading-5 text-slate-700 dark:text-slate-300 cursor-pointer appearance-none font-medium sm:text-[15px] relative"
            value={state.filters.sort}
            onChange={(e) => dispatch({ type: 'SET_FILTERS', payload: { sort: e.target.value as any } })}
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Amount: High to Low</option>
            <option value="amount-asc">Amount: Low to High</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-10">
             <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
