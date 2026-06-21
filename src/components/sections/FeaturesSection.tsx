import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { features } from "@/content/landing";

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 sm:py-24 lg:py-28">
      <Container>
        <SectionHeader
          eyebrow="Features"
          title="Everything you need to manage money"
          description="From secure auth to monthly budgets — the API covers the full personal finance workflow with clean, testable layers."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-[#ED7860]/30 hover:shadow-lg hover:shadow-[#ED7860]/5 sm:p-6"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDF0ED] text-[#ED7860] transition-colors group-hover:bg-[#ED7860] group-hover:text-white">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
