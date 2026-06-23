import { financeColors as fc } from "@/lib/finance-colors";
import type { FlowType } from "@/types/api";

export function getFlowColor(flowType: FlowType): string {
  if (flowType === "INFLOW") return fc.income;
  if (flowType === "SAVINGS") return fc.savings;
  return fc.expense;
}

export function getFlowLabel(flowType: FlowType): string {
  if (flowType === "INFLOW") return "Income";
  if (flowType === "SAVINGS") return "Savings";
  return "Expense";
}

export function getFlowLabelLower(flowType: FlowType): string {
  return getFlowLabel(flowType).toLowerCase();
}
