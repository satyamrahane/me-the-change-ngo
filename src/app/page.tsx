import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center">
      <div className="max-w-xl space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {siteConfig.name}
        </h1>
        <p className="text-lg text-slate-600">
          {siteConfig.tagline}
        </p>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
          Global Layout Active (Phase 3)
        </div>
      </div>
    </div>

  );
}
