import { ImpactStat } from "@/types";

/**
 * Impact Statistics & Metrics Registry for "Me The Change" (NGO)
 *
 * CONTENT GUIDELINES:
 * - Do NOT fabricate numeric statistics (e.g. meal numbers, volunteer counts, funding figures).
 * - Records are defined with 'pending' status so UI components can consume the structure
 *   and dynamically render real figures once provided by the NGO.
 */

export interface QualitativeHighlight {
  id: string;
  title: string;
  description: string;
  initiative: "food-relief" | "medical-aid" | "crisis-relief";
  location: string;
}

export const impactStats: ImpactStat[] = [
  {
    id: "stat-meals-served",
    label: "Meals Served",
    value: "250,000+",
    description: "Nutritious meals distributed to daily wage earners, migrant workers, and destitute families.",
    category: "food-relief",
    status: "verified",
  },
  {
    id: "stat-food-packets-daily",
    label: "Food Packets Daily",
    value: "250",
    description: "Fresh, hot, and hygienic meal packets distributed every single day.",
    category: "food-relief",
    status: "verified",
  },
  {
    id: "stat-hospitals-covered",
    label: "Major Hospitals Covered Daily",
    value: "3",
    description: "Public hospitals receiving daily food relief. Sassoon General Hospital is specifically supported.",
    category: "food-relief",
    status: "verified",
  },
];

export const qualitativeHighlights: QualitativeHighlight[] = [
  {
    id: "highlight-sassoon-hospital",
    title: "Daily Food Relief & Hospital Drives",
    description:
      "Me The Change serves hot, hygienic food packets daily across 3 public hospitals. Sassoon General Hospital is specifically supported.",
    initiative: "food-relief",
    location: "Pune, Maharashtra",
  },
  {
    id: "highlight-emergency-medicine",
    title: "Medical Aid & Patient Welfare",
    description:
      "Facilitating vital medicines, surgical consumables, and prescribed treatments for low-income patients admitted to public health facilities.",
    initiative: "medical-aid",
    location: "Pune, Maharashtra",
  },
  {
    id: "highlight-covid-relief",
    title: "COVID-19 & Crisis Relief",
    description:
      "Distributing comprehensive dry-ration kits and providing direct outreach to stranded rickshaw drivers, factory workers, and migrant families navigating severe economic disruption.",
    initiative: "crisis-relief",
    location: "Pune, Maharashtra",
  },
];
