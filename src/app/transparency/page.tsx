import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, AlertCircle } from "lucide-react";
import { transparencyDocuments } from "@/data/documents";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DocumentCard } from "@/components/transparency/document-card";

export const metadata: Metadata = {
  title: "Transparency & Legal Disclosures",
  description:
    "Review Me The Change Foundation's public charitable trust registration documents, compliance certificates, and governance disclosures.",
};

export default function TransparencyPage() {
  // Required items for certificates section: Registration, 12A/80G, CSR-1, Darpan ID
  const certificateDocs = transparencyDocuments.filter(
    (doc) =>
      doc.category === "registration" ||
      doc.category === "tax-exemption" ||
      doc.category === "csr" ||
      doc.category === "darpan"
  );

  const auditDocs = transparencyDocuments.filter((doc) => doc.category === "audit-report");
  const licenseDocs = transparencyDocuments.filter((doc) => doc.category === "license");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-14 sm:py-20">
        <Container size="lg">
          <div className="mx-auto max-w-3xl text-center space-y-5">
            <Badge variant="default" className="py-1 px-3">
              <span>Public Accountability</span>
            </Badge>

            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Transparency & Legal
            </h1>

            <p className="text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
              {siteConfig.name} is dedicated to open governance and grassroots accountability. We publish our statutory
              registrations, compliance filings, and audit disclosures to provide complete visibility to donors,
              partners, and community stakeholders.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Button variant="outline" size="sm" href="#certificates">
                Certificates
              </Button>
              <Button variant="outline" size="sm" href="#audit-reports">
                Audit Reports
              </Button>
              <Button variant="outline" size="sm" href="#licenses">
                Licenses & Approvals
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Compliance Status Notice */}
      <section className="py-6 bg-amber-50/70 dark:bg-amber-950/20 border-y border-amber-200/60 dark:border-amber-900/40">
        <Container size="lg">
          <div className="flex items-start sm:items-center gap-3.5 max-w-4xl mx-auto text-sm text-amber-900 dark:text-amber-200">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
            <p className="leading-relaxed">
              <strong className="font-semibold">Public Documentation Notice:</strong> Official certified document copies,
              audited balance sheets, and registration certificates are currently being digitized and verified for public hosting.
              For formal institutional verification requests or copies, please contact our compliance desk.
            </p>
          </div>
        </Container>
      </section>

      {/* 1. Certificates Section */}
      <section id="certificates" className="py-14 sm:py-20 bg-background scroll-mt-20">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <SectionHeading
              eyebrow="Section 1"
              title="Statutory Certificates"
              description="Core public trust registration, tax exemption certifications, and government portal registrations."
            />
            <Link
              href="/transparency/certificates"
              className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-hover group whitespace-nowrap"
            >
              <span>View All Certificates</span>
              <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificateDocs.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        </Container>
      </section>

      {/* 2. Audit Reports Section */}
      <section id="audit-reports" className="py-14 sm:py-20 bg-card border-y border-border/60 scroll-mt-20">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <SectionHeading
              eyebrow="Section 2"
              title="Audit Reports & Financial Disclosures"
              description="Independent chartered accountant audit reports and annual fund utilization statements."
            />
            <Link
              href="/transparency/audits"
              className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-hover group whitespace-nowrap"
            >
              <span>View Audit Archive</span>
              <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {auditDocs.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Licenses & Statutory Approvals Section */}
      <section id="licenses" className="py-14 sm:py-20 bg-background scroll-mt-20">
        <Container size="lg">
          <div className="mb-10">
            <SectionHeading
              eyebrow="Section 3"
              title="Licenses & Statutory Approvals"
              description="Municipal and state operational clearances required for grassroots humanitarian relief work."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {licenseDocs.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        </Container>
      </section>

      {/* Questions / Verification CTA */}
      <section className="py-14 sm:py-16 bg-muted/40 border-t border-border/60">
        <Container size="lg">
          <div className="mx-auto max-w-2xl text-center space-y-6">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
              Questions Regarding Compliance?
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              If your organization, corporate CSR office, or foundation requires direct compliance documentation
              or certified trust records, please reach out to our team.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button variant="primary" size="md" href="/contact" className="font-semibold px-6">
                <span>Contact Compliance Desk</span>
                <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
              </Button>

              <Button variant="outline" size="md" href="/csr-partnerships" className="px-6">
                <span>CSR Inquiries</span>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
