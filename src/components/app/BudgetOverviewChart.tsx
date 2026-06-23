"use client";

import { useMemo, useState } from "react";

import { getExpenseChartColor, getSavingsChartColor } from "@/lib/category-colors";
import { financeColors as fc } from "@/lib/finance-colors";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { OverallBudgetAllocation, OverallBudgetView } from "@/types/api";

interface BudgetOverviewChartProps {
  overall: OverallBudgetView;
  actualIncome: number;
}

type SegmentKind = "expense" | "savings";

interface ChartSegment {
  key: string;
  categoryId: number;
  name: string;
  amount: number;
  color: string;
  widthPct: number;
  kind: SegmentKind;
}

function sortAllocations(items: OverallBudgetAllocation[]): OverallBudgetAllocation[] {
  return [...items].sort(
    (a, b) => a.category.order - b.category.order || a.category.name.localeCompare(b.category.name),
  );
}

function buildSegments(
  items: OverallBudgetAllocation[],
  scaleMax: number,
  kind: SegmentKind,
): ChartSegment[] {
  const scale = Math.max(scaleMax, 1);
  const colorFn = kind === "savings" ? getSavingsChartColor : getExpenseChartColor;

  return sortAllocations(items).map((item) => ({
    key: `${kind}-${item.category.id}`,
    categoryId: item.category.id,
    name: item.category.name,
    amount: item.amount,
    color: colorFn(item.category.id),
    widthPct: item.amount > 0 ? (item.amount / scale) * 100 : 0,
    kind,
  }));
}

function StackedBar({
  segments,
  remainingPct,
  hoveredKey,
  onHover,
}: {
  segments: ChartSegment[];
  remainingPct: number;
  hoveredKey: string | null;
  onHover: (key: string | null) => void;
}) {
  const visible = segments.filter((s) => s.widthPct > 0);

  return (
    <div className="flex h-4 w-full overflow-hidden rounded-full bg-slate-100 sm:h-5">
      {visible.map((segment, index) => (
        <div
          key={segment.key}
          className="h-full shrink-0 transition-opacity"
          style={{
            width: `${segment.widthPct}%`,
            backgroundColor: segment.color,
            opacity: hoveredKey === null || hoveredKey === segment.key ? 1 : 0.45,
            boxShadow: index > 0 ? "inset 2px 0 0 rgba(255,255,255,0.45)" : undefined,
            borderTopLeftRadius: index === 0 ? 9999 : 0,
            borderBottomLeftRadius: index === 0 ? 9999 : 0,
            borderTopRightRadius:
              index === visible.length - 1 && remainingPct === 0 ? 9999 : 0,
            borderBottomRightRadius:
              index === visible.length - 1 && remainingPct === 0 ? 9999 : 0,
          }}
          onMouseEnter={() => onHover(segment.key)}
        />
      ))}
      {remainingPct > 0 && (
        <div
          className="h-full shrink-0 bg-slate-200"
          style={{
            width: `${remainingPct}%`,
            borderTopRightRadius: 9999,
            borderBottomRightRadius: 9999,
          }}
          onMouseEnter={() => onHover(null)}
        />
      )}
    </div>
  );
}

export function BudgetOverviewChart({ overall, actualIncome }: BudgetOverviewChartProps) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const { segments, remainingPct, plannedOutflow, isOverAllocated, unallocated } = useMemo(() => {
    const plannedOutflow = overall.totalBudget;
    const scaleMax = Math.max(actualIncome, 1);
    const expenseSegments = buildSegments(overall.allocations, scaleMax, "expense");
    const savingsSegments = buildSegments(overall.savings, scaleMax, "savings");
    const segments = [...expenseSegments, ...savingsSegments];
    const isOverAllocated = plannedOutflow > actualIncome;
    const unallocated = Math.max(0, actualIncome - plannedOutflow);
    const remainingPct = !isOverAllocated ? (unallocated / scaleMax) * 100 : 0;

    return { segments, remainingPct, plannedOutflow, isOverAllocated, unallocated };
  }, [overall, actualIncome]);

  const hovered = segments.find((s) => s.key === hoveredKey) ?? null;
  const hasPlannedData = overall.totalBudget > 0;

  if (!hasPlannedData) return null;

  const overAllocatedBy = plannedOutflow - actualIncome;

  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
      onMouseLeave={() => setHoveredKey(null)}
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <h2 className="text-sm font-semibold text-slate-900">Budget overview</h2>
        <div className="relative min-h-14 min-w-0 text-left text-xs sm:min-h-11 sm:text-right sm:text-sm">
          <div
            className={cn(
              "transition-opacity duration-150",
              hovered ? "pointer-events-none opacity-0" : "opacity-100",
            )}
            aria-hidden={hovered !== null}
          >
            <p className="font-semibold tabular-nums leading-relaxed">
                <span className="block sm:inline" style={{ color: fc.income }}>
                  {formatCurrency(actualIncome)} income
                </span>
                <span className="hidden sm:inline text-slate-400"> · </span>
                <span className="block sm:inline" style={{ color: fc.expense }}>
                  {formatCurrency(overall.totalExpenses)} expenses
                </span>
                <span className="hidden sm:inline text-slate-400"> · </span>
                <span className="block sm:inline" style={{ color: fc.savings }}>
                  {formatCurrency(overall.totalSavings)} savings
                </span>
            </p>
            <p className="mt-1 font-medium tabular-nums text-slate-600">
              {isOverAllocated
                ? `Over-allocated by ${formatCurrency(overAllocatedBy)}`
                : `Unallocated ${formatCurrency(unallocated)}`}
            </p>
          </div>
          {hovered && (
            <div className="absolute inset-0 flex flex-col justify-center sm:items-end">
              <p className="font-medium text-slate-900">{hovered.name}</p>
              <p style={{ color: hovered.color }}>
                {formatCurrency(hovered.amount)} planned{" "}
                {hovered.kind === "savings" ? "savings" : "expense"}
              </p>
            </div>
          )}
        </div>
      </div>

      {segments.some((s) => s.widthPct > 0) && (
        <StackedBar
          segments={segments}
          remainingPct={remainingPct}
          hoveredKey={hoveredKey}
          onHover={setHoveredKey}
        />
      )}

      <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {segments.map((segment) => (
          <li
            key={segment.key}
            className="flex cursor-default items-center gap-2 text-xs"
            onMouseEnter={() => setHoveredKey(segment.key)}
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-white ring-inset"
              style={{
                backgroundColor: segment.color,
                boxShadow: "0 0 0 1px rgba(15,23,42,0.08)",
              }}
              aria-hidden
            />
            <span
              className="min-w-0 flex-1 truncate font-medium text-slate-700"
              style={{
                opacity: hoveredKey === null || hoveredKey === segment.key ? 1 : 0.5,
              }}
            >
              {segment.name}
            </span>
            <span
              className="shrink-0 tabular-nums text-slate-500"
              style={{
                opacity: hoveredKey === null || hoveredKey === segment.key ? 1 : 0.5,
              }}
            >
              {formatCurrency(segment.amount)}
            </span>
          </li>
        ))}
        {(unallocated > 0 || isOverAllocated) && (
          <li
            className="flex cursor-default items-center gap-2 text-xs"
            onMouseEnter={() => setHoveredKey(null)}
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full bg-slate-200 ring-1 ring-white ring-inset"
              aria-hidden
            />
            <span className="min-w-0 flex-1 truncate font-medium text-slate-700">
              {isOverAllocated ? "Over-allocated" : "Unallocated"}
            </span>
            <span
              className="shrink-0 tabular-nums"
              style={{ color: isOverAllocated ? fc.expense : "#64748B" }}
            >
              {isOverAllocated
                ? formatCurrency(overAllocatedBy)
                : formatCurrency(unallocated)}
            </span>
          </li>
        )}
      </ul>
    </div>
  );
}
