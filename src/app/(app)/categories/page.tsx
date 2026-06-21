"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { ArrowDownLeft, ArrowUpRight, Pencil, Plus, Trash2 } from "lucide-react";

import { Alert } from "@/components/ui/Alert";
import { ActionButton } from "@/components/ui/ActionButton";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { IconButton } from "@/components/ui/IconButton";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import {
  createCategory,
  deleteCategory,
  listCategories,
  updateCategory,
} from "@/lib/api/categories";
import { getErrorMessage } from "@/lib/api/client";
import { useToast } from "@/contexts/ToastContext";
import { financeColors as fc } from "@/lib/finance-colors";
import type { Category, FlowType } from "@/types/api";

interface CategoryFormData {
  name: string;
  flowType: FlowType;
}

const emptyForm: CategoryFormData = { name: "", flowType: "OUTFLOW" };

export default function CategoriesPage() {
  const toast = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState<CategoryFormData>(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadData = useCallback(async () => {
    const cats = await listCategories();
    setCategories(cats);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const inflow = categories.filter((c) => c.flowType === "INFLOW");
  const outflow = categories.filter((c) => c.flowType === "OUTFLOW");

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setModalOpen(true);
  }

  function openEdit(cat: Category) {
    setEditing(cat);
    setForm({ name: cat.name, flowType: cat.flowType });
    setError("");
    setModalOpen(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      if (editing) {
        await updateCategory(editing.id, form);
        toast.success("Category updated successfully");
      } else {
        await createCategory(form);
        toast.success("Category created successfully");
      }
      setModalOpen(false);
      await loadData();
    } catch (err) {
      const message = getErrorMessage(
        err,
        editing ? "Failed to update category" : "Failed to create category",
      );
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteCategory(deleteTarget.id);
      toast.success("Category deleted successfully");
      setDeleteTarget(null);
      await loadData();
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to delete category"));
    } finally {
      setDeleting(false);
    }
  }

  function CategoryList({
    items,
    icon: Icon,
    color,
    label,
  }: {
    items: Category[];
    icon: typeof ArrowDownLeft;
    color: string;
    label: string;
  }) {
    if (items.length === 0) return null;

    return (
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Icon className="h-4 w-4" style={{ color }} />
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            {label}
          </h2>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <ul className="divide-y divide-slate-100">
            {items.map((cat) => (
              <li key={cat.id} className="flex items-center gap-4 px-5 py-4">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-slate-900">{cat.name}</p>
                  <p className="text-xs text-slate-400">Order {cat.order}</p>
                </div>
                <div className="flex gap-1">
                  <IconButton onClick={() => openEdit(cat)} aria-label="Edit">
                    <Pencil className="h-4 w-4" />
                  </IconButton>
                  <IconButton
                    variant="danger"
                    onClick={() => setDeleteTarget(cat)}
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </IconButton>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
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
          <h1 className="text-2xl font-bold text-slate-900">Categories</h1>
          <p className="mt-1 text-sm text-slate-500">Organize income and expenses</p>
        </div>
        <ActionButton onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Add
        </ActionButton>
      </div>

      {categories.length === 0 ? (
        <EmptyState
          title="No categories yet"
          description="Create income and expense categories to organize your transactions."
          action={<ActionButton onClick={openCreate}>Add category</ActionButton>}
        />
      ) : (
        <div className="space-y-6">
          <CategoryList
            items={inflow}
            icon={ArrowDownLeft}
            color={fc.income}
            label="Income"
          />
          <CategoryList
            items={outflow}
            icon={ArrowUpRight}
            color={fc.expense}
            label="Expenses"
          />
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit category" : "New category"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <Alert message={error} />}

          <Input
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Groceries, Salary, etc."
            required
          />
          <Select
            label="Type"
            value={form.flowType}
            onChange={(e) => setForm({ ...form, flowType: e.target.value as FlowType })}
          >
            <option value="OUTFLOW">Expense (outflow)</option>
            <option value="INFLOW">Income (inflow)</option>
          </Select>

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
        title="Delete category?"
        description={
          deleteTarget
            ? `"${deleteTarget.name}" and its linked data may be affected. This action cannot be undone.`
            : ""
        }
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
