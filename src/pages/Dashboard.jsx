import React from 'react';
import Navbar from '../components/Navbar';
import SummaryCards from '../components/SummaryCards';
import IncomeForm from '../components/IncomeForm';
import ExpenseForm from '../components/ExpenseForm';
import TransactionList from '../components/TransactionList';
import CategoryList from '../components/CategoryList';
import ExpenseChart from '../components/ExpenseChart';
import IncomeExpenseChart from '../components/IncomeExpenseChart';

export default function Dashboard({
  transactions,
  totalIncome,
  totalExpenses,
  balance,
  onAddIncome,
  onAddExpense,
  onDeleteTransaction,
  onResetData,
}) {
  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans antialiased pb-16">
      <Navbar onResetData={onResetData} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Welcome Banner */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Financial Dashboard</h2>
          <p className="text-sm text-slate-500 mt-0.5">Track your income, monitor spending categories, and achieve your financial goals.</p>
        </div>

        {/* Summary Cards */}
        <SummaryCards
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          balance={balance}
        />

        {/* Income & Expense Forms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <IncomeForm onAddIncome={onAddIncome} />
          <ExpenseForm onAddExpense={onAddExpense} />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ExpenseChart transactions={transactions} />
          <IncomeExpenseChart totalIncome={totalIncome} totalExpenses={totalExpenses} />
        </div>

        {/* Categories & Transactions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <CategoryList transactions={transactions} />
          </div>
          <div className="lg:col-span-2">
            <TransactionList
              transactions={transactions}
              onDeleteTransaction={onDeleteTransaction}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

