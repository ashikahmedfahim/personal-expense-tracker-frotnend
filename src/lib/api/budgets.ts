import { apiRequest } from "@/lib/api/client";
import type { Budget } from "@/types/api";

export interface CreateBudgetInput {
  categoryId: number;
  amount: number;
  date?: string;
}

export interface UpdateBudgetInput {
  amount: number;
}

export function createBudget(input: CreateBudgetInput): Promise<Budget> {
  return apiRequest<Budget>("/v1/budgets", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateBudget(id: number, input: UpdateBudgetInput): Promise<Budget> {
  return apiRequest<Budget>(`/v1/budgets/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export function deleteBudget(id: number): Promise<null> {
  return apiRequest<null>(`/v1/budgets/${id}`, { method: "DELETE" });
}
