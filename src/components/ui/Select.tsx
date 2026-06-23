import type { SelectHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
}

export function Select({ label, error, id, className, children, ...props }: SelectProps) {
  const selectId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      <label htmlFor={selectId} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <select
        id={selectId}
        className={cn(
          "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-base text-slate-900 transition-colors focus:border-[#ED7860] focus:outline-none focus:ring-2 focus:ring-[#ED7860]/20 sm:text-sm",
          error && "border-red-400 focus:border-red-400 focus:ring-red-400/20",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
