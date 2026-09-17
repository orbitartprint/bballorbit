import { ArrowRight, Smartphone } from "lucide-react";
import { appDistribution, trackAppLink } from "@/lib/appDistribution";

export function ArticleAppLink() {
  return (
    <aside aria-label="Basketball Orbit mobile app" className="mt-8 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-5">
      <Smartphone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
      <div>
        <p className="font-semibold">Take your practice plan to the court.</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Use Basketball Orbit on your phone or tablet with the same account you use on the web.</p>
        <a href={appDistribution.downloadPageUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackAppLink("details", "practice_planning_article")} className="mt-2 inline-flex min-h-11 items-center gap-2 rounded text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          Get the app <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </aside>
  );
}
