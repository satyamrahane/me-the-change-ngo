import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Heart, Users, Building2, ArrowDown, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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

      {/* Pathways Overview */}
      <section className="py-12 sm:py-16 bg-card border-y border-border/60">
        <Container size="lg">
          <SectionHeading
            eyebrow="Pathways to Participate"
            title="How You Can Make a Difference"
            description="Explore the different ways you can support our grassroots relief operations on the ground."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
            {/* Pathway 1: Volunteer */}
            <Card className="flex flex-col justify-between p-6 sm:p-8 hover:shadow-md transition-shadow">
              <CardContent className="space-y-4 p-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <Users className="h-6 w-6" aria-hidden="true" />
                </div>
                <h2 className="font-heading text-xl font-bold text-foreground">
                  Volunteer on the Ground
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Join our volunteer network in Pune to assist with food drives, emergency medicine coordination, logistics,
                  and community relief efforts.
                </p>
              </CardContent>
              <div className="pt-6">
                <a
                  href="#volunteer-form-section"
                  className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-hover group"
                >
                  <span>Fill Volunteer Form</span>
                  <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </div>
            </Card>

            {/* Pathway 2: Financial Support */}
            <Card className="flex flex-col justify-between p-6 sm:p-8 hover:shadow-md transition-shadow">
              <CardContent className="space-y-4 p-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-light text-accent">
                  <Heart className="h-6 w-6 fill-current" aria-hidden="true" />
                </div>
                <h2 className="font-heading text-xl font-bold text-foreground">
                  Donate to Relief Funds
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Financial contributions directly sustain our field operations, purchasing fresh meals and critical prescription
                  drugs for patients and families in urgent need.
                </p>
              </CardContent>
              <div className="pt-6">
                <Link
                  href="/donate"
                  className="inline-flex items-center text-sm font-semibold text-accent hover:text-accent-hover group"
                >
                  <span>Explore Giving Options</span>
                  <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </Card>

            {/* Pathway 3: Corporate & CSR */}
            <Card className="flex flex-col justify-between p-6 sm:p-8 hover:shadow-md transition-shadow">
              <CardContent className="space-y-4 p-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <Building2 className="h-6 w-6" aria-hidden="true" />
                </div>
                <h2 className="font-heading text-xl font-bold text-foreground">
                  CSR & Institutional Support
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Partner with Me The Change to align your organization&apos;s corporate social responsibility initiatives with
                  verifiable grassroots humanitarian impact.
                </p>
              </CardContent>
              <div className="pt-6">
                <Link
                  href="/csr-partnerships"
                  className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-hover group"
                >
                  <span>CSR Partnerships</span>
                  <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Volunteer Application Section */}
      <section id="volunteer-form-section" className="py-14 sm:py-20 bg-background scroll-mt-20">
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
                and connect with you when suitable relief activities are scheduled in {siteConfig.registeredOffice.city}.
              </p>
            </div>

            <VolunteerForm />
          </div>
        </Container>
      </section>
    </>
  );
}
