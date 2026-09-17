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
    title: "Daily Food Relief & Hospital Drives",
    category: "food-relief",
    image: "/images/real/food-distribution.jpg",
    shortDescription:
      "Serving hot, hygienic food packets daily across 3 public hospitals and ensuring consistent meal support for daily wage workers.",
    longDescription:
      "Impoverished patients and their caregivers travel vast distances to government hospitals like Sassoon General Hospital, often skipping meals due to treatment expenses. Me The Change serves hot, hygienic food packets daily across 3 public hospitals, while ensuring consistent meal distributions for street vendors, construction labourers, and destitute individuals across city hubs.",
    features: [
      "Hospital Caregiver Food Support",
      "Daily Wage Worker Support",
      "3 Public Hospitals Covered Daily",
    ],
    status: "verified",
    ctaText: "Support Food Relief",
    ctaHref: "/donate",
  },
  {
    slug: "medicine-aid",
    title: "Medical Aid & Patient Welfare",
    category: "medical-aid",
    image: "/images/real/medical-screening.jpg",
    shortDescription:
      "Facilitating vital medicines, surgical consumables, and prescribed treatments for low-income patients admitted to public health facilities.",
    longDescription:
      "Facilitating vital medicines, surgical consumables, and prescribed treatments for low-income patients admitted to public health facilities. Providing immediate non-medical resources and logistical guidance to families managing prolonged treatments at Sassoon Hospital and partner centres.",
    features: [
      "Emergency Medicine Support",
      "Caregiver Assistance & Logistics",
      "Public Health Facility Support",
    ],
    status: "verified",
    ctaText: "Support Medicine Aid",
    ctaHref: "/donate",
  },
  {
    slug: "crisis-relief",
    title: "COVID-19 & Crisis Relief",
    category: "crisis-relief",
    image: "/images/real/crisis-blankets.jpg",
    shortDescription:
      "Comprehensive dry-ration kits and direct outreach to stranded rickshaw drivers, factory workers, and migrant families navigating severe economic disruption.",
    longDescription:
      "During lockdowns and crises when daily wage earners lost all running income, Me The Change distributed comprehensive dry-ration kits containing rice, dal, cooking oil, and essential spices free of cost. Direct outreach to stranded rickshaw drivers, factory workers, and migrant families navigating severe economic disruption.",
    features: [
      "Ration & Essential Grocery Kits",
      "Support for Migrant & Informal Workers",
      "Rapid Crisis Response",
    ],
    status: "verified",
    ctaText: "Support Crisis Relief",
    ctaHref: "/donate",
  },
];

export function getInitiativeBySlug(slug: string): Initiative | undefined {
  return initiatives.find((item) => item.slug === slug);
}
