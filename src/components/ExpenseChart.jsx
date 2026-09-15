import React from 'react';
import Chart from 'react-apexcharts';
import { CATEGORIES } from '../data/categories';
import { PieChart } from 'lucide-react';

export default function ExpenseChart({ transactions }) {
  const expenseTransactions = transactions.filter((t) => t.type === 'expense');

  const series = CATEGORIES.map((cat) => {
    return expenseTransactions
      .filter((t) => t.category === cat.name)
      .reduce((acc, t) => acc + t.amount, 0);
  });

  const labels = CATEGORIES.map((cat) => cat.name);
  const colors = CATEGORIES.map((cat) => cat.color);

  const hasData = series.some((val) => val > 0);

  const options = {
    chart: {
      type: 'donut',
      fontFamily: 'inherit',
    },
    labels: labels,
    colors: colors,
    legend: {
      position: 'bottom',
      fontSize: '12px',
      markers: {
        width: 10,
        height: 10,
        radius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Expenses',
              fontSize: '14px',
              fontWeight: 600,
              color: '#64748b',
              formatter: function (w) {
                const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total);
              }
            }
          }
        }
      }
    },
    stroke: {
      show: true,
      colors: ['#ffffff'],
      width: 2,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <PieChart className="w-4 h-4" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Expenses by Category</h3>
        </div>
        <p className="text-xs text-slate-500 mb-4">Distribution of spending across categories</p>
      </div>

      <div className="flex items-center justify-center py-2">
        {hasData ? (
          <div className="w-full">
            <Chart options={options} series={series} type="donut" height={280} />
          </div>
        ) : (
          <div className="py-16 text-center text-slate-400 text-xs">
            No expense data available to display chart.
          </div>
        )}
      </div>
    </div>
  );
}


