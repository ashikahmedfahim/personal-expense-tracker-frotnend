import type { DailyExpenseTotal, OverallBudgetView } from "@/types/api";
import type { FlowType } from "@/types/api";

export const showcaseIncome = 17000;
export const showcaseExpenses = 9529;
export const showcaseSavings = 0;
export const showcaseNetBalance = 7471;

export const showcaseOverallBudget: OverallBudgetView = {
  month: "2026-06",
  totalExpenses: 12000,
  totalSavings: 0,
  totalBudget: 12000,
  allocations: [
    {
      category: { id: 1, name: "Groceries", flowType: "OUTFLOW", order: 1 },
      amount: 4000,
    },
    {
      category: { id: 2, name: "House Rent", flowType: "OUTFLOW", order: 2 },
      amount: 7500,
    },
    {
      category: { id: 3, name: "Bus Card", flowType: "OUTFLOW", order: 3 },
      amount: 500,
    },
  ],
  savings: [],
};

export const showcaseBudgetCards: {
  name: string;
  spent: number;
  budget: number;
  flowType: FlowType;
}[] = [
  { name: "Groceries", spent: 3200, budget: 4000, flowType: "OUTFLOW" },
  { name: "House Rent", spent: 7500, budget: 7500, flowType: "OUTFLOW" },
  { name: "Bus Card", spent: 329, budget: 500, flowType: "OUTFLOW" },
];

export const showcaseRecentTransactions = [
  {
    title: "Monthly salary",
    category: "Salary",
    amount: 17000,
    flowType: "INFLOW" as const,
    date: "2026-06-01",
  },
  {
    title: "Weekly groceries",
    category: "Groceries",
    amount: 842.5,
    flowType: "OUTFLOW" as const,
    date: "2026-06-18",
  },
  {
    title: "Bus pass",
    category: "Bus Card",
    amount: 329,
    flowType: "OUTFLOW" as const,
    date: "2026-06-05",
  },
];

function buildJuneDailyTotals(): DailyExpenseTotal[] {
  const totals = [0, 120, 0, 85, 210, 0, 340, 95, 0, 180, 420, 0, 150, 0, 275, 90, 0, 842, 65, 0, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  return totals.map((total, index) => ({
    date: `2026-06-${String(index + 1).padStart(2, "0")}`,
    total,
  }));
}

export const showcaseDailyExpenses = buildJuneDailyTotals();
