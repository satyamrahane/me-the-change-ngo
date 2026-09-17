import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Heart,
  Eye,
  Target,
  Sparkles,
  ShieldCheck,
  Recycle,
  Zap,
  User,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Me The Change, a grassroots non-governmental organization committed to eradicating hunger, providing medical aid, and delivering crisis relief.",
};

const VALUES = [
  {
    title: "Compassion",
    description:
      "Deep empathy for the struggles of marginalized families and daily wage earners drives every meal distributed and relief effort mobilized.",
    icon: Heart,
    colorClass: "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400",
  },
  {
    title: "Transparency",
    description:
      "Upholding clear, honest accountability in all community initiatives, donations, and governance documentation.",
    icon: ShieldCheck,
    colorClass: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
  {
    title: "Zero Waste",
    description:
      "Disciplined resource management ensuring every food packet and relief supply reaches individuals with maximum efficiency.",
    icon: Recycle,
    colorClass: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  },
  {
    title: "Direct Action",
    description:
      "Immediate, on-the-ground response without bureaucratic overhead—serving food and medical aid where it is needed most.",
    icon: Zap,
    colorClass: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-14 sm:py-20 lg:py-24">
        <Container size="lg">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <Badge variant="default" className="py-1 px-3">
              <span>Grassroots Non-Governmental Organization</span>
            </Badge>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.15]">
              About <span className="text-primary">{siteConfig.name}</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto">
              Me The Change is a grassroots non-governmental organization committed to eradicating
              hunger and uplifting underserved communities. Founded on the firm belief that access to
              nutritious food is a fundamental human right, the organization provides consistent daily
              nourishment, medical aid, and crisis relief to the most vulnerable members of society.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button variant="secondary" size="lg" href="/donate" className="shadow-md">
                <Heart className="h-5 w-5 fill-current mr-2" aria-hidden="true" />
                <span>Support Our Cause</span>
              </Button>
              <Button variant="outline" size="lg" href="/initiatives">
                <span>Explore Initiatives</span>
                <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="py-14 sm:py-20 bg-card border-y border-border/60">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Vision Card */}
            <div className="rounded-2xl border border-border bg-background p-8 sm:p-10 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <Eye className="h-6 w-6" aria-hidden="true" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">Our Vision</h2>
                <blockquote className="text-base sm:text-lg text-slate-700 leading-relaxed italic border-l-4 border-primary pl-4">
                  &ldquo;A compassionate society where no individual—regardless of economic
                  circumstance—goes to bed on an empty stomach, and where emergency relief is swiftly
                  accessible to every person in need.&rdquo;
                </blockquote>
              </div>
            </div>

            {/* Mission Card */}
            <div className="rounded-2xl border border-border bg-background p-8 sm:p-10 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-accent">
                  <Target className="h-6 w-6" aria-hidden="true" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">Our Mission</h2>
                <blockquote className="text-base sm:text-lg text-slate-700 leading-relaxed italic border-l-4 border-accent pl-4">
                  &ldquo;To systematically eliminate daily hunger by distributing fresh, hot, and
                  hygienic meals to marginalized populations, supporting low-income patients and their
                  caregivers at public hospitals, and providing rapid-response relief during
                  crises.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section className="py-14 sm:py-20 bg-background">
        <Container size="lg">
          <div className="space-y-12">
            <SectionHeading
              align="center"
              eyebrow="Guiding Principles"
              title="Our Core Values"
              description="The foundational principles that guide every distribution drive, volunteer engagement, and decision we make."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map((val) => {
                const Icon = val.icon;
                return (
                  <Card key={val.title} className="p-6 flex flex-col justify-between space-y-4">
                    <CardContent className="p-0 space-y-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${val.colorClass}`}
                      >
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-foreground">
                        {val.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {val.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Our Story */}
      <section className="py-14 sm:py-20 bg-slate-50 border-y border-border/60">
        <Container size="lg">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-3">
              <Badge variant="neutral" className="py-1 px-3">
                <Sparkles className="h-3.5 w-3.5 text-primary mr-1" aria-hidden="true" />
                <span>Grassroots Origins</span>
              </Badge>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
                Our Story
              </h2>
            </div>

            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
              <div className="relative aspect-[16/9] w-full bg-slate-100">
                <Image
                  src="/images/real/community-rally.jpg"
                  alt="Volunteers and community members participating in a Me The Change awareness march in Pune"
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
              </div>
              <div className="p-8 sm:p-10 space-y-5 text-slate-700 leading-relaxed text-base sm:text-lg">
                <p>
                  Witnessing first-hand the immense distress of daily wage earners, migrant workers, and
                  destitute families during moments of economic instability and crisis, Ganesh Chavan
                  mobilized volunteers to start direct food distributions. What began as a
                  community-driven response during the COVID-19 pandemic quickly evolved into a
                  dedicated, year-round humanitarian organization.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Leadership */}
      <section className="py-14 sm:py-20 bg-background">
        <Container size="lg">
          <div className="max-w-2xl mx-auto space-y-8 text-center">
            <SectionHeading
              align="center"
              eyebrow="Organization Leadership"
              title="Leadership"
              description="Dedicated leadership guiding grassroots relief and community action in Pune."
            />

            <div className="rounded-2xl border border-border bg-card p-8 shadow-xs max-w-md mx-auto space-y-4">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User className="h-10 w-10" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  Ganesh Chavan
                </h3>
                <p className="text-sm font-semibold text-primary">
                  Founder &amp; Head of NGO
                </p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Leading grassroots food relief, public hospital caregiver support, and emergency response operations across Pune.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-14 sm:py-20 bg-card border-t border-border/60">
        <Container size="lg">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              Join Us in Eliminating Hunger
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Whether you contribute financially to sustain daily hospital food drives or offer your
              time as an on-ground volunteer, your action brings direct nourishment to families in need.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button variant="secondary" size="lg" href="/donate">
                <Heart className="h-5 w-5 fill-current mr-2" aria-hidden="true" />
                <span>Donate Now</span>
              </Button>
              <Button variant="outline" size="lg" href="/get-involved">
                <span>Become a Volunteer</span>
                <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
