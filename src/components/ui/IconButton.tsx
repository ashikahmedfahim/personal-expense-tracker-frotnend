import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type IconButtonVariant = "default" | "danger";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: IconButtonVariant;
}

const variants: Record<IconButtonVariant, string> = {
  default: "text-slate-400 hover:bg-slate-100 hover:text-slate-600",
  danger: "text-slate-400 hover:bg-red-50 hover:text-red-500",
};

export function IconButton({
  children,
  variant = "default",
  className,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "cursor-pointer rounded-lg p-2 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
