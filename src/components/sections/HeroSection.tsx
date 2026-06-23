import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BrowserFrame } from "@/components/marketing/BrowserFrame";
import { DashboardPreview } from "@/components/marketing/DashboardPreview";
import { heroContent } from "@/content/landing";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-16 pt-10 sm:pb-20 sm:pt-16 lg:pt-20">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#FDF0ED_0%,_#ffffff_55%)]"
        aria-hidden
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Badge>{heroContent.badge}</Badge>

          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:mt-6 sm:text-4xl lg:text-5xl xl:text-6xl">
            {heroContent.title}{" "}
            <span className="text-[#ED7860]">{heroContent.highlight}</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:mt-6 sm:max-w-2xl sm:text-lg">
            {heroContent.description}
          </p>

          <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:justify-center">
            <Button href={heroContent.primaryCta.href} fullWidth className="sm:w-auto">
              {heroContent.primaryCta.label}
            </Button>
            <Button
              href={heroContent.secondaryCta.href}
              variant="secondary"
              fullWidth
              className="sm:w-auto"
            >
              {heroContent.secondaryCta.label}
            </Button>
          </div>

          <ul className="mt-6 flex flex-col items-center gap-2 text-sm text-slate-500 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-2">
            {heroContent.trustBadges.map((badge) => (
              <li key={badge} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ED7860]" aria-hidden />
                {badge}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto mt-10 max-w-5xl sm:mt-14">
          <div
            className="absolute -inset-3 rounded-3xl bg-[#ED7860]/10 blur-2xl sm:-inset-6"
            aria-hidden
          />
          <div className="pointer-events-none relative select-none" aria-hidden>
            <BrowserFrame>
              <DashboardPreview />
            </BrowserFrame>
          </div>
        </div>
      </Container>
    </section>
  );
}
