import { Container } from "@/components/ui/Container";
import { footerLinkGroups, siteConfig } from "@/content/landing";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-10 sm:py-12">
      <Container>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <p className="text-base font-semibold text-slate-900">{siteConfig.name}</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
              {siteConfig.tagline}. Built as the frontend companion to the open-source
              Personal Expense Tracker API.
            </p>
          </div>

          {footerLinkGroups.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-semibold text-slate-900">{group.title}</p>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-600 transition-colors hover:text-[#ED7860]"
                      {...(link.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} {siteConfig.name}. Open source.</p>
          <a
            href={siteConfig.apiRepoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium transition-colors hover:text-[#ED7860]"
          >
            View API on GitHub
          </a>
        </div>
      </Container>
    </footer>
  );
}
