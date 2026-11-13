import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CalendarRange, Check, Layers, PencilRuler, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import Navigation from "@/components/ui/navigation";
import { appDistribution } from "@/lib/appDistribution";
import { readCurrentConsent, subscribeToConsent } from "@/lib/consent";

const appOrigin = import.meta.env.VITE_PBA_APP_ORIGIN || "https://app.bballorbit.com";
const startsAt = Date.parse(import.meta.env.VITE_PBA_PILOT_START ?? "");
const endsAt = Date.parse(import.meta.env.VITE_PBA_PILOT_END ?? "");
const preview = import.meta.env.DEV && import.meta.env.VITE_PBA_PREVIEW === "true";

const coachingTools = [
  {
    icon: Layers,
    title: "Find game-like drills",
    description: "Pick small-sided games that give your players more chances to read the floor, make decisions and play together.",
  },
  {
    icon: PencilRuler,
    title: "Draw your drills and plays",
    description: "Show your players where to move and how the action develops by drawing each phase in the Drill Creator.",
  },
  {
    icon: CalendarRange,
    title: "Build a complete practice",
    description: "Put drills, timings and coaching cues into one plan. Save what works and adapt it for your next session.",
  },
];

export default function PbaPilot() {
  const { hash } = useLocation();
  const [active, setActive] = useState(false);
  const [allowsReferral, setAllowsReferral] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      setActive(now >= startsAt && now < endsAt && endsAt - startsAt === 60 * 86_400_000);
      setAllowsReferral(readCurrentConsent().advertisement);
    };
    update();
    const timer = window.setInterval(update, 15_000);
    const unsubscribe = subscribeToConsent(update);
    return () => {
      window.clearInterval(timer);
      unsubscribe();
    };
  }, []);

  const referral = new URLSearchParams(hash.slice(1)).get("ref");
  const referralHash = active && allowsReferral && referral && /^[\w-]{43}$/.test(referral)
    ? `#ref=${referral}`
    : "";
  const freeUrl = `${appOrigin}${referralHash ? `/pba${referralHash}` : "/signup"}`;
  const proUrl = active ? `${appOrigin}/pba?offer=annual${referralHash}` : `${appOrigin}/pricing`;
  const practicePlannerUrl = referralHash ? freeUrl : undefined;
  const showOffer = active || preview;

  return (
    <div className="min-h-screen bg-background">
      <Navigation signupUrl={freeUrl} practicePlannerUrl={practicePlannerUrl} />
      <main className="pt-16">
        <section aria-labelledby="pba-heading" className="relative isolate overflow-hidden border-b border-border bg-[#11100f]">
          <picture className="pointer-events-none absolute inset-0 -z-20">
            <source media="(max-width: 767px)" srcSet="/optimized-home/arena-960.webp" />
            <img src="/optimized-home/arena-1920.webp" alt="" width={1920} height={960} className="h-full w-full object-cover object-center opacity-50" decoding="async" />
          </picture>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(105deg,#100f0fee_4%,#100f0fce_42%,#100f0f57_100%),linear-gradient(0deg,#121212_0%,transparent_55%)]" />
          <div className="container mx-auto grid items-center gap-8 px-4 py-12 sm:py-16 lg:grid-cols-[1fr_1.12fr] lg:gap-10 lg:px-8 lg:py-20">
            <div className="min-w-0">
              <p className="max-w-md text-sm font-semibold leading-relaxed text-orange-300">
                For basketball coaches and programs in the Philippines
              </p>
              <h1 id="pba-heading" className="mt-4 text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.1] tracking-tight text-white">
                Plan your practice.<br />
                <span className="text-gradient-orange">Coach the game.</span>
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-200 md:text-lg">
                Build your next session with the Basketball Orbit Practice Planner. Find game-like drills, draw your own plays and take a clear plan to the court.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg" className="min-h-12 max-w-full whitespace-normal px-5 font-bold shadow-orange">
                  <a href={freeUrl} referrerPolicy="no-referrer">Start free <ArrowRight className="ml-2 size-4 shrink-0" aria-hidden="true" /></a>
                </Button>
                <Button asChild size="lg" variant="outline" className="min-h-12 max-w-full whitespace-normal border-white/30 bg-black/30 px-5 font-semibold text-white hover:bg-white/10 hover:text-white">
                  <a href={proUrl} referrerPolicy="no-referrer">{showOffer ? "Get 20% off your first year" : "Explore Orbit Pro"}</a>
                </Button>
              </div>
              {showOffer && (
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-300">
                  First annual payment only for new Orbit Pro subscribers. PBA Properties may earn a commission on qualifying subscriptions.
                </p>
              )}
            </div>
            <img
              src="/lovable-uploads/mockup-app-trans-2.webp"
              alt="Basketball Orbit showing a play diagram on a laptop and a timed practice plan on a tablet"
              width={1448}
              height={1086}
              fetchPriority="high"
              decoding="async"
              className="mx-auto h-auto w-full max-w-[680px] drop-shadow-[0_18px_22px_rgba(0,0,0,0.5)]"
            />
          </div>
        </section>

        <section aria-labelledby="pba-workflow-heading" className="container mx-auto px-4 py-12 sm:py-16 lg:px-8 lg:py-20">
          <h2 id="pba-workflow-heading" className="max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
            From drill idea to practice plan
          </h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3 lg:gap-6">
            {coachingTools.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-5 lg:p-6">
                <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-bold leading-snug">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-border bg-card/40">
          <div className="container mx-auto grid gap-7 px-4 py-12 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12 lg:px-8">
            <section aria-labelledby="pba-mobile-heading" className="max-w-lg">
              <Smartphone className="size-6 text-primary" aria-hidden="true" />
              <h2 id="pba-mobile-heading" className="mt-4 text-2xl font-bold leading-tight md:text-3xl">Take your practice to the court</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Plan on the web and keep your drills and sessions handy on iPhone, iPad or Android. Use the same Basketball Orbit account on every device.
              </p>
              <a href={appDistribution.downloadPageUrl} className="mt-2 inline-flex min-h-11 items-center gap-1.5 rounded-sm text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                Explore the mobile apps <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </section>
            <section aria-labelledby="pba-offer-heading" className="rounded-xl border border-primary/25 bg-card p-5 sm:p-7">
              <h2 id="pba-offer-heading" className="text-xl font-bold md:text-2xl">{showOffer ? "Save 20% on your first annual payment" : "Start free. Upgrade when you’re ready."}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {showOffer
                  ? "The pilot offer is for new Orbit Pro subscribers who choose the annual plan in the web checkout. Your subscription renews at the regular annual price shown at checkout."
                  : "Build your first practice with the Free plan. Orbit Pro adds unlimited practice plans and playbooks, PDF exports and more Orbit AI credits."}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                <Button asChild size="lg" className="min-h-12 max-w-full whitespace-normal px-5 font-bold">
                  <a href={showOffer ? proUrl : freeUrl} referrerPolicy="no-referrer">
                    {showOffer ? "Continue to the annual offer" : "Create a free account"}
                    <ArrowRight className="ml-2 size-4 shrink-0" aria-hidden="true" />
                  </a>
                </Button>
                {showOffer ? (
                  <a href={freeUrl} referrerPolicy="no-referrer" className="inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Start with Free</a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Check className="size-4 text-primary" aria-hidden="true" /> Free plan available
                  </span>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer practicePlannerUrl={practicePlannerUrl} />
    </div>
  );
}
