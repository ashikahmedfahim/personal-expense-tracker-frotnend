"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { BudgetOverviewChart } from "@/components/app/BudgetOverviewChart";
import { BudgetProgressCard } from "@/components/app/BudgetProgressCard";
import { Alert } from "@/components/ui/Alert";
import { ActionButton } from "@/components/ui/ActionButton";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { IconButton } from "@/components/ui/IconButton";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { useAuth } from "@/contexts/AuthContext";
import {
  createBudget,
  deleteBudget,
  getCurrentMonthBudgetOverview,
  getCurrentMonthOverallBudget,
  updateBudget,
} from "@/lib/api/budgets";
import { listCategories } from "@/lib/api/categories";
import { getErrorMessage } from "@/lib/api/client";
import { useToast } from "@/contexts/ToastContext";
import { financeColors as fc } from "@/lib/finance-colors";
import { formatCurrency, formatMonthYear } from "@/lib/format";
import type { Budget, Category, CurrentMonthBudgetOverview, OverallBudgetView } from "@/types/api";

interface BudgetFormData {
  categoryId: string;
  amount: string;
}

export default function BudgetsPage() {
  const { user } = useAuth();
  const toast = useToast();
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgetOverview, setBudgetOverview] = useState<CurrentMonthBudgetOverview | null>(null);
  const [overallBudget, setOverallBudget] = useState<OverallBudgetView | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Budget | null>(null);
  const [form, setForm] = useState<BudgetFormData>({ categoryId: "", amount: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Budget | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [cats, overview, overall] = await Promise.all([
      listCategories(),
      getCurrentMonthBudgetOverview(),
      getCurrentMonthOverallBudget(),
    ]);
    setCategories(cats);
    setBudgetOverview(overview);
    setOverallBudget(overall);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData, pathname]);

  const budgetItems = budgetOverview?.budgets ?? [];
  const incomeBudgets = budgetItems.filter((item) => item.category.flowType === "INFLOW");
  const expenseBudgets = budgetItems.filter((item) => item.category.flowType === "OUTFLOW");
  const budgetedCategoryIds = new Set(budgetItems.map((item) => item.budget.categoryId));
  const availableCategories = categories.filter(
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
        await updateBudget(editing.id, { amount });
        toast.success("Budget updated successfully");
      } else {
        await createBudget({ categoryId, amount });
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

  async function confirmDelete() {
    if (!user || !deleteTarget) return;
    setDeleting(true);
    try {
      await deleteBudget(deleteTarget.id);
      toast.success("Budget deleted successfully");
      setDeleteTarget(null);
      await loadData();
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to delete budget"));
    } finally {
      setDeleting(false);
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
            {formatMonthYear()} · one budget per category
          </p>
        </div>
        {categories.length > 0 && availableCategories.length > 0 && (
          <ActionButton onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Add
          </ActionButton>
        )}
      </div>

      {categories.length === 0 ? (
        <EmptyState
          title="No categories yet"
          description="Create income or expense categories before setting budgets."
        />
      ) : budgetItems.length === 0 ? (
        <EmptyState
          title="No budgets this month"
          description="Set planned income and expense amounts for your categories."
          action={<ActionButton onClick={openCreate}>Set budget</ActionButton>}
        />
      ) : (
        <div className="space-y-6">
          {overallBudget &&
            (overallBudget.totalIncome > 0 || overallBudget.totalAllocated > 0) && (
              <BudgetOverviewChart overall={overallBudget} />
            )}

          {incomeBudgets.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-semibold text-slate-900">Planned income</h2>
              {incomeBudgets.map((item) => (
                <div
                  key={item.budget.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900">{item.category.name}</p>
                    <p className="mt-1 text-sm font-medium" style={{ color: fc.income }}>
                      {formatCurrency(item.budget.amount)} planned
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <IconButton onClick={() => openEdit(item.budget)} aria-label="Edit budget">
                      <Pencil className="h-4 w-4" />
                    </IconButton>
                    <IconButton
                      variant="danger"
                      onClick={() => setDeleteTarget(item.budget)}
                      aria-label="Delete budget"
                    >
                      <Trash2 className="h-4 w-4" />
                    </IconButton>
                  </div>
                </div>
              ))}
            </section>
          )}

          {expenseBudgets.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-semibold text-slate-900">Expense budgets</h2>
              {expenseBudgets.map((item) => (
                <BudgetProgressCard
                  key={item.budget.id}
                  name={item.category.name}
                  spent={item.spent}
                  budget={item.budget.amount}
                  actions={
                    <>
                      <IconButton onClick={() => openEdit(item.budget)} aria-label="Edit budget">
                        <Pencil className="h-4 w-4" />
                      </IconButton>
                      <IconButton
                        variant="danger"
                        onClick={() => setDeleteTarget(item.budget)}
                        aria-label="Delete budget"
                      >
                        <Trash2 className="h-4 w-4" />
                      </IconButton>
                    </>
                  }
                />
              ))}
            </section>
          )}
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
              <option value="">Select category</option>
              {availableCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({cat.flowType === "INFLOW" ? "income" : "expense"})
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

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete budget?"
        description={
          deleteTarget
            ? `Remove the monthly budget for ${getCategoryName(deleteTarget.categoryId)}. This action cannot be undone.`
            : ""
        }
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
