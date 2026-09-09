import { HeroSection } from "@/components/home/hero-section";
import { MissionSection } from "@/components/home/mission-section";
import { InitiativesPreview } from "@/components/home/initiatives-preview";
import { ImpactOverview } from "@/components/home/impact-overview";
import { TransparencyPreview } from "@/components/home/transparency-preview";
import { GetInvolvedPreview } from "@/components/home/get-involved-preview";
import { InstagramFeed } from "@/components/social/instagram-feed";
import { CtaBanner } from "@/components/home/cta-banner";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Me The Change",
  description: "Official web platform for Me The Change NGO. Dedicated to hunger relief, medical assistance, crisis response, and grassroots community empowerment.",
};
export default function Home() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <InitiativesPreview />
      <ImpactOverview />
      <TransparencyPreview />
      <GetInvolvedPreview />
      <InstagramFeed />
      <CtaBanner />
    </>
  );
}
