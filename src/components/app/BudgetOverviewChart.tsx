"use client";

import { useMemo, useState } from "react";

import { getExpenseChartColor } from "@/lib/category-colors";
import { financeColors as fc } from "@/lib/finance-colors";
import { formatCurrency } from "@/lib/format";
import type { OverallBudgetAllocation, OverallBudgetView } from "@/types/api";

interface BudgetOverviewChartProps {
  overall: OverallBudgetView;
}

interface ChartSegment {
  categoryId: number;
  name: string;
  amount: number;
  color: string;
  widthPct: number;
}

function sortAllocations(items: OverallBudgetAllocation[]): OverallBudgetAllocation[] {
  return [...items].sort(
    (a, b) => a.category.order - b.category.order || a.category.name.localeCompare(b.category.name),
  );
}

function buildExpenseSegments(
  items: OverallBudgetAllocation[],
  scaleMax: number,
): ChartSegment[] {
  const scale = Math.max(scaleMax, 1);

  return sortAllocations(items).map((item) => ({
    categoryId: item.category.id,
    name: item.category.name,
    amount: item.amount,
    color: getExpenseChartColor(item.category.id),
    widthPct: item.amount > 0 ? (item.amount / scale) * 100 : 0,
  }));
}

function StackedBar({
  segments,
  remainingPct,
  hoveredId,
  onHover,
  onLeave,
}: {
  segments: ChartSegment[];
  remainingPct: number;
  hoveredId: number | null;
  onHover: (id: number | null) => void;
  onLeave: () => void;
}) {
  const visible = segments.filter((s) => s.widthPct > 0);

  return (
    <div
      className="flex h-4 w-full overflow-hidden rounded-full bg-slate-100 sm:h-5"
      onMouseLeave={onLeave}
    >
      {visible.map((segment, index) => (
        <div
          key={segment.categoryId}
          className="h-full shrink-0 transition-opacity"
          style={{
            width: `${segment.widthPct}%`,
            backgroundColor: segment.color,
            opacity: hoveredId === null || hoveredId === segment.categoryId ? 1 : 0.45,
            boxShadow: index > 0 ? "inset 2px 0 0 rgba(255,255,255,0.45)" : undefined,
            borderTopLeftRadius: index === 0 ? 9999 : 0,
            borderBottomLeftRadius: index === 0 ? 9999 : 0,
            borderTopRightRadius:
              index === visible.length - 1 && remainingPct === 0 ? 9999 : 0,
            borderBottomRightRadius:
              index === visible.length - 1 && remainingPct === 0 ? 9999 : 0,
          }}
          onMouseEnter={() => onHover(segment.categoryId)}
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

export function BudgetOverviewChart({ overall }: BudgetOverviewChartProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const { expenseSegments, netBalancePct } = useMemo(() => {
    const scaleMax = Math.max(overall.totalIncome, overall.totalAllocated, 1);
    const expenseSegments = buildExpenseSegments(overall.allocations, scaleMax);
    const netBalancePct =
      overall.netBalance > 0 ? (overall.netBalance / scaleMax) * 100 : 0;

    return { expenseSegments, netBalancePct };
  }, [overall]);

  const hovered = expenseSegments.find((s) => s.categoryId === hoveredId) ?? null;
  const hasData = overall.totalIncome > 0 || overall.totalAllocated > 0;

  if (!hasData) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-slate-900">Budget overview</h2>
          <p className="text-xs text-slate-500">Expense allocation this month</p>
        </div>
        <div className="min-w-0 text-left text-xs sm:text-right sm:text-sm">
          {hovered ? (
            <>
              <p className="font-medium text-slate-900">{hovered.name}</p>
              <p style={{ color: hovered.color }}>{formatCurrency(hovered.amount)} allocated</p>
            </>
          ) : (
            <>
              <p className="font-semibold tabular-nums leading-relaxed">
                <span className="block sm:inline" style={{ color: fc.income }}>
                  {formatCurrency(overall.totalIncome)} income
                </span>
                <span className="hidden sm:inline text-slate-400"> · </span>
                <span className="block sm:inline" style={{ color: fc.expense }}>
                  {formatCurrency(overall.totalAllocated)} allocated
                </span>
              </p>
              <p className="mt-1 font-medium tabular-nums text-slate-600">
                Net balance {formatCurrency(overall.netBalance)}
              </p>
            </>
          )}
        </div>
      </div>

      {(overall.totalAllocated > 0 || netBalancePct > 0) && (
        <StackedBar
          segments={expenseSegments}
          remainingPct={netBalancePct}
          hoveredId={hoveredId}
          onHover={setHoveredId}
          onLeave={() => setHoveredId(null)}
        />
      )}

      <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {expenseSegments.map((segment) => (
          <li
            key={segment.categoryId}
            className="flex items-center gap-2 text-xs"
            onMouseEnter={() => setHoveredId(segment.categoryId)}
            onMouseLeave={() => setHoveredId(null)}
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
                opacity: hoveredId === null || hoveredId === segment.categoryId ? 1 : 0.5,
              }}
            >
              {segment.name}
            </span>
            <span
              className="shrink-0 tabular-nums text-slate-500"
              style={{
                opacity: hoveredId === null || hoveredId === segment.categoryId ? 1 : 0.5,
              }}
            >
              {formatCurrency(segment.amount)}
            </span>
          </li>
        ))}
        {overall.netBalance !== 0 && (
          <li className="flex items-center gap-2 text-xs">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full bg-slate-200 ring-1 ring-white ring-inset"
              aria-hidden
            />
            <span className="min-w-0 flex-1 truncate font-medium text-slate-700">Net balance</span>
            <span className="shrink-0 tabular-nums text-slate-600">
              {formatCurrency(overall.netBalance)}
            </span>
          </li>
        )}
      </ul>
    </div>
  );
}
