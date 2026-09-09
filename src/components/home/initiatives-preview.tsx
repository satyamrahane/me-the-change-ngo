import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { initiatives } from "@/data/initiatives";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function InitiativesPreview() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background">
      <Container size="lg">
        <div className="space-y-12">
          {/* Section Heading */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <SectionHeading
              eyebrow="Core Initiatives"
              title="Our Pillars of Grassroots Relief"
              description="Focused, on-ground programs designed to provide immediate relief, health support, and crisis assistance to communities in Pune."
            />

            <Button
              variant="outline"
              size="md"
              href="/initiatives"
              className="self-start sm:self-auto shrink-0 group"
            >
              <span>View All Initiatives</span>
              <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initiatives.map((initiative) => (
              <Card
                key={initiative.slug}
                hoverable
                className="flex flex-col overflow-hidden border-border bg-card shadow-xs transition-all hover:shadow-md"
              >
                {/* Initiative Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  {initiative.image ? (
                    <Image
                      src={initiative.image}
                      alt={initiative.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
                      No image available
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <CardContent className="flex-1 p-6 space-y-4">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground">
                      {initiative.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {initiative.shortDescription}
                    </p>
                  </div>

                  {/* Highlights list */}
                  {initiative.features && initiative.features.length > 0 && (
                    <ul className="space-y-2 pt-2 border-t border-border/60 text-xs text-slate-600" role="list">
                      {initiative.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden="true" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>

                {/* Card Footer CTA */}
                <CardFooter className="p-6 pt-0 border-t border-border/40 mt-auto flex items-center justify-between">
                  <Link
                    href={`/initiatives/${initiative.slug}`}
                    className="text-sm font-semibold text-primary hover:text-primary-hover flex items-center gap-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                  >
                    <span>
                      Learn More
                      <span className="sr-only"> about {initiative.title}</span>
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>

                  <Button
                    variant="ghost"
                    size="sm"
                    href="/donate"
                    aria-label={`Donate to support ${initiative.title}`}
                    className="text-xs text-accent hover:text-accent-hover font-semibold"
                  >
                    Donate
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
