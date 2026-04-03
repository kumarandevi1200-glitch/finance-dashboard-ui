import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { Menu, Moon, Sun } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import type { Role } from '../../types';
import { motion } from 'framer-motion';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export function Header({ setSidebarOpen }: HeaderProps) {
  const { state, dispatch } = useFinance();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <header className="h-20 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border-b border-white/40 dark:border-white/10 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 transition-all">
      <div className="flex items-center gap-4">
        <button 
          className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight hidden sm:block drop-shadow-sm">
          Dashboard Overview
        </h1>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        {/* Animated Segmented Role Switcher via Framer Motion */}
        <div className="hidden sm:flex bg-slate-200/50 dark:bg-slate-800/60 p-1 rounded-xl shadow-inner border border-white/40 dark:border-slate-700/50 relative backdrop-blur-md">
          {['viewer', 'admin'].map((r) => (
            <button 
              key={r}
              onClick={() => dispatch({ type: 'SET_ROLE', payload: r as Role })}
              className={`relative px-5 py-1.5 text-sm font-bold tracking-wide rounded-lg transition-colors duration-200 z-10 capitalize ${state.role === r ? 'text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
            >
              {state.role === r && (
                <motion.div
                  layoutId="role-indicator"
                  className="absolute inset-0 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-200/50 dark:border-slate-600/50 z-[-1]"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
              {r}
            </button>
          ))}
        </div>

        {/* Mobile Switcher Select */}
        <select 
          className="sm:hidden bg-slate-100/80 dark:bg-slate-800/80 text-sm font-bold text-slate-700 dark:text-slate-300 py-2 px-3 rounded-xl border border-white/40 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm backdrop-blur-md"
          value={state.role}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => dispatch({ type: 'SET_ROLE', payload: e.target.value as Role })}
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        <div className="w-px h-6 bg-slate-300 dark:bg-slate-700"></div>

        <button 
          onClick={toggleTheme}
          className="p-2.5 glass-card rounded-xl text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-amber-300"
          title="Toggle Dark Mode"
        >
          {isDark ? <Sun className="w-5 h-5 drop-shadow-[0_0_8px_rgba(252,211,77,0.5)]" /> : <Moon className="w-5 h-5 drop-shadow-[0_0_8px_rgba(79,70,229,0.3)]" />}
        </button>
      </div>
    </header>
  );
}
