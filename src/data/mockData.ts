import type { Transaction } from '../types';

export const mockTransactions: Transaction[] = [
  { id: '1', date: '2023-10-01', amount: 5000, category: 'Income', type: 'income', description: 'Salary' },
  { id: '2', date: '2023-10-02', amount: 1200, category: 'Housing', type: 'expense', description: 'Rent' },
  { id: '3', date: '2023-10-05', amount: 150, category: 'Utilities', type: 'expense', description: 'Electric Bill' },
  { id: '4', date: '2023-10-08', amount: 80, category: 'Food', type: 'expense', description: 'Groceries' },
  { id: '5', date: '2023-10-10', amount: 200, category: 'Transport', type: 'expense', description: 'Gas & Car Wash' },
  { id: '6', date: '2023-10-12', amount: 100, category: 'Entertainment', type: 'expense', description: 'Movie Night' },
  { id: '7', date: '2023-10-15', amount: 85, category: 'Utilities', type: 'expense', description: 'Internet Bill' },
  { id: '8', date: '2023-10-18', amount: 300, category: 'Food', type: 'expense', description: 'Groceries & Dining' },
  { id: '9', date: '2023-10-20', amount: 400, category: 'Income', type: 'income', description: 'Freelance Work' },
  { id: '10', date: '2023-10-22', amount: 120, category: 'Entertainment', type: 'expense', description: 'Concert Tickets' },
  { id: '11', date: '2023-10-25', amount: 60, category: 'Transport', type: 'expense', description: 'Train Pass' },
  { id: '12', date: '2023-10-28', amount: 90, category: 'Food', type: 'expense', description: 'Groceries' },
  { id: '13', date: '2023-11-01', amount: 5000, category: 'Income', type: 'income', description: 'Salary' },
  { id: '14', date: '2023-11-03', amount: 1200, category: 'Housing', type: 'expense', description: 'Rent' },
  { id: '15', date: '2023-11-06', amount: 140, category: 'Utilities', type: 'expense', description: 'Water & Electric' },
  { id: '16', date: '2023-11-09', amount: 250, category: 'Food', type: 'expense', description: 'Supermarket' },
  { id: '17', date: '2023-11-12', amount: 50, category: 'Entertainment', type: 'expense', description: 'Video Games' },
  { id: '18', date: '2023-11-15', amount: 75, category: 'Transport', type: 'expense', description: 'Uber Rides' },
  { id: '19', date: '2023-11-18', amount: 800, category: 'Income', type: 'income', description: 'Bonus' },
  { id: '20', date: '2023-11-20', amount: 320, category: 'Housing', type: 'expense', description: 'Furniture' },
];
