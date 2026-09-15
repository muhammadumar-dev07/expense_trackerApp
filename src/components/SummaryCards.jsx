import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function SummaryCards({ totalIncome, totalExpenses, balance }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      {/* Total Income Card */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-slate-600">Total Income</span>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <ArrowDownLeft className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {formatCurrency(totalIncome)}
          </h2>
        </div>
      </div>

      {/* Total Expenses Card */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-slate-600">Total Expenses</span>
          <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {formatCurrency(totalExpenses)}
          </h2>
        </div>
      </div>

      {/* Current Balance Card */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-slate-600">Current Balance</span>
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
            balance >= 0 
              ? 'bg-indigo-50 text-indigo-600 border-indigo-100' 
              : 'bg-amber-50 text-amber-600 border-amber-100'
          }`}>
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <h2 className={`text-2xl font-bold tracking-tight ${balance >= 0 ? 'text-slate-900' : 'text-amber-600'}`}>
            {formatCurrency(balance)}
          </h2>
          <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded ${
            balance >= 0 ? 'text-indigo-600 bg-indigo-50' : 'text-amber-600 bg-amber-50'
          }`}>
            {balance >= 0 ? 'Healthy' : 'Deficit'}
          </span>
        </div>
      </div>
    </div>
  );
}

