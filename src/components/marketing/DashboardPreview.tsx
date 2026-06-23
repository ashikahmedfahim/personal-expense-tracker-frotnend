"use client";

import { ArrowDownLeft, ArrowUpRight, PiggyBank } from "lucide-react";

import { BudgetOverviewChart } from "@/components/app/BudgetOverviewChart";
import { ExpenseLineChart } from "@/components/app/ExpenseLineChart";
import {
  showcaseDailyExpenses,
  showcaseExpenses,
  showcaseIncome,
  showcaseNetBalance,
  showcaseOverallBudget,
  showcaseRecentTransactions,
  showcaseSavings,
} from "@/content/showcase-data";
import { financeColors as fc } from "@/lib/finance-colors";
import { getFlowColor } from "@/lib/flow";
import { formatCurrency, formatDate, formatMonthYear, formatSignedCurrency } from "@/lib/format";

export function DashboardPreview() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-slate-500 sm:text-sm">Dashboard</p>
        <p className="text-base font-semibold text-slate-900 sm:text-lg">
          {formatMonthYear(new Date("2026-06-01"))} overview
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 sm:text-xs">
            <ArrowDownLeft className="h-3.5 w-3.5" style={{ color: fc.income }} />
            Income
          </div>
          <p className="mt-1 text-base font-bold tabular-nums sm:text-xl" style={{ color: fc.income }}>
            {formatCurrency(showcaseIncome)}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 sm:text-xs">
            <ArrowUpRight className="h-3.5 w-3.5" style={{ color: fc.expense }} />
            Expenses
          </div>
          <p className="mt-1 text-base font-bold tabular-nums sm:text-xl" style={{ color: fc.expense }}>
            {formatCurrency(showcaseExpenses)}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 sm:text-xs">
            <PiggyBank className="h-3.5 w-3.5" style={{ color: fc.savings }} />
            Savings
          </div>
          <p className="mt-1 text-base font-bold tabular-nums sm:text-xl" style={{ color: fc.savings }}>
            {formatCurrency(showcaseSavings)}
          </p>
        </div>
        <div className="col-span-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:col-span-1 sm:p-4">
          <p className="text-[10px] text-slate-500 sm:text-xs">Net balance</p>
          <p
            className="mt-1 text-base font-bold tabular-nums sm:text-xl"
            style={{ color: showcaseNetBalance >= 0 ? fc.income : fc.expense }}
          >
            {formatCurrency(showcaseNetBalance)}
          </p>
        </div>
      </div>

      <ExpenseLineChart data={showcaseDailyExpenses} />

      <BudgetOverviewChart overall={showcaseOverallBudget} actualIncome={showcaseIncome} />

      <div>
        <p className="mb-2 text-xs font-semibold text-slate-900 sm:text-sm">Recent transactions</p>
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <ul className="divide-y divide-slate-100">
            {showcaseRecentTransactions.map((tx) => (
              <li
                key={tx.title}
                className="flex items-center justify-between gap-3 px-3 py-2.5 sm:px-4 sm:py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900">{tx.title}</p>
                  <p className="text-xs text-slate-500">
                    {tx.category} · {formatDate(`${tx.date}T12:00:00.000Z`)}
                  </p>
                </div>
                <p
                  className="shrink-0 text-sm font-semibold tabular-nums"
                  style={{ color: getFlowColor(tx.flowType) }}
                >
                  {formatSignedCurrency(tx.amount, tx.flowType)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
