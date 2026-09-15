import React from "react";
import type { Metadata } from "next";
import { Phone, MapPin, ShieldCheck, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/forms/contact-form";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Me The Change. Send inquiries regarding grassroots relief, volunteer opportunities, and community support in Pune.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-14 sm:py-20">
        <Container size="lg">
          <div className="mx-auto max-w-3xl text-center space-y-5">
            <Badge variant="default" className="py-1 px-3">
              <span>Get In Touch</span>
            </Badge>

            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Contact {siteConfig.name}
            </h1>

            <p className="text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
              Have a question about our relief initiatives, volunteer opportunities, or partnerships? We welcome
              inquiries from community members, supporters, and institutions.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Grid: Details + Form */}
      <section className="py-12 sm:py-20 bg-background border-t border-border/60">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
            {/* Left Column: Contact Details & Info (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Reach Out to Our Team
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  You can reach our on-ground team directly via phone, connect on Instagram, or submit an inquiry through our online contact form.
                </p>
              </div>

              <div className="space-y-4">
                {/* Phone Support */}
                <Card className="p-5">
                  <CardContent className="flex items-start gap-4 p-0">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary shrink-0">
                      <Phone className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-heading text-base font-semibold text-foreground">
                        Phone Helpline
                      </h3>
                      <p className="text-sm text-slate-700 font-medium">
                        <a
                          href={`tel:+91${siteConfig.contact.phoneRaw}`}
                          className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                        >
                          {siteConfig.contact.phone}
                        </a>
                      </p>
                      <span className="inline-block text-xs text-muted-foreground pt-0.5">
                        Direct assistance and volunteer inquiries
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Office Location */}
                <Card className="p-5">
                  <CardContent className="flex items-start gap-4 p-0">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary shrink-0">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-heading text-base font-semibold text-foreground">
                        Office Address
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {siteConfig.registeredOffice.fullAddress}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Instagram Channel */}
                <Card className="p-5">
                  <CardContent className="flex items-start gap-4 p-0">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 shrink-0">
                      <InstagramIcon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-heading text-base font-semibold text-foreground">
                        Instagram
                      </h3>
                      <p className="text-sm text-slate-700 font-medium">
                        <a
                          href={siteConfig.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                        >
                          <span>{siteConfig.social.instagramHandle}</span>
                          <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
                        </a>
                      </p>
                      <span className="inline-block text-xs text-muted-foreground pt-0.5">
                        Daily field updates and community outreach
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Public Notice */}
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 text-sm text-slate-600 space-y-2">
                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span>Public Notice</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    Me The Change does not accept unreceipted cash donations or unsolicited personal requests.
                    All formal inquiries are processed via our verified phone line or online contact form.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="space-y-4 mb-6">
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Send a Message
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Fill in the fields below. We aim to review and address all general communications promptly.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
