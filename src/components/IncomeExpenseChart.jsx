import React from 'react';
import Chart from 'react-apexcharts';
import { BarChart3 } from 'lucide-react';

export default function IncomeExpenseChart({ totalIncome, totalExpenses }) {
  const series = [
    {
      name: 'Amount',
      data: [totalIncome, totalExpenses]
    }
  ];

  const options = {
    chart: {
      type: 'bar',
      fontFamily: 'inherit',
      toolbar: {
        show: false
      }
    },
    colors: ['#10b981', '#f43f5e'],
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 6,
        columnWidth: '45%',
        dataLabels: {
          position: 'top',
        },
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        fontWeight: 600,
        colors: ['#475569']
      }
    },
    xaxis: {
      categories: ['Total Income', 'Total Expenses'],
      labels: {
        style: {
          colors: ['#10b981', '#f43f5e'],
          fontSize: '13px',
          fontWeight: 600
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return `$${val}`;
        },
        style: {
          colors: '#64748b',
          fontSize: '11px'
        }
      }
    },
    grid: {
      borderColor: '#f1f5f9',
      strokeDashArray: 4,
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
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <BarChart3 className="w-4 h-4" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Income vs Expenses</h3>
        </div>
        <p className="text-xs text-slate-500 mb-4">Financial overview comparison</p>
      </div>

      <div className="py-2">
        <Chart options={options} series={series} type="bar" height={280} />
      </div>
    </div>
  );
}

