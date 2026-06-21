import { Check, X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { planComparisonRows } from "@/content/landing";
import { cn } from "@/lib/cn";
import { formatCurrency } from "@/lib/format";

function PlanIndicator({ included }: { included: boolean }) {
  if (included) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#F0FDF4] sm:h-7 sm:w-7">
        <Check className="h-3.5 w-3.5 text-[#6BCF9A] sm:h-4 sm:w-4" strokeWidth={2.5} aria-hidden />
        <span className="sr-only">Included</span>
      </span>
    );
  }

  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 sm:h-7 sm:w-7">
      <X className="h-3.5 w-3.5 text-slate-300 sm:h-4 sm:w-4" strokeWidth={2.5} aria-hidden />
      <span className="sr-only">Not included</span>
    </span>
  );
}

export function ComparisonSection() {
  return (
    <section id="compare" className="bg-slate-50 py-16 sm:py-24 lg:py-28">
      <Container>
        <SectionHeader
          eyebrow="Plans"
          title="Free vs Pro"
          description="Start free with unlimited manual tracking in the browser. Upgrade to Pro for messaging bots, receipt scanning, and email insights."
        />

        <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="min-w-[320px]">
            {/* Header row */}
            <div className="grid grid-cols-[1.5fr_0.75fr_0.75fr] border-b border-slate-200 bg-slate-50 sm:grid-cols-[1.4fr_1fr_1fr]">
              <div className="px-3 py-4 text-xs font-semibold text-slate-700 sm:px-6 sm:py-5 sm:text-sm">
                Feature
              </div>
              <div className="border-l border-slate-200 px-2 py-4 text-center sm:px-6 sm:py-5">
                <p className="text-sm font-bold text-slate-900 sm:text-lg">Free</p>
                <p className="mt-0.5 text-[10px] text-slate-500 sm:text-sm">{formatCurrency(0)} / forever</p>
              </div>
              <div className="border-l border-slate-200 bg-[#FDF0ED]/60 px-2 py-4 text-center sm:px-6 sm:py-5">
                <p className="text-sm font-bold text-[#ED7860] sm:text-lg">Pro</p>
                <p className="mt-0.5 text-[10px] text-slate-500 sm:text-sm">Automation</p>
              </div>
            </div>

            {/* Feature rows */}
            {planComparisonRows.map((row, index) => (
              <div
                key={row.feature}
                className={cn(
                  "grid grid-cols-[1.5fr_0.75fr_0.75fr] border-b border-slate-200 sm:grid-cols-[1.4fr_1fr_1fr]",
                  index % 2 === 0 ? "bg-white" : "bg-slate-50/40",
                )}
              >
                <div className="flex items-center px-3 py-3 text-xs font-medium leading-snug text-slate-900 sm:px-6 sm:py-4 sm:text-sm">
                  {row.feature}
                </div>
                <div className="flex items-center justify-center border-l border-slate-200 px-2 py-3 sm:px-6 sm:py-4">
                  <PlanIndicator included={row.free} />
                </div>
                <div className="flex items-center justify-center border-l border-slate-200 bg-[#FDF0ED]/30 px-2 py-3 sm:px-6 sm:py-4">
                  <PlanIndicator included={row.pro} />
                </div>
              </div>
            ))}

            {/* CTA row */}
            <div className="grid grid-cols-[1.5fr_0.75fr_0.75fr] border-t border-slate-200 bg-slate-50 sm:grid-cols-[1.4fr_1fr_1fr]">
              <div className="hidden px-3 py-4 sm:block sm:px-6 sm:py-5" />
              <div className="flex items-center justify-center border-l border-slate-200 px-2 py-4 sm:px-6 sm:py-5">
                <Button href="#cta" variant="secondary" className="w-full px-3 py-2 text-xs sm:max-w-[160px] sm:px-5 sm:py-3 sm:text-sm">
                  Get started
                </Button>
              </div>
              <div className="flex items-center justify-center border-l border-slate-200 px-2 py-4 sm:px-6 sm:py-5">
                <Button href="#cta" className="w-full px-3 py-2 text-xs sm:max-w-[160px] sm:px-5 sm:py-3 sm:text-sm">
                  Upgrade
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
