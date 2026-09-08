import React from "react";
import type { Metadata } from "next";
import { ShieldCheck, CheckCircle2, Lock } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { DonationBox } from "@/components/donate/donation-box";

export const metadata: Metadata = {
  title: "Donate Now — Support Grassroots Relief",
  description:
    "Make a secure online donation to Me The Change Foundation. Support food relief drives, emergency medical aid, and crisis assistance in Pune.",
};

export default function DonatePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-12 sm:py-16">
        <Container size="lg">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <Badge variant="default" className="py-1 px-3">
              <span>Grassroots Giving</span>
            </Badge>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Support Our Relief Operations
            </h1>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
              Your contribution directly powers our field programs in {siteConfig.registeredOffice.city} — providing
              fresh meals outside Sassoon General Hospital, vital prescription assistance for critical patients, and
              rapid aid during community emergencies.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Donation Section */}
      <section className="py-10 sm:py-16 bg-background border-t border-border/60">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start max-w-6xl mx-auto">
            {/* Left Column: Donation Form (7 cols) */}
            <div className="lg:col-span-7">
              <DonationBox />
            </div>

            {/* Right Column: Trust & Impact Principles (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Trust Box */}
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary shrink-0">
                    <ShieldCheck className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-bold text-foreground">
                      Why Your Support Matters
                    </h2>
                    <p className="text-xs text-muted-foreground">Direct grassroots accountability</p>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <strong className="font-semibold text-foreground">Direct Community Reach:</strong>{" "}
                      Zero intermediary administrative bloat. Funds support food purchases, medical supplies, and field logistics.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <strong className="font-semibold text-foreground">Verified Governance:</strong>{" "}
                      Governed as a registered public charitable trust under the Charity Commissioner, Pune.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <strong className="font-semibold text-foreground">Secure Payments:</strong>{" "}
                      Processed via Razorpay with multi-factor authentication, supporting UPI, Google Pay, PhonePe, Cards, and Net Banking.
                    </div>
                  </div>
                </div>
              </div>

              {/* Supported Payment Channels */}
              <div className="rounded-2xl border border-border/80 bg-muted/30 p-5 space-y-3 text-xs text-muted-foreground">
                <div className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <Lock className="h-4 w-4 text-slate-500" aria-hidden="true" />
                  <span>Supported Payment Channels</span>
                </div>
                <p>
                  UPI (Google Pay, PhonePe, Paytm, BHIM), Debit/Credit Cards (Visa, Mastercard, RuPay), Net Banking (all major Indian banks), and Corporate NetBanking.
                </p>
              </div>

              {/* Offline / Bank Transfer Inquiries */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 space-y-2 text-xs text-slate-600">
                <div className="font-semibold text-foreground">
                  Direct Bank Transfers or CSR Grants?
                </div>
                <p>
                  For corporate donations, institutional wire transfers (NEFT/RTGS), or CSR grants, please connect with our team through our{" "}
                  <a href="/csr-partnerships" className="text-primary font-medium hover:underline">
                    CSR & Partnerships desk
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
