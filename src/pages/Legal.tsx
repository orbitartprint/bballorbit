import { useEffect } from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Legal = () => {
  const navigate = useNavigate();
  useEffect(() => {window.scrollTo(0, 0);}, []);
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
        <Button 
          variant="outline" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Button>

        <div className="bg-card rounded-lg shadow-sm p-8 border">
          <h1 className="text-3xl font-bold mb-8 text-foreground">Legal Notice</h1>

          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <div>
              <p className="font-semibold text-foreground">Christian Bernhard</p>
              <p>Hitzhofener Straße 5b</p>
              <p>85080 Gaimersheim</p>
              <p>Email: info[at]bballorbit.com</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-foreground">Responsible for Content:</h2>
              <p>Christian Bernhard</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-foreground">Sales tax identification number in accordance with Section 27 a of the Sales Tax Act:</h2>
              <p>VAT ID: DE340838778</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-foreground">Consumer Dispute Resolution:</h2>
              <p>We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.</p>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Legal;
