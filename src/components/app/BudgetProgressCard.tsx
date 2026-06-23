import type { ReactNode } from "react";

import { financeColors as fc } from "@/lib/finance-colors";
import { formatCurrency } from "@/lib/format";
import { getFlowColor } from "@/lib/flow";
import { cn } from "@/lib/cn";
import type { FlowType } from "@/types/api";

interface BudgetProgressCardProps {
  name: string;
  spent: number;
  budget: number;
  flowType?: FlowType;
  actions?: ReactNode;
  className?: string;
}

export function BudgetProgressCard({
  name,
  spent,
  budget,
  flowType = "OUTFLOW",
  actions,
  className,
}: BudgetProgressCardProps) {
  const pct = budget > 0 ? Math.round((spent / budget) * 100) : 0;
  const accentColor = getFlowColor(flowType);
  const barColor =
    pct >= 100 ? accentColor : pct >= 80 ? "#FCD34D" : flowType === "SAVINGS" ? fc.savingsBar : flowType === "INFLOW" ? fc.incomeBar : fc.expenseBar;
  const progressLabel = flowType === "INFLOW" ? "earned" : "spent";

  return (
    <div className={cn("rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <p className="min-w-0 font-semibold text-slate-900">{name}</p>
        <div className="flex shrink-0 items-center justify-between gap-3 sm:flex-col sm:items-end sm:gap-2">
          <p
            className="text-sm font-medium whitespace-nowrap tabular-nums"
            style={{ color: accentColor }}
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
      <p className="mt-2 text-xs text-slate-500">
        {pct}% {progressLabel} of monthly budget
      </p>
    </div>
  );
}
