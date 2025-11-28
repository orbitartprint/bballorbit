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
        <div className="container mx-auto px-4 py-16 pt-20 max-w-4xl">
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

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">
                Sale of Digital Products (PDF Downloads)
              </h2>
              <p className="text-base leading-relaxed mb-4">
                (1) <strong>Delivery of Digital Content</strong><br />
                All products offered are digital content delivered electronically. After completing a purchase, 
                the buyer receives immediate access to the download link via email. No physical goods will be shipped.
                <br /><br />
                (2) <strong>Responsibility of the Buyer</strong><br />
                The buyer is responsible for providing a valid email address and ensuring that emails can be received successfully.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">
                Waiver of the Right of Withdrawal (EU Customers)
              </h2>
              <p className="text-base leading-relaxed mb-4">
                (1) <strong>Loss of Withdrawal Rights</strong><br />
                Digital products that are not supplied on a physical medium are subject to the provisions of 
                EU Directive 2011/83/EU. By purchasing a digital product and accessing the download link, the buyer 
                expressly agrees that delivery of the digital content begins before the end of the statutory withdrawal period. 
                The buyer acknowledges that this results in the loss of the right of withdrawal in accordance with Article 16(m) of the Directive.
                <br /><br />
                (2) <strong>Explicit Consent During Checkout</strong><br />
                Before completing the purchase, the buyer confirms by checking a required box that they agree to the immediate 
                delivery of the digital content and that they understand they lose their right to withdraw from the purchase.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">
                License and Permitted Use
              </h2>
              <p className="text-base leading-relaxed mb-4">
                (1) <strong>Personal License</strong><br />
                With the purchase of a digital product, the buyer is granted a simple, non-exclusive, 
                non-transferable license for personal and non-commercial use.
                <br /><br />
                (2) <strong>Prohibited Uses</strong><br />
                The following actions are explicitly prohibited:<br />
                – Sharing, forwarding or distributing the digital files to third parties<br />
                – Uploading, publishing or making the content publicly available<br />
                – Reselling, renting, lending or sublicensing the product<br />
                – Copying or reproducing the content beyond personal use
                <br /><br />
                (3) <strong>Intellectual Property</strong><br />
                All content is protected by copyright. Any infringement may lead to legal action.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">
                Pricing, Taxes and Small Business Status
              </h2>
              <p className="text-base leading-relaxed mb-4">
                (1) <strong>Small Business Regulation</strong><br />
                The seller operates under the German Small Business Regulation (Section 19 UStG). 
                No VAT will be shown on invoices. All prices displayed are final prices.
                <br /><br />
                (2) <strong>Currency and Payment Processing</strong><br />
                All prices are shown in the currency specified during checkout. 
                Payment is processed securely through ConvertKit Commerce and Stripe.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">
                Refunds
              </h2>
              <p className="text-base leading-relaxed mb-4">
                (1) <strong>Refund Eligibility</strong><br />
                Due to the immediate delivery of digital content and the loss of the statutory withdrawal right, 
                all sales are final.
                <br /><br />
                (2) <strong>Voluntary Refunds (Goodwill Policy)</strong><br />
                The seller may, at their sole discretion, offer refunds in special cases (e.g., 
                duplicate purchase, technical issues). There is no legal entitlement to such refunds.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">
                Use of ConvertKit Commerce and Stripe
              </h2>
              <p className="text-base leading-relaxed mb-4">
                (1) <strong>Payment Processing</strong><br />
                Payments are processed through ConvertKit Commerce and Stripe. Their terms and policies 
                apply in addition to these Terms of Service.
                <br /><br />
                (2) <strong>Digital Delivery</strong><br />
                The delivery of the digital product is handled automatically by ConvertKit immediately 
                after successful payment.
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
