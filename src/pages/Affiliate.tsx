import { useEffect } from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Affiliate = () => {
  const navigate = useNavigate();
  useEffect(() => {window.scrollTo(0, 0);}, []);
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button 
          variant="outline" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Button>

        <div className="bg-card rounded-lg shadow-sm p-8 border">
          <h1 className="text-4xl font-bold text-foreground mb-8">Affiliate Disclosure</h1>
          
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-base leading-relaxed mb-4">
              At Basketball Orbit, transparency and trust are very important to me. This Affiliate Disclosure explains how I may earn a commission when you click on or purchase products and services through links on this website.
            </p>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">What Are Affiliate Links?</h2>
              <p className="text-base leading-relaxed mb-4">
                Some of the links on this website are "affiliate links." This means that if you click on the link and make a purchase, I may receive a small commission at no additional cost to you. Affiliate programs are a way to support Basketball Orbit and help me continue creating free content for basketball coaches worldwide.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Why Do I Use Affiliate Links?</h2>
              <p className="text-base leading-relaxed mb-4">
                Running a website, producing YouTube videos, and creating free resources for coaches takes time and resources. Affiliate partnerships help cover some of these costs. They allow me to keep producing valuable coaching content while keeping most of the resources free for you.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">My Promise to You</h2>
              <p className="text-base leading-relaxed mb-4">
                I only recommend products, tools, or services that I personally use, have tested, or genuinely believe provide real value to basketball coaches. My recommendations are always based on their usefulness and quality — not on the commission I may receive.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">No Extra Cost to You</h2>
              <p className="text-base leading-relaxed mb-4">
                Using affiliate links does not increase the price you pay. In fact, in some cases, affiliate partnerships may even give you access to discounts or special offers.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Affiliate Programs I Participate In</h2>
              <p className="text-base leading-relaxed mb-4">
                This site may participate in various affiliate programs, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4 text-muted-foreground">
                <li>Sports tech and analysis tools (e.g., XbotGo)</li>
                <li>Basketball coaching resources and equipment (e.g., Hoops King)</li>
                <li>Other relevant services and tools for coaches</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Your Choice</h2>
              <p className="text-base leading-relaxed mb-4">
                You are never obligated to use affiliate links. They are provided as a convenient way to support Basketball Orbit if you choose to. Whether you purchase through my links or directly, you will always receive the same recommendations and insights.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Final Note</h2>
              <p className="text-base leading-relaxed mb-4">
                By using affiliate links, you help keep Basketball Orbit growing and allow me to keep sharing drills, plays, and coaching strategies with the global coaching community. Thank you for your support!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Affiliate;