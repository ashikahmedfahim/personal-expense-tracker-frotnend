"use client";

import { useMemo, useState } from "react";

import { financeColors as fc } from "@/lib/finance-colors";
import { formatCurrency, formatDate } from "@/lib/format";
import type { DailyExpenseTotal } from "@/types/api";

interface ExpenseLineChartProps {
  data: DailyExpenseTotal[];
}

const WIDTH = 800;
const HEIGHT = 88;
const PADDING = { top: 8, right: 12, bottom: 22, left: 40 };

function getUtcDateKey(date = new Date()): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getLastSpendingIndex(data: DailyExpenseTotal[]): number {
  return data.reduce((last, entry, index) => (entry.total > 0 ? index : last), -1);
}

function getLastLineIndex(data: DailyExpenseTotal[]): number {
  if (data.length === 0) return -1;

  const todayIndex = data.findIndex((entry) => entry.date === getUtcDateKey());
  const lastSpendingIndex = getLastSpendingIndex(data);
  if (lastSpendingIndex < 0) return -1;

  if (todayIndex === -1) return lastSpendingIndex;

  const futureHasSpending = data.slice(todayIndex + 1).some((entry) => entry.total > 0);
  if (!futureHasSpending) return todayIndex;

  return lastSpendingIndex;
}

function formatDayUtc(date: string): string {
  return new Intl.DateTimeFormat("da-DK", {
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00.000Z`));
}

function formatAxisAmount(amount: number): string {
  if (amount >= 1000) {
    return `${Math.round(amount / 100) / 10}k`;
  }
  return String(Math.round(amount));
}

/** Non-linear y scale: low amounts stay near the axis, higher spend uses more height. */
const Y_POWER = 0.4;

function scaleAmount(amount: number): number {
  return Math.pow(Math.max(amount, 0), Y_POWER);
}

function scaleY(
  amount: number,
  maxTotal: number,
  chartHeight: number,
  topPadding: number,
): number {
  const maxScaled = scaleAmount(maxTotal);
  if (maxScaled === 0) return topPadding + chartHeight;
  return topPadding + chartHeight - (scaleAmount(amount) / maxScaled) * chartHeight;
}

function buildYTicks(maxTotal: number): number[] {
  if (maxTotal <= 0) return [0];
  return [0, maxTotal * 0.25, maxTotal * 0.5, maxTotal];
}

function buildSmoothLinePath(points: { x: number; y: number }[], floorY: number): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  if (points.length === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
  }

  const clampY = (y: number) => Math.min(y, floorY);

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = clampY(p1.y + (p2.y - p0.y) / 6);
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = clampY(p2.y - (p3.y - p1.y) / 6);

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return path;
}

export function ExpenseLineChart({ data }: ExpenseLineChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const chart = useMemo(() => {
    if (data.length === 0) return null;

    const lastLineIndex = getLastLineIndex(data);
    if (lastLineIndex < 0) return null;

    const lineData = data.slice(0, lastLineIndex + 1);
    const hasSpending = lineData.some((entry) => entry.total > 0);

    if (!hasSpending) return null;

    const chartWidth = WIDTH - PADDING.left - PADDING.right;
    const chartHeight = HEIGHT - PADDING.top - PADDING.bottom;
    const maxTotal = Math.max(...lineData.map((d) => d.total));
    const yTicks = buildYTicks(maxTotal);
    const xLabelInterval = data.length > 20 ? 5 : data.length > 14 ? 3 : 2;
    const daySpan = Math.max(data.length - 1, 1);
    const segmentWidth = chartWidth / data.length;

    const xForDay = (dayIndex: number) => PADDING.left + (dayIndex / daySpan) * chartWidth;

    const linePoints = lineData.map((entry, index) => {
      const x = xForDay(index);
      const y = scaleY(entry.total, maxTotal, chartHeight, PADDING.top);

      return {
        ...entry,
        dayIndex: index,
        x,
        y,
        startX: PADDING.left + index * segmentWidth,
        segmentWidth,
      };
    });

    const xLabels = data.map((entry, index) => ({
      date: entry.date,
      x: xForDay(index),
      show:
        index === 0 || index === data.length - 1 || index % xLabelInterval === 0,
    }));

    const bottomY = PADDING.top + chartHeight;
    const linePath = buildSmoothLinePath(linePoints, bottomY);
    const areaPath =
      linePoints.length > 0
        ? `${linePath} L ${linePoints[linePoints.length - 1].x} ${bottomY} L ${linePoints[0].x} ${bottomY} Z`
        : "";

    return {
      linePoints,
      xLabels,
      linePath,
      areaPath,
      yTicks,
      maxTotal,
      chartHeight,
      bottomY,
    };
  }, [data]);

  if (!chart) return null;

  const hovered =
    hoveredIndex !== null ? chart.linePoints.find((p) => p.dayIndex === hoveredIndex) ?? null : null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-slate-900">Daily expenses</h2>
          <p className="truncate text-xs text-slate-500">Outflow per day this month</p>
        </div>
        {hovered && (
          <div className="shrink-0 text-left text-xs sm:text-right">
            <span className="font-medium text-slate-600">{formatDate(`${hovered.date}T12:00:00.000Z`)}</span>
            <span className="ml-1.5 font-semibold" style={{ color: fc.expense }}>
              {formatCurrency(hovered.total)}
            </span>
          </div>
        )}
      </div>

      <div className="w-full">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="h-[88px] min-w-0 w-full sm:h-[88px]"
          preserveAspectRatio="none"
          role="img"
          aria-label="Daily expense line chart for the current month"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <defs>
            <linearGradient id="expense-area-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={fc.expense} stopOpacity="0.25" />
              <stop offset="100%" stopColor={fc.expense} stopOpacity="0.02" />
            </linearGradient>
            <clipPath id="expense-chart-clip">
              <rect
                x={PADDING.left}
                y={PADDING.top}
                width={WIDTH - PADDING.left - PADDING.right}
                height={chart.chartHeight}
              />
            </clipPath>
          </defs>

          {chart.yTicks.map((tick) => {
            const y = scaleY(tick, chart.maxTotal, chart.chartHeight, PADDING.top);
            return (
              <g key={`y-${tick}`}>
                <line
                  x1={PADDING.left}
                  y1={y}
                  x2={WIDTH - PADDING.right}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeDasharray="4 4"
                />
                <text
                  x={PADDING.left - 6}
                  y={y + 3}
                  textAnchor="end"
                  className="fill-slate-400 text-[9px]"
                >
                  {formatAxisAmount(tick)}
                </text>
              </g>
            );
          })}

          <g clipPath="url(#expense-chart-clip)">
            <path d={chart.areaPath} fill="url(#expense-area-fill)" />
            <path
              d={chart.linePath}
              fill="none"
              stroke={fc.expense}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {chart.linePoints.map((point) => (
            <g key={point.date}>
              <rect
                x={point.startX}
                y={PADDING.top}
                width={point.segmentWidth}
                height={chart.chartHeight}
                fill="transparent"
                onMouseEnter={() => setHoveredIndex(point.dayIndex)}
              />
              {point.total > 0 && (
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={hoveredIndex === point.dayIndex ? 3.5 : 2}
                  fill={hoveredIndex === point.dayIndex ? fc.expense : "#fff"}
                  stroke={fc.expense}
                  strokeWidth="1.5"
                  pointerEvents="none"
                />
              )}
            </g>
          ))}

          {chart.xLabels.map(
            (label) =>
              label.show && (
                <text
                  key={label.date}
                  x={label.x}
                  y={HEIGHT - 6}
                  textAnchor="middle"
                  className="fill-slate-400 text-[9px]"
                >
                  {formatDayUtc(label.date)}
                </text>
              ),
          )}
        </svg>
      </div>
    </div>
  );
}
