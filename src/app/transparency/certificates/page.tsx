import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { transparencyDocuments } from "@/data/documents";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { DocumentCard } from "@/components/transparency/document-card";

export const metadata: Metadata = {
  title: "Statutory Certificates & Registrations",
  description:
    "Statutory registration certificates, organizational documents, and regulatory transparency disclosures for Me The Change.",
};

export default function CertificatesPage() {
  // Required items: Registration, 12A/80G, CSR-1, Darpan ID
  const certificates = transparencyDocuments.filter(
    (doc) =>
      doc.category === "registration" ||
      doc.category === "tax-exemption" ||
      doc.category === "csr" ||
      doc.category === "darpan"
  );

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
              Certificates
            </span>
          </nav>
        </Container>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-12 sm:py-16">
        <Container size="lg">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <Badge variant="default" className="py-1 px-3">
              <span>Legal Accreditations</span>
            </Badge>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Registration & Statutory Certificates
            </h1>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
              Statutory documents validating the incorporation, legal mandate, and tax-exempt charitable status
              of {siteConfig.legalName} in {siteConfig.registeredOffice.city}, {siteConfig.registeredOffice.state}.
            </p>
          </div>
        </Container>
      </section>

      {/* Document Grid */}
      <section className="py-12 sm:py-16 bg-background border-t border-border/60">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {certificates.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>

          <div className="mt-12 max-w-2xl mx-auto text-center rounded-2xl border border-primary/20 bg-primary/5 p-6 space-y-2">
            <h2 className="font-heading text-base font-semibold text-foreground">
              Official Certification Inquiries
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Original certificates are registered with the Charity Commissioner, Pune. Scanned certified copies
              for CSR due diligence can be requested through our{" "}
              <Link href="/contact" className="text-primary font-medium hover:underline">
                compliance desk
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
