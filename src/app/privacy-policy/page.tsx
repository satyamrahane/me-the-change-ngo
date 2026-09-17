import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Phone, MapPin, Send, Lock } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Me The Change NGO. Explaining our factual data collection, processing, and privacy practices.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 2026";

  return (
    <div className="py-14 sm:py-20 bg-background">
      <Container size="md">
        <div className="space-y-10">
          {/* Header */}
          <div className="border-b border-border/80 pb-8 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Shield className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Website Privacy Policy</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated} • Applicable to the website of {siteConfig.name}
            </p>
          </div>

          {/* Policy Body */}
          <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
            <section className="space-y-3">
              <h2 className="font-heading text-xl font-bold text-foreground">
                1. Overview &amp; Commitment
              </h2>
              <p>
                {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the Organization&rdquo;) is a grassroots non-governmental organization operating in Pune, Maharashtra. We respect your privacy and are committed to handling personal information provided through our website transparently and responsibly.
              </p>
              <p>
                This Privacy Policy explains what personal data is collected when you browse our website, complete online forms, or initiate voluntary contributions, and describes how that data is used and protected.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-xl font-bold text-foreground">
                2. Information We Collect
              </h2>
              <p>
                We only collect personal information that you voluntarily provide to us when using specific features on this website:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Contact Inquiries:</strong> When you submit a message through our Contact Form, we collect your name, email address, optional phone number, subject, and message content.
                </li>
                <li>
                  <strong>Volunteer Applications:</strong> When you register to volunteer, we collect your full name, email address, phone number, city, general availability, selected areas of interest, and any optional notes you provide.
                </li>
                <li>
                  <strong>CSR &amp; Partnership Inquiries:</strong> When an organization reaches out for CSR collaboration, we collect the company name, contact person name, corporate email address, phone number, program interest area, and project brief.
                </li>
                <li>
                  <strong>Donation Transactions:</strong> When you initiate an online donation, we collect your name, email address, phone number, initiative preference, and contribution amount. Payment card details, UPI credentials, and net banking credentials are processed directly by our authorized payment gateway (Razorpay) and are <em>never</em> collected, accessed, or stored on our servers.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-xl font-bold text-foreground">
                3. Purpose of Data Processing
              </h2>
              <p>The information collected is used solely for legitimate organizational activities:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>To respond to your questions, feedback, and support inquiries.</li>
                <li>To coordinate and mobilize volunteer participation for on-ground relief drives.</li>
                <li>To discuss CSR initiatives and institutional partnerships with corporate sponsors.</li>
                <li>To confirm receipt of voluntary charitable contributions and acknowledge transaction records.</li>
                <li>To prevent abuse, bot submissions, and maintain website security.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-xl font-bold text-foreground">
                4. Cookies, Storage &amp; Tracking
              </h2>
              <div className="rounded-xl border border-border bg-slate-50 p-4 sm:p-5 space-y-2">
                <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                  <Lock className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Zero Cookie &amp; Tracking Architecture</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  This website does not set tracking cookies, does not use browser local storage or session storage, and does not run third-party marketing analytics (such as Google Analytics or advertising pixels). You can navigate our website freely without tracking scripts monitoring your browsing behavior.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-xl font-bold text-foreground">
                5. Third-Party Technical Processors
              </h2>
              <p>
                To provide specific operational functions, we rely on established technical service providers who process data strictly on our behalf:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Database Storage (Supabase):</strong> Form submissions are stored in an access-restricted server-side database to allow coordination teams to follow up on inquiries.
                </li>
                <li>
                  <strong>Transactional Email (Resend):</strong> When you send an inquiry, an automated notification is transmitted via an email delivery service to notify the relevant team member.
                </li>
                <li>
                  <strong>Payment Processing (Razorpay):</strong> Online payment processing is managed by Razorpay Software Private Limited. The gateway handles authorization and settlement under applicable payment security standards.
                </li>
              </ul>
              <p>
                We do not sell, rent, trade, or share your personal information with third parties for commercial or marketing purposes.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-xl font-bold text-foreground">
                6. Data Retention
              </h2>
              <p>
                We retain submitted inquiries and volunteer records only for as long as necessary to fulfill the operational purpose for which they were submitted (for instance, coordinating upcoming relief drives or responding to partner proposals) or as required by applicable administrative rules.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-xl font-bold text-foreground">
                7. Your Rights &amp; How to Contact Us
              </h2>
              <p>
                You have the right to request access to, correction of, or deletion of personal data you have submitted to {siteConfig.name}. To make a request or ask any question regarding this policy, please reach out to us:
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
              This policy describes current website data workflows and is subject to routine governance updates by {siteConfig.name}.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
