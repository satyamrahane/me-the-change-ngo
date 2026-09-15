import React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";


function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}




export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="Site Footer"
      className="border-t border-slate-800 bg-[#0c1824] text-slate-300"
    >
      {/* Main 4-Column Grid Section */}
      <div className="py-14 sm:py-16">
        <Container size="lg">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {/* Column 1: About & Mission */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-bold text-base shadow-sm">
                  MC
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-lg font-bold text-white tracking-tight">
                    {siteConfig.name}
                  </span>
                  <span className="text-xs text-slate-400">
                    {siteConfig.tagline}
                  </span>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-slate-400">
                {siteConfig.description}
              </p>

              <div className="pt-2 space-y-2 text-xs text-slate-400 border-t border-slate-800/80">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-slate-200">Organization: </strong>
                    Grassroots Non-Governmental Organization
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-slate-200">Registered Office: </strong>
                    {siteConfig.registeredOffice.fullAddress}
                  </span>
                </div>
              </div>
            </div>

            {/* Column 2: Transparency & Documents */}
            <div>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                {siteConfig.footerNav.transparency.title}
              </h3>
              <ul className="space-y-2.5 text-sm" role="list">
                {siteConfig.footerNav.transparency.items.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center text-slate-400 hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-sm"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform duration-150">
                        {link.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Our Work */}
            <div>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                <HeartHandshake className="h-4 w-4 text-amber-400" aria-hidden="true" />
                {siteConfig.footerNav.initiatives.title}
              </h3>
              <ul className="space-y-2.5 text-sm" role="list">
                {siteConfig.footerNav.initiatives.items.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center text-slate-400 hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-sm"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform duration-150">
                        {link.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Connect & Contact */}
            <div className="space-y-4">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white mb-4">
                Connect With Us
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-slate-400">
                  <Phone className="h-4 w-4 text-slate-400 shrink-0" aria-hidden="true" />
                  <a
                    href={`tel:+91${siteConfig.contact.phoneRaw}`}
                    className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3 text-slate-400">
                  <Mail className="h-4 w-4 text-slate-400 shrink-0" aria-hidden="true" />
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                  >
                    Online Contact Form
                  </Link>
                </div>

                <div className="flex items-center gap-3 text-slate-400">
                  <MessageCircle className="h-4 w-4 text-emerald-400 shrink-0" aria-hidden="true" />
                  <span className="text-slate-400 inline-flex items-center gap-1.5">
                    <span>WhatsApp Helpdesk</span>
                    <span className="text-xs text-slate-500 font-normal">(Setup in progress)</span>
                  </span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2">
                <span className="text-xs font-medium text-slate-400 block mb-2">
                  Official Channels
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Instagram ${siteConfig.social.instagramHandle}`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800/80 text-slate-300 hover:bg-gradient-to-tr hover:from-amber-600 hover:to-rose-600 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <InstagramIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Sub-Footer / Legal Bar */}
      <div className="border-t border-slate-800/80 bg-[#081018] py-6">
        <Container size="lg">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-slate-400 md:flex-row">
            <div className="text-center md:text-left">
              <p>
                © {currentYear} {siteConfig.name}. All rights reserved.
              </p>
              <p className="mt-0.5 text-slate-400">
                A grassroots non-governmental organization in Pune, Maharashtra.
              </p>
            </div>

            <nav aria-label="Legal and Policy Links" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {siteConfig.legalNav.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="hover:text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                >
                  {link.title}
                </Link>
              ))}
            </nav>
          </div>
        </Container>
      </div>
    </footer>
  );
}
