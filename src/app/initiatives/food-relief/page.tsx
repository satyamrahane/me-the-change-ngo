import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Building2, MapPin } from "lucide-react";
import { getInitiativeBySlug } from "@/data/initiatives";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { InitiativeLayout } from "@/components/initiatives/initiative-layout";

export const metadata: Metadata = {
  title: "Food Relief",
  description:
    "Me The Change's food relief initiative provides nutritional assistance and hospital food drives for patients and families in Pune, including the Sassoon Hospital Food Drive.",
};

export default function FoodReliefPage() {
  const initiative = getInitiativeBySlug("food-relief");

  if (!initiative) {
    notFound();
  }

  return (
    <InitiativeLayout initiative={initiative}>
      {/* Sassoon Hospital Food Drive — known work reference */}
      <section className="py-12 sm:py-16 bg-background">
        <Container size="lg">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary shrink-0">
                  <Building2 className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                    Sassoon Hospital Food Drive
                  </h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{siteConfig.registeredOffice.city}, {siteConfig.registeredOffice.state}</span>
                  </p>
                </div>
              </div>

              <p className="text-base text-slate-700 leading-relaxed">
                One of our most consistent and recognized activities is the food distribution drive conducted
                outside Sassoon General Hospital in Pune. These drives provide nutritious meals to patients,
                their attendants, and family members who often travel long distances for treatment and face
                difficulty arranging regular meals during extended hospital stays.
              </p>

              <div className="rounded-xl bg-primary/5 border border-primary/10 p-5 text-sm text-slate-600 leading-relaxed">
                <strong className="text-foreground">Note:</strong> Detailed operational metrics, distribution
                schedules, and verified beneficiary data for this initiative are being prepared for public
                disclosure. Updated figures will be published in our transparency reports.
              </div>
            </div>
          </div>
        </Container>
      </section>
    </InitiativeLayout>
  );
}
