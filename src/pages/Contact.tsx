import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CONTACT_SITE_KEY, submitWebsiteContact } from "@/lib/contact";
import TurnstileChallenge from "@/components/TurnstileChallenge";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [company, setCompany] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [verificationReset, setVerificationReset] = useState(0);
  const submission = useRef<{ fingerprint: string; requestId: string }>();
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const normalized = Object.fromEntries(Object.entries(formData).map(([name, value]) => [name, value.trim()])) as typeof formData;
      const fingerprint = JSON.stringify(normalized);
      if (submission.current?.fingerprint !== fingerprint) submission.current = { fingerprint, requestId: crypto.randomUUID() };
      await submitWebsiteContact({ ...normalized, company, requestId: submission.current.requestId, turnstileToken });
      submission.current = undefined;
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

      toast({
        title: "Message received — thank you!",
        description: "Your message has been saved. I'll get back to you soon.",
      });

    } catch {
      toast({
        title: "Error sending message",
        description: `There was a problem sending your message. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setTurnstileToken("");
      setVerificationReset(value => value + 1);
    }
  };

  return (
    <>
      <Helmet defer={false}>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Do you offer free coaching resources?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes! You can download free PDFs, join the newsletter, and check out the Basketball Orbit YouTube channel for drills and strategies."
                }
              },
              {
                "@type": "Question",
                name: "Can I use your drills with my youth team?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Absolutely. My drills are designed for different age groups and levels, from beginners to experienced players."
                }
              },
              {
                "@type": "Question",
                name: "Do you collaborate with other coaches or brands?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, I'm open to collaborations with coaches, teams, or basketball brands."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="container mx-auto px-4 py-16 pt-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Get in Touch
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Have questions about drills, plays, or coaching strategies? I'd love to hear from you.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Send a Message
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and I'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="absolute -left-[10000px] top-0" aria-hidden="true">
                      <label htmlFor="contact-company">Leave this field empty</label>
                      <input id="contact-company" name="company" type="text" autoComplete="off" tabIndex={-1} value={company} onChange={event => setCompany(event.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        maxLength={200}
                        placeholder="Your full name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        maxLength={255}
                        placeholder="your.email@example.com"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        maxLength={500}
                        placeholder="What's this about?"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        maxLength={10000}
                        placeholder="Tell me more about your question or feedback..."
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <TurnstileChallenge siteKey={CONTACT_SITE_KEY} resetKey={verificationReset} onToken={setTurnstileToken} />
                    <Button className="w-full" type="submit" disabled={isSubmitting || !turnstileToken}>
                      <Mail className="h-4 w-4 mr-2" />
                      {isSubmitting ? "Sending message..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5" />
                      Frequently Asked Questions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        Do you offer free coaching resources?
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Yes! You can download free PDFs, join the newsletter, and check out the Basketball Orbit YouTube channel for drills and strategies.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        Can I use your drills with my youth team?
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Absolutely. My drills are designed for different age groups and levels, from beginners to experienced players.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        Do you collaborate with other coaches or brands?
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Yes, I'm open to collaborations with coaches, teams, or basketball brands.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Other Ways to Connect</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Email Support</p>
                        <a className="text-sm text-muted-foreground underline underline-offset-4" href="mailto:info@bballorbit.com">info@bballorbit.com</a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Response Time</p>
                        <p className="text-sm text-muted-foreground">Usually within 24 hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Contact;
