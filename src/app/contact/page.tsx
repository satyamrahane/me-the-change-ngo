import React from "react";
import type { Metadata } from "next";
import { Mail, MapPin, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Me The Change. Send inquiries regarding grassroots relief, volunteer opportunities, and institutional support in Pune.",
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
                  You can reach us through the form or our official channels. Official direct phone lines and office visitation
                  protocols will be published once physical verification is completed by our governing trust.
                </p>
              </div>

              <div className="space-y-4">
                {/* Office Location */}
                <Card className="p-5">
                  <CardContent className="flex items-start gap-4 p-0">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary shrink-0">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-heading text-base font-semibold text-foreground">
                        Registered Location
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {siteConfig.registeredOffice.city}, {siteConfig.registeredOffice.state}, {siteConfig.registeredOffice.country}
                      </p>
                      <span className="inline-block text-xs text-muted-foreground pt-0.5">
                        Jurisdiction: Charity Commissioner Pune
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Email Support */}
                <Card className="p-5">
                  <CardContent className="flex items-start gap-4 p-0">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary shrink-0">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-heading text-base font-semibold text-foreground">
                        Email Inquiry
                      </h3>
                      <p className="text-sm text-slate-600">
                        <a
                          href={`mailto:${siteConfig.contact.email}`}
                          className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                        >
                          {siteConfig.contact.email}
                        </a>
                      </p>
                      <span className="inline-block text-xs text-muted-foreground pt-0.5">
                        General inquiries and correspondence
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Official Transparency Notice */}
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 text-sm text-slate-600 space-y-2">
                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span>Public Notice</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    Me The Change Foundation does not accept unreceipted cash donations or unsolicited personal requests.
                    All formal communications are routed through registered email accounts.
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
