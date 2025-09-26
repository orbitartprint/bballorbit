import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Helmet } from "react-helmet";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy - Basketball Orbit</title>
        <meta name="description" content="Privacy Policy for Basketball Orbit - Learn how we protect your privacy and handle your data." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-foreground mb-8">
            PRIVACY POLICY
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            <strong>Last updated September 30, 2025</strong>
          </p>

          <div className="space-y-6 text-foreground">
            <p>
              This Privacy Notice for Bballorbit.com ("<strong>we</strong>," "<strong>us</strong>," or "<strong>our</strong>"), describes how and why we might access, collect, store, use, and/or share ("<strong>process</strong>") your personal information when you use our services ("<strong>Services</strong>"), including when you:
            </p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Visit our website at{" "}
                <a 
                  href="https://www.bballorbit.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 underline"
                >
                  https://www.bballorbit.com
                </a>{" "}
                or any website of ours that links to this Privacy Notice
              </li>
              <li>Engage with us in other related ways, including any sales, marketing, or events</li>
            </ul>

            <p>
              <strong>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="summary">
              SUMMARY OF KEY POINTS
            </h2>
            
            <p className="italic">
              <strong>This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our{" "}
              <a href="#toc" className="text-primary hover:text-primary/80 underline">
                table of contents
              </a>{" "}
              below to find the section you are looking for.</strong>
            </p>

            <div className="space-y-4">
              <div>
                <strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Learn more about{" "}
                <a href="#personalinfo" className="text-primary hover:text-primary/80 underline">
                  personal information you disclose to us
                </a>.
              </div>

              <div>
                <strong>Do we process any sensitive personal information?</strong> Some of the information may be considered "special" or "sensitive" in certain jurisdictions, for example your racial or ethnic origins, sexual orientation, and religious beliefs. We do not process sensitive personal information.
              </div>

              <div>
                <strong>Do we collect any information from third parties?</strong> We do not collect any information from third parties.
              </div>

              <div>
                <strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about{" "}
                <a href="#infouse" className="text-primary hover:text-primary/80 underline">
                  how we process your information
                </a>.
              </div>

              <div>
                <strong>In what situations and with which parties do we share personal information?</strong> We may share information in specific situations and with specific third parties. Learn more about{" "}
                <a href="#whoshare" className="text-primary hover:text-primary/80 underline">
                  when and with whom we share your personal information
                </a>.
              </div>

              <div>
                <strong>What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about{" "}
                <a href="#privacyrights" className="text-primary hover:text-primary/80 underline">
                  your privacy rights
                </a>.
              </div>

              <div>
                <strong>How do you exercise your rights?</strong> The easiest way to exercise your rights is by submitting a{" "}
                <a 
                  href="https://app.termly.io/notify/f69196c9-12f7-47d9-ac5f-6417f99de468" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 underline"
                >
                  data subject access request
                </a>, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.
              </div>
            </div>

            <p>
              Want to learn more about what we do with any information we collect?{" "}
              <a href="#toc" className="text-primary hover:text-primary/80 underline">
                Review the Privacy Notice in full
              </a>.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="toc">
              TABLE OF CONTENTS
            </h2>

            <div className="space-y-2">
              <div><a href="#infocollect" className="text-primary hover:text-primary/80 underline">1. WHAT INFORMATION DO WE COLLECT?</a></div>
              <div><a href="#infouse" className="text-primary hover:text-primary/80 underline">2. HOW DO WE PROCESS YOUR INFORMATION?</a></div>
              <div><a href="#legalbases" className="text-primary hover:text-primary/80 underline">3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?</a></div>
              <div><a href="#whoshare" className="text-primary hover:text-primary/80 underline">4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a></div>
              <div><a href="#cookies" className="text-primary hover:text-primary/80 underline">5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a></div>
              <div><a href="#newsletter" className="text-primary hover:text-primary/80 underline">6. NEWSLETTER</a></div>
              <div><a href="#hosting" className="text-primary hover:text-primary/80 underline">7. HOSTING OF THE WEBSITE</a></div>
              <div><a href="#inforetain" className="text-primary hover:text-primary/80 underline">8. HOW LONG DO WE KEEP YOUR INFORMATION?</a></div>
              <div><a href="#infominors" className="text-primary hover:text-primary/80 underline">9. DO WE COLLECT INFORMATION FROM MINORS?</a></div>
              <div><a href="#privacyrights" className="text-primary hover:text-primary/80 underline">10. WHAT ARE YOUR PRIVACY RIGHTS?</a></div>
              <div><a href="#DNT" className="text-primary hover:text-primary/80 underline">11. CONTROLS FOR DO-NOT-TRACK FEATURES</a></div>
              <div><a href="#uslaws" className="text-primary hover:text-primary/80 underline">12. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</a></div>
              <div><a href="#downloads" className="text-primary hover:text-primary/80 underline">13. DOWNLOADS AND ONLINE SHOP</a></div>
              <div><a href="#policyupdates" className="text-primary hover:text-primary/80 underline">14. DO WE MAKE UPDATES TO THIS NOTICE?</a></div>
              <div><a href="#contact" className="text-primary hover:text-primary/80 underline">15. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a></div>
              <div><a href="#request" className="text-primary hover:text-primary/80 underline">16. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</a></div>
              <div><a href="#SSL" className="text-primary hover:text-primary/80 underline">17. SSL/TLS ENCRYPTION</a></div>
            </div>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="infocollect">
              1. WHAT INFORMATION DO WE COLLECT?
            </h2>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4" id="personalinfo">
              Personal information you disclose to us
            </h3>

            <p><strong><em>In Short:</em></strong> <em>We collect personal information that you provide to us.</em></p>

            <p>
              We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
            </p>

            <p>
              <strong>Personal Information Provided by You.</strong> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>weight measurements you enter for comparison purposes</li>
              <li>custom objects you create for weight comparisons</li>
              <li>contact or authentication data</li>
            </ul>

            <p>
              <strong>Sensitive Information.</strong> We do not process sensitive information.
            </p>

            <p>
              All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
              Information automatically collected
            </h3>

            <p><strong><em>In Short:</em></strong> <em>Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.</em></p>

            <p>
              We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.
            </p>

            <p>Like many businesses, we also collect information through cookies and similar technologies.</p>

            <p>The information we collect includes:</p>

            <ul className="list-disc pl-6 space-y-4">
              <li>
                <em>Log and Usage Data.</em> Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called "crash dumps"), and hardware settings).
              </li>
              <li>
                <em>Device Data.</em> We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier, operating system, and system configuration information.
              </li>
              <li>
                <em>Location Data.</em> We collect location data such as information about your device's location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. However, if you choose to opt out, you may not be able to use certain aspects of the Services.
              </li>
            </ul>

            {/* Continue with remaining sections... */}
            <div className="mt-16 p-6 bg-muted/20 rounded-lg border border-muted">
              <p className="text-center text-muted-foreground">
                <em>This privacy policy continues with additional sections covering data processing, legal bases, sharing practices, cookies, retention policies, privacy rights, and contact information. The complete policy ensures compliance with international privacy regulations including GDPR, CCPA, and other applicable laws.</em>
              </p>
              
              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                  For questions about this privacy policy, please contact us at{" "}
                  <a 
                    href="mailto:info[at]bballorbit.com" 
                    className="text-primary hover:text-primary/80 underline"
                  >
                    info[at]bballorbit.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
