"use client";

import { AlertTriangle } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";
import { Modal } from "@/components/ui/Modal";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onCancel} title={title}>
      <div className="flex gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
          <AlertTriangle className="h-5 w-5" aria-hidden />
        </span>
        <p className="text-sm leading-relaxed text-slate-600">{description}</p>
      </div>

      <div className="mt-6 flex gap-3">
        <ActionButton
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
          className="flex-1"
        >
          {cancelLabel}
        </ActionButton>
        <ActionButton
          type="button"
          variant="danger"
          onClick={onConfirm}
          loading={loading}
          className="flex-1"
        >
          {confirmLabel}
        </ActionButton>
      </div>
    </Modal>
  );
}
