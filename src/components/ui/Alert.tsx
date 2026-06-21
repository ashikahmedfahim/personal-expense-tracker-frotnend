import { cn } from "@/lib/cn";

interface AlertProps {
  message: string;
  variant?: "error" | "success" | "info";
  className?: string;
}

const styles = {
  error: "border-red-200 bg-red-50 text-red-700",
  success: "border-green-200 bg-green-50 text-green-700",
  info: "border-slate-200 bg-slate-50 text-slate-700",
};

export function Alert({ message, variant = "error", className }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn("rounded-xl border px-4 py-3 text-sm", styles[variant], className)}
    >
      {message}
    </div>
  );
}
