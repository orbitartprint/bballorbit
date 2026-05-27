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
          content="Privacy Policy for Basketball Orbit and the BballOrbit Practice Planner."
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
            <strong>Last updated May 26, 2026</strong>
          </p>

          <div className="space-y-6 text-foreground">
            <p>
              This Privacy Policy for Basketball Orbit and the BballOrbit Practice Planner ("<strong>we</strong>," "<strong>us</strong>," or "<strong>our</strong>") explains how we collect, use, store, share, and protect personal information when you use our websites, digital products, newsletter, and the Basketball Orbit Practice Planner app, including Orbit AI features (together, the "<strong>Services</strong>").
            </p>

            <p>
              This Privacy Policy applies when you:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                Visit{" "}
                <a
                  href="https://www.bballorbit.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 underline"
                >
                  https://www.bballorbit.com
                </a>{" "}
                or any website of ours that links to this Privacy Policy
              </li>
              <li>
                Use the BballOrbit Practice Planner at app.bballorbit.com or any related app domain
              </li>
              <li>
                Create an account, sign in with email or Google, save practice plans, use the Drill Library, create custom drills, export PDFs, use Orbit AI, or use future features such as Drill Creator, Season Plan, Team View, templates, and media uploads
              </li>
              <li>
                Subscribe to our newsletter, download free resources, purchase digital products, purchase or manage a Practice Planner subscription, contact support, or participate in affiliate or referral campaigns
              </li>
            </ul>

            <p>
              <strong>Controller.</strong> The controller responsible for the processing described in this Privacy Policy is Christian Bernhard, Hitzhofener Strasse 5b, 85080 Gaimersheim, Germany, email:{" "}
              <a
                href="mailto:info@bballorbit.com"
                className="text-primary hover:text-primary/80 underline"
              >
                info@bballorbit.com
              </a>
              .
            </p>

            <p>
              <strong>Important note for coaches.</strong> The Practice Planner is designed for coaches and practice planning. Please avoid entering unnecessary personal information about players, especially minors. Do not enter health, injury, disciplinary, school, or other sensitive information about players unless you have a lawful basis and it is strictly necessary for your own coaching records.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="summary">
              SUMMARY OF KEY POINTS
            </h2>

            <p className="italic">
              <strong>
                This summary highlights key points. More detail is provided in the{" "}
                <a href="#toc" className="text-primary hover:text-primary/80 underline">
                  table of contents
                </a>{" "}
                below.
              </strong>
            </p>

            <div className="space-y-4">
              <div>
                <strong>What personal information do we collect?</strong> We collect information you provide, information generated through your use of the Services, technical information collected automatically, and limited information from third parties such as Google Sign-In, Freemius, Stripe, or Kit when you use those features.
              </div>
              <div>
                <strong>Do we process sensitive personal information?</strong> We do not ask for or intentionally require sensitive personal information. You should not include sensitive information in notes, support messages, uploaded media, or AI prompts unless it is necessary and lawful.
              </div>
              <div>
                <strong>How do we use your information?</strong> We use information to provide the website, app, accounts, practice plans, AI features, PDF exports, subscriptions, digital product delivery, support, newsletter, security, analytics where permitted, and legal compliance.
              </div>
              <div>
                <strong>Who processes payments?</strong> Practice Planner subscriptions are handled by Freemius. Separate PDF or digital product purchases may be handled by Kit / ConvertKit Commerce and Stripe. We do not store full payment card details on our own servers.
              </div>
              <div>
                <strong>Do we use AI providers?</strong> If you choose to use Orbit AI, relevant practice-plan context, prompts, and instructions may be sent to our AI provider, currently Google Gemini API or another provider we choose for the feature. You should not include sensitive or confidential personal information in AI prompts.
              </div>
              <div>
                <strong>Do we sell personal information?</strong> No. We do not sell personal information. If you consent to advertising cookies, certain advertising-related disclosures may be considered "sharing" under some US state privacy laws.
              </div>
              <div>
                <strong>How do you exercise privacy rights?</strong> Contact us at{" "}
                <a
                  href="mailto:info@bballorbit.com"
                  className="text-primary hover:text-primary/80 underline"
                >
                  info@bballorbit.com
                </a>
                , use the Practice Planner in-app deletion flow under Profile &rarr; Account & Data &rarr; Delete Account, or submit a verified deletion request through our{" "}
                <a href="/data-deletion" className="text-primary hover:text-primary/80 underline">
                  Data Deletion page
                </a>
                . Website deletion requests require email verification before deletion starts.
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="toc">
              TABLE OF CONTENTS
            </h2>

            <div className="space-y-2">
              <div><a href="#infocollect" className="text-primary hover:text-primary/80 underline">1. WHAT INFORMATION DO WE COLLECT?</a></div>
              <div><a href="#infouse" className="text-primary hover:text-primary/80 underline">2. HOW DO WE USE YOUR INFORMATION?</a></div>
              <div><a href="#legalbases" className="text-primary hover:text-primary/80 underline">3. WHAT LEGAL BASES DO WE RELY ON?</a></div>
              <div><a href="#whoshare" className="text-primary hover:text-primary/80 underline">4. WHEN AND WITH WHOM DO WE SHARE PERSONAL INFORMATION?</a></div>
              <div><a href="#processors" className="text-primary hover:text-primary/80 underline">5. SERVICE PROVIDERS AND PROCESSORS</a></div>
              <div><a href="#payments" className="text-primary hover:text-primary/80 underline">6. PAYMENTS, SUBSCRIPTIONS, AFFILIATES, AND DIGITAL PRODUCT SALES</a></div>
              <div><a href="#planner" className="text-primary hover:text-primary/80 underline">7. PRACTICE PLANNER, ORBIT AI, MEDIA, AND SHARED LINKS</a></div>
              <div><a href="#cookies" className="text-primary hover:text-primary/80 underline">8. COOKIES, CONSENT, ANALYTICS, AND ADVERTISING</a></div>
              <div><a href="#newsletter" className="text-primary hover:text-primary/80 underline">9. NEWSLETTER AND EMAIL COMMUNICATIONS</a></div>
              <div><a href="#transfers" className="text-primary hover:text-primary/80 underline">10. INTERNATIONAL DATA TRANSFERS</a></div>
              <div><a href="#security" className="text-primary hover:text-primary/80 underline">11. HOW DO WE PROTECT YOUR INFORMATION?</a></div>
              <div><a href="#inforetain" className="text-primary hover:text-primary/80 underline">12. HOW LONG DO WE KEEP YOUR INFORMATION?</a></div>
              <div><a href="#infominors" className="text-primary hover:text-primary/80 underline">13. DO WE COLLECT INFORMATION FROM MINORS?</a></div>
              <div><a href="#privacyrights" className="text-primary hover:text-primary/80 underline">14. WHAT ARE YOUR PRIVACY RIGHTS?</a></div>
              <div><a href="#DNT" className="text-primary hover:text-primary/80 underline">15. CONTROLS FOR DO-NOT-TRACK FEATURES</a></div>
              <div><a href="#uslaws" className="text-primary hover:text-primary/80 underline">16. US STATE PRIVACY RIGHTS</a></div>
              <div><a href="#policyupdates" className="text-primary hover:text-primary/80 underline">17. DO WE MAKE UPDATES TO THIS POLICY?</a></div>
              <div><a href="#contact" className="text-primary hover:text-primary/80 underline">18. HOW CAN YOU CONTACT US?</a></div>
              <div><a href="#request" className="text-primary hover:text-primary/80 underline">19. HOW CAN YOU REVIEW, UPDATE, OR DELETE YOUR DATA?</a></div>
            </div>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="infocollect">
              1. WHAT INFORMATION DO WE COLLECT?
            </h2>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
              Information you provide to us
            </h3>

            <p>
              We collect personal information that you voluntarily provide when you use our Services, create an account, subscribe to communications, make purchases, contact us, upload content, or use app features.
            </p>

            <p>
              Depending on how you use the Services, this may include:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contact information:</strong> name, email address, and information you include in messages to us.</li>
              <li><strong>Account and authentication data:</strong> email address, login method, account identifiers, password reset data, session information, and authentication provider information.</li>
              <li><strong>Profile data:</strong> display name, profile image or avatar, and profile settings you choose to provide.</li>
              <li><strong>Practice Planner content:</strong> practice plan titles, dates, age group, level, player count, goals, notes, segments, durations, selected drills, coaching cues, custom instructions, templates, favorites, sharing settings, and PDF export settings.</li>
              <li><strong>Custom drill and future feature content:</strong> custom drills, drill descriptions, constraints, tags, training objectives, media references, Season Plan content, Team View settings, or related coaching workflow data if you use those features.</li>
              <li><strong>Media uploads:</strong> images, audio, video, or other files you choose to upload if media upload features are available to your plan.</li>
              <li><strong>AI feature input:</strong> prompts, additional instructions, plan context, generated AI output, feedback, and AI usage metadata when you choose to use Orbit AI or related AI features.</li>
              <li><strong>Support and feedback data:</strong> support requests, bug reports, feature requests, troubleshooting information, and any files or screenshots you choose to send.</li>
              <li><strong>Purchase and subscription information:</strong> order status, subscription status, plan, billing cycle, renewal or expiration dates, refund status, license identifiers, coupon or referral attribution, and limited payment-related records received from payment providers.</li>
              <li><strong>Newsletter and marketing preferences:</strong> email address, subscription status, consent records, tags, interests, email engagement, and unsubscribe data.</li>
            </ul>

            <p>
              <strong>Sensitive information.</strong> We do not ask for or intentionally require sensitive personal information, such as health data, injury information, religious or political views, government identifiers, biometric information, or detailed information about minors. Please do not include such information in notes, prompts, support messages, or uploads unless you have a lawful basis and it is strictly necessary for your own use of the Services. If you choose to provide sensitive information, we may process it only as needed to provide the requested feature or handle your request.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
              Information collected from third parties
            </h3>

            <p>
              We may receive limited information from third parties when you choose to use integrations or external services:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google Sign-In:</strong> email address, name, profile image, account identifier, and authentication information depending on your Google account settings.</li>
              <li><strong>Freemius:</strong> subscription, purchase, license, customer portal, refund, affiliate attribution, coupon, tax, billing, and invoice-related information for Practice Planner subscriptions.</li>
              <li><strong>Kit / ConvertKit and Stripe:</strong> newsletter subscription, purchase, payment status, checkout, digital product delivery, and order-related information for separate PDF or digital product sales.</li>
              <li><strong>Analytics, advertising, and consent tools:</strong> consent status, cookie preferences, campaign source, referral information, and event data where such tools are enabled and legally permitted.</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
              Information automatically collected
            </h3>

            <p>
              We automatically collect certain technical and usage information when you visit or use the Services. This may include IP address, browser type, device characteristics, operating system, language preferences, referring URLs, pages viewed, timestamps, log data, error reports, security events, and other technical data needed for delivery, diagnostics, security, fraud prevention, analytics, and service improvement.
            </p>

            <p>
              When you use the Practice Planner, we may also process app usage events such as feature usage, AI credit usage, PDF export usage, storage usage, subscription status checks, webhook status, and similar operational data needed to provide and protect the app.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="infouse">
              2. HOW DO WE USE YOUR INFORMATION?
            </h2>

            <p>
              We use personal information for the following purposes:
            </p>

            <ul className="list-disc pl-6 space-y-4">
              <li><strong>To provide the website and app.</strong> This includes account creation, login, profile management, practice planning, drill library access, favorites, PDF export, templates, custom drills, sharing links, and related functionality.</li>
              <li><strong>To provide Orbit AI and future AI-assisted features.</strong> This includes processing relevant plan context and prompts to generate suggestions, coaching cues, drill ideas, plan optimizations, or season-planning support.</li>
              <li><strong>To process subscriptions and purchases.</strong> This includes checkout, subscription management, invoices, renewals, refunds, license verification, access control, customer portal links, coupon handling, and affiliate attribution.</li>
              <li><strong>To deliver digital products and free resources.</strong> This includes email delivery of PDFs, order confirmations, and download access.</li>
              <li><strong>To provide customer support.</strong> This includes responding to support requests, troubleshooting, resolving billing questions, and handling feedback.</li>
              <li><strong>To manage newsletters and communications.</strong> This includes sending emails you requested, managing unsubscribe requests, and sending product updates where permitted.</li>
              <li><strong>To enforce usage limits and subscriptions.</strong> This includes tracking AI credits, PDF export counts, practice plan limits, custom drill limits, media storage, and feature entitlements.</li>
              <li><strong>To keep the Services secure.</strong> This includes fraud prevention, abuse prevention, rate limiting, authentication security, access control, incident detection, and protection against misuse.</li>
              <li><strong>To improve the Services.</strong> This includes analytics, diagnostics, product improvement, performance monitoring, and understanding which features are useful.</li>
              <li><strong>To comply with legal obligations.</strong> This includes tax, accounting, consumer protection, refund, and record-keeping obligations.</li>
              <li><strong>To establish, exercise, or defend legal claims.</strong></li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="legalbases">
              3. WHAT LEGAL BASES DO WE RELY ON?
            </h2>

            <p>
              If you are located in the European Economic Area, the United Kingdom, or Switzerland, we process personal information only when we have a valid legal basis.
            </p>

            <ul className="list-disc pl-6 space-y-4">
              <li><strong>Performance of a contract.</strong> We process account, app, practice-plan, subscription, purchase, digital delivery, support, and billing-related data where necessary to provide the Services you request or to take steps before entering into a contract.</li>
              <li><strong>Consent.</strong> We rely on consent for newsletters, certain marketing communications, and non-essential cookies, analytics, or advertising technologies where consent is required. You may withdraw consent at any time with effect for the future.</li>
              <li><strong>Legitimate interests.</strong> We may process data for security, fraud prevention, diagnostics, product improvement, support, abuse prevention, affiliate attribution, and legal claims where our interests are not overridden by your rights and freedoms.</li>
              <li><strong>Legal obligations.</strong> We process information where needed to comply with tax, accounting, commercial, consumer protection, refund, or other legal requirements.</li>
              <li><strong>Vital interests.</strong> In exceptional cases, we may process information where necessary to protect the vital interests of a person.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="whoshare">
              4. WHEN AND WITH WHOM DO WE SHARE PERSONAL INFORMATION?
            </h2>

            <p>
              We share personal information only where necessary to operate the Services, provide requested functionality, process purchases, comply with law, protect rights, or work with trusted service providers.
            </p>

            <p>
              We may share information with:
            </p>

            <ul className="list-disc pl-6 space-y-4">
              <li><strong>Service providers and processors</strong> that provide hosting, authentication, database, storage, payments, email, analytics, consent management, AI, support, or security services.</li>
              <li><strong>Payment and commerce providers</strong> such as Freemius, Stripe, and Kit / ConvertKit where needed for checkout, payment processing, subscription management, invoices, refunds, license management, delivery, fraud prevention, tax, and accounting.</li>
              <li><strong>AI providers</strong> when you choose to use AI features and the provider needs relevant prompts, instructions, or plan context to generate the requested output.</li>
              <li><strong>Affiliate partners</strong> only to the limited extent necessary for referral and commission tracking if you purchase through an affiliate link or affiliate coupon. Affiliates do not receive full payment card details from us.</li>
              <li><strong>Professional advisers, authorities, courts, or other parties</strong> where required by law, legal process, consumer rights, tax obligations, or protection of our rights.</li>
              <li><strong>Business counterparties</strong> in connection with a merger, acquisition, financing, restructuring, or sale of assets, subject to appropriate safeguards.</li>
            </ul>

            <p>
              We do not sell personal information.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="processors">
              5. SERVICE PROVIDERS AND PROCESSORS
            </h2>

            <p>
              We use third-party services to operate the Services. Depending on which features you use, these may include:
            </p>

            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>Supabase.</strong> We use Supabase for app authentication, database, Row Level Security, Edge Functions, storage, and backend infrastructure. Supabase may process account data, saved app content, usage counters, storage data, authentication logs, and technical data.
              </li>
              <li>
                <strong>Freemius.</strong> We use Freemius for Practice Planner subscriptions, checkout, license and subscription management, customer portal, invoices, taxes, VAT where applicable, refunds, coupons, and affiliate attribution.
              </li>
              <li>
                <strong>Kit / ConvertKit.</strong> We use Kit / ConvertKit for newsletter subscriptions, email forms, subscriber management, free resource delivery, and, where applicable, ConvertKit Commerce for separate digital product sales.
              </li>
              <li>
                <strong>Stripe.</strong> Stripe may process payments for separate digital product purchases made through ConvertKit Commerce or other non-subscription checkout flows. We do not store full card details on our servers.
              </li>
              <li>
                <strong>Google.</strong> We may use Google services for optional Google Sign-In, Google Analytics, Google Tag Manager, Google AdSense, and the Gemini API or related Google AI services for Orbit AI features.
              </li>
              <li>
                <strong>CookieYes or similar consent tools.</strong> We may use a consent management tool to record and manage cookie and tracking preferences.
              </li>
              <li>
                <strong>Resend.</strong> We may use Resend or a similar provider for transactional emails, including account, support, security, and deletion verification emails.
              </li>
              <li>
                <strong>Cloudflare.</strong> We may use Cloudflare for DNS, CDN, security, delivery, deployment, or app hosting infrastructure.
              </li>
              <li>
                <strong>GitHub Pages.</strong> Parts of the public website may be hosted through GitHub Pages, which may process technical request data such as IP addresses and browser metadata for delivery and security.
              </li>
            </ul>

            <p>
              These providers may process information in accordance with their own privacy notices, data processing terms, and applicable laws. Where legally required, we use data processing agreements or other appropriate safeguards.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="payments">
              6. PAYMENTS, SUBSCRIPTIONS, AFFILIATES, AND DIGITAL PRODUCT SALES
            </h2>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
              Practice Planner subscriptions via Freemius
            </h3>

            <p>
              Paid Practice Planner subscriptions are processed through Freemius. Freemius may act as the merchant of record for subscription purchases and may process personal information needed for checkout, tax calculation, VAT handling, fraud prevention, payment, invoices, subscription management, customer portal access, refunds, chargebacks, license verification, and related communications.
            </p>

            <p>
              We may receive and store limited subscription-related information from Freemius, such as your email address, Freemius customer or user ID, license ID, subscription ID, plan, billing cycle, renewal or expiration date, subscription status, refund status, coupon code, and affiliate attribution. We use this information to grant or remove access to paid features, show billing status in your account, enforce subscription limits, handle support, and comply with legal obligations.
            </p>

            <p>
              You may be redirected to, or interact with, a Freemius checkout, overlay, or customer portal to complete payments, manage billing details, view invoices, change plans, or cancel a subscription. We do not store full payment card details on our own servers.
            </p>

            <p>
              If you delete your Practice Planner account and a Freemius subscription or app access record is linked to that account, we handle subscription and access cancellation as part of the deletion workflow. Freemius may retain billing, invoice, tax, accounting, refund, fraud-prevention, chargeback, or dispute records where legally required or permitted.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
              Affiliate links and coupon codes
            </h3>

            <p>
              If you purchase through an affiliate link or use an affiliate coupon, Freemius may process referral, coupon, and attribution data. We and the relevant affiliate may receive limited information necessary to track the referral and calculate commissions. This does not include full payment card details.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
              Separate digital product sales via Kit / ConvertKit and Stripe
            </h3>

            <p>
              Separate PDF resources, playbooks, or other digital products may be sold or delivered through Kit / ConvertKit Commerce and Stripe. In those cases, your name, email address, purchase details, payment status, and delivery information may be processed by Kit / ConvertKit and Stripe to complete the transaction, deliver the files, send receipts, prevent fraud, and comply with legal obligations.
            </p>

            <p>
              The legal basis for purchase-related processing is usually contract performance and legal obligations. We may also retain order records for accounting and tax purposes for the statutory retention period.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="planner">
              7. PRACTICE PLANNER, ORBIT AI, MEDIA, AND SHARED LINKS
            </h2>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
              Practice Planner account and content
            </h3>

            <p>
              If you create a Practice Planner account, we store the information needed to provide your account and app workflow. This includes saved practice plans, plan metadata, segments, notes, selected drills, custom drills, templates, AI outputs, usage counters, subscription status, sharing settings, PDF export status, and related app content.
            </p>

            <p>
              Existing content may remain stored after a downgrade, cancellation, or expiration unless you delete it or request deletion. Paid feature limits may apply after a downgrade, but we do not automatically delete your practice plans solely because you move from Pro to Free.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
              Shared practice links
            </h3>

            <p>
              If you enable a shared practice link, anyone with that link may be able to view the shared content until you disable sharing, change the sharing settings, or delete the relevant practice. Do not share confidential or personal information through shared links unless you have the right to do so.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
              Orbit AI and AI-assisted features
            </h3>

            <p>
              Orbit AI is optional. When you use it, we process the relevant practice-plan context, prompts, additional instructions, generated outputs, feature type, AI credit usage, and technical metadata needed to generate the requested result, enforce usage limits, prevent abuse, troubleshoot errors, and improve reliability.
            </p>

            <p>
              AI requests may be sent to third-party AI providers, currently Google Gemini API or another provider used for a specific AI feature. AI outputs may be inaccurate or incomplete. You should review AI-generated content before using it in practice planning. Please do not include sensitive, confidential, health-related, or player-identifying information in AI prompts unless it is necessary and lawful.
            </p>

            <p>
              We do not use Orbit AI to make legal, employment, credit, insurance, medical, or similarly significant decisions about you.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
              Media uploads
            </h3>

            <p>
              If media upload features are available to your plan, you may upload images, audio, video, or other files for coaching purposes. You are responsible for ensuring that you have the necessary rights, permissions, and legal basis to upload and use such media, especially if it shows or identifies players, minors, parents, coaches, or other third parties.
            </p>

            <p>
              Media may be stored through Supabase Storage or another storage provider and may be processed to display, stream, download, or manage the file in the app. We may track file size and storage usage to enforce plan limits and prevent abuse.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="cookies">
              8. COOKIES, CONSENT, ANALYTICS, AND ADVERTISING
            </h2>

            <p>
              We use essential cookies, local storage, and similar technologies where needed to provide requested functionality, such as login sessions, authentication, security, checkout, consent storage, and app preferences.
            </p>

            <p>
              We may also use analytics, measurement, and advertising technologies such as Google Analytics, Google Tag Manager, Google AdSense, or similar tools. Where required by law, non-essential cookies and tracking technologies are activated only after you have given consent. You can withdraw or change consent using the cookie preferences or consent tool made available on the Services.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
              Google Analytics and Google Tag Manager
            </h3>

            <p>
              We may use Google Analytics and Google Tag Manager to understand how our website and app are used, measure performance, and improve functionality. Depending on your consent settings, Google may process information such as pages viewed, interactions, browser and device data, approximate location derived from IP address, and event data. For more information, please refer to Google's{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline"
              >
                Privacy Policy
              </a>
              .
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
              Google AdSense
            </h3>

            <p>
              We may use Google AdSense to display advertising on the public website. Where legally required, advertising cookies and similar technologies are used only after your consent. You can manage personalized advertising settings through Google's{" "}
              <a
                href="https://adssettings.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline"
              >
                Ad Settings
              </a>
              .
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
              Cookie preferences
            </h3>

            <p>
              If a cookie preference tool is available on the Services, you can use it to manage non-essential cookies. Some essential technologies cannot be disabled because they are necessary for security, login, checkout, or requested app functionality.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="newsletter">
              9. NEWSLETTER AND EMAIL COMMUNICATIONS
            </h2>

            <p>
              If you subscribe to our newsletter or request free resources, we process your email address, consent information, tags, subscription status, and email engagement data to send the requested emails, downloads, updates, and marketing communications. Processing is based on your consent where required. You can unsubscribe at any time using the unsubscribe link in any marketing email.
            </p>

            <p>
              We may also send non-marketing transactional emails related to your account, purchases, subscriptions, support requests, security, invoices, refunds, payment issues, or important service changes. These emails are necessary to provide the Services or comply with legal obligations and may not always include an unsubscribe option.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="transfers">
              10. INTERNATIONAL DATA TRANSFERS
            </h2>

            <p>
              Some service providers may process personal information in countries outside your country of residence, including outside the European Economic Area, the United Kingdom, or Switzerland. This may include the United States and other countries where our providers or their subprocessors operate.
            </p>

            <p>
              Where personal information is transferred internationally, we rely on appropriate transfer mechanisms where required, such as adequacy decisions, the EU-US Data Privacy Framework where applicable, Standard Contractual Clauses approved by the European Commission, the UK International Data Transfer Addendum, or other lawful safeguards.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="security">
              11. HOW DO WE PROTECT YOUR INFORMATION?
            </h2>

            <p>
              We use technical and organizational measures designed to protect personal information, including encrypted transport via HTTPS, access controls, authentication, role-based database rules where applicable, provider-side security measures, and limited access to personal information on a need-to-know basis.
            </p>

            <p>
              No internet service can be guaranteed to be completely secure. You are responsible for keeping your login credentials confidential and for using strong, unique passwords or secure sign-in methods.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="inforetain">
              12. HOW LONG DO WE KEEP YOUR INFORMATION?
            </h2>

            <p>
              We keep personal information only for as long as needed for the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law.
            </p>

            <ul className="list-disc pl-6 space-y-4">
              <li><strong>Account, profile, practice-plan, custom drill, template, and app content:</strong> generally until you delete the content, delete your account, or request deletion, unless retention is required for legal, security, backup, or legitimate operational reasons.</li>
              <li><strong>Shared links:</strong> until you disable sharing, delete the relevant practice, or delete your account, subject to technical caching and backups.</li>
              <li><strong>Media uploads:</strong> generally until you delete the media, delete your account, or request deletion, unless retention is required for legal, security, backup, or abuse-prevention reasons.</li>
              <li><strong>Orbit AI prompts, generated outputs, and AI usage metadata:</strong> generally up to 12 months for troubleshooting, abuse prevention, usage enforcement, and product reliability, unless a shorter or longer period is required by law, deletion request, or security incident.</li>
              <li><strong>Subscription, license, billing status, webhook, and usage records:</strong> for as long as needed to provide subscriptions, handle disputes, maintain access records, comply with accounting or tax requirements, and debug billing issues.</li>
              <li><strong>Order, invoice, and accounting records:</strong> for the statutory retention period, usually up to 10 years under applicable German commercial and tax law.</li>
              <li><strong>Newsletter subscription data:</strong> until you unsubscribe or withdraw consent, subject to limited suppression records needed to respect opt-out requests.</li>
              <li><strong>Support messages:</strong> generally up to 24 months after the last substantive communication, unless longer retention is necessary for legal claims, security, or unresolved issues.</li>
              <li><strong>Deletion requests:</strong> when an account deletion is completed, we keep only a minimal deletion record for audit, security, and operational purposes. This record does not retain the plain email address in the deletion job.</li>
              <li><strong>Technical logs:</strong> for as long as necessary for security, delivery, diagnostics, and abuse prevention, generally no longer than 30 days unless a longer period is needed to investigate an incident or comply with law.</li>
              <li><strong>Backups:</strong> deleted information may remain in encrypted or protected backups for a limited period until backups are overwritten or deleted according to our backup cycle.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="infominors">
              13. DO WE COLLECT INFORMATION FROM MINORS?
            </h2>

            <p>
              The Services are intended for coaches and other users who are at least 16 years old, or the higher minimum age required by local law. We do not knowingly collect personal information directly from children under 16 without the required consent.
            </p>

            <p>
              Coaches are responsible for ensuring that they have the necessary rights and permissions before entering information about players, especially minors, into practice plans, notes, shared links, AI prompts, custom drills, team features, or media uploads. Please avoid entering identifiable information about minors unless it is necessary and lawful.
            </p>

            <p>
              If we learn that we have collected personal information from a child unlawfully, we will take reasonable steps to delete it.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="privacyrights">
              14. WHAT ARE YOUR PRIVACY RIGHTS?
            </h2>

            <p>
              Depending on your location and applicable law, you may have rights to:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>request access to personal information we process about you;</li>
              <li>request correction of inaccurate or incomplete information;</li>
              <li>request deletion of your personal information;</li>
              <li>request restriction of processing;</li>
              <li>object to certain processing based on legitimate interests;</li>
              <li>receive a copy of information you provided in a portable format;</li>
              <li>withdraw consent where processing is based on consent; and</li>
              <li>lodge a complaint with a supervisory authority.</li>
            </ul>

            <p>
              You may exercise your rights by contacting us at{" "}
              <a
                href="mailto:info@bballorbit.com"
                className="text-primary hover:text-primary/80 underline"
              >
                info@bballorbit.com
              </a>
              . If you want to delete a Practice Planner account, you can also use the in-app flow under Profile &rarr; Account & Data &rarr; Delete Account, or submit a verified request through our{" "}
              <a href="/data-deletion" className="text-primary hover:text-primary/80 underline">
                Data Deletion page
              </a>
              . Website deletion requests require email verification before deletion starts.
            </p>

            <p>
              If you are in Bavaria, Germany, the competent supervisory authority for private-sector organizations is generally the Bayerisches Landesamt für Datenschutzaufsicht (BayLDA). You may also contact another competent data protection authority.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="DNT">
              15. CONTROLS FOR DO-NOT-TRACK FEATURES
            </h2>

            <p>
              Some browsers offer "Do Not Track" signals. Because there is no uniform standard for recognizing or implementing these signals, we do not currently respond to them in a standardized way. Where required, your choices for non-essential cookies are handled through the consent tools made available on the Services.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="uslaws">
              16. US STATE PRIVACY RIGHTS
            </h2>

            <p>
              If you are a resident of certain US states, you may have additional rights under applicable state privacy laws, including rights to know, access, correct, delete, obtain a copy of, or opt out of certain processing of your personal information.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
              Categories of Personal Information We Collect
            </h3>

            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-gray-300 p-2 text-left"><strong>Category</strong></th>
                    <th className="border border-gray-300 p-2 text-left"><strong>Examples</strong></th>
                    <th className="border border-gray-300 p-2 text-left"><strong>Collected</strong></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">A. Identifiers</td>
                    <td className="border border-gray-300 p-2">Name, email address, account identifiers, IP address, affiliate or customer identifiers</td>
                    <td className="border border-gray-300 p-2 text-center">YES</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">B. Protected classification characteristics</td>
                    <td className="border border-gray-300 p-2">Age, race, ethnicity, marital status, and similar protected characteristics</td>
                    <td className="border border-gray-300 p-2 text-center">NO</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">C. Commercial information</td>
                    <td className="border border-gray-300 p-2">Order history, purchase records, subscriptions, refunds, coupon or affiliate attribution</td>
                    <td className="border border-gray-300 p-2 text-center">YES</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">D. Biometric information</td>
                    <td className="border border-gray-300 p-2">Fingerprints, faceprints, voiceprints</td>
                    <td className="border border-gray-300 p-2 text-center">NO</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">E. Internet or similar network activity</td>
                    <td className="border border-gray-300 p-2">Usage data, pages viewed, app events, browser and device information, technical logs</td>
                    <td className="border border-gray-300 p-2 text-center">YES</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">F. Geolocation data</td>
                    <td className="border border-gray-300 p-2">Approximate location derived from IP address; not precise device location</td>
                    <td className="border border-gray-300 p-2 text-center">YES</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">G. Audio, electronic, visual, or similar information</td>
                    <td className="border border-gray-300 p-2">Profile images, screenshots, uploaded drill media, video or audio if you choose to upload it</td>
                    <td className="border border-gray-300 p-2 text-center">YES</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">H. Professional or employment-related information</td>
                    <td className="border border-gray-300 p-2">Coaching role or team context if you choose to provide it</td>
                    <td className="border border-gray-300 p-2 text-center">YES</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">I. Education information</td>
                    <td className="border border-gray-300 p-2">Student records or protected educational records</td>
                    <td className="border border-gray-300 p-2 text-center">NO</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">J. Inferences</td>
                    <td className="border border-gray-300 p-2">Limited product preferences or feature interests inferred from app usage or email engagement</td>
                    <td className="border border-gray-300 p-2 text-center">YES</td>
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
              We do not sell personal information. If you consent to advertising cookies, certain identifiers and internet or network activity information may be disclosed to advertising partners in a way that may be considered "sharing" under some US state privacy laws. You can opt out by adjusting your cookie or consent settings where available.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="policyupdates">
              17. DO WE MAKE UPDATES TO THIS POLICY?
            </h2>

            <p>
              Yes. We may update this Privacy Policy from time to time to reflect legal, technical, or operational changes. The updated version will be indicated by a revised date at the top of this page. If changes are material, we may provide additional notice where required by law.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6" id="contact">
              18. HOW CAN YOU CONTACT US?
            </h2>

            <p>
              If you have questions or comments about this Privacy Policy, you may contact:
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
              19. HOW CAN YOU REVIEW, UPDATE, OR DELETE YOUR DATA?
            </h2>

            <p>
              You may review or update certain account information directly in the Practice Planner account area where available. If you can still log in to the Practice Planner, you can delete your account under Profile &rarr; Account & Data &rarr; Delete Account. You may also request access to, correction of, deletion of, restriction of, or portability of your personal information by contacting us at{" "}
              <a
                href="mailto:info@bballorbit.com"
                className="text-primary hover:text-primary/80 underline"
              >
                info@bballorbit.com
              </a>
              .
            </p>

            <p>
              For website-based account and data deletion requests, visit our{" "}
              <a
                href="/data-deletion"
                className="text-primary hover:text-primary/80 underline"
              >
                Data Deletion page
              </a>
              . The website form asks for your email address and sends a verification link. Deletion starts only after you confirm through that email link, and the form does not reveal whether an account exists.
            </p>

            <p>
              Account deletion may include Practice Planner account and profile data, saved practice plans, practice sections, app content and notes, app usage data where applicable, app storage files where applicable, email subscriber records where possible, and support or contact records linked to the verified email where possible. We keep a minimal deletion record for audit and security purposes without retaining the plain email address in the deletion job.
            </p>

            <p>
              Some information may remain where legally required or necessary, including payment, invoice, tax, accounting, refund, fraud-prevention, dispute, legal-claim, security-log, and backup records. Freemius may retain billing or invoice records for Practice Planner subscriptions where legally required.
            </p>

            <p>
              To unsubscribe from marketing emails, use the unsubscribe link in the relevant email. To manage non-essential cookies, use the available cookie preferences or consent tool.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
