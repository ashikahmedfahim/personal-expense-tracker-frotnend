import { Wallet } from "lucide-react";

import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { navLinks, siteConfig } from "@/content/landing";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <Container className="relative">
        <div className="flex h-14 items-center justify-between sm:h-16">
          <a href="#" className="flex items-center gap-2 font-semibold text-slate-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ED7860] text-white sm:h-9 sm:w-9">
              <Wallet className="h-4 w-4" aria-hidden />
            </span>
            <span className="text-sm sm:text-base">{siteConfig.name}</span>
          </a>

          <nav className="hidden items-center gap-6 md:flex lg:gap-8" aria-label="Main">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-600 transition-colors hover:text-slate-900"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button href={siteConfig.apiRepoUrl} variant="ghost" external>
              GitHub
            </Button>
            <Button href="/login" variant="secondary">
              Sign in
            </Button>
            <Button href="/register">Get started</Button>
          </div>

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
