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
    label: "Meals Distributed",
    description: "Nutritious meals provided through hospital and community food drives.",
    category: "food-relief",
    status: "pending",
  },
  {
    id: "stat-medical-aid",
    label: "Medical Aid Recipients",
    description: "Patients supported with emergency medication and prescription funding.",
    category: "medical-aid",
    status: "pending",
  },
  {
    id: "stat-crisis-response",
    label: "Emergency Interventions",
    description: "Crisis and disaster relief mobilization missions completed.",
    category: "crisis-relief",
    status: "pending",
  },
  {
    id: "stat-active-volunteers",
    label: "Community Volunteers",
    description: "Dedicated grassroots volunteers participating across Pune initiatives.",
    category: "community",
    status: "pending",
  },
];

export const qualitativeHighlights: QualitativeHighlight[] = [
  {
    id: "highlight-sassoon-hospital",
    title: "Sassoon Hospital Food Drives",
    description:
      "Consistent food distribution support serving patients, attendants, and families outside Sassoon General Hospital.",
    initiative: "food-relief",
    location: "Pune, Maharashtra",
  },
  {
    id: "highlight-emergency-medicine",
    title: "Prescription Assistance Network",
    description:
      "Direct aid providing life-critical medicines to patients unable to afford prescription costs.",
    initiative: "medical-aid",
    location: "Pune, Maharashtra",
  },
  {
    id: "highlight-covid-relief",
    title: "COVID-19 Crisis Response",
    description:
      "Historical community relief mobilization providing food kits, hygiene supplies, and emergency assistance.",
    initiative: "crisis-relief",
    location: "Pune & Surrounding Regions",
  },
];
