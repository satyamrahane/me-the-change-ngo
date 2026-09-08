import React from "react";
import { TransparencyDocument } from "@/types";
import { Clock, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DocumentTableProps {
  documents: TransparencyDocument[];
  emptyMessage?: string;
}

export function DocumentTable({
  documents,
  emptyMessage = "No documents currently published in this section.",
}: DocumentTableProps) {
  if (documents.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-background p-8 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-xs">
      <table className="w-full text-left text-sm" role="table">
        <thead className="bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">
          <tr>
            <th scope="col" className="px-5 py-3.5">
              Document Name
            </th>
            <th scope="col" className="px-5 py-3.5 hidden sm:table-cell">
              Category
            </th>
            <th scope="col" className="px-5 py-3.5">
              Status
            </th>
            <th scope="col" className="px-5 py-3.5 text-right">
              Access
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {documents.map((doc) => {
            const isAvailable = doc.status === "verified" && Boolean(doc.filePath);

            return (
              <tr key={doc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                <td className="px-5 py-4">
                  <div className="font-medium text-foreground">{doc.title}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5 sm:hidden">
                    {doc.description}
                  </div>
                </td>
                <td className="px-5 py-4 hidden sm:table-cell">
                  <span className="capitalize text-slate-600 text-xs">{doc.category.replace("-", " ")}</span>
                </td>
                <td className="px-5 py-4">
                  {isAvailable ? (
                    <Badge variant="default" className="text-xs">
                      Published
                    </Badge>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-0.5 rounded-md border border-amber-200/60 dark:border-amber-900/40">
                      <Clock className="h-3 w-3 shrink-0" aria-hidden="true" />
                      <span>Pending Upload</span>
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 text-right">
                  {isAvailable ? (
                    <a
                      href={doc.filePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                    >
                      <span>View</span>
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
