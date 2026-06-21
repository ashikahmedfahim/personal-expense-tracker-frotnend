import { apiRequest } from "@/lib/api/client";
import type { Category, FlowType } from "@/types/api";

export interface CreateCategoryInput {
  name: string;
  flowType: FlowType;
}

export interface UpdateCategoryInput {
  name?: string;
  flowType?: FlowType;
  order?: number;
}

export function listCategories(): Promise<Category[]> {
  return apiRequest<Category[]>("/v1/categories");
}

export function getCategory(id: number): Promise<Category> {
  return apiRequest<Category>(`/v1/categories/${id}`);
}

export function createCategory(input: CreateCategoryInput): Promise<Category> {
  return apiRequest<Category>("/v1/categories", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateCategory(id: number, input: UpdateCategoryInput): Promise<Category> {
  return apiRequest<Category>(`/v1/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export function deleteCategory(id: number): Promise<null> {
  return apiRequest<null>(`/v1/categories/${id}`, { method: "DELETE" });
}
