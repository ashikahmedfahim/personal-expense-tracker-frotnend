import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "danger" | "ghost";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  loading?: boolean;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-[#ED7860] text-white hover:bg-[#D8654D] shadow-lg shadow-[#ED7860]/25 disabled:opacity-60",
  secondary:
    "border border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50 disabled:opacity-60",
  danger:
    "border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-60",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-60",
};

export function ActionButton({
  children,
  variant = "primary",
  loading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ActionButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED7860] disabled:cursor-not-allowed",
        variants[variant],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
}
