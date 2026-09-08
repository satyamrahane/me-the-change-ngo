import React from "react";
import Image from "next/image";
import { Heart, ArrowRight, MapPin, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-12 sm:py-16 lg:py-24">
      <Container size="lg">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Content Column */}
          <div className="flex flex-col items-start text-left lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default" className="flex items-center gap-1.5 py-1 px-3">
                <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                <span>Grassroots Action • {siteConfig.registeredOffice.city}</span>
              </Badge>
              <Badge variant="neutral" className="flex items-center gap-1.5 py-1 px-3">
                <ShieldCheck className="h-3.5 w-3.5 text-slate-600" aria-hidden="true" />
                <span>Public Charitable Trust</span>
              </Badge>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.15]">
              Creating Change, <br className="hidden sm:inline" />
              <span className="text-primary">Inspiring Hope</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-700 max-w-2xl leading-relaxed">
              {siteConfig.name} is dedicated to direct hunger relief, life-saving medical aid,
              and rapid crisis assistance for vulnerable families and patients across Pune.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-2">
              <Button
                variant="secondary"
                size="lg"
                href="/donate"
                className="font-semibold shadow-md text-base justify-center"
              >
                <Heart className="h-5 w-5 fill-current mr-2" aria-hidden="true" />
                Donate Now
              </Button>

              <Button
                variant="outline"
                size="lg"
                href="/initiatives"
                className="font-medium text-base justify-center group"
              >
                <span>Explore Our Initiatives</span>
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
            </div>

            {/* Pillar highlights */}
            <div className="pt-6 border-t border-border/70 grid grid-cols-3 gap-4 w-full text-left">
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider block">Food Relief</span>
                <span className="text-xs text-muted-foreground mt-0.5 block">Hospital & Community Drives</span>
              </div>
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider block">Medicine Aid</span>
                <span className="text-xs text-muted-foreground mt-0.5 block">Prescription Support</span>
              </div>
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider block">Crisis Relief</span>
                <span className="text-xs text-muted-foreground mt-0.5 block">Emergency Response</span>
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto aspect-[4/3] sm:aspect-[16/10] lg:aspect-square w-full max-w-lg overflow-hidden rounded-2xl border border-border shadow-xl bg-slate-100">
              <Image
                src="/images/hero-community.jpg"
                alt="Community volunteers distributing food and relief aid packages to families in Pune"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
