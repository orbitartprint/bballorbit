import { Smartphone } from "lucide-react";
import { AppStoreBadges } from "@/components/apps/AppStoreBadges";
import { appDistribution, trackAppLink } from "@/lib/appDistribution";

export default function AppAvailability() {
  return (
    <section aria-labelledby="app-availability-heading" className="border-b border-border bg-card/40">
      <div className="container mx-auto flex flex-col items-center gap-5 px-4 py-8 text-center lg:flex-row lg:justify-between lg:px-8 lg:text-left">
        <div>
          <h2 id="app-availability-heading" className="inline-flex items-center gap-2 text-lg font-semibold">
            <Smartphone className="h-5 w-5 text-primary" aria-hidden="true" />
            Take the Practice Planner to the court.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">Use the same account on your computer, phone and tablet.</p>
          <a href={appDistribution.downloadPageUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackAppLink("details", "home_product")} className="mt-1 inline-flex min-h-11 items-center rounded text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            Explore the mobile apps
          </a>
        </div>
        <AppStoreBadges placement="home_product" className="justify-center lg:shrink-0" />
      </div>
    </section>
  );
}
