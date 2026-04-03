import { useState } from 'react';
import { FinanceProvider, useFinance } from './context/FinanceContext';
import { Layout } from './components/layout/Layout';
import { SummaryCards } from './components/dashboard/SummaryCards';
import { Charts } from './components/dashboard/Charts';
import { Insights } from './components/dashboard/Insights';
import { TransactionControls } from './components/transactions/TransactionControls';
import { TransactionTable } from './components/transactions/TransactionTable';
import { AddTransactionModal } from './components/transactions/AddTransactionModal';
import { Plus } from 'lucide-react';

function Dashboard() {
  const { state } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto pb-12 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Overview</h2>
            <p className="text-slate-500 dark:text-slate-400">Welcome back. Here is your latest financial summary.</p>
          </div>
          {state.role === 'admin' && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              Add Transaction
            </button>
          )}
        </div>

        <SummaryCards />
        <Insights />
        <Charts />

        <div id="transactions" className="mt-12 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Recent Transactions</h2>
              <p className="text-slate-500 dark:text-slate-400">Review and manage your latest financial activities.</p>
            </div>
          </div>
          
          <TransactionControls />
          <TransactionTable />
        </div>

        <AddTransactionModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </div>
    </Layout>
  );
}

function App() {
  return (
    <FinanceProvider>
      <Dashboard />
    </FinanceProvider>
  );
}

export default App;
