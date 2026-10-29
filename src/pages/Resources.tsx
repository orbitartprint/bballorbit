import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Link } from "react-router-dom";
import KitSignupForm from "@/components/KitSignupForm";
import { Download, Book, Users, Globe, TrendingUp } from "lucide-react";
import { resources, categories, type CategoryFilter } from "@/data/resources";

const Resources = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [typeFilter, setTypeFilter] = useState<"All" | "Free" | "Paid">("All");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All");

  const filteredResources = resources.filter((resource) => {
    const matchesType = typeFilter === "All" || resource.type === typeFilter;
    const matchesCategory = categoryFilter === "All" || resource.category === categoryFilter;
    return matchesType && matchesCategory;
  });

  return (
    <>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="pt-10 pb-14">
          {/* Hero Section - Two Column Layout */}
          <div className="container mx-auto px-6 lg:px-8 py-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

              {/* Left Column - Text & Stats with Court Background */}
              <div className="relative bg-black text-white rounded-xl p-8 md:p-10 overflow-hidden">
                {/* Basketball Court Background */}
                <div className="absolute inset-0 -left-1 -right-1 opacity-15">
                  <img 
                    src="/lovable-uploads/court-trans.webp" 
                    alt="Basketball court texture" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
                    Get Every Coaching Resource in One Place
                  </h1>
                  <p className="text-lg md:text-xl text-gray-200 mb-8">
                    Get practical coaching PDFs by email and join the Basketball Orbit newsletter.
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-6 mt-8">
                    <div className="flex items-center gap-3">
                      <Users className="h-6 w-6 text-[#f57520]" />
                      <div>
                        <div className="text-2xl font-bold text-[#f57520]">Practical PDFs</div>
                        <div className="text-xs text-gray-300">Ready for practice</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="h-6 w-6 text-[#f57520]" />
                      <div>
                        <div className="text-2xl font-bold text-[#f57520]">Game-like drills</div>
                        <div className="text-xs text-gray-300">Built around decisions</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-6 w-6 text-[#f57520]" />
                      <div>
                        <div className="text-2xl font-bold text-[#f57520]">Clear diagrams</div>
                        <div className="text-xs text-gray-300">Easy to follow</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - ConvertKit Form */}
              <div className="flex flex-col justify-center items-center bg-black rounded-xl p-6">
                <KitSignupForm />
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="container mx-auto px-4 lg:px-8 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <div className="flex gap-2">
                <Button
                  variant={typeFilter === "All" ? "default" : "outline"}
                  onClick={() => setTypeFilter("All")}
                  className={typeFilter === "All" ? "shadow-orange" : ""}
                >
                  All
                </Button>
                <Button
                  variant={typeFilter === "Free" ? "default" : "outline"}
                  onClick={() => setTypeFilter("Free")}
                  className={typeFilter === "Free" ? "shadow-orange" : ""}
                >
                  Free
                </Button>
                <Button
                  variant={typeFilter === "Paid" ? "default" : "outline"}
                  onClick={() => setTypeFilter("Paid")}
                  className={typeFilter === "Paid" ? "shadow-orange" : ""}
                >
                  Paid
                </Button>
              </div>

              <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as CategoryFilter)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Resource Grid */}
          <div className="container mx-auto px-4 lg:px-8 mb-16">
            {filteredResources.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">
                  No resources found matching your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <Card
                    key={resource.id}
                    className="border-border bg-card hover:shadow-orange transition-smooth hover:scale-105"
                  >
                    <CardHeader className="p-0">
                      <a href={resource.link} className="block aspect-[4/3] overflow-hidden rounded-t-lg bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" aria-label={`Learn more about ${resource.title}`}>
                        <img src={resource.image} alt={resource.title} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                      </a>
                    </CardHeader>

                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <CardTitle className="text-xl text-card-foreground flex-1">
                          {resource.title}
                        </CardTitle>
                        <Badge 
                          variant={resource.type === "Free" ? "default" : "secondary"}
                          className="ml-2"
                        >
                          {resource.type === "Free" ? "Free" : resource.price}
                        </Badge>
                      </div>
                      <CardDescription className="text-muted-foreground mb-4 line-clamp-2">
                        {resource.description}
                      </CardDescription>

                      <Button asChild className="w-full shadow-orange transition-smooth hover:scale-105">
                        {resource.type === "Free" ? (
                          <a href={resource.link}>
                            <Download className="mr-2 h-4 w-4" aria-hidden="true" />Get Free PDF
                          </a>
                        ) : (
                          <Link to={resource.link}>
                            <Book className="mr-2 h-4 w-4" aria-hidden="true" />Learn More
                          </Link>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Footer Note */}
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <p className="text-muted-foreground">
              Already subscribed? Check your inbox for your link to the Free Resources Library.
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Resources;
