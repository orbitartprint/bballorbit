import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, BookOpen } from "lucide-react";
import Navigation from "@/components/ui/navigation";
import { useNavigate, Link } from "react-router-dom";
import Footer from "@/components/ui/footer";

const FreeResources = () => {
  const navigate = useNavigate();
  useEffect(() => {window.scrollTo(0, 0);}, []);
  const resources = [
    {
      id: 1,
      title: "5 Shooting Challenges for Youth Players",
      description: "Progressive shooting drills that build confidence and accuracy for players aged 8-14.",
      image: "/placeholder.svg",
      downloadUrl: "#", // Placeholder for now
    },
    {
      id: 2,
      title: "Essential Ball Handling Fundamentals",
      description: "Master the basics with these proven drills that every young player needs to know.",
      image: "/placeholder.svg", 
      downloadUrl: "#", // Placeholder for now
    },
  ];

  return (
    <>
      <Helmet>
        <title>Free Resources - Basketball Orbit</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Exclusive free coaching resources for Basketball Orbit newsletter subscribers" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 pb-8">
              Your Free Coaching Resources
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Thanks for being part of Basketball Orbit! Here you can download all free guides I've created for you.
            </p>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {resources.map((resource) => (
              <Card key={resource.id} className="border-border bg-card hover:shadow-orange transition-smooth">
                <CardHeader className="p-0">
                  <div className="aspect-[4/3] bg-muted rounded-t-lg flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-3 text-card-foreground">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground mb-4 line-clamp-3">
                    {resource.description}
                  </CardDescription>
                  <Button 
                    className="w-full gradient-orange text-white hover:shadow-orange transition-smooth"
                    onClick={() => window.open(resource.downloadUrl, '_blank')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter Reminder Section */}
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-card-foreground mb-4">
              Want More Resources?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              New guides are added regularly! Make sure you're subscribed to our newsletter to get notified when fresh content drops.
            </p>
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
              onClick={() => window.location.href = '/newsletter'}
            >
              Subscribe to Newsletter
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default FreeResources;
