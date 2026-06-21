import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[#ED7860]/30 bg-[#FDF0ED] px-3 py-1 text-xs font-semibold tracking-wide text-[#ED7860] uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
