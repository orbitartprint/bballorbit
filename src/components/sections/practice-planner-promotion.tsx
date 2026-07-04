import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  CalendarRange,
  Check,
  PencilRuler,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const APP_URL = "https://app.bballorbit.com/";

const benefits = [
  {
    icon: PencilRuler,
    title: "Create clear drills and plays",
    description: "Turn your ideas into court diagrams players can understand.",
  },
  {
    icon: CalendarRange,
    title: "Build complete practices",
    description: "Organize drills, timings, goals, and coaching notes in one place.",
  },
  {
    icon: Bot,
    title: "Sharpen the details with Orbit AI",
    description: "Review your plan, add coaching cues, and adapt it to your team.",
  },
];

const PracticePlannerPromotion = () => {
  return (
    <section
      className="relative isolate overflow-hidden border-y border-white/5 bg-[#080808] pb-20 pt-14 md:pb-28 md:pt-20"
      aria-labelledby="practice-planner-heading"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[#f57520]/[0.07] blur-[140px]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 xl:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="max-w-xl"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f57520]/30 bg-[#f57520]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#f57520]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f57520]" aria-hidden="true" />
              Basketball Orbit Practice Planner
            </div>

            <h2
              id="practice-planner-heading"
              className="text-3xl font-bold leading-tight text-white md:text-4xl xl:text-5xl"
            >
              From drill idea to practice plan —
              <span className="text-gradient-orange"> all in one place.</span>
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-gray-300">
              Create visual drills and plays, organize complete sessions, and refine every detail before you step on the court.
            </p>

            <div className="mt-8 space-y-5">
              {benefits.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex gap-4">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#f57520]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-400">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                asChild
                className="group h-14 bg-[#f57520] px-7 text-base font-bold text-white shadow-orange transition-all duration-300 hover:bg-[#ff8431] hover:shadow-[0_14px_38px_-12px_rgba(245,117,32,0.65)]"
              >
                <a
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Build your next practice in the Basketball Orbit app (opens in a new tab)"
                >
                  Build your next practice
                  <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </Button>
              <span className="inline-flex items-center gap-1.5 text-sm text-gray-400">
                <Check className="h-4 w-4 text-[#f57520]" aria-hidden="true" />
                Free plan available
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="relative mx-auto w-full max-w-3xl pb-5 lg:pb-20"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] p-1.5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] sm:p-2.5">
              <div className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[#f57520]/80 to-transparent" aria-hidden="true" />
              <img
                src="/lovable-uploads/drill-creator.webp"
                alt="Basketball Orbit drill creator showing a two-phase basketball play on a digital court"
                loading="lazy"
                decoding="async"
                className="aspect-video w-full rounded-xl object-cover"
              />
            </div>

            <div className="relative mx-auto -mt-4 w-[88%] overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] p-1.5 shadow-[0_24px_65px_-24px_rgba(0,0,0,0.95)] sm:-mt-10 sm:w-[72%] sm:p-2 lg:absolute lg:-bottom-1 lg:-right-5 lg:mt-0 lg:w-[44%] xl:-right-8">
              <div className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[#2d32f1]/90 to-transparent" aria-hidden="true" />
              <img
                src="/lovable-uploads/practice-builder.webp"
                alt="Basketball Orbit practice builder with a complete 75-minute youth basketball session"
                loading="lazy"
                decoding="async"
                className="aspect-square w-full rounded-xl object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PracticePlannerPromotion;
