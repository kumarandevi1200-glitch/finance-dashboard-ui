# Finance Dashboard UI

Build a modern, responsive, and interactive Finance Dashboard UI using React, Tailwind CSS, Recharts, and Lucide-React.

## Proposed Changes

### Configuration and Setup
- Scaffolding via Vite with React and TypeScript.
- Install and configure Tailwind CSS.
- Install `recharts`, `lucide-react`, `date-fns`, `clsx`, and `tailwind-merge`.

### Types and Data
#### [NEW] `src/types/index.ts`
- Define `Transaction` type.
- Define `State` and `Action` types for context.

#### [NEW] `src/data/mockData.ts`
- Generate 15-20 robust mock transactions with varied categories and dates.

### State Management
#### [NEW] `src/context/FinanceContext.tsx`
- Implement `Context` and `useReducer` to manage:
  - `transactions`
  - `role` ('viewer' | 'admin')
  - `filters` (search, category, sort)
  - `theme` ('light' | 'dark') for dark mode optional enhancement

### Component Architecture

#### [NEW] `src/components/layout/Layout.tsx`
- Main wrapper with Sidebar and Main content area.

#### [NEW] `src/components/layout/Sidebar.tsx`
- Left navigation menu, collapsible on mobile.

#### [NEW] `src/components/layout/Header.tsx`
- Top header with Title, Theme Toggle, and Role Switcher.

#### [NEW] `src/components/dashboard/SummaryCards.tsx`
- Calculate and display Net Balance, Total Income, and Total Expenses.

#### [NEW] `src/components/dashboard/Charts.tsx`
- Income vs Expenses Time-series Bar chart.
- Expense breakdown Pie/Doughnut chart.

#### [NEW] `src/components/dashboard/Insights.tsx`
- Dynamic calculation for Highest Spending Category, Largest Single Expense, and Observation Text.

#### [NEW] `src/components/transactions/TransactionControls.tsx`
- Search input, Category filter, and Sort toggle.

#### [NEW] `src/components/transactions/TransactionTable.tsx`
- Render the filtered list of transactions.
- Display "Delete" button if admin.

#### [NEW] `src/components/transactions/AddTransactionModal.tsx`
- Simple form to create a new transaction (Admin only).

#### [MODIFY] `src/App.tsx`
- Stitch layout, dashboard, and transaction components together wrapped in `FinanceProvider`.

## Verification Plan

### Automated/Manual Verification
- Run local dev server using `npm run dev`.
- Verify role switching behaves correctly (hides/shows admin controls).
- Test filtering and sorting in the Transaction section.
- Validate dynamic summary, insights, and charts calculation when a transaction is added or deleted.
- Test responsive layout on mobile screen dimensions.
