import { apiRequest } from "@/lib/api/client";
import type { DailyExpenseTotal, Transaction, TransactionsByCategory } from "@/types/api";

export interface CreateTransactionInput {
  title: string;
  amount: number;
  categoryId: number;
  description?: string;
  date?: string;
}

export interface UpdateTransactionInput {
  title?: string;
  amount?: number;
  categoryId?: number;
  description?: string | null;
  date?: string;
}

export function listRecentTransactions(): Promise<Transaction[]> {
  return apiRequest<Transaction[]>("/v1/transactions");
}

export function listCurrentMonthTransactions(): Promise<TransactionsByCategory[]> {
  return apiRequest<TransactionsByCategory[]>("/v1/transactions/current-month");
}

export function listCurrentMonthDailyExpenseTotals(): Promise<DailyExpenseTotal[]> {
  return apiRequest<DailyExpenseTotal[]>("/v1/transactions/current-month/daily-totals");
}

export function createTransaction(input: CreateTransactionInput): Promise<Transaction> {
  return apiRequest<Transaction>("/v1/transactions", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateTransaction(
  id: number,
  input: UpdateTransactionInput,
): Promise<Transaction> {
  return apiRequest<Transaction>(`/v1/transactions/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export function deleteTransaction(id: number): Promise<null> {
  return apiRequest<null>(`/v1/transactions/${id}`, { method: "DELETE" });
}
