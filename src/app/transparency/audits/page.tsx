import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, FileCheck, Clock, ArrowRight } from "lucide-react";
import { transparencyDocuments } from "@/data/documents";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DocumentCard } from "@/components/transparency/document-card";

export const metadata: Metadata = {
  title: "Audited Financial Statements & Reports",
  description:
    "Annual audited financial statements, balance sheets, and statutory financial disclosures for Me The Change Foundation.",
};

export default function AuditsPage() {
  const auditDocs = transparencyDocuments.filter((doc) => doc.category === "audit-report");

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
              href="/transparency"
              className="hover:text-primary transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
            >
              Transparency
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />
            <span className="text-foreground font-medium whitespace-nowrap" aria-current="page">
              Audit Reports
            </span>
          </nav>
        </Container>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-12 sm:py-16">
        <Container size="lg">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <Badge variant="default" className="py-1 px-3">
              <span>Financial Accountability</span>
            </Badge>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Audit Reports & Financial Statements
            </h1>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
              Our financial management is governed by independent statutory audits, transparent balance sheets,
              and strict adherence to non-profit accounting standards.
            </p>
          </div>
        </Container>
      </section>

      {/* Audit Statements Section */}
      <section className="py-12 sm:py-16 bg-background border-t border-border/60">
        <Container size="lg">
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Cards for audit documents from registry */}
            <div className="grid grid-cols-1 gap-6">
              {auditDocs.map((doc) => (
                <DocumentCard key={doc.id} document={doc} />
              ))}
            </div>

            {/* Structured Pending/Preparation Notice */}
            <div className="rounded-2xl border border-border bg-card p-8 text-center space-y-5">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary">
                <FileCheck className="h-6 w-6" aria-hidden="true" />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <h2 className="font-heading text-xl font-bold text-foreground">
                  Financial Year Disclosure Archive
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Historical balance sheets, income & expenditure accounts, and auditor notes are currently being
                  compiled for public download. Once verified with the statutory filing team, individual fiscal year
                  reports (PDF format) will be indexed here.
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-200/60 dark:border-amber-900/40">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Financial Year statements scheduled for upcoming publication</span>
              </div>
            </div>

            {/* Inquiries CTA */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="font-heading text-base font-semibold text-foreground">
                  Need financial statements for institutional grants?
                </h3>
                <p className="text-xs text-slate-600">
                  Direct audit records and balance sheets can be provided to registered donors upon formal request.
                </p>
              </div>

              <Button variant="primary" size="sm" href="/contact" className="shrink-0">
                <span>Contact Audit Desk</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1.5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
