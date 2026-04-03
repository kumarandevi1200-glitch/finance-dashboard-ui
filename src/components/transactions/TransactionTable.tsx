import { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Trash2, Inbox } from 'lucide-react';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export function TransactionTable() {
  const { state, dispatch } = useFinance();

  const filteredTransactions = useMemo(() => {
    let result = [...state.transactions];

    if (state.filters.search) {
      const q = state.filters.search.toLowerCase();
      result = result.filter(t => t.description.toLowerCase().includes(q));
    }

    if (state.filters.category) {
      result = result.filter(t => t.category === state.filters.category);
    }

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      
      switch (state.filters.sort) {
        case 'date-desc': return dateB !== dateA ? dateB - dateA : b.amount - a.amount;
        case 'date-asc': return dateA !== dateB ? dateA - dateB : a.amount - b.amount;
        case 'amount-desc': return b.amount - a.amount;
        case 'amount-asc': return a.amount - b.amount;
        default: return 0;
      }
    });

    return result;
  }, [state.transactions, state.filters]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }
  };

  if (filteredTransactions.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
        className="glass-card rounded-3xl p-16 text-center shadow-sm flex flex-col items-center justify-center"
      >
        <div className="w-20 h-20 bg-white/40 dark:bg-slate-900/40 rounded-3xl flex items-center justify-center mb-6 backdrop-blur-xl shadow-inner border border-white/60 dark:border-white/10">
          <Inbox className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white drop-shadow-sm mb-1">No results found</h3>
        <p className="mt-2 text-[15px] font-semibold text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">Try adjusting your search criteria or category filter to find what you're looking for.</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
      className="glass-card rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/50 dark:border-slate-700/50 overflow-hidden relative"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-white/40 dark:bg-slate-900/40 border-b border-white/60 dark:border-slate-700/50 backdrop-blur-md">
              <th className="py-5 px-7 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Date</th>
              <th className="py-5 px-7 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Description</th>
              <th className="py-5 px-7 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Category</th>
              <th className="py-5 px-7 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-right">Amount</th>
              {state.role === 'admin' && (
                <th className="py-5 px-7 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-right pr-9">Actions</th>
              )}
            </tr>
          </thead>
          <motion.tbody 
            initial="hidden" animate="show"
            variants={{ show: { transition: { staggerChildren: 0.05 } } }}
            className="divide-y divide-slate-200/40 dark:divide-slate-700/30"
          >
            {filteredTransactions.map((t) => (
              <motion.tr 
                key={t.id} 
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 350, damping: 25 } } }}
                whileHover={{ scale: 1.002, backgroundColor: 'rgba(255, 255, 255, 0.4)', transition: { duration: 0.2 } }}
                className="group relative transition-colors duration-200 dark:hover:bg-slate-800/50 backdrop-blur-sm"
              >
                <td className="py-5 px-7 text-[15px] font-bold text-slate-500 dark:text-slate-400">
                  {format(new Date(t.date), 'MMM dd, yyyy')}
                </td>
                <td className="py-5 px-7 text-[15px] font-extrabold text-slate-800 dark:text-slate-200 tracking-tight">
                  {t.description}
                </td>
                <td className="py-5 px-7">
                  <span className={cn(
                    "inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold tracking-wider uppercase border shadow-sm backdrop-blur-sm",
                    t.type === 'income' ? "bg-emerald-50/80 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50" : "bg-slate-100/80 text-slate-700 border-slate-200 dark:bg-slate-800/80 dark:text-slate-300 dark:border-slate-700"
                  )}>
                    {t.category}
                  </span>
                </td>
                <td className={cn(
                  "py-5 px-7 text-base font-black text-right tracking-tight drop-shadow-sm",
                  t.type === 'income' ? "text-emerald-600 dark:text-emerald-400" : "text-slate-800 dark:text-slate-100"
                )}>
                  {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                {state.role === 'admin' && (
                  <td className="py-5 px-7 text-right pr-6">
                    <button 
                      onClick={() => handleDelete(t.id)}
                      className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all p-2.5 rounded-xl hover:bg-rose-100/80 dark:hover:bg-rose-900/40 ml-auto block shadow-sm border border-transparent hover:border-rose-200 dark:hover:border-rose-800/50"
                      title="Delete Transaction"
                    >
                      <Trash2 className="w-5 h-5" strokeWidth={2.5} />
                    </button>
                  </td>
                )}
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    </motion.div>
  );
}
