import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
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
import { Download, ShoppingCart, Users, Globe, TrendingUp } from "lucide-react";
import { resources, categories, type CategoryFilter, type Resource } from "@/data/resources";

const Resources = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
  const SCRIPT_ID = 'convertkit-script-d0839f9f3a';
  // avoid injecting twice
  if (document.getElementById(SCRIPT_ID)) return;

  const container = document.getElementById('convertkit-form-container') || document.body;
  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.async = true;
  script.dataset.uid = 'd0839f9f3a';
  script.src = 'https://bballorbit.kit.com/d0839f9f3a/index.js';

  container.appendChild(script);

  return () => {
    // cleanup on unmount
    script.remove();
  };
}, []);
  
  const [typeFilter, setTypeFilter] = useState<"All" | "Free" | "Paid">("All");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All");

  const filteredResources = resources.filter((resource) => {
    const matchesType = typeFilter === "All" || resource.type === typeFilter;
    const matchesCategory = categoryFilter === "All" || resource.category === categoryFilter;
    return matchesType && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>Free & Premium Coaching Resources - Basketball Orbit</title>
        <meta name="description" content="Browse all Basketball Orbit coaching PDFs and resources. Get free drills or explore premium toolkits to elevate your coaching." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="pt-14 pb-16">
          {/* Hero Section */}
          <div className="container mx-auto px-4 lg:px-8 text-center py-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Get Every Coaching Resource in One Place
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Browse all my free and premium PDFs — or sign up once to unlock every free resource instantly.
            </p>

            {/* ConvertKit Form Embed */}
            <div id="convertkit-form-container" className="max-w-2xl mx-auto mb-16" />

            {/* Social Proof */}
            <div className="max-w-4xl mx-auto bg-card border border-border rounded-lg p-8 mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-1">30,000+</div>
                  <div className="text-sm text-muted-foreground">Coaches Worldwide</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-3">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-secondary mb-1">50+</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-3">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-accent mb-1">98%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
                </div>
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
                      <div className="aspect-[4/3] bg-muted rounded-t-lg flex items-center justify-center overflow-hidden">
                        <img 
                          src={resource.image} 
                          alt={resource.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
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
                      <Button 
                        className="w-full shadow-orange transition-smooth hover:scale-105"
                        onClick={() => window.open(resource.link, '_blank')}
                      >
                        {resource.type === "Free" ? (
                          <>
                            <Download className="w-4 h-4 mr-2" />
                            Get Free PDF
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Buy Now
                          </>
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
