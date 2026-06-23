export type FlowType = "INFLOW" | "OUTFLOW" | "SAVINGS";
export type TransactionStatus = "PENDING" | "COMPLETED" | "CANCELLED";

export interface ApiResponse<T> {
  message: string | null;
  data: T;
}

export interface ApiErrorResponse {
  message: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  flowType: FlowType;
  order: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: number;
  title: string;
  amount: number;
  description: string | null;
  date: string;
  status: TransactionStatus;
  categoryId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CurrentMonthTransaction {
  id: number;
  title: string;
  amount: number;
  description: string | null;
  date: string;
}

export interface CurrentMonthCategory {
  id: number;
  name: string;
  flowType: FlowType;
  order: number;
  transactions: CurrentMonthTransaction[];
}

export interface TransactionsByCategory {
  category: CurrentMonthCategory;
}

export interface DailyExpenseTotal {
  date: string;
  total: number;
}

export interface Budget {
  id: number;
  amount: number;
  date: string;
  categoryId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface BudgetCategorySummary {
  id: number;
  name: string;
  flowType: FlowType;
  order: number;
}

export interface CurrentMonthBudgetItem {
  budget: Budget;
  category: BudgetCategorySummary;
  spent: number;
  earned: number;
  remaining: number;
}

export interface CurrentMonthBudgetSummary {
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
  netBalance: number;
  totalBudget: number;
  totalSpent: number;
  remaining: number;
}

export interface CurrentMonthBudgetOverview {
  month: string;
  summary: CurrentMonthBudgetSummary;
  budgets: CurrentMonthBudgetItem[];
}

export interface OverallBudgetAllocation {
  category: BudgetCategorySummary;
  amount: number;
}

export interface OverallBudgetView {
  month: string;
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
  totalAllocated: number;
  netBalance: number;
  plannedIncome: number;
  plannedAllocated: number;
  plannedSavings: number;
  plannedNetBalance: number;
  income: OverallBudgetAllocation[];
  allocations: OverallBudgetAllocation[];
  savings: OverallBudgetAllocation[];
}

export interface JwtPayload {
  id: number;
  email: string;
  iat?: number;
  exp?: number;
}
