import type { ReactNode } from "react";

import { financeColors as fc } from "@/lib/finance-colors";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/cn";

interface BudgetProgressCardProps {
  name: string;
  spent: number;
  budget: number;
  actions?: ReactNode;
  className?: string;
}

export function BudgetProgressCard({
  name,
  spent,
  budget,
  actions,
  className,
}: BudgetProgressCardProps) {
  const pct = budget > 0 ? Math.round((spent / budget) * 100) : 0;
  const barColor = pct >= 100 ? fc.expense : pct >= 80 ? "#FCD34D" : fc.expenseBar;

  return (
    <div className={cn("rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5", className)}>
      <div className="flex items-start justify-between gap-4">
        <p className="min-w-0 flex-1 font-semibold text-slate-900">{name}</p>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <p
            className="text-sm font-medium whitespace-nowrap tabular-nums"
            style={{ color: fc.expense }}
          >
            {formatCurrency(spent)} / {formatCurrency(budget)}
          </p>
          {actions && <div className="flex items-center gap-1">{actions}</div>}
        </div>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: barColor }}
        />
      </div>
      <p className="mt-2 text-xs text-slate-500">{pct}% of monthly budget</p>
    </div>
  );
}
