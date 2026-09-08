import { Initiative } from "@/types";

/**
 * Initiatives Data Registry for "Me The Change" (NGO)
 *
 * CONTENT GUIDELINES:
 * - Only approved initiative pillars: Food Relief, Medicine Aid, Crisis Relief.
 * - Do NOT invent meal counts, beneficiary figures, or unverified operational statistics.
 * - Real data will be supplied by the NGO team.
 */

export const initiatives: Initiative[] = [
  {
    slug: "food-relief",
    title: "Food Relief",
    category: "food-relief",
    image: "/images/food-relief.jpg",
    shortDescription:
      "Nutritional assistance and hospital food distribution drives for patients and underprivileged families.",
    longDescription:
      "Our food relief initiative focuses on providing essential nutrition to vulnerable community members, including regular hospital food drives for patients and families in need.",
    features: [
      "Sassoon Hospital Food Drive",
      "Community Meal Distribution",
      "Emergency Nutrition Support",
    ],
    status: "draft",
    ctaText: "Support Food Relief",
    ctaHref: "/donate",
  },
  {
    slug: "medicine-aid",
    title: "Medicine Aid",
    category: "medical-aid",
    image: "/images/medicine-aid.jpg",
    shortDescription:
      "Assistance with essential prescription medicines and medical support for critical patients.",
    longDescription:
      "Dedicated to bridging the healthcare access gap by providing emergency medicines, prescription support, and healthcare aid for individuals facing acute medical emergencies.",
    features: [
      "Critical Prescription Support",
      "Emergency Medical Assistance",
      "Healthcare Access Aid",
    ],
    status: "draft",
    ctaText: "Support Medical Aid",
    ctaHref: "/donate",
  },
  {
    slug: "crisis-relief",
    title: "Crisis Relief",
    category: "crisis-relief",
    image: "/images/crisis-relief.jpg",
    shortDescription:
      "Rapid disaster response, emergency community assistance, and crisis relief interventions.",
    longDescription:
      "Grassroots emergency response mobilization during natural calamities, pandemics, and community crises to provide rapid aid, essential supplies, and rehabilitation assistance.",
    features: [
      "Disaster Relief Operations",
      "Emergency Supply Distribution",
      "COVID-19 Relief Archive",
    ],
    status: "draft",
    ctaText: "Support Crisis Relief",
    ctaHref: "/donate",
  },
];

export function getInitiativeBySlug(slug: string): Initiative | undefined {
  return initiatives.find((item) => item.slug === slug);
}
