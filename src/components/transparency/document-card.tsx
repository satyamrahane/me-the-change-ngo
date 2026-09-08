import React from "react";
import { FileText, ExternalLink, Clock, ShieldCheck, FileCheck } from "lucide-react";
import { TransparencyDocument } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DocumentCardProps {
  document: TransparencyDocument;
}

const CATEGORY_LABELS: Record<TransparencyDocument["category"], string> = {
  registration: "Trust Registration",
  "tax-exemption": "Tax Exemption",
  csr: "Corporate Compliance",
  darpan: "Government Accreditation",
  "audit-report": "Financial Audit",
  license: "Statutory License",
};

export function DocumentCard({ document }: DocumentCardProps) {
  const isAvailable = document.status === "verified" && Boolean(document.filePath);
  const categoryLabel = CATEGORY_LABELS[document.category] || document.category;

  return (
    <Card className="flex flex-col justify-between border-border bg-card p-6 transition-all hover:shadow-sm">
      <CardContent className="space-y-4 p-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary shrink-0">
            {document.category === "audit-report" ? (
              <FileCheck className="h-5 w-5" aria-hidden="true" />
            ) : document.category === "registration" ? (
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            ) : (
              <FileText className="h-5 w-5" aria-hidden="true" />
            )}
          </div>

          <Badge variant="neutral" className="text-xs font-normal">
            {categoryLabel}
          </Badge>
        </div>

        <div className="space-y-2">
          <h3 className="font-heading text-lg font-semibold text-foreground leading-snug">
            {document.title}
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed">
            {document.description}
          </p>
        </div>

        {document.year && (
          <p className="text-xs text-muted-foreground">
            Financial Cycle / Year: <span className="font-medium text-foreground">{document.year}</span>
          </p>
        )}
      </CardContent>

      <div className="pt-6 border-t border-border/60 mt-4 flex items-center justify-between">
        {isAvailable ? (
          <a
            href={document.filePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
          >
            <span>View Document</span>
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 rounded-md border border-amber-200/60 dark:border-amber-900/40">
            <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>Available when published</span>
          </div>
        )}

        {document.fileType && (
          <span className="text-xs font-medium uppercase text-muted-foreground tracking-wider">
            {document.fileType} {document.fileSize ? `• ${document.fileSize}` : ""}
          </span>
        )}
      </div>
    </Card>
  );
}
