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
        <meta
          name="description"
          content="Terms of Service for Basketball Orbit, BballOrbit Practice Planner, subscriptions, digital coaching resources, and AI-assisted practice planning tools."
        />
        <meta property="og:title" content="Terms of Service | Basketball Orbit" />
        <meta
          property="og:description"
          content="Terms of Service for Basketball Orbit, BballOrbit Practice Planner, subscriptions, digital coaching resources, and AI-assisted practice planning tools."
        />
        <meta property="og:url" content="https://www.bballorbit.com/terms" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 pt-20 max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: May 20, 2026</p>

          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">1. Scope and Acceptance of These Terms</h2>
              <p className="text-base leading-relaxed mb-4">
                These Terms of Service (&quot;Terms&quot;) apply to your access to and use of Basketball Orbit, including the website at
                bballorbit.com, the BballOrbit Practice Planner app at app.bballorbit.com, any related pages, products, digital downloads,
                coaching resources, practice planning tools, AI-assisted features, and services offered under the Basketball Orbit or
                BballOrbit brand (together, the &quot;Service&quot;).
              </p>
              <p className="text-base leading-relaxed mb-4">
                By accessing or using the Service, creating an account, downloading resources, purchasing a digital product, or subscribing
                to a paid plan, you agree to these Terms. If you do not agree to these Terms, you must not use the Service.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Additional terms from third-party providers may apply where their services are used, especially for payment processing,
                checkout, subscriptions, billing management, email delivery, authentication, hosting, analytics, or AI processing. If there is
                a conflict between these Terms and mandatory consumer protection laws, the mandatory laws prevail.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">2. Provider, Contact and Support</h2>
              <p className="text-base leading-relaxed mb-4">
                Basketball Orbit is operated by the provider identified in our{' '}
                <a href="/legal" className="text-primary hover:underline">Legal Notice</a>. For support, billing questions, refund requests,
                account questions, or questions about these Terms, contact us at{' '}
                <a href="mailto:info@bballorbit.com" className="text-primary hover:underline">info@bballorbit.com</a>.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Please include enough information for us to understand and investigate your request, such as the email address associated with
                your account, the product or subscription concerned, and a clear description of the issue.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">3. The Service</h2>
              <p className="text-base leading-relaxed mb-4">
                Basketball Orbit provides basketball coaching content, educational resources, drill ideas, practice planning tools, digital
                downloads, and related services. The BballOrbit Practice Planner is designed to help coaches create, organize, improve, export,
                and manage basketball practice plans. Features may include, depending on the plan and availability: a practice builder, drill
                library, PDF export, Orbit AI assistance, AI-generated coaching cues, plan optimization, custom drills, plan templates, media
                uploads, a drill creator, season planning, team views, and related coaching workflow tools.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Some features may be released gradually, be marked as beta, be available only to paid users, or be changed, suspended, or
                discontinued. References to planned or upcoming features do not create a guarantee that a feature will be released at a
                particular time or in a particular form.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">4. Accounts and Eligibility</h2>
              <p className="text-base leading-relaxed mb-4">
                Certain parts of the Service require an account. You must provide accurate information, keep your login credentials secure,
                and notify us if you suspect unauthorized access to your account. You are responsible for activity that occurs through your
                account unless the activity results from our failure to apply reasonable security measures.
              </p>
              <p className="text-base leading-relaxed mb-4">
                You must be legally capable of entering into a binding agreement in your jurisdiction. If you use the Service on behalf of a
                club, school, organization, team, or employer, you represent that you have authority to do so and that the organization agrees
                to these Terms.
              </p>
              <p className="text-base leading-relaxed mb-4">
                The Service is intended for coaches, trainers, educators, and basketball-related users. It is not intended for children to
                create paid accounts or make purchases without the consent and supervision of a parent, guardian, or authorized organization.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">5. Free Plan, Paid Plans and Usage Limits</h2>
              <p className="text-base leading-relaxed mb-4">
                The Practice Planner may offer a free plan and one or more paid subscription options. The Free plan is intended to let users
                try core workflows. Paid plans provide expanded limits and professional workflow features. The exact limits and features shown
                in the app or on the pricing page apply at the time of use or purchase.
              </p>
              <p className="text-base leading-relaxed mb-4">
                As of the last update of these Terms, the Free plan may include limited saved practice plans, limited AI credits, limited PDF
                exports, limited custom drills, and limited or no media upload capabilities. Orbit Pro may include higher or unlimited limits,
                additional AI credits, unlimited PDF exports, custom drills, templates, media storage, custom branding, and planned Pro features
                such as Drill Creator, Season Plan, Team View, or similar tools as they roll out.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Usage limits may apply monthly, per account, per user, per team, or per storage quota. Examples include practice plan limits,
                AI credit limits, PDF export limits, custom drill limits, plan template limits, media upload permissions, storage quotas, fair
                use restrictions, and technical rate limits. We may update limits to protect the Service, prevent abuse, control costs, or
                improve product quality. Material changes to paid plan limits will not reduce your core paid access during an active billing
                period unless required for security, legal, abuse-prevention, or technical reasons.
              </p>
              <p className="text-base leading-relaxed mb-4">
                If you exceed a limit, the app may block new actions while keeping existing content available. For example, a Free user who
                reaches the saved-practice-plan limit may still view or edit existing plans but may need to delete a plan or upgrade before
                creating another saved plan. If a paid subscription ends or is downgraded, existing content is not automatically deleted, but
                Free plan limits may restrict creating new content, exports, uploads, or Pro-only actions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">6. Subscriptions, Billing, Renewal and Cancellation</h2>
              <p className="text-base leading-relaxed mb-4">
                Paid Practice Planner subscriptions are billed through Freemius or another payment provider shown at checkout. Freemius may act
                as the merchant of record for subscription purchases, meaning Freemius can be responsible for checkout, payment collection,
                invoices, applicable taxes, fraud prevention, refunds, and subscription management for those transactions.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Subscription prices, billing intervals, currencies, tax treatment, available payment methods, and renewal terms are shown during
                checkout. Unless stated otherwise at checkout, subscriptions renew automatically at the end of each billing period until canceled.
                You are responsible for keeping your payment information current.
              </p>
              <p className="text-base leading-relaxed mb-4">
                You can manage billing, update payment information, view invoices, change your subscription, or cancel through the billing
                controls provided in your account or through the secure Freemius customer portal. Subscription changes, renewals, prorations,
                cancellations, failed-payment handling, and invoices may be governed by Freemius' terms and checkout terms in addition to these
                Terms.
              </p>
              <p className="text-base leading-relaxed mb-4">
                If you cancel a subscription, access to paid features may continue until the end of the current billing period unless the
                payment provider, refund handling, or applicable law requires otherwise. After cancellation, expiration, payment failure, refund,
                chargeback, or downgrade, your account may revert to the Free plan and Free plan limits may apply. We do not delete your content
                merely because a subscription ends, but access to creating, exporting, uploading, or using Pro features may be restricted.
              </p>
              <p className="text-base leading-relaxed mb-4">
                We may change prices for future subscription periods. If required by law or by the payment provider's process, you will be
                notified before a price change affects an active subscription. You may cancel before the next renewal if you do not agree to a
                future price change.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">7. Refund Policy</h2>
              <p className="text-base leading-relaxed mb-4">
                Practice Planner subscriptions sold through Freemius are covered by a 7-day Satisfaction Guarantee. If, within 7 days after your
                purchase, the product does not work as expected, a feature you reasonably expected is missing, or you experience a technical issue
                that we cannot resolve, we will consider offering a 100% refund.
              </p>
              <p className="text-base leading-relaxed mb-4">
                To request a refund, contact{' '}
                <a href="mailto:info@bballorbit.com" className="text-primary hover:underline">info@bballorbit.com</a> within the valid refund
                period and include a reasonable explanation of the issue. We may try to resolve the issue first. If we cannot resolve it in a
                way that reasonably satisfies you, we will process a refund in accordance with the applicable Freemius refund process.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Refund requests based only on a change of mind, lack of use, accidental renewal after the refund period, or requests without a
                reasonable explanation are not covered by this refund policy. This does not limit any mandatory consumer rights that cannot be
                excluded by law.
              </p>
              <p className="text-base leading-relaxed mb-4">
                For one-time digital downloads or other digital products, the refund terms shown at checkout apply. Because digital content may
                be delivered immediately, refunds for downloaded or accessed digital products may be limited unless there is a technical issue,
                duplicate purchase, missing delivery, or another reason we accept under the applicable checkout policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">8. Digital Products, Downloads and Right of Withdrawal</h2>
              <p className="text-base leading-relaxed mb-4">
                Some Basketball Orbit products are digital content delivered electronically, such as PDFs, coaching guides, drill packs,
                templates, or downloadable resources. No physical goods are shipped unless expressly stated otherwise.
              </p>
              <p className="text-base leading-relaxed mb-4">
                For digital content or digital services that are supplied immediately, you may be asked during checkout to consent to immediate
                delivery or immediate access and to acknowledge that you may lose any statutory right of withdrawal once performance has begun,
                to the extent permitted by applicable law. Any voluntary refund policy, such as the 7-day Satisfaction Guarantee for eligible
                subscriptions, applies in addition to and does not limit mandatory consumer rights.
              </p>
              <p className="text-base leading-relaxed mb-4">
                You are responsible for providing a valid email address and ensuring that download links, login emails, transactional emails, or
                billing emails can be received. If delivery fails, contact us at{' '}
                <a href="mailto:info@bballorbit.com" className="text-primary hover:underline">info@bballorbit.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">9. License and Permitted Use</h2>
              <p className="text-base leading-relaxed mb-4">
                Unless expressly stated otherwise, Basketball Orbit content, downloads, drills, templates, PDFs, videos, graphics, text, and
                coaching materials are provided under a limited, non-exclusive, non-transferable license for your personal coaching, educational,
                internal team, or internal organizational use.
              </p>
              <p className="text-base leading-relaxed mb-4">
                You may use purchased or downloaded materials to plan practices, teach your own athletes, support your own coaching staff, print
                materials for internal use, and adapt ideas for your own coaching context. You may not resell, sublicense, publish, upload,
                distribute, share publicly, mass-forward, include in a competing product, use in a commercial content library, or otherwise make
                Basketball Orbit materials available to third parties without written permission.
              </p>
              <p className="text-base leading-relaxed mb-4">
                All Basketball Orbit and BballOrbit names, logos, graphics, designs, videos, written materials, app screens, coaching content,
                and related intellectual property remain owned by Basketball Orbit or its licensors. No rights are transferred to you except the
                limited rights expressly granted in these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">10. User Content and Media Uploads</h2>
              <p className="text-base leading-relaxed mb-4">
                You may be able to create, enter, upload, or store content in the Service, such as practice plans, notes, custom drills, coaching
                cues, templates, images, audio, video, or other media (&quot;User Content&quot;). You retain ownership of your User Content.
              </p>
              <p className="text-base leading-relaxed mb-4">
                You grant us a limited, worldwide, non-exclusive, royalty-free license to host, store, process, transmit, display, reproduce,
                and technically modify your User Content solely as necessary to operate, secure, maintain, improve, and provide the Service to
                you. This includes generating PDFs, displaying your plans, processing AI requests, storing media files, and synchronizing data
                across devices.
              </p>
              <p className="text-base leading-relaxed mb-4">
                You are responsible for ensuring that you have all necessary rights and permissions for any User Content you upload or enter.
                Do not upload content that violates intellectual property rights, privacy rights, personality rights, contractual obligations,
                league or club rules, or applicable law. Do not upload sensitive personal information about athletes, minors, players, parents,
                or staff unless you have a lawful basis and appropriate consent.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Media uploads may be limited to paid plans, file size limits, storage quotas, supported formats, and fair use rules. We may
                remove or restrict User Content that appears unlawful, abusive, harmful, infringing, malicious, or inconsistent with these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">11. AI-Assisted Features</h2>
              <p className="text-base leading-relaxed mb-4">
                Orbit AI and related AI-assisted features may help generate, improve, summarize, structure, or optimize basketball practice
                plans, coaching cues, drills, season plans, templates, or related content. AI output can be incomplete, inaccurate, unsuitable,
                outdated, or inconsistent with your coaching context.
              </p>
              <p className="text-base leading-relaxed mb-4">
                You are responsible for reviewing, adapting, and validating AI-generated output before using it with athletes or staff. AI output
                is not professional medical, legal, safety, child protection, sports science, or emergency advice. You must apply your own
                coaching judgment and adapt all activities to the age, skill level, health, physical condition, facility, equipment, supervision,
                and safety needs of your players.
              </p>
              <p className="text-base leading-relaxed mb-4">
                AI features may consume monthly AI credits or other usage units. Credit costs may vary by action. We may apply rate limits,
                fair-use limits, abuse-prevention controls, and technical safeguards. Failed AI requests should not intentionally consume credits,
                but technical edge cases may occur; contact us if you believe credits were incorrectly used.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Do not submit confidential, sensitive, medical, highly personal, or legally protected information to AI features unless you have
                the right and a lawful basis to do so. More information about data handling is provided in our{' '}
                <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">12. Coaching, Health and Safety Disclaimer</h2>
              <p className="text-base leading-relaxed mb-4">
                Basketball activities involve inherent risks, including injury. Our drills, practice plans, videos, and coaching ideas are for
                educational purposes and must be adapted to the specific participants, facility, equipment, supervision, weather, floor conditions,
                medical restrictions, and applicable safety rules.
              </p>
              <p className="text-base leading-relaxed mb-4">
                You are responsible for deciding whether an activity is appropriate for your players and for ensuring proper supervision,
                warm-up, progression, equipment, spacing, and emergency procedures. Basketball Orbit does not assume responsibility for injuries,
                damages, losses, or incidents resulting from the use or misuse of coaching content, AI output, drills, or practice plans.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">13. Acceptable Use</h2>
              <p className="text-base leading-relaxed mb-4">
                You agree not to misuse the Service. In particular, you must not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-relaxed mb-4">
                <li>violate applicable law, third-party rights, intellectual property rights, privacy rights, or contractual obligations;</li>
                <li>share login credentials, circumvent account limits, bypass payment or feature restrictions, or attempt unauthorized access;</li>
                <li>scrape, crawl, copy, or extract content or data except as permitted by law or by written permission;</li>
                <li>upload malware, malicious code, illegal content, infringing content, or content intended to disrupt the Service;</li>
                <li>use the Service to build, train, or improve a competing product or dataset without permission;</li>
                <li>abuse AI, export, storage, media, or API functionality in a way that creates excessive load or cost;</li>
                <li>harass, threaten, impersonate, mislead, or harm other users or third parties.</li>
              </ul>
              <p className="text-base leading-relaxed mb-4">
                We may suspend, restrict, or terminate access if we reasonably believe that an account has violated these Terms, creates security
                or legal risk, abuses usage limits, or threatens the stability of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">14. Newsletter, Emails and Communications</h2>
              <p className="text-base leading-relaxed mb-4">
                If you subscribe to our newsletter, download a resource, create an account, or purchase a product, we may send you emails related
                to that action. These may include educational coaching content, product updates, account emails, onboarding emails, billing notices,
                receipts, renewal reminders, failed-payment notices, refund confirmations, security messages, and support replies.
              </p>
              <p className="text-base leading-relaxed mb-4">
                You can unsubscribe from marketing emails using the unsubscribe link in those emails. Transactional, billing, security, account,
                and service-related emails may still be sent where necessary to provide the Service or fulfill legal or contractual obligations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">15. Third-Party Services</h2>
              <p className="text-base leading-relaxed mb-4">
                The Service may rely on third-party providers for hosting, authentication, database services, storage, email delivery, payment
                processing, billing management, analytics, AI processing, and other functionality. These providers may include Freemius, Supabase,
                email service providers, AI model providers, hosting/CDN providers, and analytics or infrastructure tools.
              </p>
              <p className="text-base leading-relaxed mb-4">
                For payments and subscriptions handled by Freemius, Freemius' terms, checkout terms, privacy policy, and customer portal terms may
                apply in addition to these Terms. You can manage Freemius purchases and subscriptions through the billing controls in your account
                or through the Freemius customer portal where available.
              </p>
              <p className="text-base leading-relaxed mb-4">
                We are not responsible for outages, errors, delays, security incidents, or policy decisions of third-party services outside our
                reasonable control. We will make reasonable efforts to choose reputable providers and to restore affected functionality when issues
                occur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">16. Availability, Changes and Data Backups</h2>
              <p className="text-base leading-relaxed mb-4">
                We aim to provide a reliable Service, but we do not guarantee uninterrupted availability, error-free operation, or permanent
                availability of every feature. Maintenance, updates, third-party outages, security incidents, capacity limits, or technical issues
                may affect access.
              </p>
              <p className="text-base leading-relaxed mb-4">
                You should keep your own copies of important practice plans, PDFs, media, and coaching materials. While we use reasonable efforts
                to protect and maintain data, no online service can guarantee that data will never be lost, corrupted, delayed, or unavailable.
              </p>
              <p className="text-base leading-relaxed mb-4">
                We may modify the Service, add features, remove features, introduce beta features, change UI, change technical providers, or adjust
                limits. We will try to avoid changes that materially reduce paid functionality during an active billing period unless required for
                legal, security, abuse-prevention, operational, or technical reasons.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">17. Privacy and Data Deletion</h2>
              <p className="text-base leading-relaxed mb-4">
                Our collection and use of personal data is described in our{' '}
                <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>. If you want to request deletion of your account
                or personal data, please follow the instructions on our{' '}
                <a href="/data-deletion" className="text-primary hover:underline">Data Deletion</a> page or contact us at{' '}
                <a href="mailto:info@bballorbit.com" className="text-primary hover:underline">info@bballorbit.com</a>.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Deleting an account may permanently remove access to saved practice plans, custom drills, uploaded media, and related data. Some
                information may need to be retained where required for billing, tax, fraud prevention, legal compliance, dispute handling, security,
                or legitimate business records.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">18. Limitation of Liability</h2>
              <p className="text-base leading-relaxed mb-4">
                To the fullest extent permitted by applicable law, Basketball Orbit is not liable for indirect, incidental, special, consequential,
                punitive, or loss-of-profit damages, loss of data, loss of business opportunity, coaching decisions, team performance outcomes, or
                third-party service issues arising from or related to the Service.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Nothing in these Terms limits liability for intent, gross negligence, injury to life, body, or health, mandatory statutory liability,
                or any liability that cannot legally be excluded or limited. For paid services, any liability not excluded under these Terms is,
                where legally permitted, limited to the amount you paid for the relevant service during the twelve months preceding the event giving
                rise to the claim.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">19. Indemnity</h2>
              <p className="text-base leading-relaxed mb-4">
                To the extent permitted by applicable law, you agree to indemnify and hold Basketball Orbit harmless from claims, losses, damages,
                liabilities, costs, and expenses arising from your unlawful use of the Service, your breach of these Terms, your User Content, your
                violation of third-party rights, or your use of coaching content in a way that is unsafe, unlawful, or inconsistent with these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">20. Termination and Suspension</h2>
              <p className="text-base leading-relaxed mb-4">
                You may stop using the Service at any time. Paid subscriptions must be canceled through the billing management options made
                available to you or through the payment provider's customer portal. Deleting your account does not automatically cancel a paid
                subscription unless the billing provider or our app explicitly confirms cancellation.
              </p>
              <p className="text-base leading-relaxed mb-4">
                We may suspend or terminate access if you violate these Terms, create legal or security risk, fail to pay amounts due, abuse the
                Service, infringe intellectual property rights, or use the Service in a harmful or unlawful way. Where reasonable and legally
                possible, we will provide notice or an opportunity to resolve the issue.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">21. Consumer Dispute Resolution</h2>
              <p className="text-base leading-relaxed mb-4">
                We are not willing and not obliged to participate in dispute resolution proceedings before a consumer arbitration board under the
                German Consumer Dispute Resolution Act (Verbraucherstreitbeilegungsgesetz - VSBG).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">22. Governing Law and Jurisdiction</h2>
              <p className="text-base leading-relaxed mb-4">
                These Terms are governed by the laws of Germany, excluding conflict-of-law rules, unless mandatory consumer protection laws provide
                otherwise. If you are a consumer, this choice of law does not deprive you of mandatory protections of the country in which you
                habitually reside.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Where legally permitted, disputes arising from or relating to these Terms or the Service will be handled by the competent courts in
                Germany. Mandatory jurisdiction rules for consumers remain unaffected.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">23. Changes to These Terms</h2>
              <p className="text-base leading-relaxed mb-4">
                We may update these Terms from time to time. The updated version will be posted on this page with a new &quot;Last updated&quot; date.
                Material changes may also be communicated by email, in-app notice, or other reasonable means where appropriate. Your continued use
                of the Service after changes become effective means that you accept the updated Terms. If you do not agree, you must stop using the
                Service and, if applicable, cancel any paid subscription before the next renewal.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">24. Contact</h2>
              <p className="text-base leading-relaxed mb-4">
                For questions about these Terms, refunds, billing, support, or account matters, contact us at{' '}
                <a href="mailto:info@bballorbit.com" className="text-primary hover:underline">info@bballorbit.com</a>.
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
