import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackageOpen, Truck, MapPin } from "lucide-react";
import { getInitiativeBySlug } from "@/data/initiatives";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { InitiativeLayout } from "@/components/initiatives/initiative-layout";

export const metadata: Metadata = {
  title: "COVID-19 & Crisis Relief",
  description:
    "Comprehensive dry-ration kits and direct outreach to stranded rickshaw drivers, factory workers, and migrant families during crises in Pune.",
};

export default function CrisisReliefPage() {
  const initiative = getInitiativeBySlug("crisis-relief");

  if (!initiative) {
    notFound();
  }

  return (
    <InitiativeLayout initiative={initiative}>
      <section className="py-12 sm:py-16 bg-background">
        <Container size="lg">
          <div className="mx-auto max-w-4xl space-y-8">
            {/* Subsection 1: Ration & Essential Grocery Kits */}
            <div className="rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary shrink-0">
                  <PackageOpen className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                    Ration &amp; Essential Grocery Kits
                  </h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Emergency Distribution • {siteConfig.registeredOffice.city}</span>
                  </p>
                </div>
              </div>

              <p className="text-base text-slate-700 leading-relaxed">
                During lockdowns and crises when daily wage earners lost all running income, Me The Change
                distributed comprehensive dry-ration kits containing rice, dal, cooking oil, and essential
                spices free of cost.
              </p>
            </div>

            {/* Subsection 2: Support for Migrant & Informal Workers */}
            <div className="rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-accent shrink-0">
                  <Truck className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                    Support for Migrant &amp; Informal Workers
                  </h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>On-Ground Relief Outreach • {siteConfig.registeredOffice.city}</span>
                  </p>
                </div>
              </div>

              <p className="text-base text-slate-700 leading-relaxed">
                Direct outreach to stranded rickshaw drivers, factory workers, and migrant families
                navigating severe economic disruption.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </InitiativeLayout>
  );
}
