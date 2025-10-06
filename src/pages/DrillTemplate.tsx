import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { drills } from "@/data/drills";
import { ArrowLeft, Download, Target, Zap, Lightbulb } from "lucide-react";

const DrillTemplate = () => {
  const { slug } = useParams<{ slug: string }>();
  const drill = drills.find((d) => d.slug === slug);

  if (!drill) {
    return <Navigate to="/drills" replace />;
  }

  // Convert YouTube URL to embed format
  const getEmbedUrl = (url?: string) => {
    if (!url) return null;
    if (url.includes("embed/")) return url;
    if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "youtube.com/embed/");
    }
    return url;
  };

  const embedUrl = getEmbedUrl(drill.youtubeUrl);

  return (
    <>
      <Helmet>
        <title>{drill.title} - Basketball Orbit</title>
        <meta name="description" content={drill.description} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Back Button */}
            <Link to="/drills">
              <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Drill Library
              </Button>
            </Link>

            {/* Title & Description */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {drill.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
                {drill.description}
              </p>
            </div>

            <div className="w-full h-px bg-border mb-8"></div>

            {/* Video Section */}
            {embedUrl && (
              <div className="mb-12">
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-muted shadow-2xl">
                  <iframe
                    src={embedUrl}
                    title={drill.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            )}

            {/* Drill Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Target className="w-5 h-5 text-primary" />
                    Focus Area
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{drill.focusArea}</p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Zap className="w-5 h-5 text-secondary" />
                    Drill Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{drill.drillType}</p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Target className="w-5 h-5 text-primary" />
                    Main Goal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{drill.mainGoal}</p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    Key Coaching Point
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{drill.keyCoachingPoint}"</p>
                </CardContent>
              </Card>
            </div>

            {/* Tags */}
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-foreground mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {drill.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* PDF Download Section */}
            {drill.pdfAvailable && drill.filePath && (
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Download PDF Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Get the complete drill breakdown with diagrams and coaching notes.
                  </p>
                  <a href={drill.filePath} download>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </a>
                </CardContent>
              </Card>
            )}
            {/* Back Button */}
            <Link to="/drills">
              <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Drill Library
              </Button>
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default DrillTemplate;
