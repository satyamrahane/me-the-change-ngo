import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeartHandshake, Pill, ShieldCheck, MapPin } from "lucide-react";
import { getInitiativeBySlug } from "@/data/initiatives";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { InitiativeLayout } from "@/components/initiatives/initiative-layout";

export const metadata: Metadata = {
  title: "Medicine Aid",
  description:
    "Me The Change's medicine aid initiative provides critical prescription support, emergency medicine assistance, and healthcare aid for individuals facing acute medical emergencies in Pune.",
};

export default function MedicineAidPage() {
  const initiative = getInitiativeBySlug("medicine-aid");

  if (!initiative) {
    notFound();
  }

  return (
    <InitiativeLayout initiative={initiative}>
      {/* Medical Aid Scope & Approach */}
      <section className="py-12 sm:py-16 bg-background">
        <Container size="lg">
          <div className="mx-auto max-w-4xl space-y-10">
            {/* Highlight Card: Healthcare Access Gap */}
            <div className="rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary shrink-0">
                  <HeartHandshake className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                    Grassroots Medical Aid & Prescription Support
                  </h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Focus area: {siteConfig.registeredOffice.city}, {siteConfig.registeredOffice.state}</span>
                  </p>
                </div>
              </div>

              <p className="text-base text-slate-700 leading-relaxed">
                Sudden medical crises often place an immense financial burden on underprivileged families. Even when
                public hospital beds or basic diagnostics are available, the cost of critical prescription medicines,
                post-operative drugs, and specialized consumables can cause treatment delays or financial catastrophe.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="rounded-xl border border-border/70 bg-background/60 p-5 space-y-2.5">
                  <div className="flex items-center gap-2 font-heading font-semibold text-foreground text-base">
                    <Pill className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span>Prescription Assistance</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Direct assistance with purchasing vital doctor-prescribed medications for patients who cannot afford
                    out-of-pocket pharmaceutical costs during hospitalization.
                  </p>
                </div>

                <div className="rounded-xl border border-border/70 bg-background/60 p-5 space-y-2.5">
                  <div className="flex items-center gap-2 font-heading font-semibold text-foreground text-base">
                    <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span>Emergency Aid Coordination</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Connecting patients and attendants with community healthcare resources and essential supplies during
                    acute emergency situations on a case-by-case basis.
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-primary/5 border border-primary/10 p-5 text-sm text-slate-600 leading-relaxed">
                <strong className="text-foreground">Transparency & Case Verification:</strong> To safeguard patient dignity
                and privacy, medical aid disbursements are documented internally with verified prescriptions and invoices.
                Anonymized financial summaries and audited aid distributions will be published in our public transparency section.
              </div>
            </div>
          </div>
        </Container>
      </section>
    </InitiativeLayout>
  );
}
