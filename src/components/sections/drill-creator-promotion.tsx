import { ArrowRight, PencilRuler } from "lucide-react";
import { Button } from "@/components/ui/button";

const DRILL_CREATOR_URL = "https://app.bballorbit.com/creator/new";

const DrillCreatorPromotion = () => (
  <section
    className="relative isolate mt-16 overflow-hidden border-y border-border bg-card py-14 md:mt-20 md:py-20"
    aria-labelledby="drill-creator-heading"
  >
    <div
      className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-1/2 bg-gradient-to-l from-primary/10 to-transparent"
      aria-hidden="true"
    />
    <div className="container mx-auto grid items-center gap-10 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
      <div className="max-w-xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-primary">
          <PencilRuler className="h-4 w-4" aria-hidden="true" />
          Drill Creator
        </div>
        <h2 id="drill-creator-heading" className="text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
          Bring your own drills <span className="text-gradient-orange">to life.</span>
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Turn your ideas into clear court diagrams with the Basketball Orbit Drill Creator. Start drawing for free — no account needed.
        </p>
        <Button asChild size="lg" className="group mt-7 h-12 w-full px-6 text-base font-semibold shadow-orange sm:w-auto">
          <a href={DRILL_CREATOR_URL}>
            Open Drill Creator
            <ArrowRight className="h-5 w-5 transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </Button>
      </div>
      <a
        href={DRILL_CREATOR_URL}
        aria-label="Open Drill Creator"
        className="group relative block overflow-hidden rounded-2xl border border-border bg-background p-1.5 shadow-2xl transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:p-2.5"
      >
        <img
          src="/lovable-uploads/drill-creator-960w.webp"
          alt="Basketball Orbit Drill Creator with a two-phase basketball drill on a digital court"
          width={960}
          height={560}
          loading="lazy"
          decoding="async"
          className="h-auto w-full rounded-xl transition-transform duration-300 motion-safe:group-hover:scale-[1.02]"
        />
      </a>
    </div>
  </section>
);

export default DrillCreatorPromotion;
