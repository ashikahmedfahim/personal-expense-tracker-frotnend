"use client";

import { BudgetOverviewChart } from "@/components/app/BudgetOverviewChart";
import { BrowserFrame } from "@/components/marketing/BrowserFrame";
import { BudgetsPreview } from "@/components/marketing/BudgetsPreview";
import { DashboardPreview } from "@/components/marketing/DashboardPreview";
import { showcaseIncome, showcaseOverallBudget } from "@/content/showcase-data";

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div id="dashboard-showcase" className="mx-auto max-w-5xl">
        <BrowserFrame url="expensetracker.app/dashboard">
          <DashboardPreview />
        </BrowserFrame>
      </div>

      <div id="budgets-showcase" className="mx-auto mt-12 max-w-3xl">
        <BrowserFrame url="expensetracker.app/budgets">
          <div className="space-y-4">
            <BudgetOverviewChart overall={showcaseOverallBudget} actualIncome={showcaseIncome} />
            <BudgetsPreview />
          </div>
        </BrowserFrame>
      </div>
    </div>
  );
}
