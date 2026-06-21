# Personal Expense Tracker — Frontend

Landing page for the [Personal Expense Tracker API](https://github.com/ashikahmedfahim/personal-expense-tracker). Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Modern landing page with hero, stats, features, how-it-works, product preview, comparison, FAQ, and CTA sections
- Component-based architecture with content separated from presentation
- Docker dev environment with hot reload
- Responsive design with dark finance-themed UI

## Tech stack

| Tool | Purpose |
|------|---------|
| **Next.js 16** | App Router, SSR, metadata |
| **TypeScript** | Type-safe components and content |
| **Tailwind CSS 4** | Utility-first styling |
| **Lucide React** | Icons |
| **Docker** | Consistent dev environment |

## Project structure

```
src/
├── app/                  # Next.js App Router (layout, page, globals)
├── components/
│   ├── layout/           # Header, Footer
│   ├── sections/         # Page sections (Hero, Features, FAQ, …)
│   └── ui/               # Reusable UI primitives (Button, Badge, …)
├── content/              # Landing page copy and data
├── lib/                  # Utilities (cn)
└── types/                # Shared TypeScript interfaces
```

## Getting started

### Prerequisites

- Node.js 22
- npm

### Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Docker development

```bash
docker compose -f docker-compose.dev.yml up --build
```

The app runs at [http://localhost:3000](http://localhost:3000) with source mounted for hot reload.

Useful commands:

```bash
# Run in background
docker compose -f docker-compose.dev.yml up --build -d

# View logs
docker compose -f docker-compose.dev.yml logs -f web

# Stop containers
docker compose -f docker-compose.dev.yml down
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Related

- [Personal Expense Tracker API](https://github.com/ashikahmedfahim/personal-expense-tracker) — Express + Prisma REST API
