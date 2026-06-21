"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { navLinks, siteConfig } from "@/content/landing";
import { cn } from "@/lib/cn";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full border-b border-slate-200 bg-white px-4 py-4 shadow-lg">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
            <a
              href={siteConfig.apiRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
              GitHub
            </a>
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className={cn(
                "inline-flex w-full items-center justify-center rounded-xl bg-[#ED7860] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#ED7860]/25",
              )}
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
