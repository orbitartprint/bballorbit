import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download } from "lucide-react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { resources, categories, type CategoryFilter } from "@/data/resources";

const FreeResources = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All");

  // Filter to only show free resources
  const freeResources = resources.filter((resource) => {
    const isFree = resource.type === "Free";
    const matchesCategory = categoryFilter === "All" || resource.category === categoryFilter;
    return isFree && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>Free Resources - Basketball Orbit</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Exclusive free coaching resources for Basketball Orbit newsletter subscribers" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="pt-12 pb-16">
          {/* Hero Section */}
          <div className="container mx-auto px-4 lg:px-8 text-center py-10">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Your Free Coaching Resources
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              You've unlocked full access! Download any of these free coaching resources directly below.
            </p>
          </div>

          {/* Filter Section */}
          <div className="container mx-auto px-4 lg:px-8 mb-8">
            <div className="flex justify-center">
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
            {freeResources.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">
                  No resources found matching your filter.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {freeResources.map((resource) => (
                  <Card 
                    key={resource.id} 
                    className="border-border bg-card hover:shadow-orange transition-smooth hover:scale-105"
                  >
                    <CardHeader className="p-0">
                      <div className="aspect-[4/3] bg-muted rounded-t-lg flex items-center justify-center overflow-hidden">
                        <img 
                          src={resource.image} 
                          alt={resource.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <CardTitle className="text-xl text-card-foreground mb-3">
                        {resource.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground mb-4 line-clamp-2">
                        {resource.description}
                      </CardDescription>
                      <Button 
                        className="w-full shadow-orange transition-smooth hover:scale-105"
                        asChild
                      >
                        <a 
                          href={resource.filePath || resource.link} 
                          download={resource.filePath ? `${resource.title}.pdf` : undefined}
                          target={resource.filePath ? undefined : "_blank"}
                          rel={resource.filePath ? undefined : "noopener noreferrer"}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </a>
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
              New guides are added regularly! Make sure you're subscribed to stay updated on fresh coaching content.
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FreeResources;
