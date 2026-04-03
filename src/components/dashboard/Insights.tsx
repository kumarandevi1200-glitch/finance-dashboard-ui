import { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Lightbulb, TrendingDown, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export function Insights() {
  const { state } = useFinance();

  const insights = useMemo(() => {
    const expenses = state.transactions.filter(t => t.type === 'expense');
    if (expenses.length === 0) return null;

    const catMap = new Map<string, number>();
    let totalExpense = 0;
    
    expenses.forEach(t => {
      catMap.set(t.category, (catMap.get(t.category) || 0) + t.amount);
      totalExpense += t.amount;
    });
    
    let highestCategory = { name: '', amount: 0 };
    catMap.forEach((amount, name) => {
      if (amount > highestCategory.amount) {
        highestCategory = { name, amount };
      }
    });
    
    const largestSingleExpense = expenses.reduce((max, obj) => obj.amount > max.amount ? obj : max, expenses[0]);
    
    const percentage = ((highestCategory.amount / totalExpense) * 100).toFixed(0);

    return {
      highestCategory,
      largestSingleExpense,
      percentage,
      totalExpense
    };
  }, [state.transactions]);

  if (!insights) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
      className="glass-card rounded-3xl p-8 mb-8 flex flex-col md:flex-row gap-8 items-start md:items-center"
    >
      <div className="flex-shrink-0 bg-white/60 dark:bg-slate-900/50 p-4 rounded-full border border-white/60 dark:border-white/10 text-indigo-600 dark:text-indigo-400 shadow-inner backdrop-blur-md">
        <Lightbulb className="w-8 h-8" strokeWidth={1.5} />
      </div>
      <div className="flex-1">
        <h3 className="text-[13px] font-bold text-slate-500 dark:text-slate-400 mb-1.5 tracking-wider uppercase drop-shadow-sm">AI Spending Insights</h3>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[16px]">
          You spent <strong className="font-extrabold text-slate-900 dark:text-white px-1 relative z-10 before:absolute before:inset-0 before:bg-indigo-100 dark:before:bg-indigo-900/40 before:rounded-md before:z-[-1] before:-inset-y-0.5">{insights.percentage}%</strong> of your money on <strong className="font-extrabold text-slate-900 dark:text-white">{insights.highestCategory.name}</strong> this month. 
          Your most prominent single expense was <span className="font-semibold text-slate-800 dark:text-slate-200">{insights.largestSingleExpense.description}</span>.
        </p>
      </div>
      <div className="flex-shrink-0 flex gap-4 w-full md:w-auto">
        <div className="flex items-start gap-4 bg-white/40 dark:bg-slate-900/50 px-6 py-5 rounded-2xl border border-white/60 dark:border-white/10 shadow-sm flex-1 backdrop-blur-sm">
          <div className="bg-rose-100/80 dark:bg-rose-900/40 p-2.5 rounded-xl border border-rose-200/50 dark:border-rose-800/50">
            <TrendingDown className="w-5 h-5 text-rose-600 dark:text-rose-400" />
          </div>
          <div>
            <span className="text-slate-400 dark:text-slate-500 block text-xs font-bold tracking-wider uppercase mb-1 drop-shadow-sm">Top Category</span>
            <span className="font-extrabold text-slate-900 dark:text-white text-xl tracking-tight drop-shadow-sm">${insights.highestCategory.amount.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex items-start gap-4 bg-white/40 dark:bg-slate-900/50 px-6 py-5 rounded-2xl border border-white/60 dark:border-white/10 shadow-sm flex-1 backdrop-blur-sm">
          <div className="bg-slate-200/80 dark:bg-slate-700/60 p-2.5 rounded-xl border border-slate-300/50 dark:border-slate-600/50">
            <Layers className="w-5 h-5 text-slate-700 dark:text-slate-300" />
          </div>
          <div>
            <span className="text-slate-400 dark:text-slate-500 block text-xs font-bold tracking-wider uppercase mb-1 drop-shadow-sm">Largest Expense</span>
            <span className="font-extrabold text-slate-900 dark:text-white text-xl tracking-tight drop-shadow-sm">${insights.largestSingleExpense.amount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
