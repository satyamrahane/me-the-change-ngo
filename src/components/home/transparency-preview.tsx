import React from "react";
import { ShieldCheck, FileText, ArrowRight, Award, Lock, Clock } from "lucide-react";
import { transparencyDocuments } from "@/data/documents";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const documentIconMap: Record<string, React.ElementType> = {
  registration: Award,
  "tax-exemption": ShieldCheck,
  csr: FileText,
  darpan: ShieldCheck,
  "audit-report": FileText,
  license: Lock,
};

export function TransparencyPreview() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background">
      <Container size="lg">
        <div className="space-y-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <SectionHeading
              eyebrow="Open & Accountable"
              title="Transparency & Public Governance"
              description="We believe an NGO's strongest foundation is public trust. Our statutory credentials, compliance records, and annual filings are structured for open public review."
            />

            <Button
              variant="outline"
              size="md"
              href="/transparency"
              className="self-start sm:self-auto shrink-0 group"
            >
              <span>View Transparency & Legal</span>
              <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
          </div>

          {/* 6 Document Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transparencyDocuments.map((doc) => {
              const Icon = documentIconMap[doc.category] || FileText;

              return (
                <Card
                  key={doc.id}
                  className="border-border bg-card shadow-xs flex flex-col justify-between"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>

                      <Badge variant="neutral" className="text-[11px] font-medium gap-1 text-slate-500">
                        <Clock className="h-3 w-3" aria-hidden="true" />
                        <span>Documentation in progress</span>
                      </Badge>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-heading text-base font-semibold text-foreground leading-snug">
                        {doc.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {doc.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Bottom Callout */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-heading text-base font-semibold text-foreground">
                Official Certifications & Trust Disclosures
              </h4>
              <p className="text-sm text-muted-foreground">
                All statutory filings, trust deeds, and audit records will be directly accessible in our Transparency section.
              </p>
            </div>

            <Button variant="primary" size="md" href="/transparency" className="shrink-0 font-medium">
              Access Document Registry
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
