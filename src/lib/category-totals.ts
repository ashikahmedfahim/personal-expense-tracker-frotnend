import type { CurrentMonthTransactionOverview } from "@/types/api";

export function buildCategoryTotalsMap(
  overview: CurrentMonthTransactionOverview | null,
): Map<number, number> {
  if (!overview) return new Map();

  return new Map(overview.categories.map((item) => [item.category.id, item.total]));
}

export function getCategoryTotal(map: Map<number, number>, categoryId: number): number {
  return map.get(categoryId) ?? 0;
}
