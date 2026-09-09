import React from "react";
import Image from "next/image";
import { ExternalLink, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { instagramPosts } from "@/data/instagram";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

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

export function InstagramFeed() {
  return (
    <section
      aria-label="Instagram Activity Feed"
      className="py-14 sm:py-20 bg-background border-t border-border/60"
    >
      <Container size="lg">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow={`${siteConfig.social.instagramHandle} on Instagram`}
            title="Follow Our On-Ground Action"
            description="Real-time updates, field distribution drives, and community stories directly from Pune."
          />

          <Button
            variant="outline"
            size="md"
            href={siteConfig.social.instagram}
            className="group whitespace-nowrap self-start md:self-end"
          >
            <InstagramIcon className="h-4 w-4 mr-2 text-rose-600 transition-transform group-hover:scale-110" />
            <span>Follow {siteConfig.social.instagramHandle}</span>
            <ExternalLink className="h-3.5 w-3.5 ml-1.5 opacity-70" aria-hidden="true" />
          </Button>
        </div>

        {/* 4-Item Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={post.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View Instagram post: ${post.caption.slice(0, 60)}... (opens in new tab)`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xs hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {/* Media Thumbnail */}
              <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                <Image
                  src={post.image}
                  alt={post.altText}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                    <InstagramIcon className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Caption Summary */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {post.caption}
                </p>

                <div className="pt-2 border-t border-border/50 flex items-center justify-between text-xs font-medium text-primary group-hover:text-primary-hover">
                  <span>View Post</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Subtitle / Transparency note */}
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Curated activity showcase from {siteConfig.social.instagramHandle}. Follow our official Instagram channel
          for stories and on-ground relief documentation.
        </p>
      </Container>
    </section>
  );
}
