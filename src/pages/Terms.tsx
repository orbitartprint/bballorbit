import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { Helmet } from 'react-helmet';

const Terms = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Terms of Service | Basketball Orbit</title>
        <meta name="description" content="Terms of Service for Basketball Orbit - basketball coaching content and educational resources." />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <Navigation />
      
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
          
          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Acceptance of Terms</h2>
              <p className="text-base leading-relaxed mb-4">
                By accessing and using Basketball Orbit (bballorbit.com), you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Use of Content</h2>
              <p className="text-base leading-relaxed mb-4">
                All content provided on Basketball Orbit, including drills, plays, coaching strategies, and educational materials, is intended for 
                educational and personal use only. You may not redistribute, resell, or use any content for commercial purposes without explicit 
                written permission from Basketball Orbit. The content is designed to help coaches improve their skills and knowledge.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Newsletter and Downloads</h2>
              <p className="text-base leading-relaxed mb-4">
                By subscribing to our newsletter or downloading any resources from Basketball Orbit, you consent to receive educational emails, 
                updates, and basketball coaching content. You may unsubscribe from our mailing list at any time by using the unsubscribe link 
                provided in our emails or by contacting us directly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Intellectual Property</h2>
              <p className="text-base leading-relaxed mb-4">
                All content on Basketball Orbit, including but not limited to text, graphics, logos, images, videos, and coaching materials, 
                is protected by copyright and other intellectual property laws. No reproduction, distribution, or commercial use of any content 
                is permitted without explicit written permission from Basketball Orbit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Disclaimer of Liability</h2>
              <p className="text-base leading-relaxed mb-4">
                Basketball Orbit and its content creators assume no responsibility for any injuries, damages, or losses that may result from 
                the use of our coaching content, drills, or strategies. All basketball activities involve inherent risks, and coaches and 
                players participate at their own risk. Our content is provided for educational purposes only and should be adapted to suit 
                individual skill levels and safety requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Changes to These Terms</h2>
              <p className="text-base leading-relaxed mb-4">
                Basketball Orbit reserves the right to modify these Terms of Service at any time. Changes will be posted on this page with 
                an updated revision date. Your continued use of the website after any changes indicates your acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Governing Law</h2>
              <p className="text-base leading-relaxed mb-4">
                These Terms of Service are governed by German law. Any disputes arising from the use of Basketball Orbit or these terms 
                will be handled in German courts and subject to German jurisdiction.
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-border">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Terms;