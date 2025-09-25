import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Download, Play, Clock, Users, TrendingUp } from "lucide-react";

const DrillTemplate = () => {
  const [activeTab, setActiveTab] = useState("instructions");

  // Sample drill data - this would come from props/params in real implementation
  const drill = {
    title: "Fast Break 3-on-2 Drill",
    description: "Develop fast break decision-making and execution with this high-intensity drill that simulates game-like transition situations.",
    videoId: "YOUR_VIDEO_ID", // Replace with actual YouTube video ID
    tags: {
      skill: "Fast Break",
      ageGroup: "12-18 years",
      difficulty: "Intermediate"
    },
    duration: "15-20 minutes",
    players: "6-12 players",
    equipment: ["Basketballs", "Cones", "Whistle"],
    instructions: [
      "Set up three offensive players at half court with one basketball",
      "Position two defensive players at the free-throw line extended",
      "Offensive players advance down court maintaining proper spacing",
      "Defense communicates and forces a decision",
      "Rotate players after each attempt",
      "Focus on quick decision-making and proper execution"
    ],
    coachingPoints: [
      "Emphasize communication between defenders",
      "Offensive players should maintain wide spacing",
      "Ball handler should attack when 2-on-1 advantage appears",
      "Quick ball movement creates better scoring opportunities"
    ]
  };

  const handleDownloadPDF = () => {
    // This would trigger PDF download in real implementation
    console.log("Downloading PDF for:", drill.title);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="default" className="bg-primary">
                {drill.tags.skill}
              </Badge>
              <Badge variant="secondary">
                {drill.tags.ageGroup}
              </Badge>
              <Badge variant="outline" className="border-accent text-accent">
                {drill.tags.difficulty}
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              {drill.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6">
              {drill.description}
            </p>

            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <span>{drill.duration}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Users className="h-5 w-5 text-primary" />
                <span>{drill.players}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>{drill.tags.difficulty}</span>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-glow bg-muted group">
              {/* Placeholder for YouTube embed */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-bounce cursor-pointer">
                    <Play className="h-8 w-8 text-white ml-1" fill="currentColor" />
                  </div>
                  <p className="text-foreground font-semibold">
                    Watch {drill.title} Tutorial
                  </p>
                </div>
              </div>
              
              {/* YouTube iframe would go here */}
              {/* 
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${drill.videoId}`}
                title={drill.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              */}
            </div>
          </div>

          {/* Content Tabs */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
              <button
                onClick={() => setActiveTab("instructions")}
                className={`px-4 py-2 font-medium transition-smooth border-b-2 ${
                  activeTab === "instructions"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Instructions
              </button>
              <button
                onClick={() => setActiveTab("coaching")}
                className={`px-4 py-2 font-medium transition-smooth border-b-2 ${
                  activeTab === "coaching"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Coaching Points
              </button>
              <button
                onClick={() => setActiveTab("equipment")}
                className={`px-4 py-2 font-medium transition-smooth border-b-2 ${
                  activeTab === "equipment"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Equipment
              </button>
            </div>

            {/* Tab Content */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {activeTab === "instructions" && "Step-by-Step Instructions"}
                  {activeTab === "coaching" && "Coaching Points"}
                  {activeTab === "equipment" && "Required Equipment"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activeTab === "instructions" && (
                  <ol className="space-y-3">
                    {drill.instructions.map((step, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                )}

                {activeTab === "coaching" && (
                  <ul className="space-y-3">
                    {drill.coachingPoints.map((point, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></span>
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === "equipment" && (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {drill.equipment.map((item, index) => (
                      <li key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            {/* Download Section */}
            <Card className="text-center">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  Get the Complete Drill Guide
                </h3>
                <p className="text-muted-foreground mb-6">
                  Download a detailed PDF with diagrams, variations, and additional coaching tips.
                </p>
                <Button 
                  size="lg" 
                  onClick={handleDownloadPDF}
                  className="shadow-orange transition-bounce hover:scale-105"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download PDF Guide
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DrillTemplate;