import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { readCurrentConsent, subscribeToConsent } from "@/lib/consent";

const appOrigin = import.meta.env.VITE_PBA_APP_ORIGIN || "https://app.bballorbit.com";
const startsAt = Date.parse(import.meta.env.VITE_PBA_PILOT_START ?? "");
const endsAt = Date.parse(import.meta.env.VITE_PBA_PILOT_END ?? "");
const preview = import.meta.env.DEV && import.meta.env.VITE_PBA_PREVIEW === "true";

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

  return (
    <main className="min-h-screen bg-[#101113] text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <header className="flex items-center border-b border-white/10 py-6">
          <a href="/" className="inline-flex items-center gap-3 text-sm font-semibold">
            <img src="/logo.png" alt="" width="36" height="36" className="size-9 object-contain" />
            Basketball Orbit
          </a>
        </header>
        <section className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_1.02fr] lg:items-center lg:gap-14 lg:py-24">
          <div>
            <p className="text-sm font-semibold text-orange-300">For basketball coaches and programs in the Philippines</p>
            <h1 className="mt-4 max-w-xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Plan your next basketball practice
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-zinc-300 sm:text-lg">
              Find game-like drills, organize them into a session, and save what works for next time with the Basketball Orbit Practice Planner.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="min-h-12 bg-[#f57520] px-6 font-bold text-black hover:bg-orange-300">
                <a href={freeUrl} referrerPolicy="no-referrer">Start free <ArrowRight className="ml-2 size-4" aria-hidden="true" /></a>
              </Button>
              <Button asChild size="lg" variant="outline" className="min-h-12 border-white/25 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white">
                <a href={proUrl} referrerPolicy="no-referrer">{active || preview ? "Get 20% off your first year" : "Explore Orbit Pro"}</a>
              </Button>
            </div>
            {(active || preview) && (
              <div className="mt-5 max-w-lg space-y-2 text-sm leading-6 text-zinc-400">
                <p>Available during the pilot for first-time Orbit Pro subscribers. Your annual subscription renews at the regular price shown at checkout.</p>
                <p>PBA Properties may earn a commission on qualifying subscriptions.</p>
              </div>
            )}
          </div>
          <figure className="overflow-hidden rounded-xl border border-white/15 bg-[#18191c] p-2 shadow-2xl">
            <img src="/lovable-uploads/practice-builder.webp" alt="A basketball practice in the planner with drills arranged into a timed session" className="aspect-square w-full rounded-lg object-cover" fetchPriority="high" />
          </figure>
        </section>
        <footer className="flex flex-wrap gap-x-5 gap-y-3 border-t border-white/10 py-6 text-sm text-zinc-400">
          <a className="hover:text-white" href="/privacy/">Privacy</a>
          <a className="hover:text-white" href="/terms/">Terms</a>
        </footer>
      </div>
    </main>
  );
}
