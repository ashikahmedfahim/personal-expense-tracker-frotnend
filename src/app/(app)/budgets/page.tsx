"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { BudgetProgressCard } from "@/components/app/BudgetProgressCard";
import { Alert } from "@/components/ui/Alert";
import { ActionButton } from "@/components/ui/ActionButton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { useAuth } from "@/contexts/AuthContext";
import { createBudget, deleteBudget, updateBudget } from "@/lib/api/budgets";
import { listCategories } from "@/lib/api/categories";
import { listCurrentMonthTransactions } from "@/lib/api/transactions";
import { getErrorMessage } from "@/lib/api/client";
import { useToast } from "@/contexts/ToastContext";
import {
  getCurrentMonthBudgets,
  removeBudget,
  saveBudget,
} from "@/lib/budget-store";
import { formatMonthYear } from "@/lib/format";
import type { Budget, Category } from "@/types/api";

interface BudgetFormData {
  categoryId: string;
  amount: string;
}

export default function BudgetsPage() {
  const { user } = useAuth();
  const toast = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [spentByCategory, setSpentByCategory] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Budget | null>(null);
  const [form, setForm] = useState<BudgetFormData>({ categoryId: "", amount: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const outflowCategories = categories.filter((c) => c.flowType === "OUTFLOW");

  const loadData = useCallback(async () => {
    const [cats, monthGroups] = await Promise.all([
      listCategories(),
      listCurrentMonthTransactions(),
    ]);
    setCategories(cats);

    const spent: Record<number, number> = {};
    for (const group of monthGroups) {
      spent[group.category.id] = group.category.transactions.reduce(
        (s, t) => s + t.amount,
        0,
      );
    }
    setSpentByCategory(spent);

    if (user) {
      setBudgets(getCurrentMonthBudgets(user.id));
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const budgetedCategoryIds = new Set(budgets.map((b) => b.categoryId));
  const availableCategories = outflowCategories.filter(
    (c) => !budgetedCategoryIds.has(c.id) || editing?.categoryId === c.id,
  );

  function openCreate() {
    setEditing(null);
    setForm({ categoryId: "", amount: "" });
    setError("");
    setModalOpen(true);
  }

  function openEdit(budget: Budget) {
    setEditing(budget);
    setForm({ categoryId: String(budget.categoryId), amount: String(budget.amount) });
    setError("");
    setModalOpen(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!user) return;
    setError("");
    setSaving(true);

    const amount = parseFloat(form.amount);
    const categoryId = parseInt(form.categoryId, 10);

    try {
      if (editing) {
        const updated = await updateBudget(editing.id, { amount });
        saveBudget(user.id, updated);
        toast.success("Budget updated successfully");
      } else {
        const created = await createBudget({ categoryId, amount });
        saveBudget(user.id, created);
        toast.success("Budget created successfully");
      }
      setModalOpen(false);
      await loadData();
    } catch (err) {
      const message = getErrorMessage(
        err,
        editing ? "Failed to update budget" : "Failed to create budget",
      );
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(budget: Budget) {
    if (!user || !confirm("Delete this budget?")) return;
    try {
      await deleteBudget(budget.id);
      removeBudget(user.id, budget.id);
      toast.success("Budget deleted successfully");
      await loadData();
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to delete budget"));
    }
  }

  function getCategoryName(categoryId: number) {
    return categories.find((c) => c.id === categoryId)?.name ?? `Category #${categoryId}`;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#ED7860] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Budgets</h1>
          <p className="mt-1 text-sm text-slate-500">
            {formatMonthYear()} · one budget per expense category
          </p>
        </div>
        {outflowCategories.length > 0 && availableCategories.length > 0 && (
          <ActionButton onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Add
          </ActionButton>
        )}
      </div>

      {outflowCategories.length === 0 ? (
        <EmptyState
          title="No expense categories"
          description="Create an outflow category before setting budgets."
        />
      ) : budgets.length === 0 ? (
        <EmptyState
          title="No budgets this month"
          description="Set monthly spending limits for your expense categories."
          action={<ActionButton onClick={openCreate}>Set budget</ActionButton>}
        />
      ) : (
        <div className="space-y-4">
          {budgets.map((budget) => (
            <BudgetProgressCard
              key={budget.id}
              name={getCategoryName(budget.categoryId)}
              spent={spentByCategory[budget.categoryId] ?? 0}
              budget={budget.amount}
              actions={
                <>
                  <button
                    type="button"
                    onClick={() => openEdit(budget)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    aria-label="Edit budget"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(budget)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
                    aria-label="Delete budget"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </>
              }
            />
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit budget" : "New budget"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <Alert message={error} />}

          {!editing && (
            <Select
              label="Category"
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              required
            >
              <option value="">Select expense category</option>
              {availableCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Select>
          )}

          {editing && (
            <p className="text-sm text-slate-600">
              Category: <span className="font-medium">{getCategoryName(editing.categoryId)}</span>
            </p>
          )}

          <Input
            label="Monthly amount"
            type="number"
            step="0.01"
            min="0.01"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            placeholder="500.00"
            required
          />

          <div className="flex gap-3 pt-2">
            <ActionButton
              type="button"
              variant="secondary"
              onClick={() => setModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </ActionButton>
            <ActionButton type="submit" loading={saving} className="flex-1">
              {editing ? "Save" : "Create"}
            </ActionButton>
          </div>
        </form>
      </Modal>
    </div>
  );
}
