import React from "react";
import { ArrowRight, Heart, ShieldCheck, Recycle, Zap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

export function MissionSection() {
  return (
    <section className="py-16 sm:py-20 bg-card border-y border-border/60">
      <Container size="lg">
        <div className="space-y-12">
          {/* Section Header */}
          <SectionHeading
            align="center"
            eyebrow="Who We Are"
            title="Committed to Eradicating Hunger"
            description="Me The Change is a grassroots non-governmental organization committed to eradicating hunger and uplifting underserved communities. Founded on the firm belief that access to nutritious food is a fundamental human right, the organization provides consistent daily nourishment, medical aid, and crisis relief to the most vulnerable members of society."
          />

          {/* 4 Core Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <Card key={val.title} hoverable className="border-border/80 bg-background/60 flex flex-col justify-between">
                  <CardContent className="p-6 space-y-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${val.colorClass}`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      {val.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {val.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Learn More Action */}
          <div className="text-center pt-2">
            <Button variant="outline" size="md" href="/about" className="group">
              <span>Learn More About Our Journey &amp; Leadership</span>
              <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
