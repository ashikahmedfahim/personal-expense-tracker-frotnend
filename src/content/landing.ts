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
  badge: "Free personal finance app",
  title: "Take control of your",
  highlight: "personal finances",
  description:
    "Track income, expenses, and savings. Set monthly budgets, watch your spending with live charts, and see exactly where your money goes.",
  primaryCta: { label: "Get started free", href: "/register" },
  secondaryCta: { label: "Sign in", href: "/login" },
  trustBadges: [
    "Income, expense & savings tracking",
    "Monthly budgets per category",
    "Dashboard charts & insights",
  ],
};

export const stats: StatItem[] = [
  {
    value: "4",
    label: "Money flows",
    description: "Income, expenses, savings, and net balance",
  },
  {
    value: "∞",
    label: "Categories",
    description: "Organize spending your way with custom labels",
  },
  {
    value: "1",
    label: "Budget per category",
    description: "Clear monthly limits for every expense and savings goal",
  },
  {
    value: "Live",
    label: "Dashboard",
    description: "Charts and totals updated from your real transactions",
  },
];

export const features: FeatureItem[] = [
  {
    icon: Lock,
    title: "Secure accounts",
    description:
      "Email verification, JWT sign-in, and password reset. Your data stays scoped to your account.",
  },
  {
    icon: Tags,
    title: "Flexible categories",
    description:
      "Create income, expense, and savings categories with custom order. Organize spending your way.",
  },
  {
    icon: Receipt,
    title: "Transaction tracking",
    description:
      "Log income, expenses, and savings with amounts, dates, and notes. Recent activity on your dashboard.",
  },
  {
    icon: Wallet,
    title: "Monthly budgets",
    description:
      "Set one budget per expense or savings category per month. See spent vs planned at a glance.",
  },
  {
    icon: PieChart,
    title: "Budget overview chart",
    description:
      "Visualize planned allocations against your actual income with an interactive stacked bar chart.",
  },
  {
    icon: BarChart3,
    title: "Daily expense chart",
    description:
      "Track outflow spending day by day across the month with a line chart on your dashboard.",
  },
  {
    icon: Layers,
    title: "Net balance",
    description:
      "Income minus expenses and savings — always visible on the dashboard and budgets pages.",
  },
  {
    icon: Shield,
    title: "Budget guardrails",
    description:
      "Transactions in budgeted categories cannot exceed the monthly limit you set.",
  },
];

export const steps: StepItem[] = [
  {
    step: 1,
    phase: "Setup · one time",
    title: "Create your account",
    description:
      "Register with your email, verify with a 6-digit code, and sign in to your personal dashboard.",
  },
  {
    step: 2,
    phase: "Organize",
    title: "Define your categories",
    description:
      "Add income sources like Salary, expenses like Groceries or Rent, and savings goals. Order them how you like.",
  },
  {
    step: 3,
    phase: "Track & plan",
    title: "Log transactions & set budgets",
    description:
      "Record every transaction and set monthly budgets. Watch progress bars and charts update as you spend.",
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
    question: "What is ExpenseTracker?",
    answer:
      "A personal finance web app for tracking income, expenses, and savings. Organize categories, set monthly budgets, and view charts on your dashboard — all synced to your account.",
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
