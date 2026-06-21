import {
  BarChart3,
  Layers,
  Lock,
  PieChart,
  Receipt,
  Shield,
  Tags,
  Wallet,
} from "lucide-react";

import type {
  FaqItem,
  FeatureItem,
  FooterLinkGroup,
  HeroContent,
  NavLink,
  PlanComparisonRow,
  StatItem,
  StepItem,
} from "@/types/landing";

export const siteConfig = {
  name: "ExpenseTracker",
  tagline: "Personal finance, simplified",
  apiRepoUrl: "https://github.com/ashikahmedfahim/personal-expense-tracker",
  apiDocsUrl: "https://github.com/ashikahmedfahim/personal-expense-tracker#api-endpoints",
};

export const navLinks: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Free vs Pro", href: "#compare" },
  { label: "FAQ", href: "#faq" },
];

export const heroContent: HeroContent = {
  badge: "Open-source REST API · production-ready",
  title: "Take control of your",
  highlight: "personal finances",
  description:
    "Track income and spending, organize categories, set monthly budgets, and see where your money goes — all backed by a secure, layered TypeScript API.",
  primaryCta: { label: "Get started free", href: "/register" },
  secondaryCta: { label: "Sign in", href: "/login" },
  trustBadges: [
    "JWT-secured accounts",
    "130+ automated tests",
    "Docker-ready dev stack",
  ],
};

export const stats: StatItem[] = [
  {
    value: "4",
    label: "Core modules",
    description: "Users, categories, transactions, and budgets",
  },
  {
    value: "130+",
    label: "Test cases",
    description: "Unit and integration coverage across all layers",
  },
  {
    value: "100%",
    label: "TypeScript",
    description: "End-to-end type safety from API to database",
  },
  {
    value: "REST",
    label: "API design",
    description: "Predictable endpoints with consistent responses",
  },
];

export const features: FeatureItem[] = [
  {
    icon: Lock,
    title: "Secure authentication",
    description:
      "Register and log in with JWT bearer tokens. Protected routes scope all data to your account.",
  },
  {
    icon: Tags,
    title: "Flexible categories",
    description:
      "Create inflow and outflow categories with custom display order. Reorder anytime.",
  },
  {
    icon: Receipt,
    title: "Transaction tracking",
    description:
      "Log expenses and income with amounts, dates, and descriptions. View recent activity grouped by category.",
  },
  {
    icon: Wallet,
    title: "Monthly budgets",
    description:
      "Set one budget per outflow category per month. Stay on track with clear spending limits.",
  },
  {
    icon: Layers,
    title: "Layered architecture",
    description:
      "Routes, controllers, validators, services, and repositories — clean separation of concerns.",
  },
  {
    icon: Shield,
    title: "Built for reliability",
    description:
      "Rate limiting, structured logging, health checks, and graceful shutdown out of the box.",
  },
  {
    icon: BarChart3,
    title: "Prometheus metrics",
    description:
      "Monitor request duration and throughput. Grafana dashboards included in the Docker stack.",
  },
  {
    icon: PieChart,
    title: "Current-month overview",
    description:
      "Fetch up to 20 transactions grouped by category for a quick snapshot of the month.",
  },
];

export const steps: StepItem[] = [
  {
    step: 1,
    phase: "Setup · one time",
    title: "Create your account",
    description:
      "Register with your email and password. The API hashes credentials with bcrypt and returns a JWT on login.",
  },
  {
    step: 2,
    phase: "Organize",
    title: "Define your categories",
    description:
      "Add inflow categories like Salary and outflow categories like Groceries or Rent. Order them how you like.",
  },
  {
    step: 3,
    phase: "Track & plan",
    title: "Log transactions & set budgets",
    description:
      "Record every expense and income. Set monthly budgets for outflow categories and watch your spending stay in check.",
  },
];

export const planComparisonRows: PlanComparisonRow[] = [
  {
    feature: "Add unlimited transactions",
    free: true,
    pro: true,
  },
  {
    feature: "No download required",
    free: true,
    pro: true,
  },
  {
    feature: "WhatsApp — add, update & remove transactions",
    free: false,
    pro: true,
  },
  {
    feature: "Telegram — add, update & remove transactions",
    free: false,
    pro: true,
  },
  {
    feature: "Upload image to auto-categorize & log transactions",
    free: false,
    pro: true,
  },
  {
    feature: "Monthly insights delivered by email",
    free: false,
    pro: true,
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "What is Personal Expense Tracker?",
    answer:
      "It is an open-source TypeScript REST API for personal finance. You can manage categories, transactions, and monthly budgets with JWT-authenticated endpoints backed by PostgreSQL and Prisma.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "You can run the full stack with Docker — API, PostgreSQL, Prometheus, Grafana, and pgAdmin start with a single command. Or install Node.js 22 locally and connect to your own Postgres instance.",
  },
  {
    question: "How do budgets work?",
    answer:
      "Budgets apply only to outflow categories. You can set one budget amount per category per UTC month. Attempting a duplicate returns a 409 conflict, keeping your data clean.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Passwords are hashed with bcrypt and never returned in API responses. All protected routes require a valid JWT, and queries are scoped to the authenticated user. Login and registration have dedicated rate limiters.",
  },
  {
    question: "Can I build a frontend on top of this API?",
    answer:
      "Yes. This landing page is the frontend companion project. The API exposes predictable REST endpoints with consistent success and error response shapes, making it straightforward to integrate.",
  },
  {
    question: "What tech stack powers the API?",
    answer:
      "Express 5, Prisma ORM, PostgreSQL, Joi validation, Pino logging, Prometheus metrics, and Vitest for testing. CI runs typecheck and 130+ tests on every push.",
  },
];

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Free vs Pro", href: "#compare" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "GitHub", href: siteConfig.apiRepoUrl },
      { label: "API docs", href: siteConfig.apiDocsUrl },
      { label: "Docker setup", href: `${siteConfig.apiRepoUrl}#run-with-docker-locally` },
    ],
  },
];
