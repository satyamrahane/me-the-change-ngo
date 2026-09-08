"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <Container size="lg" className="space-y-16">
        {/* Page Title */}
        <div className="border-b border-border pb-6">
          <SectionHeading
            as="h1"
            eyebrow="Internal Tooling"
            title="Design System Showcase"
            description="Visual primitives, typography, tokens, and component states for Phase 2 verification."
          />
        </div>

        {/* 1. Color System */}
        <section className="space-y-6">
          <SectionHeading
            title="Color Palette Tokens"
            description="Approved brand colors with semantic naming and strict contrast compliance."
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <div className="h-20 bg-primary" />
              <div className="p-3">
                <div className="text-xs font-semibold text-foreground">Primary Green</div>
                <div className="text-xs text-muted-foreground">#0F5132</div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <div className="h-20 bg-accent" />
              <div className="p-3">
                <div className="text-xs font-semibold text-foreground">Warm Saffron</div>
                <div className="text-xs text-muted-foreground">#EA580C</div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <div className="h-20 bg-trust" />
              <div className="p-3">
                <div className="text-xs font-semibold text-foreground">Trust Navy</div>
                <div className="text-xs text-muted-foreground">#1E293B</div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <div className="h-20 bg-[#f8fafc] border-b border-border" />
              <div className="p-3">
                <div className="text-xs font-semibold text-foreground">Light Surface</div>
                <div className="text-xs text-muted-foreground">#F8FAFC</div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <div className="h-20 bg-muted" />
              <div className="p-3">
                <div className="text-xs font-semibold text-foreground">Muted Gray</div>
                <div className="text-xs text-muted-foreground">#F1F5F9</div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <div className="h-20 bg-card border-b border-border" />
              <div className="p-3">
                <div className="text-xs font-semibold text-foreground">White Card</div>
                <div className="text-xs text-muted-foreground">#FFFFFF</div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Typography Scale */}
        <section className="space-y-6">
          <SectionHeading
            title="Typography Scale"
            description="Humanist sans-serif hierarchy using Plus Jakarta Sans for headings and Inter for body copy."
          />
          <div className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div>
              <div className="text-xs uppercase text-muted-foreground font-semibold tracking-wider">Display / H1</div>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
                Heading 1 — Creating Change, Inspiring Hope
              </h1>
            </div>
            <div>
              <div className="text-xs uppercase text-muted-foreground font-semibold tracking-wider">H2 Heading</div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                Heading 2 — Emergency Healthcare Subsidies & Food Relief
              </h2>
            </div>
            <div>
              <div className="text-xs uppercase text-muted-foreground font-semibold tracking-wider">H3 Heading</div>
              <h3 className="font-heading text-xl sm:text-2xl font-semibold text-foreground">
                Heading 3 — Transparent Governance & Verified Operations
              </h3>
            </div>
            <div>
              <div className="text-xs uppercase text-muted-foreground font-semibold tracking-wider">H4 Heading</div>
              <h4 className="font-heading text-lg sm:text-xl font-semibold text-foreground">
                Heading 4 — Volunteer Support Program
              </h4>
            </div>
            <div>
              <div className="text-xs uppercase text-muted-foreground font-semibold tracking-wider">Body Text</div>
              <p className="text-base text-foreground leading-relaxed">
                Standard body paragraph designed for comfortable long-form reading. High contrast against light backgrounds ensures clear legibility across devices of all sizes.
              </p>
            </div>
            <div>
              <div className="text-xs uppercase text-muted-foreground font-semibold tracking-wider">Small Text & Captions</div>
              <p className="text-sm text-muted-foreground">
                Secondary descriptive metadata, timestamps, document file sizes, and regulatory footnotes.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Button Component Primitives */}
        <section className="space-y-6">
          <SectionHeading
            title="Button Component"
            description="Accessible interactive triggers supporting multiple variants, sizes, and states."
          />

          <div className="space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Variants (Medium Size)</h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Sizes (Primary Variant)</h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small (sm)</Button>
                <Button size="md">Medium (md)</Button>
                <Button size="lg">Large (lg)</Button>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">States</h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button disabled>Disabled Button</Button>
                <Button isLoading>Loading Button</Button>
                <Button variant="outline" href="#test">As Link / Anchor</Button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Badge Component */}
        <section className="space-y-6">
          <SectionHeading
            title="Badge Component"
            description="Status, category, and compliance badges with semantic colors."
          />
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-6 shadow-sm">
            <Badge variant="default">Default Initiative</Badge>
            <Badge variant="success">Verified 80G Compliant</Badge>
            <Badge variant="warning">Urgent Relief Drive</Badge>
            <Badge variant="neutral">Status Pending</Badge>
            <Badge variant="trust">Trust / Legal Document</Badge>
          </div>
        </section>

        {/* 5. Card Component Primitives */}
        <section className="space-y-6">
          <SectionHeading
            title="Card Component"
            description="Structured container primitives with header, title, description, content, and footer."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card hoverable>
              <CardHeader>
                <Badge variant="default" className="w-fit mb-2">Initiative</Badge>
                <CardTitle>Food Relief Drive</CardTitle>
                <CardDescription>Daily nutrition support for hospital patient families.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground">
                  Structured content body describing active on-ground initiatives with subtle hover lift and clean card borders.
                </p>
              </CardContent>
              <CardFooter className="justify-between border-t border-border pt-4">
                <span className="text-xs text-muted-foreground">Updated Weekly</span>
                <Button variant="outline" size="sm">Read More</Button>
              </CardFooter>
            </Card>

            <Card hoverable>
              <CardHeader>
                <Badge variant="trust" className="w-fit mb-2">Compliance</Badge>
                <CardTitle>Annual Audit Report</CardTitle>
                <CardDescription>Financial transparency statements for FY 2023-24.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground">
                  Verified financial filings and operational balance sheets for public inspection and CSR evaluation.
                </p>
              </CardContent>
              <CardFooter className="justify-between border-t border-border pt-4">
                <span className="text-xs text-muted-foreground">PDF • 1.2 MB</span>
                <Button variant="outline" size="sm">Download</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Badge variant="warning" className="w-fit mb-2">Emergency</Badge>
                <CardTitle>Non-Hoverable Card</CardTitle>
                <CardDescription>Static information card without hover animation.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground">
                  Used for steady informational blocks, notices, or data summaries where pointer interaction is not required.
                </p>
              </CardContent>
              <CardFooter className="border-t border-border pt-4">
                <Button variant="secondary" size="sm" className="w-full">Action Button</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* 6. Section Heading Alignments */}
        <section className="space-y-6">
          <SectionHeading
            title="Section Heading Component"
            description="Demonstration of left-aligned versus center-aligned section headers."
          />
          <div className="space-y-8 rounded-xl border border-border bg-card p-8 shadow-sm">
            <div className="border-b border-border pb-6">
              <span className="text-xs font-semibold text-muted-foreground uppercase mb-2 block">Left Aligned</span>
              <SectionHeading
                eyebrow="Left Aligned Eyebrow"
                title="Grassroots Action for Community Well-being"
                description="Designed for introductory content, two-column split sections, and standard page bodies."
                align="left"
              />
            </div>
            <div>
              <span className="text-xs font-semibold text-muted-foreground uppercase mb-2 block text-center">Center Aligned</span>
              <SectionHeading
                eyebrow="Center Aligned Eyebrow"
                title="Building Long-Term Impact Together"
                description="Ideal for heroes, feature grids, statistical summaries, and call-to-action banners."
                align="center"
              />
            </div>
          </div>
        </section>

        {/* 7. Container Sizes */}
        <section className="space-y-6">
          <SectionHeading
            title="Container Width Variants"
            description="Testing standard container sizes: Small (3xl), Medium (5xl), and Large (7xl)."
          />
          <div className="space-y-4">
            <Container size="sm" className="rounded-lg border border-dashed border-primary bg-[#e8f5e9]/40 p-4 text-center text-xs font-medium text-primary">
              Container Size: Small (max-w-3xl) — Ideal for articles & form flows
            </Container>
            <Container size="md" className="rounded-lg border border-dashed border-accent bg-[#fff7ed] p-4 text-center text-xs font-medium text-accent">
              Container Size: Medium (max-w-5xl) — Ideal for focused landing sections
            </Container>
            <Container size="lg" className="rounded-lg border border-dashed border-trust bg-slate-100 p-4 text-center text-xs font-medium text-trust">
              Container Size: Large (max-w-7xl) — Standard default for full-width grid layouts
            </Container>
          </div>
        </section>
      </Container>
    </div>
  );
}
