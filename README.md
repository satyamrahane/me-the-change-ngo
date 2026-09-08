# Me The Change (NGO) — Official Website

Official web platform for **Me The Change**, an Indian non-governmental organization dedicated to hunger relief, emergency medical assistance, crisis relief, and grassroots community empowerment (including the Sassoon Hospital Food Drive and COVID-19 relief initiatives).

---

## Technology Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router, Server & Client Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [Zod](https://zod.dev/)
- **Persistence (when required)**: Supabase / PostgreSQL
- **Payments (Phase 10)**: Razorpay (with mock development mode)
- **Deployment**: Vercel

---

## Getting Started

### Prerequisites

- Node.js 18.17+ or 20+ (Node v20+ recommended)
- npm 9+

### 1. Installation

Clone the repository and install dependencies:

```bash
npm install
```

### 2. Environment Variables

Copy the example environment template to `.env.local`:

```bash
cp .env.example .env.local
```

> **Note on NGO Information and Credentials**:
> Official registration numbers, 12A/80G tax details, CSR-1 identifiers, Darpan ID, official phone numbers, and live Razorpay/Supabase production credentials will be supplied by the NGO administration. The project is pre-configured with safe internal placeholders and simulated payment modes (`NEXT_PUBLIC_MOCK_PAYMENTS=true`) for local development.

### 3. Development Server

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Production Build & Verification

To test type-checking and produce an optimized production bundle:

```bash
npm run build
```

To start the production server locally:

```bash
npm run start
```

---

## Project Structure

```
src/
├── app/          # Next.js App Router (pages, layouts, route handlers)
├── components/   # Modular, reusable UI components (atoms, layout, modules)
├── config/       # Central site metadata and feature flags (site.ts)
├── data/         # Structured content registries (initiatives, documents, impact)
├── lib/          # Utilities, clients, and schema validations (utils.ts)
└── types/        # Global TypeScript interfaces
```

---

## Code of Conduct & Content Policy

- **No Hallucinated Legal Claims**: Never invent registration numbers, 80G tax claims, or fabricated statistics. All placeholder values must remain clearly marked until officially verified.
- **Maintainability First**: Write simple, readable, and standard Next.js code that any human developer can understand and maintain.
