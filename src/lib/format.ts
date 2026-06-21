export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatSignedCurrency(
  amount: number,
  flowType: "INFLOW" | "OUTFLOW",
): string {
  const prefix = flowType === "INFLOW" ? "+" : "−";
  return `${prefix}${formatCurrency(amount)}`;
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("da-DK", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function formatMonthYear(date = new Date()): string {
  return new Intl.DateTimeFormat("da-DK", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function toDateInputValue(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function toIsoDate(dateInput: string): string {
  return new Date(`${dateInput}T12:00:00.000Z`).toISOString();
}
