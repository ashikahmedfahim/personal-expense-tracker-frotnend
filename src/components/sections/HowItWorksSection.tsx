import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { steps } from "@/content/landing";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-y border-slate-200 bg-slate-50 py-16 sm:py-24 lg:py-28">
      <Container>
        <SectionHeader
          eyebrow="How it works"
          title="Three steps to financial clarity"
          description="Set up once, organize your categories, then track every dollar with budgets that keep you accountable."
        />

        <ol className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:gap-6 lg:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.step}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#ED7860] text-sm font-bold text-white shadow-md shadow-[#ED7860]/30">
                {step.step}
              </span>
              <p className="mt-4 text-xs font-semibold tracking-wide text-[#ED7860] uppercase">
                {step.phase}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
