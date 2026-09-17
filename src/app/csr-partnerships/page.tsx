import React from "react";
import type { Metadata } from "next";
import { CheckCircle2, ShieldCheck, FileText } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CsrForm } from "@/components/forms/csr-form";

export const metadata: Metadata = {
  title: "CSR & Institutional Partnerships",
  description:
    "Partner with Me The Change Foundation for Corporate Social Responsibility (CSR) and institutional humanitarian initiatives in Pune.",
};

export default function CsrPartnershipsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-14 sm:py-20">
        <Container size="lg">
          <div className="mx-auto max-w-3xl text-center space-y-5">
            <Badge variant="default" className="py-1 px-3">
              <span>Corporate & Institutional Collaboration</span>
            </Badge>

            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
              CSR & Institutional Partnerships
            </h1>

            <p className="text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
              Collaborate with {siteConfig.name} to channel corporate social responsibility initiatives into direct,
              accountable grassroots action across hunger relief, healthcare assistance, and crisis relief in {siteConfig.registeredOffice.city}.
            </p>
          </div>
        </Container>
      </section>

      {/* Focus & Collaboration Principles */}
      <section className="py-12 sm:py-16 bg-card border-y border-border/60">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <CardContent className="space-y-3 p-0">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="font-heading text-lg font-bold text-foreground">
                  Direct Field Execution
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Programs are implemented directly on the ground by our dedicated volunteer base, eliminating multiple
                  intermediary layers and ensuring immediate relief reach.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-3 p-0">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <FileText className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="font-heading text-lg font-bold text-foreground">
                  Documented Accountability
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Partnership initiatives receive itemized expenditure tracking, verifiable photographic records, and
                  comprehensive project completion summaries.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-3 p-0">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="font-heading text-lg font-bold text-foreground">
                  Statutory Compliance
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Me The Change operates as a grassroots non-governmental organization. Operational records and organizational documentation are shared with prospective institutional partners during collaboration discussions.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Inquiry Form Section */}
      <section className="py-14 sm:py-20 bg-background">
        <Container size="md">
          <div className="space-y-8 text-center max-w-2xl mx-auto">
            <div className="space-y-3">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
                Initiate a Partnership Inquiry
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                If your company, foundation, or employee group is interested in supporting grassroots community programs
                in Pune, please submit your inquiry below. Our leadership team will arrange a discussion.
              </p>
            </div>

            <CsrForm />
          </div>
        </Container>
      </section>
    </>
  );
}
