import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "404 – Page Not Found | " + siteConfig.name,
  description: "The page you are looking for does not exist. Return to the homepage or explore other sections of Me The Change.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8 text-center">
      <h1 className="mb-4 text-4xl font-bold text-foreground">404 – Not Found</h1>
      <p className="mb-6 text-lg text-muted-foreground">
        Oops! The page you were looking for doesn’t exist.
      </p>
      <Link
        href="/"
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Return Home
      </Link>
    </div>
  );
}
