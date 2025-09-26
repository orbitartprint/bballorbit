import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Navigation from "@/components/ui/navigation";
import { useNavigate, Link } from "react-router-dom";
import Footer from "@/components/ui/footer";
import { Mail, Download, Check, Users, Clock, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const navigate = useNavigate();
  useEffect(() => {window.scrollTo(0, 0);}, []);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gdprConsent, setGdprConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!gdprConsent) {
      toast({
        title: "Consent Required",
        description: "Please consent to receive our newsletter.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call - replace with actual newsletter service
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubscribed(true);
      toast({
        title: "Successfully Subscribed!",
        description: "Check your email for the free drill PDF.",
      });
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4 lg:px-8 flex items-center justify-center min-h-[80vh]">
            <Card className="max-w-2xl w-full text-center">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold mb-4 text-foreground">
                  Welcome to Basketball Orbit!
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Check your email for your free "5 Drills Every Youth Team Needs" PDF guide.
                </p>
                <p className="text-muted-foreground mb-8">
                  You'll receive weekly coaching tips, new drills, and exclusive content to help you become a better coach.
                </p>
                <Button asChild size="lg" className="shadow-orange">
                  <a href="/">Return to Homepage</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Download className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Get 5 Drills Every Youth Team Needs
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of coaches worldwide and get our most popular drill collection, 
                plus weekly coaching insights delivered to your inbox.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Benefits */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-foreground">
                  What You'll Get:
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Download className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Free PDF: 5 Essential Drills
                      </h3>
                      <p className="text-muted-foreground">
                        Detailed instructions, diagrams, and coaching points for our most effective youth drills.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Weekly Coaching Tips
                      </h3>
                      <p className="text-muted-foreground">
                        Modern strategies, drill variations, and insights to keep your coaching fresh and effective.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Exclusive Community Access
                      </h3>
                      <p className="text-muted-foreground">
                        Connect with coaches worldwide and share experiences in our private community.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Proof */}
                <div className="mt-8 p-6 bg-card rounded-lg border border-border">
                  <div className="flex items-center justify-between text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">10,000+</div>
                      <div className="text-sm text-muted-foreground">Coaches</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-secondary">50+</div>
                      <div className="text-sm text-muted-foreground">Countries</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent">98%</div>
                      <div className="text-sm text-muted-foreground">Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">
                    Get Your Free Drills Now
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Your Name *
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex items-start space-x-3 pt-2">
                      <Checkbox
                        id="gdpr"
                        checked={gdprConsent}
                        onCheckedChange={(checked) => setGdprConsent(checked as boolean)}
                        required
                      />
                      <label htmlFor="gdpr" className="text-sm text-muted-foreground leading-relaxed">
                        I consent to receive the Basketball Orbit newsletter and understand I can unsubscribe at any time. 
                        View our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                      </label>
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full shadow-orange transition-bounce hover:scale-105"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="mr-2 h-5 w-5 animate-spin" />
                          Subscribing...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-5 w-5" />
                          Get Free Drills PDF
                        </>
                      )}
                    </Button>
                  </form>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    No spam, ever. Unsubscribe with one click.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Newsletter;
