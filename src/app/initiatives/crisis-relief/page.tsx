import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Archive, AlertCircle, Sparkles, MapPin } from "lucide-react";
import { getInitiativeBySlug } from "@/data/initiatives";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { InitiativeLayout } from "@/components/initiatives/initiative-layout";

export const metadata: Metadata = {
  title: "Crisis Relief",
  description:
    "Me The Change's crisis relief initiative provides rapid mobilization during community crises and emergencies, built upon our foundation of grassroots relief in Pune including our COVID-19 response archive.",
};

export default function CrisisReliefPage() {
  const initiative = getInitiativeBySlug("crisis-relief");

  if (!initiative) {
    notFound();
  }

  return (
    <InitiativeLayout initiative={initiative}>
      {/* Crisis Relief Scope & Approach */}
      <section className="py-12 sm:py-16 bg-background">
        <Container size="lg">
          <div className="mx-auto max-w-4xl space-y-10">
            {/* Historical Reference: COVID-19 Relief Archive */}
            <div className="rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary shrink-0">
                  <Archive className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                    COVID-19 Relief Archive & Emergency Response
                  </h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Historical Archive • {siteConfig.registeredOffice.city}, {siteConfig.registeredOffice.state}</span>
                  </p>
                </div>
              </div>

              <p className="text-base text-slate-700 leading-relaxed">
                During the severe public health lockdowns of the COVID-19 pandemic, Me The Change mobilized volunteers
                and community members to provide emergency ration kits, dry food supplies, and essential aid to daily-wage
                workers and marginalized families who had lost their livelihoods overnight.
              </p>

              <div className="rounded-xl border border-border/70 bg-background/60 p-6 space-y-4">
                <div className="flex items-center gap-2 font-heading font-semibold text-foreground text-base">
                  <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span>Preparedness Through Experience</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  The grassroots coordination models, local supplier networks, and volunteer contacts developed during
                  the COVID-19 pandemic now form the organizational framework for our rapid crisis response capability.
                  When unforeseen disasters or localized crises strike, our team is equipped to activate humanitarian
                  support swiftly.
                </p>
              </div>

              <div className="rounded-xl bg-primary/5 border border-primary/10 p-5 text-sm text-slate-600 leading-relaxed flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-foreground">Archival Notice:</strong> Photographic archives, volunteer logs,
                  and documentation from our past relief drives are currently being cataloged. Full historical retrospectives
                  will be made accessible in the Transparency & Archives section of this portal.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </InitiativeLayout>
  );
}
