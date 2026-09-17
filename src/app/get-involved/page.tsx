import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { Heart, ArrowDown, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VolunteerForm } from "@/components/forms/volunteer-form";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Join Me The Change as a volunteer or supporter. Discover grassroots pathways to support hunger relief, medical assistance, and emergency response in Pune.",
};

export default function GetInvolvedPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-14 sm:py-20">
        <Container size="lg">
          <div className="mx-auto max-w-3xl text-center space-y-5">
            <Badge variant="default" className="py-1 px-3">
              <span>Community Engagement</span>
            </Badge>

            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Get Involved with {siteConfig.name}
            </h1>

            <p className="text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
              Real change happens through collective community action. Whether you offer your time as a volunteer,
              contribute financial aid, or collaborate as an institutional partner, your involvement strengthens our
              grassroots relief work in {siteConfig.registeredOffice.city}.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#volunteer-form-section"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-xs hover:bg-primary-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span>Apply to Volunteer</span>
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>

              <Button variant="outline" size="md" href="/donate" className="px-6">
                <Heart className="h-4 w-4 text-accent fill-current mr-2" aria-hidden="true" />
                <span>Support Financially</span>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Volunteer Journey — 3-step process */}
      <section className="py-12 sm:py-16 bg-card border-y border-border/60">
        <Container size="lg">
          <div className="mx-auto max-w-3xl text-center mb-10 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              How It Works
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
              What Happens After You Apply
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Volunteering with Me The Change is straightforward. Here is what to expect once you submit your application below.
            </p>
          </div>

          {/* Steps */}
          <ol className="relative flex flex-col md:flex-row gap-0 md:gap-0" aria-label="Volunteer application process">
            {/* Connector line — desktop only */}
            <li className="hidden md:block absolute top-[2.75rem] left-[calc(16.66%+1.5rem)] right-[calc(16.66%+1.5rem)] h-px bg-border/70 pointer-events-none" aria-hidden="true" />

            {[
              {
                step: "01",
                title: "Fill the Form",
                body: "Tell us about your interests and how often you are available. The volunteer form below takes about two minutes.",
                cta: { label: "Go to form", href: "#volunteer-form-section" },
              },
              {
                step: "02",
                title: "Team Reviews Your Application",
                body: "Our coordination team reads every submission and notes your areas of interest and availability.",
                cta: null,
              },
              {
                step: "03",
                title: "We Contact You",
                body: "When a relevant on-ground relief activity is coming up, we will reach out to you with details about how to participate.",
                cta: null,
              },
            ].map(({ step, title, body, cta }) => (
              <li
                key={step}
                className="relative flex flex-row md:flex-col items-start md:items-center gap-5 md:gap-4 flex-1 px-0 md:px-6 py-4 md:py-0 border-b border-border/40 md:border-b-0 last:border-b-0"
              >
                {/* Step number bubble */}
                <div
                  className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary bg-background font-heading text-sm font-bold text-primary z-10"
                  aria-hidden="true"
                >
                  {step}
                </div>

                <div className="flex-1 md:text-center space-y-1.5 pb-1">
                  <h3 className="font-heading text-base font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
                  {cta && (
                    <a
                      href={cta.href}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover group mt-1"
                    >
                      <span>{cta.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Volunteer Application Section */}
      <section id="volunteer-form-section" className="pt-20 sm:pt-28 pb-16 sm:pb-24 bg-background scroll-mt-24 sm:scroll-mt-28">
        <Container size="md">
          <div className="space-y-8 text-center max-w-2xl mx-auto">
            <Badge variant="default" className="py-1 px-3">
              <span>Join the Movement</span>
            </Badge>

            <div className="space-y-3">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
                Volunteer Registration
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Please complete the form below. Our volunteer team will review your availability and areas of interest,
                and connect with you when on-ground relief activities are scheduled in {siteConfig.registeredOffice.city}.
              </p>
            </div>

            {/* Visuals: Left authentic activity photo (primary), Right recruitment poster (supporting/secondary) */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center text-left">
              {/* Primary: Real on-ground food distribution activity photo */}
              <div className="sm:col-span-7 relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/80 bg-slate-100 shadow-sm transition-all hover:shadow-md">
                <Image
                  src="/images/real/food-volunteer.jpg"
                  alt="A Me The Change volunteer distributing a hot food packet during a relief drive in Pune"
                  fill
                  sizes="(max-width: 640px) 100vw, 420px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-3 pt-6 pointer-events-none">
                  <span className="text-xs font-medium text-white/90 drop-shadow-xs">
                    On-ground relief drive • Pune
                  </span>
                </div>
              </div>

              {/* Secondary: Official volunteer recruitment poster */}
              <div className="sm:col-span-5 relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden border border-border/60 bg-slate-50 opacity-95 shadow-xs transition-all hover:opacity-100">
                <Image
                  src="/images/real/volunteer-poster.jpg"
                  alt="Official Me The Change campaign poster calling for volunteers"
                  fill
                  sizes="(max-width: 640px) 100vw, 280px"
                  className="object-cover"
                />
              </div>
            </div>

            <VolunteerForm />
          </div>
        </Container>
      </section>
    </>
  );
}
