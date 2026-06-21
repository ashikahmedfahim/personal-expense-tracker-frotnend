"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

import { BudgetOverviewChart } from "@/components/app/BudgetOverviewChart";
import { BudgetProgressCard } from "@/components/app/BudgetProgressCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { ActionButton } from "@/components/ui/ActionButton";
import { getCurrentMonthBudgetOverview, getCurrentMonthOverallBudget } from "@/lib/api/budgets";
import { listCurrentMonthDailyExpenseTotals, listCurrentMonthTransactions } from "@/lib/api/transactions";
import { ExpenseLineChart } from "@/components/app/ExpenseLineChart";
import { financeColors as fc } from "@/lib/finance-colors";
import { formatCurrency, formatDate, formatMonthYear, formatSignedCurrency } from "@/lib/format";
import type { CurrentMonthBudgetOverview, DailyExpenseTotal, OverallBudgetView, TransactionsByCategory } from "@/types/api";

function sumByFlow(groups: TransactionsByCategory[], flowType: "INFLOW" | "OUTFLOW") {
  return groups
    .filter((g) => g.category.flowType === flowType)
    .reduce(
      (sum, g) => sum + g.category.transactions.reduce((s, t) => s + t.amount, 0),
      0,
    );
}

export default function DashboardPage() {
  const pathname = usePathname();
  const [groups, setGroups] = useState<TransactionsByCategory[]>([]);
  const [dailyExpenses, setDailyExpenses] = useState<DailyExpenseTotal[]>([]);
  const [budgetOverview, setBudgetOverview] = useState<CurrentMonthBudgetOverview | null>(null);
  const [overallBudget, setOverallBudget] = useState<OverallBudgetView | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      listCurrentMonthTransactions(),
      listCurrentMonthDailyExpenseTotals(),
      getCurrentMonthBudgetOverview(),
      getCurrentMonthOverallBudget(),
    ])
      .then(([monthGroups, dailyTotals, overview, overall]) => {
        setGroups(monthGroups);
        setDailyExpenses(dailyTotals);
        setBudgetOverview(overview);
        setOverallBudget(overall);
      })
      .finally(() => setLoading(false));
  }, [pathname]);

  const income = sumByFlow(groups, "INFLOW");
  const expenses = sumByFlow(groups, "OUTFLOW");
  const balance = income - expenses;

  const budgetCards = (budgetOverview?.budgets ?? [])
    .filter((item) => item.category.flowType === "OUTFLOW")
    .map((item) => ({
    name: item.category.name,
    spent: item.spent,
    budget: item.budget.amount,
  }));

  const recentTransactions = groups
    .flatMap((g) =>
      g.category.transactions.map((t) => ({
        ...t,
        categoryName: g.category.name,
        flowType: g.category.flowType,
      })),
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#ED7860] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">{formatMonthYear()} overview</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <ArrowDownLeft className="h-4 w-4" style={{ color: fc.income }} />
            Income
          </div>
          <p className="mt-2 text-2xl font-bold" style={{ color: fc.income }}>
            {formatCurrency(income)}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <ArrowUpRight className="h-4 w-4" style={{ color: fc.expense }} />
            Expenses
          </div>
          <p className="mt-2 text-2xl font-bold" style={{ color: fc.expense }}>
            {formatCurrency(expenses)}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Net balance</p>
          <p
            className="mt-2 text-2xl font-bold"
            style={{ color: balance >= 0 ? fc.income : fc.expense }}
          >
            {formatCurrency(balance)}
          </p>
        </div>
      </div>

      {dailyExpenses.length > 0 && <ExpenseLineChart data={dailyExpenses} />}

      {overallBudget &&
        (overallBudget.totalIncome > 0 || overallBudget.totalAllocated > 0) && (
          <BudgetOverviewChart overall={overallBudget} />
        )}

      {budgetCards.length > 0 && (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Budget progress</h2>
            <Link href="/budgets" className="text-sm font-medium text-[#ED7860] hover:text-[#D8654D]">
              Manage budgets
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {budgetCards.map((card) => (
              <BudgetProgressCard key={card.name} {...card} />
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Recent transactions</h2>
          <Link
            href="/transactions"
            className="text-sm font-medium text-[#ED7860] hover:text-[#D8654D]"
          >
            View all
          </Link>
        </div>

        {recentTransactions.length === 0 ? (
          <EmptyState
            title="No transactions this month"
            description="Add your first transaction to start tracking spending."
            action={
              <Link href="/transactions">
                <ActionButton>Add transaction</ActionButton>
              </Link>
            }
          />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <ul className="divide-y divide-slate-100">
              {recentTransactions.map((tx) => (
                <li
                  key={tx.id}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 px-5 py-4 sm:grid-cols-[minmax(0,1fr)_auto]"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-slate-900">{tx.title}</p>
                    <p className="text-xs text-slate-500">
                      {tx.categoryName} · {formatDate(tx.date)}
                    </p>
                  </div>
                  <p
                    className="text-right text-sm font-semibold whitespace-nowrap tabular-nums sm:text-base"
                    style={{
                      color: tx.flowType === "INFLOW" ? fc.income : fc.expense,
                    }}
                  >
                    {formatSignedCurrency(tx.amount, tx.flowType)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
