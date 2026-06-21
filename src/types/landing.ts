import type { LucideIcon } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
}

export interface HeroContent {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  trustBadges: string[];
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface StepItem {
  step: number;
  phase: string;
  title: string;
  description: string;
}

export interface PlanComparisonRow {
  feature: string;
  free: boolean;
  pro: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FooterLinkGroup {
  title: string;
  links: NavLink[];
}
