import React from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Building2, Stethoscope, History } from "lucide-react";
import { qualitativeHighlights, impactStats } from "@/data/impact";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const highlightIconMap: Record<string, React.ElementType> = {
  "highlight-sassoon-hospital": Building2,
  "highlight-emergency-medicine": Stethoscope,
  "highlight-covid-relief": History,
};

export function ImpactOverview() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-y border-border/80">
      <Container size="lg">
        <div className="space-y-12">
          {/* Header */}
          <SectionHeading
            align="center"
            eyebrow="Verified On-Ground Impact"
            title="Grassroots Action at a Glance"
            description="Our relief missions provide direct nourishment, patient assistance, and crisis relief across Pune with verifiable community impact."
          />

          {/* 3 Verified Metric Counters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {impactStats.map((stat) => (
              <div
                key={stat.id}
                className="rounded-2xl border border-border bg-card p-6 sm:p-8 text-center shadow-xs flex flex-col justify-center items-center space-y-2"
              >
                <span className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-primary">
                  {stat.value}
                </span>
                <h3 className="font-heading text-base sm:text-lg font-semibold text-foreground">
                  {stat.label}
                </h3>
                {stat.description && (
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xs">
                    {stat.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Qualitative Focus Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {qualitativeHighlights.map((highlight) => {
              const Icon = highlightIconMap[highlight.id] || Building2;

              return (
                <Card
                  key={highlight.id}
                  hoverable
                  className="bg-card border-border shadow-xs flex flex-col justify-between"
                >
                  <CardContent className="p-6 sm:p-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <Badge variant="neutral" className="text-[11px] gap-1">
                        <MapPin className="h-3 w-3 text-slate-500" aria-hidden="true" />
                        <span>{highlight.location}</span>
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-heading text-lg font-bold text-foreground">
                        {highlight.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {highlight.description}
                      </p>
                    </div>
                  </CardContent>

                  <div className="px-6 sm:px-8 pb-6 pt-0">
                    <Link
                      href={
                        highlight.initiative === "food-relief"
                          ? "/initiatives/food-relief"
                          : highlight.initiative === "medical-aid"
                          ? "/initiatives/medicine-aid"
                          : "/initiatives/crisis-relief"
                      }
                      className="inline-flex items-center text-xs font-semibold text-primary hover:text-primary-hover group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                    >
                      <span>
                        Explore Initiative Focus
                        <span className="sr-only"> for {highlight.title}</span>
                      </span>
                      <ArrowRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Operational Integrity Note */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 text-center max-w-3xl mx-auto shadow-xs">
            <h3 className="font-heading text-base font-semibold text-slate-900">
              Verified Reporting & Continuous Community Tracking
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              We uphold strict reporting standards. Detailed impact metrics, annual meal distribution audits,
              and fund allocations are published in our annual transparency reports.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
