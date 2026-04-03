import { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { motion } from 'framer-motion';

export function Charts() {
  const { state } = useFinance();

  const timeData = useMemo(() => {
    const monthlyMap = new Map<string, { name: string; income: number; expense: number }>();
    state.transactions.forEach(t => {
      const date = new Date(t.date);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      const key = `${month} ${year}`;
      
      if (!monthlyMap.has(key)) {
        monthlyMap.set(key, { name: key, income: 0, expense: 0 });
      }
      
      if (t.type === 'income') {
        monthlyMap.get(key)!.income += t.amount;
      } else {
        monthlyMap.get(key)!.expense += t.amount;
      }
    });

    return Array.from(monthlyMap.values()).reverse();
  }, [state.transactions]);

  const categoryData = useMemo(() => {
    const expenses = state.transactions.filter(t => t.type === 'expense');
    const catMap = new Map<string, number>();
    expenses.forEach(t => {
      catMap.set(t.category, (catMap.get(t.category) || 0) + t.amount);
    });
    return Array.from(catMap.entries()).map(([name, value]) => ({ name, value })).sort((a,b)=> b.value - a.value);
  }, [state.transactions]);

  const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6', '#cbd5e1'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Area Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
        className="lg:col-span-2 glass-card rounded-3xl p-8 relative"
      >
        <h3 className="text-[15px] font-bold tracking-wide uppercase text-slate-500 dark:text-slate-400 mb-6 drop-shadow-sm">Balance Trend</h3>
        <div className="h-[300px] w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timeData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748b" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 600}} dy={15} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 600}} tickFormatter={(val) => `$${val}`} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', padding: '16px', color: '#0f172a' }}
                itemStyle={{ fontWeight: 700 }}
                formatter={(value: any) => `$${Number(value).toLocaleString()}`}
              />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '13px', fontWeight: 600, color: '#64748b' }} />
              <Area type="monotone" dataKey="income" name="Income" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorIncome)" />
              <Area type="monotone" dataKey="expense" name="Expenses" stroke="#64748b" strokeWidth={4} fillOpacity={1} fill="url(#colorExpense)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
      
      {/* Donut Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
        className="glass-card rounded-3xl p-8 relative"
      >
        <h3 className="text-[15px] font-bold tracking-wide uppercase text-slate-500 dark:text-slate-400 mb-6 drop-shadow-sm">Spending Breakdown</h3>
        <div className="h-[300px] w-full relative">
          {categoryData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="45%"
                    innerRadius={80}
                    outerRadius={105}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={6}
                  >
                    {categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => `$${Number(value).toLocaleString()}`}
                    contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
                    itemStyle={{ color: '#0f172a', fontWeight: 700 }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-12 text-center drop-shadow-sm">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5">Total</span>
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  ${categoryData.reduce((acc, c) => acc + c.value, 0).toLocaleString()}
                </span>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 font-semibold text-sm">
              No expenses to show
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
