import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronDown, RefreshCw, Target, X } from "lucide-react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RichTextRenderer } from "@/components/RichTextRenderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchPublicDrills, getPublicDrillCategories, getPublicDrillTags } from "@/data/publicDrills";
import { CourtSvg } from "@/features/creator/court/CourtSvg";
import { cn } from "@/lib/utils";

const DrillLibrary = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { data: drills = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["public-drills"], queryFn: fetchPublicDrills, retry: 1, staleTime: 5 * 60 * 1000,
  });

  const categories = useMemo(() => getPublicDrillCategories(drills), [drills]);
  const allTags = useMemo(() => getPublicDrillTags(drills), [drills]);
  const filteredDrills = useMemo(() => drills.filter((drill) => {
    const matchesCategory = categoryFilter === "all" || drill.categories.some((category) => category.slug === categoryFilter);
    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => drill.tags.includes(tag));
    return matchesCategory && matchesTags;
  }), [categoryFilter, drills, selectedTags]);

  const toggleTag = (tag: string) => setSelectedTags((current) => current.includes(tag) ? current.filter((value) => value !== tag) : [...current, tag]);
  const clearFilters = () => { setCategoryFilter("all"); setSelectedTags([]); };
  const hasFilters = categoryFilter !== "all" || selectedTags.length > 0;

  return (
    <>
      <Helmet>
        <title>Basketball Drill Library - Basketball Orbit</title>
        <meta name="description" content="Explore modern, game-like basketball drills and start a complete practice plan in seconds." />
        <link rel="canonical" href="https://bballorbit.com/drills" />
        <meta property="og:url" content="https://bballorbit.com/drills" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-12 pb-16">
          <div className="container mx-auto px-4 lg:px-8 text-center py-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Basketball Drill Library</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore modern, game-like drills. Review the details here, then start a practice with the drill already added.
            </p>
          </div>

          <div className="container mx-auto px-4 lg:px-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end max-w-4xl mx-auto">
              <div>
                <Label htmlFor="category" className="text-sm text-muted-foreground mb-2 block">Category</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger id="category" className="bg-card border-border"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-card border-border z-50">
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => <SelectItem key={category.slug} value={category.slug}>{category.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">Tags</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" className="w-full justify-between bg-card border-border hover:bg-card/70">
                      {selectedTags.length === 0 ? "All Tags" : `${selectedTags.length} tag(s) selected`}
                      <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[240px] p-1 bg-card border-border" align="start">
                    <div className="max-h-[300px] overflow-y-auto">
                      {allTags.map((tag) => (
                        <button key={tag} type="button" onClick={() => toggleTag(tag)} className="flex w-full items-center rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent focus-visible:bg-accent focus-visible:outline-none">
                          <Check className={`mr-2 h-4 w-4 text-primary ${selectedTags.includes(tag) ? "opacity-100" : "opacity-0"}`} />{tag}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div>{hasFilters ? <Button variant="outline" onClick={clearFilters} className="w-full gap-2"><X className="h-4 w-4" />Clear Filters</Button> : <div className="h-10" />}</div>
            </div>
          </div>

          <div className="container mx-auto px-4 lg:px-8">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" aria-label="Loading drills">
                {Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="h-[430px] rounded-xl" />)}
              </div>
            ) : isError ? (
              <div className="mx-auto max-w-lg rounded-xl border border-border bg-card p-8 text-center">
                <h2 className="text-xl font-semibold">The Drill Library could not be loaded.</h2>
                <p className="mt-2 text-muted-foreground">Please try again. Your practice plans are not affected.</p>
                <Button className="mt-5 gap-2" onClick={() => void refetch()}><RefreshCw className="h-4 w-4" />Try again</Button>
              </div>
            ) : filteredDrills.length === 0 ? (
              <div className="text-center py-16"><p className="text-lg text-muted-foreground">No drills match these filters.</p><Button variant="link" onClick={clearFilters}>Clear filters</Button></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDrills.map((drill) => (
                  <Card key={drill.id} className="group overflow-hidden border-border bg-card hover:shadow-xl hover:shadow-primary/20 transition-all duration-300">
                    <Link to={`/drills/${drill.slug}`} className="block">
                      <div className="aspect-video w-full overflow-hidden bg-muted flex items-center justify-center">
                        {drill.diagram ? (
                          <CourtSvg
                            template={drill.diagram.court.template}
                            size={drill.diagram.court.size}
                            theme={drill.diagram.court.theme}
                            showGrid={false}
                            margin={drill.diagram.court.margin}
                            elementScale={drill.diagram.court.elementScale}
                            fillViewportBackground
                            interactive={false}
                            phase={drill.diagram.phases[0]}
                            selection={null}
                            draftActionStart={null}
                            className={cn("public-court-diagram pointer-events-none h-full max-h-full max-w-full bg-transparent shadow-none transition-transform duration-300 group-hover:scale-[1.02]", drill.diagram.court.size === "full-horizontal" ? "h-auto w-full" : "w-auto")}
                            onCourtPointerDown={() => undefined}
                            onEntityPointerDown={() => undefined}
                            onPointerMove={() => undefined}
                            onPointerUp={() => undefined}
                          />
                        ) : <Target className="h-12 w-12 text-primary/50" aria-label="Diagram pending republish" />}
                      </div>
                    </Link>
                    <CardHeader>
                      <CardTitle className="text-xl text-foreground">{drill.title}</CardTitle>
                      {drill.categories.length > 0 && (
                        <div className="flex items-start gap-1.5 text-sm text-muted-foreground">
                          <Target className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{drill.categories.map((category) => category.label).join(", ")}</span>
                        </div>
                      )}
                      <RichTextRenderer
                        document={drill.descriptionDocument}
                        fallbackText={drill.description}
                        className="rich-text-preview mt-2 text-sm text-muted-foreground"
                      />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">{drill.tags.slice(0, 4).map((tag) => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}</div>
                      <Button asChild className="w-full"><Link to={`/drills/${drill.slug}`}>View Drill</Link></Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default DrillLibrary;
