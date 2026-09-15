import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';

const INITIAL_TRANSACTIONS = [
  { id: '1', type: 'income', amount: 4500.00, category: 'Salary', description: 'Monthly Salary', date: '2026-03-01' },
  { id: '2', type: 'expense', amount: 125.50, category: 'Food & Dining', categoryId: 'food', description: 'Grocery Shopping at Trader Joes', date: '2026-03-03' },
  { id: '3', type: 'expense', amount: 85.20, category: 'Bills & Utilities', categoryId: 'bills', description: 'Electricity and Internet Bill', date: '2026-03-05' },
  { id: '4', type: 'income', amount: 850.00, category: 'Freelance', description: 'UI Design Client Project', date: '2026-03-08' },
  { id: '5', type: 'expense', amount: 48.00, category: 'Food & Dining', categoryId: 'food', description: 'Dinner with Friends', date: '2026-03-10' },
  { id: '6', type: 'expense', amount: 65.00, category: 'Transport', categoryId: 'transport', description: 'Monthly Metro Pass', date: '2026-03-12' },
  { id: '7', type: 'expense', amount: 150.00, category: 'Education', categoryId: 'education', description: 'Advanced React Course', date: '2026-03-14' },
];

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('spendpulse_transactions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse transactions from localStorage', e);
      }
    }
    return INITIAL_TRANSACTIONS;
  });

  useEffect(() => {
    localStorage.setItem('spendpulse_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleAddIncome = (newIncome) => {
    setTransactions((prev) => [newIncome, ...prev]);
  };

  const handleAddExpense = (newExpense) => {
    setTransactions((prev) => [newExpense, ...prev]);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset to default demo data?')) {
      setTransactions(INITIAL_TRANSACTIONS);
      localStorage.removeItem('spendpulse_transactions');
    }
  };

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <Dashboard
      transactions={transactions}
      totalIncome={totalIncome}
      totalExpenses={totalExpenses}
      balance={balance}
      onAddIncome={handleAddIncome}
      onAddExpense={handleAddExpense}
      onDeleteTransaction={handleDeleteTransaction}
      onResetData={handleResetData}
    />
  );
}

export default App;

