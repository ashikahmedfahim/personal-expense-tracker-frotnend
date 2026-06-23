import { BudgetOverviewChart } from "@/components/app/BudgetOverviewChart";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BrowserFrame } from "@/components/marketing/BrowserFrame";
import { BudgetsPreview } from "@/components/marketing/BudgetsPreview";
import { showcaseIncome, showcaseOverallBudget } from "@/content/showcase-data";

export function ProductPreviewSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-28">
      <Container>
        <SectionHeader
          eyebrow="Product"
          title="Budgets that keep you on track"
          description="Set monthly limits per category, see spending against each budget, and visualize how your plan fits your actual income."
          align="left"
          className="max-w-xl"
        />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start lg:gap-10">
          <div className="pointer-events-none select-none" aria-hidden>
            <BrowserFrame url="expensetracker.app/budgets">
              <div className="space-y-4">
                <BudgetOverviewChart
                  overall={showcaseOverallBudget}
                  actualIncome={showcaseIncome}
                />
                <BudgetsPreview />
              </div>
            </BrowserFrame>
          </div>

          <div className="space-y-6 lg:pt-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Planned vs actual</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                The overview chart scales your expense and savings budgets against real income
                this month. See what is allocated, what is left, and which categories make up
                the plan.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Per-category progress</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Each budget card shows spent vs planned with a progress bar. Stay on track
                before you hit the limit — outflow and savings categories both count.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">One budget per category</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Create a monthly budget for any expense or savings category. Transactions in
                those categories count toward the limit automatically.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
