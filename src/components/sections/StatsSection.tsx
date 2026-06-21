import { Container } from "@/components/ui/Container";
import { stats } from "@/content/landing";

export function StatsSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-12 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center sm:p-6 lg:text-left"
            >
              <p className="text-3xl font-bold text-[#ED7860] sm:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">{stat.label}</p>
              <p className="mt-1 text-sm text-slate-500">{stat.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
