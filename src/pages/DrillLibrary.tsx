import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { drills, focusAreas, getAllTags, type FocusAreaFilter } from "@/data/drills";
import { Target, ChevronDown, Check } from "lucide-react";

const DrillLibrary = () => {
  useEffect(() => {window.scrollTo(0, 0);}, []);
  const [focusFilter, setFocusFilter] = useState<FocusAreaFilter>("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = getAllTags();

  const toggleTag = (tag: string) => {
    if (tag === "all") {
      setSelectedTags([]);
    } else {
      setSelectedTags(prev => 
        prev.includes(tag) 
          ? prev.filter(t => t !== tag)
          : [...prev, tag]
      );
    }
  };

  const filteredDrills = drills.filter((drill) => {
    const matchesFocus = focusFilter === "All" || drill.focusArea === focusFilter;
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => drill.tags.includes(tag));
    return matchesFocus && matchesTags;
  });

  return (
    <>
      <Helmet>
        <title>Basketball Drill Library - Basketball Orbit</title>
        <meta
          name="description"
          content="Explore modern, game-like basketball drills to level up your practices. Filter by skill focus, drill type, or keyword to find what you need."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="pt-12 pb-16">
          {/* Hero Section */}
          <div className="container mx-auto px-4 lg:px-8 text-center py-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Basketball Drill Library
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore modern, game-like drills to level up your practices. Filter by skill focus, drill type, or keyword to find what you need.
            </p>
          </div>

          {/* Filter Section */}
          <div className="container mx-auto px-4 lg:px-8 mb-12">
            <div className="flex flex-col sm:flex-row gap-4 items-end justify-center">
              <div className="w-full sm:w-auto min-w-[200px]">
                <Label htmlFor="category" className="text-sm text-muted-foreground mb-2 block">
                  Category
                </Label>
                <Select value={focusFilter} onValueChange={(value) => setFocusFilter(value as FocusAreaFilter)}>
                  <SelectTrigger id="category" className="w-full bg-card border-border">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border z-50">
                    {focusAreas.map((area) => (
                      <SelectItem 
                        key={area} 
                        value={area}
                        className="hover:bg-accent focus:bg-accent"
                      >
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full sm:w-auto min-w-[200px]">
                <Label htmlFor="tags" className="text-sm text-muted-foreground mb-2 block">
                  Tags
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between bg-card border-border hover:bg-card/70"
                    >
                      {selectedTags.length === 0 ? "All Tags" : `${selectedTags.length} tag(s) selected`}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0 bg-card border-border" align="start">
                    <div className="max-h-[300px] overflow-y-auto">
                      <button
                        onClick={() => toggleTag("all")}
                        className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent focus:bg-accent transition-colors"
                      >
                        <Check
                          className={`mr-2 h-4 w-4 text-primary ${
                            selectedTags.length === 0 ? "opacity-100" : "opacity-0"
                          }`}
                        />
                        All Tags
                      </button>
                      {allTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent focus:bg-accent transition-colors"
                        >
                          <Check
                            className={`mr-2 h-4 w-4 text-primary ${
                              selectedTags.includes(tag) ? "opacity-100" : "opacity-0"
                            }`}
                          />
                          {tag}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {(focusFilter !== "All" || selectedTags.length > 0) && (
              <div className="text-center mt-4">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setFocusFilter("All");
                    setSelectedTags([]);
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Drills Grid */}
          <div className="container mx-auto px-4 lg:px-8">
            {filteredDrills.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">
                  No drills found matching your filters. Try adjusting your selection.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDrills.map((drill) => (
                  <Card
                    key={drill.slug}
                    className="group overflow-hidden border-border bg-card hover:shadow-xl hover:shadow-primary/20 hover:scale-105 transition-all duration-300"
                  >
                    <Link to={`/drills/${drill.slug}`} className="block">
                      <div className="aspect-video w-full overflow-hidden bg-muted cursor-pointer">
                        <img
                          src={drill.thumbnail}
                          alt={drill.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                    <CardHeader>
                      <CardTitle className="text-xl text-foreground">
                        {drill.title}
                      </CardTitle>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
                        <div className="flex items-center gap-1">
                          <Target className="w-4 h-4 text-primary" />
                          <span>{drill.focusArea}</span>
                        </div>
                      </div>
                      <CardDescription className="line-clamp-2 mt-3">
                        {drill.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {drill.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Link to={`/drills/${drill.slug}`}>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                          View Drill
                        </Button>
                      </Link>
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
