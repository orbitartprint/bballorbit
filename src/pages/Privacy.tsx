import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Helmet } from "react-helmet";
import { useEffect } from "react";

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy - Basketball Orbit</title>
        <meta
          name="description"
          content="Privacy Policy for Basketball Orbit - Learn how we protect your privacy and handle your data."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        <div className="max-w-none">
          <h1 className="text-4xl font-bold text-foreground mb-8">
            PRIVACY POLICY
          </h1>

          <p className="text-lg text-muted-foreground mb-8">
            <strong>Last updated May 15, 2026</strong>
          </p>

          <div className="space-y-6 text-foreground">
            <p>
              This Privacy Notice for Basketball Orbit and the Basketball Orbit Practice Planner ("<strong>we</strong>," "<strong>us</strong>," or "<strong>our</strong>") describes how and why we may access, collect, store, use, and/or share ("<strong>process</strong>") your personal information when you use our services ("<strong>Services</strong>"), including when you:
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
              <li>
                Create or use an account in the Basketball Orbit Practice Planner
              </li>
              <li>
                Save practice plans, use support features, enable sharing links, or use optional AI-assisted planning features
              </li>
              <li>
                Engage with us in other related ways, including downloads, purchases, marketing, or events
              </li>
            </ul>

            <p>
              <strong>Controller.</strong> The controller responsible for the processing described in this Privacy Notice is Christian Bernhard, Hitzhofener Strasse 5b, 85080 Gaimersheim, Germany, email:{" "}
              <a
                href="mailto:info@bballorbit.com"
                className="text-primary hover:text-primary/80 underline"
              >
                info@bballorbit.com
              </a>
              .
            </p>

            <p>
              <strong>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="summary">
              SUMMARY OF KEY POINTS
            </h2>

            <p className="italic">
              <strong>
                This summary provides key points from our Privacy Notice, but you can find more detail by using the{" "}
                <a href="#toc" className="text-primary hover:text-primary/80 underline">
                  table of contents
                </a>{" "}
                below.
              </strong>
            </p>

            <div className="space-y-4">
              <div>
                <strong>What personal information do we process?</strong> We process information that you provide, information generated when you use the Services, and limited information received from third parties when you choose certain features such as Google Sign-In.
              </div>
              <div>
                <strong>Do we process sensitive personal information?</strong> We do not ask for or intentionally require sensitive personal information. Please do not include sensitive information in free-text fields unless it is necessary for your request.
              </div>
              <div>
                <strong>Do we collect information from third parties?</strong> Yes. If you choose Google Sign-In, we receive authentication information from Google, such as your email address, name, and profile image depending on your Google account settings.
              </div>
              <div>
                <strong>How do we process your information?</strong> We process information to provide and secure the Services, create and manage accounts, save practice plans, answer support requests, provide optional AI-assisted features, process orders, communicate with you, and comply with legal obligations.
              </div>
              <div>
                <strong>With whom do we share personal information?</strong> We share information with service providers only where needed to operate the Services, such as hosting, authentication, database, email, payment, analytics, and AI providers.
              </div>
              <div>
                <strong>What are your rights?</strong> Depending on where you live, you may have rights to access, correct, delete, restrict, object to, or receive a copy of your personal information.
              </div>
              <div>
                <strong>How do you exercise your rights?</strong> Contact us at{" "}
                <a
                  href="mailto:info@bballorbit.com"
                  className="text-primary hover:text-primary/80 underline"
                >
                  info@bballorbit.com
                </a>
                . We will consider and act upon your request in accordance with applicable data protection laws.
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="toc">
              TABLE OF CONTENTS
            </h2>

            <div className="space-y-2">
              <div><a href="#infocollect" className="text-primary hover:text-primary/80 underline">1. WHAT INFORMATION DO WE COLLECT?</a></div>
              <div><a href="#infouse" className="text-primary hover:text-primary/80 underline">2. HOW DO WE PROCESS YOUR INFORMATION?</a></div>
              <div><a href="#legalbases" className="text-primary hover:text-primary/80 underline">3. WHAT LEGAL BASES DO WE RELY ON?</a></div>
              <div><a href="#whoshare" className="text-primary hover:text-primary/80 underline">4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a></div>
              <div><a href="#transfers" className="text-primary hover:text-primary/80 underline">5. INTERNATIONAL DATA TRANSFERS</a></div>
              <div><a href="#cookies" className="text-primary hover:text-primary/80 underline">6. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a></div>
              <div><a href="#planner" className="text-primary hover:text-primary/80 underline">7. PRACTICE PLANNER APP AND ORBIT AI</a></div>
              <div><a href="#newsletter" className="text-primary hover:text-primary/80 underline">8. NEWSLETTER</a></div>
              <div><a href="#convertkitstripe" className="text-primary hover:text-primary/80 underline">9. DIGITAL PRODUCT SALES VIA CONVERTKIT & STRIPE</a></div>
              <div><a href="#hosting" className="text-primary hover:text-primary/80 underline">10. HOSTING OF THE SERVICES</a></div>
              <div><a href="#inforetain" className="text-primary hover:text-primary/80 underline">11. HOW LONG DO WE KEEP YOUR INFORMATION?</a></div>
              <div><a href="#infominors" className="text-primary hover:text-primary/80 underline">12. DO WE COLLECT INFORMATION FROM MINORS?</a></div>
              <div><a href="#privacyrights" className="text-primary hover:text-primary/80 underline">13. WHAT ARE YOUR PRIVACY RIGHTS?</a></div>
              <div><a href="#DNT" className="text-primary hover:text-primary/80 underline">14. CONTROLS FOR DO-NOT-TRACK FEATURES</a></div>
              <div><a href="#uslaws" className="text-primary hover:text-primary/80 underline">15. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</a></div>
              <div><a href="#policyupdates" className="text-primary hover:text-primary/80 underline">16. DO WE MAKE UPDATES TO THIS NOTICE?</a></div>
              <div><a href="#contact" className="text-primary hover:text-primary/80 underline">17. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a></div>
              <div><a href="#request" className="text-primary hover:text-primary/80 underline">18. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</a></div>
              <div><a href="#SSL" className="text-primary hover:text-primary/80 underline">19. SSL/TLS ENCRYPTION</a></div>
            </div>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="infocollect">
              1. WHAT INFORMATION DO WE COLLECT?
            </h2>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4" id="personalinfo">
              Personal information you disclose to us
            </h3>

            <p><strong><em>In Short:</em></strong> <em>We collect personal information that you provide to us.</em></p>

            <p>
              We collect personal information that you voluntarily provide when you interact with our Services, create an account, contact us, subscribe to communications, download resources, make purchases, or use app features.
            </p>

            <p>
              <strong>Personal Information Provided by You.</strong> Depending on how you use the Services, this may include:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Contact information, such as your name and email address</li>
              <li>Account and authentication data, such as your email address, login method, and account identifiers</li>
              <li>Profile data, such as your full name and any profile image you choose to upload</li>
              <li>Practice Planner content, such as saved practice plans, titles, goals, notes, segments, selected drills, favorites, and shared-practice settings</li>
              <li>Support data, such as your message, category, subject, and information you include when contacting us</li>
              <li>Purchase data, such as order history, billing information, and payment-related records for digital or physical products</li>
              <li>Newsletter and marketing preferences</li>
              <li>AI feature input, such as prompts or additional instructions you submit when you choose to use Orbit AI</li>
            </ul>

            <p>
              <strong>Sensitive Information.</strong> We do not ask for or intentionally require sensitive personal information. Please avoid including sensitive personal information in support messages, notes, or AI prompts unless it is necessary for your request. If you choose to provide such information, we may process it only as needed to handle the relevant request.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
              Information collected from third parties
            </h3>

            <p>
              If you choose to sign in with Google, we receive information from Google that is necessary to authenticate your account, such as your email address, name, and profile image, depending on your Google account settings.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
              Information automatically collected
            </h3>

            <p><strong><em>In Short:</em></strong> <em>Some technical information is collected automatically when you use the Services.</em></p>

            <p>
              We automatically collect certain technical information when you visit, use, or navigate the Services. This may include your IP address, browser type, device characteristics, operating system, language preferences, referring URLs, pages viewed, timestamps, and technical event data needed for security, delivery, diagnostics, analytics, and abuse prevention.
            </p>

            <p>
              When you contact support through the Practice Planner, we may also process technical context such as your browser or device information to help investigate the request.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="infouse">
              2. HOW DO WE PROCESS YOUR INFORMATION?
            </h2>

            <p><strong><em>In Short:</em></strong> <em>We process your information to provide, secure, maintain, and improve the Services and to comply with law.</em></p>

            <p>
              We process personal information for the following purposes:
            </p>

            <ul className="list-disc pl-6 space-y-4">
              <li><strong>To create and manage user accounts.</strong> This includes registration, login, password reset, profile management, and authentication.</li>
              <li><strong>To provide the Practice Planner.</strong> This includes saving plans, sections, notes, selected drills, favorites, sharing settings, and related app functionality.</li>
              <li><strong>To provide support.</strong> This includes answering questions, handling bug reports, and responding to feedback or feature requests.</li>
              <li><strong>To provide optional Orbit AI features.</strong> This includes processing the practice-plan context and prompts needed to generate the requested review, suggestion, or plan output.</li>
              <li><strong>To process orders and downloads.</strong> This includes payment handling, delivery of digital products, and order administration.</li>
              <li><strong>To send newsletters or marketing communications where you have consented.</strong></li>
              <li><strong>To maintain security and prevent abuse.</strong> This includes rate limiting, fraud prevention, troubleshooting, and protection of our Services.</li>
              <li><strong>To understand and improve our Services.</strong> This includes analytics and advertising measurement where legally permitted and, where required, based on your consent.</li>
              <li><strong>To comply with legal obligations and protect legal claims.</strong></li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="legalbases">
              3. WHAT LEGAL BASES DO WE RELY ON?
            </h2>

            <p className="mb-2">
              <em><strong>In Short:</strong> We process personal information only when we have a valid legal basis to do so.</em>
            </p>

            <p className="mb-2">
              If you are located in the European Economic Area, the United Kingdom, or Switzerland, we rely on the following legal bases where applicable:
            </p>

            <ul className="list-disc ml-6 mb-4 space-y-2">
              <li>
                <strong>Performance of a contract.</strong> We process account, authentication, profile, practice-plan, sharing, order, and support data where necessary to provide the Services you request or to take steps before entering into a contract.
              </li>
              <li>
                <strong>Consent.</strong> We rely on your consent for newsletters and, where required, for non-essential cookies, analytics, and advertising technologies. You can withdraw consent at any time with effect for the future.
              </li>
              <li>
                <strong>Legitimate interests.</strong> We may process information where necessary for legitimate interests such as service security, fraud and abuse prevention, diagnostics, product improvement, and establishing or defending legal claims, provided those interests are not overridden by your rights and freedoms.
              </li>
              <li>
                <strong>Legal obligations.</strong> We process information where necessary to comply with accounting, tax, consumer, or other legal requirements.
              </li>
              <li>
                <strong>Vital interests.</strong> In exceptional cases, we may process information where necessary to protect the vital interests of a person.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="whoshare">
              4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
            </h2>

            <p><strong><em>In Short:</em></strong> <em>We share personal information only where needed to operate the Services, comply with law, or protect rights.</em></p>

            <p>
              We may share personal information with the following categories of recipients:
            </p>

            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>Supabase.</strong> We use Supabase for app authentication, database functions, storage, and backend services used by the Practice Planner.
              </li>
              <li>
                <strong>Google.</strong> We use Google for optional Google Sign-In, Google Analytics, Google Tag Manager, Google AdSense, and the Gemini API used by optional Orbit AI features.
              </li>
              <li>
                <strong>Resend.</strong> We use Resend to send support-related emails generated from contact requests.
              </li>
              <li>
                <strong>Kit / ConvertKit and Stripe.</strong> We use these providers where applicable for newsletters, commerce, checkout, payment processing, digital product delivery, and related order administration.
              </li>
              <li>
                <strong>Hosting and infrastructure providers.</strong> Depending on which part of the Services you use, this may include GitHub Pages and Cloudflare.
              </li>
              <li>
                <strong>Professional advisers, authorities, or business counterparties.</strong> We may disclose information where required by law, to protect legal rights, or in connection with a merger, sale, financing, or similar business transaction.
              </li>
            </ul>

            <p>
              We do not sell your personal information.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="transfers">
              5. INTERNATIONAL DATA TRANSFERS
            </h2>

            <p><strong><em>In Short:</em></strong> <em>Some service providers may process personal information outside your country of residence.</em></p>

            <p>
              Some recipients listed above may process personal information in countries outside the European Economic Area, the United Kingdom, or Switzerland, including the United States. Where personal information is transferred internationally, we use a lawful transfer mechanism as required, such as an adequacy decision, the EU-US Data Privacy Framework where applicable, Standard Contractual Clauses approved by the European Commission, the UK addendum, or other appropriate safeguards.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="cookies">
              6. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
            </h2>

            <p><strong><em>In Short:</em></strong> <em>We use essential browser storage and, where permitted, analytics or advertising technologies.</em></p>

            <p>
              We use essential cookies and browser storage where necessary to provide requested functionality, such as keeping you signed in, completing account flows, remembering basic interface preferences, and maintaining service security.
            </p>

            <p>
              We may also use analytics and advertising technologies, such as Google Analytics, Google Tag Manager, and Google AdSense, to understand website usage and measure or display advertising. Where required by law, these non-essential technologies are activated only after you have given consent. You can withdraw consent at any time through the available consent settings.
            </p>

            <h3 className="text-lg font-bold mb-2 text-foreground">6.1 Google Analytics</h3>
            <p className="mb-4">
              We use Google Analytics to understand how our website is used and to improve its functionality. Depending on your consent settings, Google Analytics may process information about pages viewed, interactions, browser or device data, and IP-derived information. For more information, please refer to Google's{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Privacy Policy
              </a>
              .
            </p>

            <h3 className="text-lg font-bold mb-2 text-foreground">6.2 Google AdSense</h3>
            <p className="mb-4">
              We may use Google AdSense to display advertising on our website. Where required, advertising cookies and similar technologies are used only after your consent. You can manage personalized advertising settings through Google's{" "}
              <a
                href="https://adssettings.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Ad Settings
              </a>
              .
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="planner">
              7. PRACTICE PLANNER APP AND ORBIT AI
            </h2>

            <p><strong><em>In Short:</em></strong> <em>The Practice Planner stores the information needed to provide your account and planning workflow. Orbit AI is optional.</em></p>

            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>Account and profile.</strong> If you create an account, we process the account information needed to provide login and profile functionality. If you upload a profile image, that image is stored and may be accessible through the image URL used to display it in the app.
              </li>
              <li>
                <strong>Saved practice plans.</strong> We store the practice content you create, including plan titles, dates, goals, segments, notes, drills, favorites, and related settings so you can return to and edit your work.
              </li>
              <li>
                <strong>Shared practice links.</strong> If you choose to enable a sharing link, anyone who receives that link may be able to view the shared practice until you disable sharing or delete the practice.
              </li>
              <li>
                <strong>Orbit AI.</strong> If you choose to use Orbit AI, we process the relevant plan context, the prompt or instructions you provide, generated outputs, and usage metadata needed to provide the requested AI feature, improve reliability, enforce limits, and prevent abuse. Orbit AI is designed to support coaching decisions, not to make legal or similarly significant decisions about you.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="newsletter">
              8. NEWSLETTER
            </h2>

            <p>
              If you subscribe to our newsletter, we process your email address and related subscription information to send you updates, resources, and marketing communications. Processing is based on your consent under Art. 6 (1) lit. a GDPR. You may withdraw your consent at any time with effect for the future by using the unsubscribe link in any newsletter email.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="convertkitstripe">
              9. DIGITAL PRODUCT SALES VIA CONVERTKIT & STRIPE
            </h2>

            <p><strong><em>In Short:</em></strong> <em>When you purchase a digital product from us, your data is processed to complete the order, deliver files, and comply with legal obligations.</em></p>

            <p>
              When you purchase products or downloads, we may process your name, email address, order details, billing information, payment status, and delivery information. Payment data is processed by the relevant payment provider. The legal basis is Art. 6 (1) lit. b GDPR for contract performance and Art. 6 (1) lit. c GDPR for legal retention duties.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="hosting">
              10. HOSTING OF THE SERVICES
            </h2>

            <p>
              Our website and app use third-party hosting and infrastructure services. The public website may be delivered through GitHub Pages, while app assets and related delivery infrastructure may use Cloudflare. These providers may process technical data such as IP addresses, browser information, and request metadata to deliver the Services securely and reliably.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="inforetain">
              11. HOW LONG DO WE KEEP YOUR INFORMATION?
            </h2>

            <p><strong><em>In Short:</em></strong> <em>We keep personal information only for as long as needed for the relevant purpose or as required by law.</em></p>

            <ul className="list-disc pl-6 space-y-4">
              <li><strong>Account, profile, favorites, and saved practice-plan data:</strong> until you delete the relevant content or request account deletion, unless a longer retention period is required for legal reasons.</li>
              <li><strong>Shared practice links:</strong> until you disable sharing or delete the relevant practice.</li>
              <li><strong>Support messages:</strong> generally up to 24 months after the last substantive communication, unless longer retention is necessary for legal claims or obligations.</li>
              <li><strong>Orbit AI requests, generated outputs, suggestions, and related usage metadata:</strong> generally up to 12 months, unless a shorter or longer period is necessary for deletion requests, security, abuse prevention, or legal obligations.</li>
              <li><strong>Newsletter subscription data:</strong> until you unsubscribe or withdraw consent, subject to limited suppression records needed to respect opt-out requests.</li>
              <li><strong>Order, invoice, and accounting records:</strong> for the statutory retention period, usually up to 10 years under applicable German commercial and tax law.</li>
              <li><strong>Technical logs:</strong> for as long as necessary for security, delivery, diagnostics, and abuse prevention, generally no longer than 30 days unless a longer period is needed to investigate an incident or comply with law.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="infominors">
              12. DO WE COLLECT INFORMATION FROM MINORS?
            </h2>

            <p>
              We do not knowingly collect personal information from children under 16 years of age, or any higher minimum age required by local law, without the required consent. If we learn that we have collected personal information from a child unlawfully, we will take reasonable steps to delete it.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="privacyrights">
              13. WHAT ARE YOUR PRIVACY RIGHTS?
            </h2>

            <p>
              Depending on your location, you may have rights to request access to personal information, rectification, erasure, restriction of processing, data portability, objection to certain processing, and withdrawal of consent where processing is based on consent. You may also have the right to lodge a complaint with a competent supervisory authority.
            </p>

            <p>
              To exercise your rights, contact us at{" "}
              <a
                href="mailto:info@bballorbit.com"
                className="text-primary hover:text-primary/80 underline"
              >
                info@bballorbit.com
              </a>
              .
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="DNT">
              14. CONTROLS FOR DO-NOT-TRACK FEATURES
            </h2>

            <p>
              Some browsers offer "Do Not Track" signals. Because there is no uniform standard for recognizing or implementing these signals, we do not currently respond to them in a standardized way. Where required, your choices for non-essential cookies are handled through the consent tools made available on our Services.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="uslaws">
              15. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
            </h2>

            <p>
              If you are a resident of certain US states, you may have additional rights under applicable state privacy laws, including rights to know, access, correct, delete, obtain a copy of, or opt out of certain processing of your personal information.
            </p>

            <h3 className="text-lg font-bold mb-2 text-foreground">
              Categories of Personal Information We Collect
            </h3>

            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left"><strong>Category</strong></th>
                    <th className="border border-gray-300 p-2 text-left"><strong>Examples</strong></th>
                    <th className="border border-gray-300 p-2 text-left"><strong>Collected</strong></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">A. Identifiers</td>
                    <td className="border border-gray-300 p-2">Name, email address, account identifiers, IP address</td>
                    <td className="border border-gray-300 p-2 text-center">YES</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">B. Protected classification characteristics</td>
                    <td className="border border-gray-300 p-2">Age, race, ethnicity, marital status, and similar protected characteristics</td>
                    <td className="border border-gray-300 p-2 text-center">NO</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">C. Commercial information</td>
                    <td className="border border-gray-300 p-2">Order history, purchase records, billing-related information</td>
                    <td className="border border-gray-300 p-2 text-center">YES</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">D. Biometric information</td>
                    <td className="border border-gray-300 p-2">Fingerprints, faceprints, voiceprints</td>
                    <td className="border border-gray-300 p-2 text-center">NO</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">E. Internet or similar network activity</td>
                    <td className="border border-gray-300 p-2">Usage data, page interactions, browser and device information</td>
                    <td className="border border-gray-300 p-2 text-center">YES</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">F. Geolocation data</td>
                    <td className="border border-gray-300 p-2">Precise device location</td>
                    <td className="border border-gray-300 p-2 text-center">NO</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">G. Audio, electronic, visual, or similar information</td>
                    <td className="border border-gray-300 p-2">Profile images you choose to upload</td>
                    <td className="border border-gray-300 p-2 text-center">YES</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">H. Professional or employment-related information</td>
                    <td className="border border-gray-300 p-2">Job title, work history, professional qualifications</td>
                    <td className="border border-gray-300 p-2 text-center">NO</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">I. Education information</td>
                    <td className="border border-gray-300 p-2">Student records or directory information</td>
                    <td className="border border-gray-300 p-2 text-center">NO</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">J. Inferences</td>
                    <td className="border border-gray-300 p-2">Profiles or predictions about personal preferences or characteristics</td>
                    <td className="border border-gray-300 p-2 text-center">NO</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">K. Sensitive personal information</td>
                    <td className="border border-gray-300 p-2">Sensitive categories under applicable law</td>
                    <td className="border border-gray-300 p-2 text-center">NO</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              We do not sell personal information. If you consent to advertising cookies, certain identifiers and internet or network activity information may be disclosed to advertising partners in a way that may be considered "sharing" under some US state privacy laws. You can opt out by adjusting your consent settings where available.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="policyupdates">
              16. DO WE MAKE UPDATES TO THIS NOTICE?
            </h2>

            <p>
              Yes. We may update this Privacy Notice from time to time to reflect legal, technical, or operational changes. The updated version will be indicated by a revised date at the top of this page.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="contact">
              17. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
            </h2>

            <p>
              If you have questions or comments about this Privacy Notice, you may contact:
            </p>

            <div className="space-y-1">
              <p>Christian Bernhard</p>
              <p>Hitzhofener Strasse 5b</p>
              <p>85080 Gaimersheim</p>
              <p>Germany</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@bballorbit.com"
                  className="text-primary hover:text-primary/80 underline"
                >
                  info@bballorbit.com
                </a>
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="request">
              18. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
            </h2>

            <p>
              You may request access to, correction of, or deletion of your personal information, or exercise other applicable privacy rights, by contacting us at{" "}
              <a
                href="mailto:info@bballorbit.com"
                className="text-primary hover:text-primary/80 underline"
              >
                info@bballorbit.com
              </a>
              . We may need to verify your identity before completing a request.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="SSL">
              19. SSL/TLS ENCRYPTION
            </h2>

            <p>
              This site uses SSL/TLS encryption to protect the transmission of confidential content, such as account, support, or order information you send to us. You can recognize an encrypted connection by "https://" in the browser address bar and the lock symbol in your browser.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
