import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { financeColors as fc } from "@/lib/finance-colors";
import { formatCurrency } from "@/lib/format";

const budgetCategories = [
  { name: "Groceries", spent: 320, budget: 500, pct: 64 },
  { name: "Rent", spent: 1200, budget: 1200, pct: 100 },
  { name: "Transport", spent: 85, budget: 200, pct: 42 },
];

function BudgetBar({ pct }: { pct: number }) {
  const barColor = pct >= 100 ? fc.expense : pct >= 80 ? "#FCD34D" : fc.expenseBar;

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className="h-full rounded-full"
        style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: barColor }}
      />
    </div>
  );
}

export function ProductPreviewSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-28">
      <Container>
        <SectionHeader
          eyebrow="Product"
          title="Budgets that keep you on track"
          description="Set monthly limits per outflow category. One budget per category per month — no duplicates, no guesswork."
          align="left"
          className="max-w-xl"
        />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-center lg:gap-10">
          <div className="space-y-4">
            {budgetCategories.map((cat) => (
              <div
                key={cat.name}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-slate-900">{cat.name}</p>
                  <p className="text-sm font-medium" style={{ color: fc.expense }}>
                    {formatCurrency(cat.spent)} / {formatCurrency(cat.budget)}
                  </p>
                </div>
                <div className="mt-3">
                  <BudgetBar pct={cat.pct} />
                </div>
                <p className="mt-2 text-xs text-slate-500">{cat.pct}% of monthly budget</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 font-mono text-sm shadow-lg shadow-slate-200/50 sm:p-6">
            <p className="text-xs font-semibold text-[#ED7860]">POST /v1/budgets</p>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-50 p-4 text-slate-700">
{`{
  "categoryId": 3,
  "amount": 500,
  "date": "2026-05-01T00:00:00.000Z"
}`}
            </pre>
            <p
              className="mt-4 rounded-lg px-3 py-2 text-xs font-medium"
              style={{ backgroundColor: fc.expenseBg, color: fc.expense }}
            >
              → 201 Created · one budget per outflow category per UTC month
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
