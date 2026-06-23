"use client";

import { BudgetProgressCard } from "@/components/app/BudgetProgressCard";
import { showcaseBudgetCards } from "@/content/showcase-data";

export function BudgetsPreview() {
  return (
    <div className="space-y-3">
      {showcaseBudgetCards.map((card) => (
        <BudgetProgressCard key={card.name} {...card} />
      ))}
    </div>
  );
}
