import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { drills } from "@/data/drills";
import { ArrowLeft, Target, Award } from "lucide-react";

const DrillTemplate = () => {
  const { slug } = useParams<{ slug: string }>();
  const drill = drills.find((d) => d.id === slug);

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
        <meta name="description" content={drill.description.join(" ")} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            {/* Back Button */}
            <Link to="/drills">
              <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Drill Library
              </Button>
            </Link>

            {/* Title + Subtitle */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                {drill.title}
              </h1>
              {drill.subtitle && (
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                  {drill.subtitle}
                </p>
              )}
            </div>

            {/* Focus Area & Main Goal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Card className="bg-[#0e0e0e] border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white font-bold">
                    <Target className="w-5 h-5 text-primary" />
                    Focus Area
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{drill.focusArea}</p>
                </CardContent>
              </Card>

              <Card className="bg-[#0e0e0e] border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white font-bold">
                    <Award className="w-5 h-5 text-primary" />
                    Main Goal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{drill.mainGoal}</p>
                </CardContent>
              </Card>
            </div>

            {/* Media + Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              {/* Left Column: Video/Images */}
              <div className="space-y-6">
                {drill.videoMp4 && (
                  <div>
                    <video 
                      src={drill.videoMp4} 
                      controls 
                      className="rounded-xl w-full h-auto shadow-lg"
                      poster={drill.images?.[0]}
                    />
                  </div>
                )}
                
                {drill.images && drill.images.length > 0 && (
                  <div className={`grid gap-4 ${
                    drill.images.length === 1 ? 'grid-cols-1' :
                    drill.images.length === 2 ? 'grid-cols-2' :
                    'grid-cols-3'
                  }`}>
                    {drill.images.map((image, index) => (
                      <div key={index} className="rounded-lg overflow-hidden shadow-md">
                        <img
                          src={image}
                          alt={`${drill.title} - Image ${index + 1}`}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Description */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Drill Description</h2>
                <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                  {drill.description.map((step, i) => (
                    <li key={i} className="text-base leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Constraints Section */}
            {drill.constraints && drill.constraints.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-6">Constraints</h2>
                <div className="relative group">
                  <button
                    className="text-gray-400 hover:text-[#f57520] focus:outline-none"
                    aria-label="What are Constraints?"
                  >
                    ℹ️
                  </button>
                  <div
                    className="absolute z-10 hidden group-hover:block w-72 md:w-96 bg-black text-white text-sm rounded-lg p-4 shadow-lg top-6 left-1/2 -translate-x-1/2"
                  >
                    <p>
                      Constraints are small, intentional rules or limitations used to shape player behavior 
                      and decision-making during practice. Instead of giving step-by-step instructions, 
                      coaches use constraints to let players discover effective solutions on their own — 
                      improving game understanding and adaptability.
                    </p>
                  </div>
                </div>
                <Card className="bg-card border-border">
                  <CardContent className="pt-6">
                    <ol className="space-y-3">
                      {drill.constraints.map((constraint, i) => (
                        <li key={i} className="text-base leading-relaxed text-muted-foreground flex items-start">
                          <span className="font-semibold text-primary mr-2 min-w-[2.5rem]">C{i + 1}.</span>
                          <span>{constraint}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Optional YouTube Video */}
            {embedUrl && (
              <div className="mb-12">
                <h3 className="text-2xl font-semibold text-foreground mb-4 text-center">
                  Watch the drill in action
                </h3>
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    src={embedUrl}
                    title="YouTube video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-foreground mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {drill.tags.map((tag) => (
                  <Badge key={tag} className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Bottom Back Button */}
            <div className="mt-12 pt-8 border-t border-border text-center">
              <Link to="/drills">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Drill Library
                </Button>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default DrillTemplate;
