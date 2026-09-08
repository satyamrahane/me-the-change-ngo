import React from "react";
import { ArrowRight, HeartHandshake, Eye, Shield } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function MissionSection() {
  return (
    <section className="py-16 sm:py-20 bg-card border-y border-border/60">
      <Container size="lg">
        <div className="space-y-12">
          {/* Section Header */}
          <SectionHeading
            align="center"
            eyebrow="Who We Are"
            title="A Dedicated Grassroots Movement for Pune"
            description={`${siteConfig.name} is a charitable trust committed to addressing urgent human needs through direct on-ground action, reliable food assistance, healthcare support, and emergency crisis intervention.`}
          />

          {/* Three Core Values / Focus Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <Card hoverable className="border-border/80 bg-background/50">
              <CardContent className="p-6 sm:p-8 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <HeartHandshake className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Direct Grassroots Action
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  We focus on direct, hands-on community engagement—ensuring food, essential supplies,
                  and medical relief reach those who need them most without bureaucratic delays.
                </p>
              </CardContent>
            </Card>

            <Card hoverable className="border-border/80 bg-background/50">
              <CardContent className="p-6 sm:p-8 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-accent">
                  <Eye className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Focus on Vulnerable Communities
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  From patient families waiting outside major public hospitals to marginalized neighborhoods,
                  our efforts prioritize immediate relief and care.
                </p>
              </CardContent>
            </Card>

            <Card hoverable className="border-border/80 bg-background/50">
              <CardContent className="p-6 sm:p-8 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <Shield className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Public Accountability
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  We believe trust is built on transparency. We maintain public records of our trust credentials,
                  statutory registrations, and audited financial statements.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Learn More Action */}
          <div className="text-center pt-2">
            <Button variant="outline" size="md" href="/about" className="group">
              <span>Learn More About Our Journey & Team</span>
              <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
