import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, ChevronRight, CheckCircle2, MapPin } from "lucide-react";
import { Initiative } from "@/types";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface InitiativeLayoutProps {
  initiative: Initiative;
  /** Optional additional content blocks rendered between description and CTA */
  children?: React.ReactNode;
}

export function InitiativeLayout({ initiative, children }: InitiativeLayoutProps) {
  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-muted/50 border-b border-border">
        <Container size="lg">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 py-3 text-xs text-muted-foreground overflow-x-auto"
          >
            <Link
              href="/"
              className="hover:text-primary transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
            >
              Home
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />
            <Link
              href="/initiatives"
              className="hover:text-primary transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
            >
              Initiatives
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />
            <span className="text-foreground font-medium whitespace-nowrap" aria-current="page">
              {initiative.title}
            </span>
          </nav>
        </Container>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-12 sm:py-16 lg:py-20">
        <Container size="lg">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Text Column */}
            <div className="space-y-6">
              <Badge variant="default" className="gap-1.5 py-1 px-3">
                <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                <span>{siteConfig.registeredOffice.city} Initiative</span>
              </Badge>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
                {initiative.title}
              </h1>

              <p className="text-lg text-slate-700 leading-relaxed max-w-xl">
                {initiative.longDescription || initiative.shortDescription}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Button
                  variant="secondary"
                  size="lg"
                  href={initiative.ctaHref || "/donate"}
                  className="font-semibold shadow-md justify-center"
                >
                  <Heart className="h-5 w-5 fill-current mr-2" aria-hidden="true" />
                  {initiative.ctaText || "Support This Initiative"}
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  href="/initiatives"
                  className="font-medium justify-center"
                >
                  All Initiatives
                </Button>
              </div>
            </div>

            {/* Image Column */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border shadow-lg bg-slate-100">
              {initiative.image ? (
                <Image
                  src={initiative.image}
                  alt={`${initiative.title} — ${siteConfig.name} initiative in ${siteConfig.registeredOffice.city}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                  Image coming soon
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Features / Focus Areas */}
      {initiative.features && initiative.features.length > 0 && (
        <section className="py-12 sm:py-16 bg-card border-y border-border/60">
          <Container size="lg">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-8 text-center">
                Key Focus Areas
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {initiative.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 rounded-xl border border-border bg-background p-5 shadow-xs"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm font-medium text-foreground leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Optional extra content (passed as children) */}
      {children}

      {/* Bottom CTA */}
      <section className="py-14 sm:py-16 bg-gradient-to-br from-primary/5 via-background to-background">
        <Container size="lg">
          <div className="mx-auto max-w-2xl text-center space-y-6">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
              Help Us Sustain This Work
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Every contribution directly supports our {initiative.title.toLowerCase()} operations on the
              ground in {siteConfig.registeredOffice.city}. Your generosity makes an immediate difference.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button
                variant="secondary"
                size="lg"
                href="/donate"
                className="font-semibold shadow-md px-8"
              >
                <Heart className="h-5 w-5 fill-current mr-2" aria-hidden="true" />
                Donate Now
              </Button>

              <Button
                variant="outline"
                size="md"
                href="/get-involved"
                className="font-medium group px-6"
              >
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
