import React from "react";
import { Heart, Users, Mail, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function GetInvolvedPreview() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-t border-border/80">
      <Container size="lg">
        <div className="space-y-12">
          {/* Header */}
          <SectionHeading
            align="center"
            eyebrow="Join Our Mission"
            title="How You Can Make a Difference"
            description="Whether through financial support, on-ground volunteering, or organizational partnerships, every effort brings relief to a family in need."
          />

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1: Donate */}
            <Card hoverable className="bg-card border-border shadow-xs flex flex-col justify-between">
              <CardContent className="p-6 sm:p-8 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-accent">
                  <Heart className="h-6 w-6 fill-current" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  Support With a Donation
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your direct contribution funds essential groceries for hospital food distribution,
                  critical prescription medicines, and emergency relief supplies.
                </p>
              </CardContent>

              <div className="p-6 sm:p-8 pt-0">
                <Button variant="secondary" size="md" href="/donate" className="w-full justify-center font-semibold">
                  <span>Donate Now</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" aria-hidden="true" />
                </Button>
              </div>
            </Card>

            {/* Pillar 2: Volunteer */}
            <Card hoverable className="bg-card border-border shadow-xs flex flex-col justify-between">
              <CardContent className="p-6 sm:p-8 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <Users className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  Volunteer on the Ground
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Join our active community of local volunteers in Pune for weekend food drives,
                  aid distribution, and hospital outreach missions.
                </p>
              </CardContent>

              <div className="p-6 sm:p-8 pt-0">
                <Button variant="primary" size="md" href="/get-involved" className="w-full justify-center font-semibold">
                  <span>Join as a Volunteer</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" aria-hidden="true" />
                </Button>
              </div>
            </Card>

            {/* Pillar 3: Partner / Contact */}
            <Card hoverable className="bg-card border-border shadow-xs flex flex-col justify-between">
              <CardContent className="p-6 sm:p-8 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <Mail className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  Connect & Collaborate
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Partner with us for institutional relief drives, community health outreach,
                  or reach out with inquiries to our coordination team.
                </p>
              </CardContent>

              <div className="p-6 sm:p-8 pt-0">
                <Button variant="outline" size="md" href="/contact" className="w-full justify-center font-medium">
                  <span>Contact Our Team</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" aria-hidden="true" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
