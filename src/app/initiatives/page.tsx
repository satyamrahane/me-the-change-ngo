import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, Heart, CheckCircle2 } from "lucide-react";
import { initiatives } from "@/data/initiatives";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Our Initiatives",
  description:
    "Explore Me The Change's three core relief pillars: Food Relief, Medicine Aid, and Crisis Relief — grassroots programs serving Pune's vulnerable communities.",
};

export default function InitiativesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-14 sm:py-20">
        <Container size="lg">
          <div className="mx-auto max-w-3xl text-center space-y-5">
            <Badge variant="default" className="py-1 px-3">
              <span>3 Core Pillars of Relief</span>
            </Badge>

            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Our Initiatives
            </h1>

            <p className="text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
              {siteConfig.name} works across three focused areas of grassroots relief in {siteConfig.registeredOffice.city} — providing
              direct food assistance, emergency medical aid, and rapid crisis response for vulnerable communities and patients.
            </p>
          </div>
        </Container>
      </section>

      {/* Initiatives Grid */}
      <section className="py-14 sm:py-20 bg-card border-y border-border/60">
        <Container size="lg">
          <div className="space-y-14">
            {initiatives.map((initiative, index) => {
              const isReversed = index % 2 !== 0;

              return (
                <article
                  key={initiative.slug}
                  className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-14"
                >
                  {/* Image */}
                  <div
                    className={`relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border shadow-md bg-slate-100 ${
                      isReversed ? "lg:order-2" : ""
                    }`}
                  >
                    {initiative.image ? (
                      <Image
                        src={initiative.image}
                        alt={`${initiative.title} — ${siteConfig.name}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                        Image coming soon
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`space-y-5 ${isReversed ? "lg:order-1" : ""}`}>
                    <SectionHeading
                      eyebrow={`Initiative ${index + 1}`}
                      title={initiative.title}
                      description={initiative.longDescription || initiative.shortDescription}
                    />

                    {/* Features */}
                    {initiative.features && initiative.features.length > 0 && (
                      <ul className="space-y-2.5 pt-1" role="list">
                        {initiative.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2.5 text-sm text-slate-700">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                      <Button
                        variant="primary"
                        size="md"
                        href={`/initiatives/${initiative.slug}`}
                        className="font-semibold justify-center group"
                      >
                        <span>
                          Learn More
                          <span className="sr-only"> about {initiative.title}</span>
                        </span>
                        <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="md"
                        href="/donate"
                        aria-label={`Donate to support ${initiative.title}`}
                        className="font-medium text-accent hover:text-accent-hover justify-center"
                      >
                        <Heart className="h-4 w-4 fill-current mr-1.5" aria-hidden="true" />
                        {initiative.ctaText || "Donate"}
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="py-14 sm:py-16 bg-background">
        <Container size="lg">
          <div className="mx-auto max-w-2xl text-center space-y-6">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
              Support Grassroots Action
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Whether you contribute financially or volunteer your time, every effort directly reaches families, patients,
              and communities in {siteConfig.registeredOffice.city}.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button variant="secondary" size="lg" href="/donate" className="font-semibold shadow-md px-8">
                <Heart className="h-5 w-5 fill-current mr-2" aria-hidden="true" />
                Donate Now
              </Button>

              <Button variant="outline" size="md" href="/get-involved" className="font-medium group px-6">
                <span>Get Involved</span>
                <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
