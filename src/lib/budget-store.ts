import type { Budget } from "@/types/api";

const STORAGE_KEY = "expense_tracker_budgets";

function storageKey(userId: number): string {
  return `${STORAGE_KEY}_${userId}`;
}

export function getStoredBudgets(userId: number): Budget[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(storageKey(userId));
    return raw ? (JSON.parse(raw) as Budget[]) : [];
  } catch {
    return [];
  }
}

export function saveBudget(userId: number, budget: Budget): void {
  const budgets = getStoredBudgets(userId).filter((b) => b.id !== budget.id);
  budgets.push(budget);
  localStorage.setItem(storageKey(userId), JSON.stringify(budgets));
}

export function removeBudget(userId: number, budgetId: number): void {
  const budgets = getStoredBudgets(userId).filter((b) => b.id !== budgetId);
  localStorage.setItem(storageKey(userId), JSON.stringify(budgets));
}

export function getCurrentMonthBudgets(userId: number): Budget[] {
  const now = new Date();
  const monthStart = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1);

  return getStoredBudgets(userId).filter((budget) => {
    const budgetMonth = new Date(budget.date);
    const budgetStart = Date.UTC(
      budgetMonth.getUTCFullYear(),
      budgetMonth.getUTCMonth(),
      1,
    );
    return budgetStart === monthStart;
  });
}

export function getBudgetForCategory(
  userId: number,
  categoryId: number,
): Budget | undefined {
  return getCurrentMonthBudgets(userId).find((b) => b.categoryId === categoryId);
}
