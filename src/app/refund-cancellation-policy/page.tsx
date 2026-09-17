import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { RefreshCw, Phone, MapPin, Send, HelpCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description:
    "Refund and cancellation guidelines for voluntary charitable contributions made to Me The Change NGO.",
};

export default function RefundCancellationPolicyPage() {
  const lastUpdated = "September 2026";

  return (
    <div className="py-14 sm:py-20 bg-background">
      <Container size="md">
        <div className="space-y-10">
          {/* Header */}
          <div className="border-b border-border/80 pb-8 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Donation &amp; Payment Guidelines</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Refund &amp; Cancellation Policy
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated} • Applicable to online contributions to {siteConfig.name}
            </p>
          </div>

          {/* Policy Body */}
          <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
            <section className="space-y-3">
              <h2 className="font-heading text-xl font-bold text-foreground">
                1. Nature of Voluntary Contributions
              </h2>
              <p>
                {siteConfig.name} is a grassroots non-governmental organization dedicated to daily hunger eradication, medical aid, and crisis relief across Pune. All financial contributions made through our website are voluntary charitable gifts utilized directly to sustain on-ground field distributions, food drives, and patient support operations.
              </p>
              <p>
                Because donated funds are mobilized promptly to purchase fresh groceries, prepare meal packets, and assist patients admitted to public health facilities, donations are generally non-cancellable once confirmed.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-xl font-bold text-foreground">
                2. Technical Errors &amp; Duplicate Transactions
              </h2>
              <p>
                We recognize that technical issues can occasionally arise during digital transactions.
              </p>
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5 space-y-2 text-slate-800">
                <div className="flex items-center gap-2 font-semibold text-amber-900 text-sm">
                  <HelpCircle className="h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
                  <span>Assistance with Payment Issues</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700">
                  For duplicate debits, technical payment issues, or accidental payments, please contact Me The Change through the listed payment-support channel so the transaction can be reviewed.
                </p>
              </div>
              <p>
                When contacting our team regarding a transaction review, please provide:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Donor name and email address provided during the donation</li>
                <li>Transaction reference number (or Razorpay payment ID)</li>
                <li>Date and time of the transaction</li>
                <li>Amount debited from your account</li>
              </ul>
              <p className="text-sm">
                Our administrative team will review the transaction details against our payment gateway records and contact you regarding the outcome of the review.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-xl font-bold text-foreground">
                3. Transaction Acknowledgments
              </h2>
              <p>
                Upon successful completion of an online contribution, the system generates a unique transaction tracking reference (for example, &ldquo;MTC-...&rdquo;) displayed on screen. Donors who require written acknowledgment or have questions regarding documentation may contact our office directly with their transaction reference.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-xl font-bold text-foreground">
                4. Payment Security
              </h2>
              <p>
                All online transactions are handled through our authorized payment partner, Razorpay. {siteConfig.name} does not capture, store, or have access to credit card numbers, debit card PINs, CVV codes, net banking passwords, or UPI security PINs.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-xl font-bold text-foreground">
                5. Payment Support Contact
              </h2>
              <p>
                For payment inquiries, duplicate debit reviews, or contribution questions, please connect with our team:
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
              This policy is maintained for transparent donation stewardship by {siteConfig.name}.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
