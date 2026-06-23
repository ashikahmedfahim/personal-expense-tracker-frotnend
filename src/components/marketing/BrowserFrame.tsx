import type { ReactNode } from "react";

interface BrowserFrameProps {
  children: ReactNode;
  url?: string;
  className?: string;
}

export function BrowserFrame({
  children,
  url = "expensetracker.app/dashboard",
  className,
}: BrowserFrameProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/60 ${className ?? ""}`}
    >
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" aria-hidden />
        <span className="ml-2 truncate text-xs text-slate-400">{url}</span>
      </div>
      <div className="bg-slate-50/50 p-4 sm:p-5 lg:p-6">{children}</div>
    </div>
  );
}
