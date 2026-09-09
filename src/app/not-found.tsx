import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "404 – Page Not Found | " + siteConfig.name,
  description: "The page you are looking for does not exist. Return to the homepage or explore other sections of Me The Change.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-background px-4 py-16 text-center max-w-lg mx-auto">
      <h1 className="mb-4 text-4xl font-bold text-foreground font-heading">404 – Not Found</h1>
      <p className="mb-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-hover shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        Return Home
      </Link>
    </div>
  );
}
