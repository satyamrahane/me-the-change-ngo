import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Pill, HeartHandshake, MapPin } from "lucide-react";
import { getInitiativeBySlug } from "@/data/initiatives";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { InitiativeLayout } from "@/components/initiatives/initiative-layout";

export const metadata: Metadata = {
  title: "Medical Aid & Patient Welfare",
  description:
    "Facilitating vital medicines, surgical consumables, and caregiver assistance for low-income patients admitted to public health facilities in Pune.",
};

export default function MedicineAidPage() {
  const initiative = getInitiativeBySlug("medicine-aid");

  if (!initiative) {
    notFound();
  }

  return (
    <InitiativeLayout initiative={initiative}>
      <section className="py-12 sm:py-16 bg-background">
        <Container size="lg">
          <div className="mx-auto max-w-4xl space-y-8">
            {/* Subsection 1: Emergency Medicine Support */}
            <div className="rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary shrink-0">
                  <Pill className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                    Emergency Medicine Support
                  </h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Public Health Facilities • {siteConfig.registeredOffice.city}</span>
                  </p>
                </div>
              </div>

              <p className="text-base text-slate-700 leading-relaxed">
                Facilitating vital medicines, surgical consumables, and prescribed treatments for
                low-income patients admitted to public health facilities.
              </p>
            </div>

            {/* Subsection 2: Caregiver Assistance */}
            <div className="rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-accent shrink-0">
                  <HeartHandshake className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                    Caregiver Assistance
                  </h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Sassoon Hospital &amp; Partner Centres • {siteConfig.registeredOffice.city}</span>
                  </p>
                </div>
              </div>

              <p className="text-base text-slate-700 leading-relaxed">
                Providing immediate non-medical resources and logistical guidance to families managing
                prolonged treatments at Sassoon Hospital and partner centres.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </InitiativeLayout>
  );
}
