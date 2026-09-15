import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Building2, Users, MapPin } from "lucide-react";
import { getInitiativeBySlug } from "@/data/initiatives";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { InitiativeLayout } from "@/components/initiatives/initiative-layout";

export const metadata: Metadata = {
  title: "Daily Food Relief & Hospital Drives",
  description:
    "Me The Change serves hot, hygienic food packets daily across 3 public hospitals, specifically supporting Sassoon General Hospital, and ensures meal distributions for daily wage workers.",
};

export default function FoodReliefPage() {
  const initiative = getInitiativeBySlug("food-relief");

  if (!initiative) {
    notFound();
  }

  return (
    <InitiativeLayout initiative={initiative}>
      <section className="py-12 sm:py-16 bg-background">
        <Container size="lg">
          <div className="mx-auto max-w-4xl space-y-8">
            {/* Subsection 1: Hospital Caregiver Food Support */}
            <div className="rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary shrink-0">
                  <Building2 className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                    Hospital Caregiver Food Support
                  </h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{siteConfig.registeredOffice.city}, {siteConfig.registeredOffice.state}</span>
                  </p>
                </div>
              </div>

              <p className="text-base text-slate-700 leading-relaxed">
                Impoverished patients and their caregivers travel vast distances to government hospitals
                like Sassoon General Hospital, often skipping meals due to treatment expenses. Me The Change
                serves hot, hygienic food packets daily across 3 public hospitals. Sassoon General Hospital
                is specifically supported.
              </p>
            </div>

            {/* Subsection 2: Daily Wage Worker Support */}
            <div className="rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-accent shrink-0">
                  <Users className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                    Daily Wage Worker Support
                  </h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Urban Centers &amp; Hubs • {siteConfig.registeredOffice.city}</span>
                  </p>
                </div>
              </div>

              <p className="text-base text-slate-700 leading-relaxed">
                Ensuring consistent meal distributions for street vendors, construction labourers,
                and destitute individuals across city hubs.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </InitiativeLayout>
  );
}
