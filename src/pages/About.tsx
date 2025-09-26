import { Helmet } from "react-helmet";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import chrisPhoto1 from "@/assets/chris-photo-1.webp";
import chrisPhoto2 from "@/assets/chris-photo-2.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>About Chris - Basketball Orbit | Modern Coaching Strategies</title>
        <meta name="description" content="Meet Chris, the founder of Basketball Orbit. Learn about his journey in basketball coaching and his mission to help coaches worldwide build stronger teams." />
      </Helmet>
      
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-10 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Where strategy meets passion — this is{" "}
                  <span className="text-gradient-orange">Basketball Orbit</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Helping coaches worldwide grow stronger teams
                </p>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <img 
                    src={chrisPhoto1} 
                    alt="Chris - Basketball Orbit Founder" 
                    className="rounded-lg shadow-orange w-80 h-96 object-cover"
                  />
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-orange rounded-full opacity-20"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* My Story Section */}
        <section className="py-10 lg:py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">My Journey</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Hi, I'm Chris – Welcome to Basketball Orbit! Basketball has been a huge part of my life. 
                    Growing up in Germany, I fell in love with the game and have been lucky to play it for most of my life. 
                    Over the years, my passion evolved into coaching, where I've worked with players and teams of all levels—from beginners to experienced athletes.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-primary">Why Basketball Orbit</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Coaching can be challenging — planning practices, teaching concepts, and motivating players isn't always easy. 
                    That's why I started Basketball Orbit: to share the strategies and tools I've learned to help coaches like you create confident, successful teams.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-primary">What You'll Get Here</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    On my YouTube channel, I focus on practical drills, modern concepts, and strategies for youth and senior teams alike. 
                    My goal is simple: to help you grow as a coach and take your team to the next level. 
                    Basketball is about more than just winning — it's about teamwork, resilience, and having fun. 
                    Join me on this journey, and let's build stronger teams together.
                  </p>
                </div>
              </div>

              <div className="flex justify-center lg:justify-start lg:sticky lg:top-8">
                <div className="relative">
                  <img 
                    src={chrisPhoto2} 
                    alt="Chris coaching on basketball court" 
                    className="rounded-lg shadow-blue w-80 h-96 object-cover"
                  />
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-blue rounded-full opacity-20"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-10 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">Mission & Vision</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-gradient-orange/10 border-primary/20">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold mb-4 text-primary">My Mission</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      To make coaching simpler, more effective, and more fun for coaches at every level.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-blue/10 border-secondary/20">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold mb-4 text-secondary">My Vision</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      For Basketball Orbit to become the go-to resource for modern, game-based coaching tools.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-10 lg:py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Coaches Are Saying</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-background border-primary/20">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground italic mb-4 leading-relaxed">
                      "This video is amazing! I have watched it over and over so I can use all of the different drill options! Very well done! Thanks, Coach!"
                    </p>
                    <p className="text-primary font-semibold">— YouTube Subscriber</p>
                  </CardContent>
                </Card>
                <Card className="bg-background border-primary/20">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground italic mb-4 leading-relaxed">
                      "I really appreciate your Videos, with them I plan my Trainings. You help me to be a better Coach. Great Videos 👍 Always looking forward for the next Video 😊"
                    </p>
                    <p className="text-primary font-semibold">— Coach from Germany</p>
                  </CardContent>
                </Card>
                <Card className="bg-background border-primary/20">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground italic mb-4 leading-relaxed">
                      "This is awesome! You've really helped me see that any basic drill can be continually modified and developed into something bigger and tougher. Thanks for taking the time to make these videos. I love the format."
                    </p>
                    <p className="text-primary font-semibold">— Basketball Coach</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Highlight */}
        <section className="py-10 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="bg-gradient-orange/10 rounded-lg p-8 border border-primary/20">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">30,000+</div>
                  <p className="text-muted-foreground">YouTube Subscribers</p>
                </div>
                <div className="bg-gradient-blue/10 rounded-lg p-8 border border-secondary/20">
                  <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">3.1M</div>
                  <p className="text-muted-foreground">Views</p>
                </div>
                <div className="bg-gradient-orange/10 rounded-lg p-8 border border-primary/20">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">40+</div>
                  <p className="text-muted-foreground">Videos on Coaching Drills and Plays</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-10 lg:py-16 bg-gradient-orange/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Basketball Orbit Community</h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Get free drills and coaching insights delivered to your inbox.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
                Subscribe to Newsletter
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
