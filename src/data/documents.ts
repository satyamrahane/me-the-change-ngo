import { TransparencyDocument } from "@/types";

/**
 * Transparency & Legal Documents Registry for "Me The Change" (NGO)
 *
 * CONTENT GUIDELINES:
 * - Documents are listed with explicit metadata categories required by NGO compliance.
 * - Do NOT fabricate registration numbers, certificate dates, or fake PDF paths.
 * - Status is marked as 'pending' or 'not-provided' until verified files are officially provided by the NGO.
 */

export const transparencyDocuments: TransparencyDocument[] = [
  {
    id: "doc-trust-registration",
    title: "Trust / Society Registration Certificate",
    category: "registration",
    description:
      "Official certificate of incorporation / public charitable trust registration under the relevant Societies/Trusts Act.",
    status: "pending",
  },
  {
    id: "doc-12a-80g-exemption",
    title: "12A & 80G Tax Exemption Certificates",
    category: "tax-exemption",
    description:
      "Income Tax exemption certification enabling tax benefits for eligible donors under Section 80G of the Income Tax Act.",
    status: "pending",
  },
  {
    id: "doc-csr-1",
    title: "MCA CSR-1 Registration",
    category: "csr",
    description:
      "Ministry of Corporate Affairs (MCA) CSR-1 filing enabling participation in corporate social responsibility initiatives.",
    status: "pending",
  },
  {
    id: "doc-darpan-id",
    title: "NITI Aayog NGO Darpan Registration",
    category: "darpan",
    description:
      "Accreditation and registration record on the Government of India NITI Aayog NGO Darpan platform.",
    status: "pending",
  },
  {
    id: "doc-annual-audit-latest",
    title: "Annual Audited Financial Statements",
    category: "audit-report",
    description:
      "Independent chartered accountant audit reports, balance sheets, and fund utilization statements.",
    status: "pending",
  },
  {
    id: "doc-statutory-licenses",
    title: "Statutory Approvals & Compliance Licenses",
    category: "license",
    description:
      "Applicable municipal, state, and statutory operational licenses required for charitable relief activities.",
    status: "pending",
  },
];

export function getDocumentsByCategory(
  category: TransparencyDocument["category"]
): TransparencyDocument[] {
  return transparencyDocuments.filter((doc) => doc.category === category);
}
