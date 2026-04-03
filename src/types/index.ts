export type TransactionCategory = 'Housing' | 'Food' | 'Transport' | 'Entertainment' | 'Income' | 'Utilities';
export type TransactionType = 'income' | 'expense';

export type Transaction = {
  id: string;
  date: string; // YYYY-MM-DD
  amount: number;
  category: TransactionCategory;
  type: TransactionType;
  description: string;
};

export type Role = 'viewer' | 'admin';
export type SortOption = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc';

export interface FinanceState {
  transactions: Transaction[];
  role: Role;
  filters: {
    search: string;
    category: string;
    sort: SortOption;
  };
}

export type FinanceAction =
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'SET_ROLE'; payload: Role }
  | { type: 'SET_FILTERS'; payload: Partial<FinanceState['filters']> };
