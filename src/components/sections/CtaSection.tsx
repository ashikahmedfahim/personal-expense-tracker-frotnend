import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/content/landing";

export function CtaSection() {
  return (
    <section id="cta" className="py-16 sm:py-24 lg:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-[#ED7860] px-6 py-12 text-center sm:rounded-3xl sm:px-12 sm:py-16">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15)_0%,_transparent_60%)]"
            aria-hidden
          />

          <h2 className="relative text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Ready to take control of your finances?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            Create your free account, set up categories and budgets, and start tracking your
            money with a dashboard built for clarity.
          </p>

          <div className="relative mt-8 flex w-full flex-col gap-3 sm:mx-auto sm:w-auto sm:flex-row sm:justify-center">
            <a
              href="/register"
              className="inline-flex w-full items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#ED7860] shadow-lg transition-colors hover:bg-[#FDF0ED] sm:w-auto"
            >
              Create free account
            </a>
            <a
              href="/login"
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20 sm:w-auto"
            >
              Sign in
            </a>
          </div>

          <ul className="relative mt-6 flex flex-col items-center gap-2 text-sm text-white/80 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6">
            <li>No credit card required</li>
            <li>Email verification</li>
            <li>Works on mobile & desktop</li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
