import React from "react";
import { Heart, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-[#0d442a] to-slate-900 py-16 sm:py-20 text-white">
      <Container size="lg">
        <div className="relative z-10 mx-auto max-w-3xl text-center space-y-6">
          <span className="inline-flex items-center rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300 backdrop-blur-xs">
            Grassroots Action in Pune
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Be Part of Meaningful Change
          </h2>

          <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl mx-auto">
            Every meal provided, prescription filled, and family assisted starts with collective compassion.
            Join {siteConfig.name} in making an immediate, on-ground difference.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              variant="secondary"
              size="lg"
              href="/donate"
              className="w-full sm:w-auto font-semibold shadow-lg text-base px-8"
            >
              <Heart className="h-5 w-5 fill-current mr-2" aria-hidden="true" />
              <span>Donate Now</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              href="/get-involved"
              className="w-full sm:w-auto font-medium text-base text-white border-white/30 hover:bg-white/10 hover:border-white/60 px-8"
            >
              <span>Get Involved</span>
              <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
