import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { drills } from "@/data/drills";
import { ArrowLeft, Target, Award, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useRef, useState } from "react";

const DrillTemplate = () => {
  const { slug } = useParams<{ slug: string }>();
  const drill = drills.find((d) => d.id === slug);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  // Get drills from the same category
  const sameCategoryDrills = drills.filter(d => d.focusArea === drill.focusArea);
  const currentIndex = sameCategoryDrills.findIndex(d => d.id === drill.id);
  const previousDrill = currentIndex > 0 ? sameCategoryDrills[currentIndex - 1] : null;
  const nextDrill = currentIndex < sameCategoryDrills.length - 1 ? sameCategoryDrills[currentIndex + 1] : null;

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
                <div className="relative w-full rounded-xl overflow-hidden shadow-lg bg-black">
                  {!isVideoPlaying ? (
                    <button
                      className="relative w-full rounded-xl overflow-hidden bg-black group"
                      onClick={() => {
                        setIsVideoPlaying(true);
                        setTimeout(() => videoRef.current?.play(), 150);
                      }}
                      aria-label="Play video"
                    >
                      {/* Thumbnail */}
                      <img
                        src={drill.thumbnail}
                        alt={`${drill.title} - preview`}
                        loading="lazy"
                        className="w-full h-auto object-contain bg-black transition-transform duration-300 group-hover:scale-105"
                        style={{ aspectRatio: "auto" }}
                      />
              
                      {/* Overlay mit Play Icon */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="white"
                          className="w-20 h-20 opacity-90"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </button>
                  ) : (
                    <video
                      ref={videoRef}
                      src={drill.videoMp4}
                      controls
                      className="w-full h-auto object-contain bg-black rounded-xl"
                      poster={drill.thumbnail}
                      preload="metadata"
                      playsInline
                      onEnded={(e) => e.currentTarget.pause()} // bleibt beim letzten Frame stehen
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )}
                
                {drill.images && drill.images.length > 0 && (
                <div
                  className={`grid gap-4 ${
                    drill.images.length === 1
                      ? "grid-cols-1"
                      : drill.images.length === 2
                      ? "grid-cols-2"
                      : "grid-cols-3"
                  }`}
                >
                  {drill.images.map((image, index) => (
                    <div
                      key={index}
                      className="rounded-lg overflow-hidden shadow-md cursor-pointer group relative"
                      onClick={() => setSelectedIndex(index)}
                    >
                      <img
                        src={image}
                        alt={`${drill.title} - Image ${index + 1}`}
                        loading="lazy"
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300"></div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* ✅ Lightbox Overlay mit Navigation */}
              {selectedIndex !== null && (
                <div
                  className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                  onClick={() => setSelectedIndex(null)}
                >
                  <div
                    className="relative flex items-center justify-center w-full h-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* ❌ Schließen-Button */}
                    <button
                      onClick={() => setSelectedIndex(null)}
                      className="absolute top-6 right-6 text-white hover:text-[#f57520] transition-colors"
                      aria-label="Close"
                    >
                      <X size={32} />
                    </button>
              
                    {/* ◀️ Zurück */}
                    <button
                      onClick={() =>
                        setSelectedIndex(
                          selectedIndex > 0 ? selectedIndex - 1 : drill.images.length - 1
                        )
                      }
                      className="absolute left-4 md:left-10 text-white hover:text-[#f57520] transition-colors"
                      aria-label="Previous"
                    >
                      <ChevronLeft size={48} />
                    </button>
              
                    {/* 🖼 Bildanzeige */}
                    <img
                      src={drill.images[selectedIndex]}
                      alt={`${drill.title} - Full view`}
                      className="max-w-5xl max-h-[90vh] rounded-lg shadow-2xl object-contain"
                    />
              
                    {/* ▶️ Weiter */}
                    <button
                      onClick={() =>
                        setSelectedIndex(
                          selectedIndex < drill.images.length - 1 ? selectedIndex + 1 : 0
                        )
                      }
                      className="absolute right-4 md:right-10 text-white hover:text-[#f57520] transition-colors"
                      aria-label="Next"
                    >
                      <ChevronRight size={48} />
                    </button>
                  </div>
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
                <div className="flex items-center gap-2 mb-6">
                  <h2 className="text-3xl font-bold text-foreground">Constraints</h2>
                  <div className="relative group">
                    <button
                      className="text-[#f57520] hover:text-white focus:outline-none"
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
                </div>
            
                <Card className="bg-card border-border">
                  <CardContent className="pt-6">
                    <ol className="space-y-3">
                      {drill.constraints.map((constraint, i) => (
                        <li
                          key={i}
                          className="text-base leading-relaxed text-muted-foreground flex items-start"
                        >
                          <span className="font-semibold text-primary mr-2 min-w-[2.5rem]">
                            C{i + 1}.
                          </span>
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

            {/* Drill Navigation */}
            {(previousDrill || nextDrill) && (
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex justify-between items-center gap-4">
                  {previousDrill ? (
                    <Link 
                      to={`/drills/${previousDrill.id}`}
                      className="group flex items-center gap-2 text-muted-foreground hover:text-[#f57520] transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      <div className="text-left">
                        <div className="text-xs uppercase tracking-wide mb-1">Previous Drill</div>
                        <div className="font-medium">{previousDrill.title}</div>
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}
                  
                  {nextDrill ? (
                    <Link 
                      to={`/drills/${nextDrill.id}`}
                      className="group flex items-center gap-2 text-muted-foreground hover:text-[#f57520] transition-colors ml-auto"
                    >
                      <div className="text-right">
                        <div className="text-xs uppercase tracking-wide mb-1">Next Drill</div>
                        <div className="font-medium">{nextDrill.title}</div>
                      </div>
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            )}

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
