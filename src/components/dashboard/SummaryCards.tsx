import { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { ArrowDownRight, ArrowUpRight, TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
};

export function SummaryCards() {
  const { state } = useFinance();
  
  const { totalIncome, totalExpense, netBalance } = useMemo(() => {
    return state.transactions.reduce(
      (acc, curr) => {
        if (curr.type === 'income') {
          acc.totalIncome += curr.amount;
        } else {
          acc.totalExpense += curr.amount;
        }
        acc.netBalance = acc.totalIncome - acc.totalExpense;
        return acc;
      },
      { totalIncome: 0, totalExpense: 0, netBalance: 0 }
    );
  }, [state.transactions]);

  const cards = [
    { title: 'Total Balance', amount: netBalance, trend: '+4.5%', trendType: 'positive', icon: TrendingUp },
    { title: 'Total Income', amount: totalIncome, trend: '+12.5%', trendType: 'positive', icon: ArrowUpRight },
    { title: 'Total Expenses', amount: totalExpense, trend: '-2.4%', trendType: 'negative', icon: ArrowDownRight },
  ];

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
    >
      {cards.map((card, idx) => (
        <motion.div 
          key={idx} 
          variants={item}
          className="glass-card rounded-3xl p-8 relative overflow-hidden group"
        >
          {/* subtle background glow */}
          <div className={cn("absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none transition-opacity group-hover:opacity-40", card.trendType === 'positive' ? 'bg-emerald-500' : 'bg-rose-500')} />

          <div className="flex items-center justify-between mb-6 relative z-10">
            <h3 className="text-[15px] font-bold tracking-wide uppercase text-slate-500 dark:text-slate-400 drop-shadow-sm">{card.title}</h3>
            <div className="p-3 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-white/60 dark:border-white/10 shadow-sm">
              <card.icon className="w-5 h-5 text-slate-700 dark:text-slate-200" />
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-4xl font-extrabold tracking-tighter text-slate-900 dark:text-white mb-4 drop-shadow-sm">
              ${card.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className={cn("text-xs font-bold flex items-center gap-2", card.trendType === 'positive' ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-300')}>
              <span className={cn("px-2 py-1 rounded-lg backdrop-blur-md shadow-sm", card.trendType === 'positive' ? 'bg-emerald-100/80 dark:bg-emerald-900/40 ring-1 ring-emerald-500/20' : 'bg-slate-200/80 dark:bg-slate-800/60 ring-1 ring-slate-500/20')}>
                {card.trend}
              </span>
              <span className="text-slate-500 dark:text-slate-400 font-semibold tracking-wide">vs last month</span>
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
