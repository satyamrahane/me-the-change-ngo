import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Phone, MapPin, Send } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms & Conditions governing the use of the official website of Me The Change NGO.",
};

export default function TermsAndConditionsPage() {
  const lastUpdated = "September 2026";

  return (
    <div className="py-14 sm:py-20 bg-background">
      <Container size="md">
        <div className="space-y-10">
          {/* Header */}
          <div className="border-b border-border/80 pb-8 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <FileText className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Website Terms of Use</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Terms &amp; Conditions
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated} • Official web platform for {siteConfig.name}
            </p>
          </div>

          {/* Terms Content */}
          <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
            <section className="space-y-3">
              <h2 className="font-heading text-xl font-bold text-foreground">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using this website, you acknowledge that you have read and agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, please discontinue using this website.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-xl font-bold text-foreground">
                2. Nature &amp; Purpose of the Website
              </h2>
              <p>
                This website is maintained by {siteConfig.name} solely for charitable, informational, and community engagement purposes. The website provides information regarding our grassroots hunger relief, medical aid, and crisis assistance activities in Pune, and provides pathways for voluntary donations, volunteer registrations, and institutional partnerships.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-xl font-bold text-foreground">
                3. Accurate Information &amp; Conduct
              </h2>
              <p>
                When submitting information through any form on this website (including volunteer applications, partnership inquiries, contact requests, and donation details), you agree to provide truthful, accurate, and current information. You agree not to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Submit misleading, fraudulent, or malicious communications.</li>
                <li>Use automated bots, scrapers, or scripts to overload or interfere with website operations.</li>
                <li>Attempt to bypass security measures, rate limits, or honeypot fields.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-xl font-bold text-foreground">
                4. Intellectual Property &amp; Website Content
              </h2>
              <p>
                Images, videos, text, and visual media displayed on this website have been provided for use in documenting and representing the on-ground relief operations of {siteConfig.name}.
              </p>
              <p>
                You may access, view, and share website content for non-commercial, informational purposes to raise awareness about our charitable initiatives, provided that proper attribution to {siteConfig.name} is maintained. You may not reproduce, modify, or commercially exploit any photograph, video, logo, or written narrative without prior written permission.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-xl font-bold text-foreground">
                5. External Links &amp; Third-Party Services
              </h2>
              <p>
                This website contains links to external platforms, including our authorized payment gateway (Razorpay) and social channels (Instagram). {siteConfig.name} does not control the content, privacy policies, or practices of third-party platforms and assumes no responsibility for external websites. Interactions with external services are governed by their respective terms and policies.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-xl font-bold text-foreground">
                6. Voluntary Contributions
              </h2>
              <p>
                All donations made through this website are voluntary charitable gifts intended to sustain on-ground relief drives. Terms governing payment transactions, duplicate debits, and acknowledgments are described in our{" "}
                <Link href="/refund-cancellation-policy" className="text-primary font-semibold hover:underline">
                  Refund &amp; Cancellation Policy
                </Link>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-xl font-bold text-foreground">
                7. Limitation of Liability
              </h2>
              <p>
                While {siteConfig.name} makes every reasonable effort to keep the information on this website current and accurate, the website and its contents are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind. The Organization is not liable for temporary technical interruptions, connection failures, or external network issues beyond its control.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-xl font-bold text-foreground">
                8. Questions &amp; Communication
              </h2>
              <p>
                If you have questions concerning these Terms &amp; Conditions, please contact us:
              </p>
              <div className="rounded-xl border border-border bg-card p-5 space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                  <span>
                    <strong>Helpline:</strong>{" "}
                    <a href={`tel:+91${siteConfig.contact.phoneRaw}`} className="text-primary hover:underline">
                      {siteConfig.contact.phone}
                    </a>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Send className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                  <span>
                    <strong>Online Contact:</strong>{" "}
                    <Link href="/contact" className="text-primary hover:underline">
                      Submit an inquiry via our Contact Form
                    </Link>
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>Registered Address:</strong> {siteConfig.registeredOffice.fullAddress}
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Institutional note */}
          <div className="border-t border-border/80 pt-6 text-xs text-muted-foreground">
            <p>
              These Terms &amp; Conditions are subject to administrative review and updates by the leadership committee of {siteConfig.name}.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
