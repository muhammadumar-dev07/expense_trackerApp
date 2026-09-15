import React, { useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, Trash2, Search, Receipt } from 'lucide-react';

export default function TransactionList({ transactions, onDeleteTransaction }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = transactions.filter((t) => {
    const f = filter === 'all' || t.type === filter;
    const s = t.description.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
    return f && s;
  });

  const fmt = (amt, type) => {
    const str = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amt);
    return type === 'income' ? `+${str}` : `-${str}`;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Recent Transactions</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-3.5 h-3.5" />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 w-36"
            />
          </div>
          <div className="inline-flex rounded-lg border border-slate-300 bg-slate-50 p-0.5 text-xs font-medium">
            <button onClick={() => setFilter('all')} className={`px-2.5 py-1 rounded-md ${filter === 'all' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'}`}>All</button>
            <button onClick={() => setFilter('income')} className={`px-2.5 py-1 rounded-md ${filter === 'income' ? 'bg-white text-emerald-700 shadow-xs font-semibold' : 'text-slate-600'}`}>Income</button>
            <button onClick={() => setFilter('expense')} className={`px-2.5 py-1 rounded-md ${filter === 'expense' ? 'bg-white text-rose-700 shadow-xs font-semibold' : 'text-slate-600'}`}>Exp</button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        {filtered.length === 0 ? (
          <div className="py-12 px-4 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <Receipt className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-slate-800 mb-1">No transactions found</h4>
            <p className="text-xs text-slate-500">No records match criteria.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold text-xs uppercase tracking-wider">
                <th className="py-3 px-6">Transaction</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6 text-right">Amount</th>
                <th className="py-3.5 px-6 text-center w-16">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {filtered.map((tx) => {
                const isInc = tx.type === 'income';
                return (
                  <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${isInc ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                          {isInc ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 leading-snug">{tx.description}</p>
                          <span className="sm:hidden text-xs text-slate-500">{tx.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 hidden sm:table-cell">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {tx.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-500 font-medium">{tx.date}</td>
                    <td className={`py-4 px-6 text-right font-bold tracking-tight ${isInc ? 'text-emerald-600' : 'text-slate-900'}`}>
                      {fmt(tx.amount, tx.type)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button onClick={() => onDeleteTransaction(tx.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

