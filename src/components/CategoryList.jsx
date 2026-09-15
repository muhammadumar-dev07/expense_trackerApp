import React from 'react';
import { CATEGORIES } from '../data/categories';
import { Tag, PieChart } from 'lucide-react';

export default function CategoryList({ transactions }) {
  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const categoryTotals = CATEGORIES.map((cat) => {
    const spent = transactions
      .filter((t) => t.type === 'expense' && t.category === cat.name)
      .reduce((acc, t) => acc + t.amount, 0);
    const percentage = totalExpenses > 0 ? (spent / totalExpenses) * 100 : 0;
    return {
      ...cat,
      spent,
      percentage,
    };
  }).filter((cat) => cat.spent > 0).sort((a, b) => b.spent - a.spent);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <PieChart className="w-4 h-4" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Category Spending</h3>
        </div>
        <span className="text-xs font-medium text-slate-500">
          Total: {formatCurrency(totalExpenses)}
        </span>
      </div>

      {categoryTotals.length === 0 ? (
        <div className="py-8 text-center text-slate-400 text-xs">
          No expense records available for category breakdown.
        </div>
      ) : (
        <div className="space-y-4">
          {categoryTotals.map((cat) => (
            <div key={cat.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className={`w-2.5 h-2.5 rounded-full`} style={{ backgroundColor: cat.color }}></span>
                  <span className="font-medium text-slate-800">{cat.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900">{formatCurrency(cat.spent)}</span>
                  <span className="text-slate-400 ml-1.5">({cat.percentage.toFixed(1)}%)</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

