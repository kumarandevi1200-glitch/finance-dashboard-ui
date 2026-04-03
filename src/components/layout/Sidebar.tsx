
import { cn } from '../../lib/utils';
import { Home, Receipt, Settings, PieChart, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const navItems = [
    { icon: Home, label: 'Overview', href: '#' },
    { icon: Receipt, label: 'Transactions', href: '#transactions' },
    { icon: PieChart, label: 'Budgets', href: '#' },
    { icon: Settings, label: 'Settings', href: '#' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-700 bg-emerald-600 dark:bg-emerald-800">
          <span className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <PieChart className="w-6 h-6 text-emerald-100" /> FinCenter
          </span>
          <button className="md:hidden text-emerald-100 hover:text-white" onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="p-4 space-y-1">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                idx === 0 
                  ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <item.icon className={cn("w-5 h-5", idx === 0 ? "text-emerald-500" : "")} />
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
