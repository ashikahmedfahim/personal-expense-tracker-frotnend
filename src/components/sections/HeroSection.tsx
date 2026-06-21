import { ArrowDownLeft, ArrowUpRight, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { heroContent } from "@/content/landing";
import { financeColors as fc } from "@/lib/finance-colors";
import { formatCurrency, formatSignedCurrency } from "@/lib/format";

const chartMonths = [
  { label: "Jan", income: 72, expense: 48 },
  { label: "Feb", income: 65, expense: 52 },
  { label: "Mar", income: 80, expense: 44 },
  { label: "Apr", income: 70, expense: 58 },
  { label: "May", income: 85, expense: 42 },
];

function ExpenseIncomeChart() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-slate-900">Income vs expenses</p>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: fc.incomeBar }}
              aria-hidden
            />
            Income
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: fc.expenseBar }}
              aria-hidden
            />
            Expenses
          </span>
        </div>
      </div>
      <div className="flex h-24 items-end justify-between gap-1 sm:h-32 sm:gap-2">
        {chartMonths.map((month) => (
          <div key={month.label} className="flex flex-1 flex-col items-center gap-1.5">
            <div className="flex w-full items-end justify-center gap-0.5 sm:gap-1" style={{ height: "80px" }}>
              <div
                className="w-2 rounded-t-sm sm:w-3"
                style={{ height: `${month.income}%`, backgroundColor: fc.incomeBar }}
              />
              <div
                className="w-2 rounded-t-sm sm:w-3"
                style={{ height: `${month.expense}%`, backgroundColor: fc.expenseBar }}
              />
            </div>
            <span className="text-[10px] text-slate-400 sm:text-xs">{month.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="relative mx-auto mt-10 max-w-4xl sm:mt-14">
      <div
        className="absolute -inset-3 rounded-3xl bg-[#ED7860]/10 blur-2xl sm:-inset-6"
        aria-hidden
      />

      <div className="absolute -left-2 top-8 z-10 hidden max-w-[11rem] rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg sm:block lg:-left-8">
        <p className="text-xs font-semibold whitespace-nowrap tabular-nums" style={{ color: fc.income }}>
          {formatSignedCurrency(3500, "INFLOW")} salary
        </p>
        <p className="text-[10px] text-slate-500">Income · May 2026</p>
      </div>
      <div className="absolute -right-2 top-16 z-10 hidden max-w-[11rem] rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg sm:block lg:-right-8">
        <p className="text-xs font-semibold whitespace-nowrap tabular-nums" style={{ color: fc.expense }}>
          {formatSignedCurrency(84.2, "OUTFLOW")} groceries
        </p>
        <p className="text-[10px] text-slate-500">Expense · Food</p>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/60">
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="ml-2 truncate text-xs text-slate-400">app.expensetracker.dev</span>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-slate-500 sm:text-sm">Good morning, Jane</p>
              <p className="text-base font-semibold text-slate-900 sm:text-lg">May 2026 overview</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <span className="rounded-lg bg-[#ED7860] px-3 py-2 text-center text-xs font-semibold text-white sm:text-left">
                + New transaction
              </span>
              <span className="rounded-lg border border-slate-200 px-3 py-2 text-center text-xs font-semibold text-slate-700 sm:text-left">
                Set budget
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-3">
            <div
              className="rounded-xl border p-3.5 sm:p-4"
              style={{ borderColor: fc.incomeBorder, backgroundColor: fc.incomeBg }}
            >
              <p className="text-xs text-slate-500">Total inflow</p>
              <p
                className="mt-1 flex items-center gap-1 text-lg font-bold sm:text-xl"
                style={{ color: fc.income }}
              >
                <ArrowDownLeft className="h-4 w-4" aria-hidden />
                {formatCurrency(4250)}
              </p>
            </div>
            <div
              className="rounded-xl border p-3.5 sm:p-4"
              style={{ borderColor: fc.expenseBorder, backgroundColor: fc.expenseBg }}
            >
              <p className="text-xs text-slate-500">Total outflow</p>
              <p
                className="mt-1 flex items-center gap-1 text-lg font-bold sm:text-xl"
                style={{ color: fc.expense }}
              >
                <ArrowUpRight className="h-4 w-4" aria-hidden />
                {formatCurrency(2180)}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 sm:p-4">
              <p className="text-xs text-slate-500">Net balance</p>
              <p className="mt-1 flex items-center gap-1 text-lg font-bold text-slate-900 sm:text-xl">
                <TrendingUp className="h-4 w-4 text-[#ED7860]" aria-hidden />
                {formatCurrency(2070)}
              </p>
            </div>
          </div>

          <div className="mt-4 sm:mt-6">
            <ExpenseIncomeChart />
          </div>

          <div className="mt-4 space-y-2 sm:mt-6">
            <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
              Recent transactions
            </p>
            {[
              { title: "Groceries", amount: formatSignedCurrency(84.2, "OUTFLOW"), category: "Food", type: "expense" as const },
              { title: "Salary", amount: formatSignedCurrency(3500, "INFLOW"), category: "Income", type: "income" as const },
              { title: "Coffee", amount: formatSignedCurrency(4.5, "OUTFLOW"), category: "Food", type: "expense" as const },
            ].map((tx) => (
              <div
                key={tx.title}
                className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2.5 sm:px-4 sm:py-3"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{
                      backgroundColor: tx.type === "income" ? fc.incomeBar : fc.expenseBar,
                    }}
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">{tx.title}</p>
                    <p className="text-xs text-slate-500">{tx.category}</p>
                  </div>
                </div>
                <p
                  className="shrink-0 text-sm font-semibold whitespace-nowrap tabular-nums"
                  style={{ color: tx.type === "income" ? fc.income : fc.expense }}
                >
                  {tx.amount}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-16 pt-10 sm:pb-20 sm:pt-16 lg:pt-20">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#FDF0ED_0%,_#ffffff_55%)]"
        aria-hidden
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Badge>{heroContent.badge}</Badge>

          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:mt-6 sm:text-4xl lg:text-5xl xl:text-6xl">
            {heroContent.title}{" "}
            <span className="text-[#ED7860]">{heroContent.highlight}</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:mt-6 sm:max-w-2xl sm:text-lg">
            {heroContent.description}
          </p>

          <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:justify-center">
            <Button href={heroContent.primaryCta.href} fullWidth className="sm:w-auto">
              {heroContent.primaryCta.label}
            </Button>
            <Button
              href={heroContent.secondaryCta.href}
              variant="secondary"
              external
              fullWidth
              className="sm:w-auto"
            >
              {heroContent.secondaryCta.label}
            </Button>
          </div>

          <ul className="mt-6 flex flex-col items-center gap-2 text-sm text-slate-500 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-2">
            {heroContent.trustBadges.map((badge) => (
              <li key={badge} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ED7860]" aria-hidden />
                {badge}
              </li>
            ))}
          </ul>
        </div>

        <DashboardMockup />
      </Container>
    </section>
  );
}
