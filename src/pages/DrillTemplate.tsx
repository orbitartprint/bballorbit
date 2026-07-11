import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Copy, ExternalLink, Play, RefreshCw, Target, Users } from "lucide-react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchPublicDrill, type PublicDrill } from "@/data/publicDrills";
import { RichTextRenderer } from "@/components/RichTextRenderer";
import { AnimationViewerDialog } from "@/features/creator/AnimationViewerDialog";
import { buildAnimationTimeline } from "@/features/creator/animation";
import { CourtSvg } from "@/features/creator/court/CourtSvg";
import { cn } from "@/lib/utils";

const APP_URL = "https://app.bballorbit.com";

const DetailShell = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background"><Navigation /><main className="pt-24 pb-24 md:pb-16"><div className="container mx-auto px-4 lg:px-8 max-w-6xl">{children}</div></main><Footer /></div>
);

const CoachingList = ({ title, items }: { title: string; items: string[] }) => items.length > 0 ? (
  <Card className="border-border bg-card">
    <CardHeader><CardTitle className="text-xl">{title}</CardTitle></CardHeader>
    <CardContent><ul className="space-y-3">{items.map((item, index) => <li key={`${title}-${index}`} className="flex gap-3 text-muted-foreground"><span className="font-semibold text-primary">{index + 1}.</span><span className="whitespace-pre-line">{item}</span></li>)}</ul></CardContent>
  </Card>
) : null;

const PracticeCta = ({ drill, mobile = false }: { drill: PublicDrill; mobile?: boolean }) => {
  const practiceHref = `${APP_URL}/practice/new?addLibraryItem=${encodeURIComponent(drill.id)}`;
  return (
    <div className={mobile ? "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden" : "rounded-xl border border-primary/30 bg-primary/5 p-5"}>
      <Button asChild size="lg" className="w-full">
        <a href={practiceHref} target="_blank" rel="noopener noreferrer">
          Start a Practice with this Drill <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </Button>
      {!mobile && <p className="mt-2 text-center text-xs text-muted-foreground">Opens the Basketball Orbit Practice Planner in a new tab with this drill already added.</p>}
    </div>
  );
};

const CopyAndEditCta = ({ drill }: { drill: PublicDrill }) => {
  const href = `${APP_URL}/drills/${encodeURIComponent(drill.slug)}?copyAndEdit=1`;
  return (
    <Button asChild variant="outline" size="lg" className="w-full border-primary bg-black text-foreground hover:bg-primary/10 hover:text-foreground">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <Copy className="mr-2 h-4 w-4" />Copy & Edit this Drill <ExternalLink className="ml-2 h-4 w-4" />
      </a>
    </Button>
  );
};

const DrillTemplate = () => {
  const { slug = "" } = useParams();
  const [animationOpen, setAnimationOpen] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);
  const { data: drill, isLoading, isError, refetch } = useQuery({
    queryKey: ["public-drill", slug], queryFn: () => fetchPublicDrill(slug), retry: 1, staleTime: 5 * 60 * 1000,
  });
  const canAnimate = useMemo(() => {
    if (!drill?.diagram) return false;
    return buildAnimationTimeline(drill.diagram, drill.diagram.activePhaseId, "all").totalMs > 0;
  }, [drill?.diagram]);

  if (isLoading) return <DetailShell><Skeleton className="h-10 w-44 mb-8" /><Skeleton className="h-16 max-w-3xl mx-auto mb-10" /><div className="grid gap-8 md:grid-cols-2"><Skeleton className="aspect-video rounded-xl" /><Skeleton className="h-72 rounded-xl" /></div></DetailShell>;
  if (isError) return <DetailShell><div className="mx-auto max-w-lg rounded-xl border border-border bg-card p-8 text-center"><h1 className="text-2xl font-bold">This drill could not be loaded.</h1><p className="mt-2 text-muted-foreground">Please try again in a moment.</p><Button className="mt-5 gap-2" onClick={() => void refetch()}><RefreshCw className="h-4 w-4" />Try again</Button></div></DetailShell>;
  if (!drill) return (
    <><Helmet><title>Drill not found - Basketball Orbit</title><meta name="robots" content="noindex" /></Helmet><DetailShell><div className="mx-auto max-w-lg py-20 text-center"><h1 className="text-3xl font-bold">Drill not found</h1><p className="mt-3 text-muted-foreground">This drill may have been unpublished or the link is no longer valid.</p><Button asChild variant="outline" className="mt-6"><Link to="/drills"><ArrowLeft className="mr-2 h-4 w-4" />Back to Drill Library</Link></Button></div></DetailShell></>
  );

  const canonicalUrl = `https://bballorbit.com/drills/${drill.slug}`;
  const structuredSteps = drill.phases.length > 0 ? drill.phases : [{ title: "Overview", notes: drill.description }];
  return (
    <>
      <Helmet>
        <title>{drill.title} - Basketball Orbit</title>
        <meta name="description" content={(drill.excerpt || drill.description).slice(0, 170)} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`${drill.title} - Basketball Orbit`} />
        <meta property="og:description" content={(drill.excerpt || drill.description).slice(0, 200)} />
        <meta property="og:url" content={canonicalUrl} />
        {drill.thumbnailUrl && <meta property="og:image" content={drill.thumbnailUrl} />}
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "HowTo", name: drill.title, description: drill.excerpt, image: drill.thumbnailUrl ?? undefined, step: structuredSteps.map((phase) => ({ "@type": "HowToStep", name: phase.title, text: phase.notes })) })}</script>
      </Helmet>
      <DetailShell>
        <div className="mb-8 flex items-center">
          <Link to="/drills" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="mr-2 h-4 w-4" />Back to Drill Library</Link>
        </div>
        <div className="text-center mb-10">
          <div className="mb-4 flex flex-wrap justify-center gap-2">{drill.categories.map((category) => <Badge key={category.slug} variant="secondary">{category.label}</Badge>)}</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">{drill.title}</h1>
          {(drill.description || drill.descriptionDocument) && (
            <RichTextRenderer document={drill.descriptionDocument} fallbackText={drill.description} className="mx-auto mt-5 max-w-3xl text-left text-base leading-7 text-muted-foreground md:text-lg" />
          )}
          {canAnimate && <Button type="button" className="mt-6" onClick={() => setAnimationOpen(true)}><Play className="h-4 w-4" />Play Animation</Button>}
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,.75fr)] lg:items-start mb-12">
          <section>
            <h2 className="mb-6 text-3xl font-bold">Drill Phases</h2>
            {drill.diagram ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {drill.diagram.phases.map((phase, index) => (
                  <article key={phase.id} className="space-y-3">
                    <h3 className="text-sm font-semibold text-muted-foreground">{phase.title || `Phase ${index + 1}`}</h3>
                    <div className="flex h-[320px] items-center justify-center overflow-hidden rounded-xl border border-border bg-background md:h-[360px]">
                      <CourtSvg
                        template={drill.diagram!.court.template}
                        size={drill.diagram!.court.size}
                        theme={drill.diagram!.court.theme}
                        showGrid={false}
                        margin={drill.diagram!.court.margin}
                        elementScale={drill.diagram!.court.elementScale}
                        fillViewportBackground
                        interactive={false}
                        phase={phase}
                        selection={null}
                        draftActionStart={null}
                        className={cn("public-court-diagram bg-transparent shadow-none", drill.diagram!.court.size === "full-horizontal" ? "h-auto max-h-full w-full" : "h-full w-auto max-w-full")}
                        onCourtPointerDown={() => undefined}
                        onEntityPointerDown={() => undefined}
                        onPointerMove={() => undefined}
                        onPointerUp={() => undefined}
                      />
                    </div>
                    {(phase.notes || phase.notesDocument) && <RichTextRenderer document={phase.notesDocument} fallbackText={phase.notes} className="rounded-xl border border-border bg-muted/20 p-4 text-sm leading-relaxed text-muted-foreground" />}
                  </article>
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-border bg-muted/20 p-5 text-muted-foreground">Phase diagrams will be available after this drill is republished.</p>
            )}
          </section>
          <aside className="space-y-5">
            <div className="space-y-5 lg:sticky lg:top-24">
              <Card className="border-border bg-card"><CardHeader className="pb-3"><CardTitle className="text-xl">Drill details</CardTitle></CardHeader><CardContent className="space-y-4">
                {drill.practiceSectionType && <div className="flex items-start gap-3"><Target className="mt-0.5 h-5 w-5 text-primary" /><div><div className="text-sm font-semibold">Practice segment</div><div className="capitalize text-sm text-muted-foreground">{drill.practiceSectionType}</div></div></div>}
                {drill.playerCountMin && <div className="flex items-start gap-3"><Users className="mt-0.5 h-5 w-5 text-primary" /><div><div className="text-sm font-semibold">Players</div><div className="text-sm text-muted-foreground">From {drill.playerCountMin} players</div></div></div>}
                {(drill.ageGroup || drill.difficulty) && <div className="flex flex-wrap gap-2">{drill.ageGroup && <Badge variant="outline">{drill.ageGroup}</Badge>}{drill.difficulty && <Badge variant="outline" className="capitalize">{drill.difficulty}</Badge>}</div>}
                {drill.tags.length > 0 && <div className="border-t border-border pt-4"><div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Focus areas</div><div className="flex flex-wrap gap-2">{drill.tags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}</div></div>}
              </CardContent></Card>
              <PracticeCta drill={drill} />
            </div>
            <CopyAndEditCta drill={drill} />
          </aside>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <CoachingList title="Rules" items={drill.coaching.rules} /><CoachingList title="Coaching Cues" items={drill.coaching.coachingCues} />
          <CoachingList title="Constraints" items={drill.coaching.constraints} /><CoachingList title="Progressions" items={drill.coaching.progressions} />
          <CoachingList title="Regressions" items={drill.coaching.regressions} /><CoachingList title="Variations" items={drill.coaching.variations} />
        </div>
        <PracticeCta drill={drill} mobile />
        {drill.diagram && <AnimationViewerDialog diagram={drill.diagram} itemKind="drill" open={animationOpen} onOpenChange={setAnimationOpen} />}
      </DetailShell>
    </>
  );
};

export default DrillTemplate;
