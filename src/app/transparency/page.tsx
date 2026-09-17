import React from "react";
import type { Metadata } from "next";
import { Clock, AlertCircle, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Transparency & Legal Disclosures",
  description:
    "Review Me The Change Foundation's public charitable trust registration documents, compliance certificates, and governance disclosures.",
};


export default function TransparencyPage() {
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
              <Button variant="outline" size="sm" href="#document-register">
                View Document Register
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

      {/* Document Register Table */}
      <section id="document-register" className="py-14 sm:py-20 bg-background scroll-mt-20">
        <Container size="lg">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Document Register
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                Expected Public Documents
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                The following documents are expected to be published here once the relevant registrations,
                certificates, and audit filings have been obtained and verified by the NGO.
              </p>
            </div>

            {/* Responsive table */}
            <div className="overflow-x-auto rounded-xl border border-border/80 bg-card shadow-xs">
              <table className="w-full text-sm" aria-label="Me The Change document register">
                <thead>
                  <tr className="border-b border-border/70 bg-muted/40">
                    <th scope="col" className="py-3 px-5 text-left font-semibold text-foreground">
                      Document
                    </th>
                    <th scope="col" className="py-3 px-5 text-left font-semibold text-foreground whitespace-nowrap">
                      Current Status
                    </th>
                    <th scope="col" className="py-3 px-5 text-left font-semibold text-foreground">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {[
                    {
                      name: "Trust / Society Registration Certificate",
                      notes: "Certificate of incorporation under the applicable Societies / Trusts Act",
                    },
                    {
                      name: "12A & 80G Certificates",
                      notes: "Income Tax exemption enabling 80G donor benefits",
                    },
                    {
                      name: "CSR-1 Registration",
                      notes: "Ministry of Corporate Affairs filing enabling CSR partnerships",
                    },
                    {
                      name: "NGO Darpan Registration",
                      notes: "NITI Aayog NGO Darpan platform registration",
                    },
                    {
                      name: "Annual Audit Reports",
                      notes: "Independent CA audit reports and fund utilization statements",
                    },
                    {
                      name: "Statutory Licenses / Approvals",
                      notes: "Municipal and state clearances required for charitable relief activities",
                    },
                  ].map(({ name, notes }) => (
                    <tr key={name} className="hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-medium text-foreground align-top">{name}</td>
                      <td className="py-4 px-5 align-top">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 rounded-md border border-amber-200/60 dark:border-amber-900/40 whitespace-nowrap">
                          <Clock className="h-3 w-3 shrink-0" aria-hidden="true" />
                          Pending document
                        </span>
                      </td>
                      <td className="py-4 px-5 text-slate-500 text-xs leading-relaxed align-top">{notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-5 text-xs text-muted-foreground leading-relaxed">
              This register will be updated as official documents are obtained and cleared for public hosting.
              For institutional verification or certified copies, please contact our compliance desk.
            </p>
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
