import { useState } from 'react';
import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { motion, AnimatePresence } from 'framer-motion';

export function Layout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100/50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950 transition-colors flex text-slate-900 dark:text-slate-50 font-sans relative overflow-hidden">
      {/* Visual background decorators for glassmorphism pop */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 dark:bg-emerald-500/10 blur-[100px]" />
      </div>

      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col md:pl-64 min-w-0 transition-all z-10 relative">
        <Header setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-x-hidden max-w-7xl mx-auto w-full relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key="main-content"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
