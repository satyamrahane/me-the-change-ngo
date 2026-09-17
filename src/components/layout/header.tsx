import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";

export function Header() {
  return (
    <>
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg focus:outline-none focus:ring-2 focus:ring-accent"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur-md supports-[backdrop-filter]:bg-card/85 transition-shadow">
        <Container size="lg" className="flex h-20 items-center justify-between gap-4">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 group rounded-lg p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label={`${siteConfig.name} - Home`}
          >
            {/* Temporary Typographic Monogram Mark (Placeholder until official logo is supplied by NGO) */}
            <span
              className="font-heading font-extrabold text-lg tracking-widest text-[#0f5132] select-none group-hover:text-primary transition-colors"
              aria-hidden="true"
            >
              MC
            </span>
            <span
              className="h-6 w-px bg-border/80 self-center hidden sm:inline-block"
              aria-hidden="true"
            />

            {/* Brand Typography */}
            <div className="flex flex-col">
              <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-foreground leading-tight group-hover:text-primary transition-colors">
                {siteConfig.name}
              </span>
              <span className="text-[11px] font-medium text-muted-foreground tracking-wide">
                Pune • Grassroots Action
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <Navbar />

          {/* Right Action / CTA & Mobile Nav */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Donate Now CTA - always visible */}
            <Button
              variant="secondary"
              size="md"
              href="/donate"
              className="font-semibold shadow-xs hover:shadow-md transition-all"
            >
              <Heart className="h-4 w-4 fill-current mr-1.5 shrink-0" aria-hidden="true" />
              <span>Donate Now</span>
            </Button>

            {/* Mobile Navigation Trigger & Drawer */}
            <MobileNav />
          </div>
        </Container>
      </header>
    </>
  );
}
