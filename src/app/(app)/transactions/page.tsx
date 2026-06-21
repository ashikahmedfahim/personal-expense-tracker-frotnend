"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { Alert } from "@/components/ui/Alert";
import { ActionButton } from "@/components/ui/ActionButton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { listCategories } from "@/lib/api/categories";
import {
  createTransaction,
  deleteTransaction,
  listRecentTransactions,
  updateTransaction,
} from "@/lib/api/transactions";
import { getErrorMessage } from "@/lib/api/client";
import { useToast } from "@/contexts/ToastContext";
import { financeColors as fc } from "@/lib/finance-colors";
import { formatDate, formatSignedCurrency, toDateInputValue, toIsoDate } from "@/lib/format";
import type { Category, Transaction } from "@/types/api";

interface TransactionFormData {
  title: string;
  amount: string;
  categoryId: string;
  description: string;
  date: string;
}

const emptyForm: TransactionFormData = {
  title: "",
  amount: "",
  categoryId: "",
  description: "",
  date: toDateInputValue(),
};

export default function TransactionsPage() {
  const toast = useToast();
  const pathname = usePathname();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [form, setForm] = useState<TransactionFormData>(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [txs, cats] = await Promise.all([listRecentTransactions(), listCategories()]);
    setTransactions(txs);
    setCategories(cats);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData, pathname]);

  const categoryMap = new Map(categories.map((c) => [c.id, c]));

  function openCreate() {
    setEditing(null);
    setForm({ ...emptyForm, date: toDateInputValue() });
    setError("");
    setModalOpen(true);
  }

  function openEdit(tx: Transaction) {
    setEditing(tx);
    setForm({
      title: tx.title,
      amount: String(tx.amount),
      categoryId: String(tx.categoryId),
      description: tx.description ?? "",
      date: toDateInputValue(new Date(tx.date)),
    });
    setError("");
    setModalOpen(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      title: form.title,
      amount: parseFloat(form.amount),
      categoryId: parseInt(form.categoryId, 10),
      description: form.description || undefined,
      date: toIsoDate(form.date),
    };

    try {
      if (editing) {
        await updateTransaction(editing.id, payload);
        toast.success("Transaction updated successfully");
      } else {
        await createTransaction(payload);
        toast.success("Transaction created successfully");
      }
      setModalOpen(false);
      await loadData();
    } catch (err) {
      const message = getErrorMessage(
        err,
        editing ? "Failed to update transaction" : "Failed to create transaction",
      );
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this transaction?")) return;
    try {
      await deleteTransaction(id);
      toast.success("Transaction deleted successfully");
      await loadData();
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to delete transaction"));
    }
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
          <h1 className="text-2xl font-bold text-slate-900">Transactions</h1>
          <p className="mt-1 text-sm text-slate-500">Your 10 most recent transactions</p>
        </div>
        <ActionButton onClick={openCreate} disabled={categories.length === 0}>
          <Plus className="h-4 w-4" />
          Add
        </ActionButton>
      </div>

      {categories.length === 0 ? (
        <EmptyState
          title="Create a category first"
          description="You need at least one category before adding transactions."
        />
      ) : transactions.length === 0 ? (
        <EmptyState
          title="No transactions yet"
          description="Record your first income or expense."
          action={<ActionButton onClick={openCreate}>Add transaction</ActionButton>}
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <ul className="divide-y divide-slate-100">
            {transactions.map((tx) => {
              const cat = categoryMap.get(tx.categoryId);
              const flowType = cat?.flowType ?? "OUTFLOW";
              return (
                <li
                  key={tx.id}
                  className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-x-3 gap-y-2 px-5 py-4 sm:gap-x-4"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-slate-900">{tx.title}</p>
                    <p className="text-xs text-slate-500">
                      {cat?.name ?? "Unknown"} · {formatDate(tx.date)}
                    </p>
                    {tx.description && (
                      <p className="mt-0.5 truncate text-xs text-slate-400">{tx.description}</p>
                    )}
                  </div>
                  <p
                    className="text-right text-sm font-semibold whitespace-nowrap tabular-nums"
                    style={{ color: flowType === "INFLOW" ? fc.income : fc.expense }}
                  >
                    {formatSignedCurrency(tx.amount, flowType)}
                  </p>
                  <div className="flex shrink-0 justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => openEdit(tx)}
                      className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(tx.id)}
                      className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit transaction" : "New transaction"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <Alert message={error} />}

          <Input
            label="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Coffee, Salary, etc."
            required
          />
          <Input
            label="Amount"
            type="number"
            step="0.01"
            min="0.01"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            placeholder="0.00"
            required
          />
          <Select
            label="Category"
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name} ({cat.flowType === "INFLOW" ? "Income" : "Expense"})
              </option>
            ))}
          </Select>
          <Input
            label="Date"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
          <Input
            label="Description (optional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Notes..."
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
