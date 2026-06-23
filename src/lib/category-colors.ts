/** High-contrast outflow palette — red, blue, and purple families (no green) */
export const expenseChartPalette = [
  "#ED7860", // coral
  "#6366F1", // indigo
  "#F87171", // red
  "#3B82F6", // blue
  "#C084FC", // violet
  "#E879A6", // rose
  "#60A5FA", // sky blue
  "#A78BFA", // purple
  "#D8654D", // deep coral
  "#818CF8", // periwinkle
] as const;

export const incomeChartPalette = [
  "#6BCF9A",
  "#34D399",
  "#86EFAC",
  "#4ADE80",
  "#2DD4BF",
  "#5EEAD4",
] as const;

export function getExpenseChartColor(categoryId: number): string {
  return expenseChartPalette[Math.abs(categoryId) % expenseChartPalette.length];
}

export function getIncomeChartColor(categoryId: number): string {
  return incomeChartPalette[Math.abs(categoryId) % incomeChartPalette.length];
}

/** Bluish / purple tones for savings segments */
export const savingsChartPalette = [
  "#6366F1",
  "#818CF8",
  "#7B9FD4",
  "#A78BFA",
  "#60A5FA",
  "#C084FC",
] as const;

export function getSavingsChartColor(categoryId: number): string {
  return savingsChartPalette[Math.abs(categoryId) % savingsChartPalette.length];
}

/** @deprecated Use getExpenseChartColor or getIncomeChartColor */
export function getCategoryChartColor(categoryId: number): string {
  return getExpenseChartColor(categoryId);
}
