import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink, RefreshCw, Target, Users } from "lucide-react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchPublicDrill, type PublicDrill } from "@/data/publicDrills";

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
  const href = `${APP_URL}/practice/new?addLibraryItem=${encodeURIComponent(drill.id)}`;
  return (
    <div className={mobile ? "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden" : "rounded-xl border border-primary/30 bg-primary/5 p-5"}>
      <Button asChild size="lg" className="w-full">
        <a href={href}>Start a Practice with this Drill <ExternalLink className="ml-2 h-4 w-4" /></a>
      </Button>
      {!mobile && <p className="mt-2 text-center text-xs text-muted-foreground">Opens the Basketball Orbit Practice Planner with this drill already added.</p>}
    </div>
  );
};

const DrillTemplate = () => {
  const { slug = "" } = useParams();
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);
  const { data: drill, isLoading, isError, refetch } = useQuery({
    queryKey: ["public-drill", slug], queryFn: () => fetchPublicDrill(slug), retry: 1, staleTime: 5 * 60 * 1000,
  });

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
        <Link to="/drills" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"><ArrowLeft className="mr-2 h-4 w-4" />Back to Drill Library</Link>
        <div className="text-center mb-10">
          <div className="mb-4 flex flex-wrap justify-center gap-2">{drill.categories.map((category) => <Badge key={category.slug} className="bg-primary/15 text-primary border-primary/30">{category.label}</Badge>)}</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">{drill.title}</h1>
          {drill.excerpt && <p className="mt-5 text-lg text-muted-foreground max-w-3xl mx-auto whitespace-pre-line">{drill.excerpt}</p>}
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,.75fr)] lg:items-start mb-12">
          <div className="space-y-8">
            {drill.thumbnailUrl && <div className="overflow-hidden rounded-xl border border-border bg-black shadow-xl"><img src={drill.thumbnailUrl} alt={`${drill.title} basketball drill diagram`} className="w-full object-contain" /></div>}
            {drill.description && <section><h2 className="text-3xl font-bold mb-5">Drill Overview</h2><div className="whitespace-pre-line text-base leading-7 text-muted-foreground">{drill.description}</div></section>}
          </div>
          <aside className="space-y-5 lg:sticky lg:top-24">
            <Card className="border-border bg-card"><CardContent className="pt-6 space-y-4">
              {drill.practiceSectionType && <div className="flex items-start gap-3"><Target className="mt-0.5 h-5 w-5 text-primary" /><div><div className="text-sm font-semibold">Practice segment</div><div className="capitalize text-sm text-muted-foreground">{drill.practiceSectionType}</div></div></div>}
              {drill.playerCountMin && <div className="flex items-start gap-3"><Users className="mt-0.5 h-5 w-5 text-primary" /><div><div className="text-sm font-semibold">Players</div><div className="text-sm text-muted-foreground">From {drill.playerCountMin} players</div></div></div>}
              {(drill.ageGroup || drill.difficulty) && <div className="flex flex-wrap gap-2">{drill.ageGroup && <Badge variant="secondary">{drill.ageGroup}</Badge>}{drill.difficulty && <Badge variant="secondary" className="capitalize">{drill.difficulty}</Badge>}</div>}
              <div className="flex flex-wrap gap-2">{drill.tags.map((tag) => <Badge key={tag} variant="outline">{tag}</Badge>)}</div>
            </CardContent></Card>
            <PracticeCta drill={drill} />
          </aside>
        </div>

        {drill.phases.length > 0 && <section className="mb-12"><h2 className="text-3xl font-bold mb-6">Drill Phases</h2><div className="space-y-4">{drill.phases.map((phase, index) => <Card key={`${phase.title}-${index}`} className="border-border bg-card"><CardContent className="pt-6"><div className="flex gap-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{index + 1}</span><div><h3 className="text-lg font-semibold">{phase.title}</h3>{phase.notes && <p className="mt-2 whitespace-pre-line leading-7 text-muted-foreground">{phase.notes}</p>}</div></div></CardContent></Card>)}</div></section>}

        <div className="grid gap-6 md:grid-cols-2">
          <CoachingList title="Rules" items={drill.coaching.rules} /><CoachingList title="Coaching Cues" items={drill.coaching.coachingCues} />
          <CoachingList title="Constraints" items={drill.coaching.constraints} /><CoachingList title="Progressions" items={drill.coaching.progressions} />
          <CoachingList title="Regressions" items={drill.coaching.regressions} /><CoachingList title="Variations" items={drill.coaching.variations} />
        </div>
        <PracticeCta drill={drill} mobile />
      </DetailShell>
    </>
  );
};

export default DrillTemplate;
