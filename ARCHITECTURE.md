# Architecture Foundation: Me The Change (NGO) Website

This document records the architectural foundation established in **Phase 1: Project Setup, Base Architecture & Tooling**.

---

## 1. Architectural Philosophy

1. **Simplicity & Maintainability**: Standard Next.js conventions over complex abstractions. Any mid-level web developer should easily navigate the codebase.
2. **Type Safety by Default**: Strict TypeScript compiler options preventing implicit `any` and unhandled undefined errors.
3. **Decoupled Configuration**: All organization metadata, social links, legal placeholders, and feature flags reside in `src/config/site.ts`. No hardcoded strings scattered across components.
4. **Resilience to Pending Information**: The architecture explicitly isolates missing NGO credentials (registration number, 12A/80G status, Darpan ID, payment API keys) so development and verification proceed smoothly without fabricating data.

---

## 2. Directory Layout Established

```
c:/NGO/
├── .env.example          # Environment variable template with safe placeholders
├── .gitignore            # Git exclusion rules protecting secrets and build outputs
├── package.json          # Dependencies and operational scripts
├── tsconfig.json         # TypeScript configuration with strict mode and @/* alias
├── README.md             # Project overview, setup, and run instructions
├── ARCHITECTURE.md       # Architectural documentation of established foundation
└── src/
    ├── app/              # Next.js App Router root layout and base page
    │   ├── globals.css   # Tailwind CSS base and theme definitions
    │   ├── layout.tsx    # Root HTML shell with typography and site metadata
    │   └── page.tsx      # Minimal foundation placeholder view
    ├── components/       # Reserved for UI primitives and compound components (Phase 2+)
    ├── config/           # Centralized configuration
    │   └── site.ts       # Site-wide configuration and placeholder flags
    ├── data/             # Reserved for structured content registries (Phase 4+)
    ├── lib/              # Core utilities and helpers
    │   └── utils.ts      # Class merging helper (clsx + tailwind-merge)
    └── types/            # Shared TypeScript type definitions
        └── index.ts      # Base navigation and social link types
```

---

## 3. Core Dependencies (Phase 1)

- **`next`**, **`react`**, **`react-dom`**: Next.js App Router full-stack runtime.
- **`tailwindcss`**, **`@tailwindcss/postcss`**: Modern styling engine with zero runtime overhead.
- **`clsx`**, **`tailwind-merge`**: Utility helpers for conditional class combinations without Tailwind conflict issues.
- **`lucide-react`**: Tree-shakeable, accessible icon set.
- **`zod`**: Schema validation library for form inputs and environment variables.

---

## 4. Configuration & Path Aliases

- Path alias `@/*` maps directly to `./src/*`, ensuring clean imports (e.g. `import { siteConfig } from "@/config/site"`).
- Environment secrets are shielded by `.gitignore`, with `.env.example` acting as the single source of truth for required variables.
