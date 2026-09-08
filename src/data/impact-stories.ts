import { ImpactStory } from "@/types";

/**
 * Impact Stories Data Registry for "Me The Change" (NGO)
 *
 * CONTENT GUIDELINES:
 * - Do NOT fabricate beneficiary names, quotes, medical details, dates, or personal histories.
 * - Records below represent structural schema templates referencing approved initiative areas.
 * - All records are explicitly flagged with 'draft' status until real verified case studies
 *   and consent-cleared media are supplied by the NGO team.
 */

export const impactStories: ImpactStory[] = [
  {
    slug: "sassoon-hospital-food-drive",
    title: "Sassoon Hospital Food Support Drive",
    summary:
      "Grassroots initiative supporting patient families and attendants during long hospital treatments with nutritious meals.",
    category: "food-relief",
    status: "draft",
  },
  {
    slug: "emergency-medical-assistance-program",
    title: "Critical Medication Support Initiative",
    summary:
      "Assistance network providing emergency prescription medicines to vulnerable patients facing critical healthcare expenses.",
    category: "medical-aid",
    status: "draft",
  },
  {
    slug: "covid-19-relief-archive",
    title: "COVID-19 Community Crisis Response",
    summary:
      "Archived record of emergency ration, healthcare essentials, and relief distributions during pandemic lockdowns.",
    category: "crisis-relief",
    status: "draft",
  },
];

export function getImpactStoryBySlug(slug: string): ImpactStory | undefined {
  return impactStories.find((story) => story.slug === slug);
}
