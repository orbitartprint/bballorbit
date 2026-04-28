import { useEffect } from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DataDeletion = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const deletionEmailSubject = encodeURIComponent("Account and Data Deletion Request");
  const deletionEmailBody = encodeURIComponent(
    `Hello Basketball Orbit,

I would like to request deletion of my Practice Planner account and associated personal data.

Please use the following information to identify my account:

Account email:
Full name, if applicable:

Optional reason for deletion:


Thank you.`
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Button>

        <div className="bg-card rounded-lg shadow-sm p-8 border">
          <h1 className="text-3xl font-bold mb-4 text-foreground">
            Account & Data Deletion
          </h1>

          <p className="text-muted-foreground leading-relaxed mb-8">
            This page explains how you can request deletion of your Basketball Orbit
            Practice Planner account and associated personal data.
          </p>

          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-foreground">
                How to request account deletion
              </h2>
              <p>
                If you have created a Practice Planner account and would like to
                delete it, please send us a deletion request from the email address
                connected to your account.
              </p>

              <div className="mt-4">
                <Button asChild>
                  <a
                    href={`mailto:info@bballorbit.com?subject=${deletionEmailSubject}&body=${deletionEmailBody}`}
                  >
                    <Mail size={16} className="mr-2" />
                    Request Account Deletion
                  </a>
                </Button>
              </div>

              <p className="mt-4">
                You can also email us directly at{" "}
                <a
                  href="mailto:info@bballorbit.com"
                  className="text-primary hover:text-primary/80 underline"
                >
                  info@bballorbit.com
                </a>{" "}
                with the subject line “Account and Data Deletion Request”.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-foreground">
                Information to include
              </h2>
              <p>
                To help us identify your account, please include the following
                information in your request:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>The email address connected to your Practice Planner account</li>
                <li>Your name, if you added one to your account</li>
                <li>Optional: the reason for your deletion request</li>
              </ul>
              <p className="mt-3">
                For security reasons, we may ask you to confirm your request before
                deleting account data.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-foreground">
                What data will be deleted
              </h2>
              <p>
                When your deletion request is processed, we will delete or anonymize
                personal data associated with your Practice Planner account, unless
                we are legally required to retain certain information.
              </p>
              <p className="mt-3">
                This may include:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Your Practice Planner account profile</li>
                <li>Saved practice plans connected to your account</li>
                <li>Custom notes, preferences, or app-specific settings connected to your account</li>
                <li>Support requests connected to your account, where deletion is legally and technically possible</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-foreground">
                Data we may need to retain
              </h2>
              <p>
                Some information may need to be retained for legal, security,
                accounting, fraud prevention, dispute resolution, or compliance
                reasons. If retention is required, we will keep only the data
                necessary for those purposes and only for as long as required.
              </p>
              <p className="mt-3">
                For example, payment or transaction records may need to be retained
                if you purchase a paid product or subscription in the future.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-foreground">
                Processing time
              </h2>
              <p>
                We aim to review and process deletion requests as soon as reasonably
                possible. Depending on the type of data and verification needed,
                processing may take some time.
              </p>
              <p className="mt-3">
                We will contact you if we need additional information to verify or
                complete your request.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-foreground">
                In-app account deletion
              </h2>
              <p>
                If you are using the Basketball Orbit Practice Planner app, account
                options are available inside the app under Profile → Account & Data.
                As the app develops, this section may include a direct in-app account
                deletion flow.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-foreground">
                Privacy Policy
              </h2>
              <p>
                For more information about how we collect, use, and protect personal
                data, please review our{" "}
                <a
                  href="/privacy"
                  className="text-primary hover:text-primary/80 underline"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-foreground">
                Contact
              </h2>
              <p>
                If you have questions about account deletion or personal data, please
                contact:
              </p>
              <p className="mt-3">
                <span className="font-semibold text-foreground">Christian Bernhard</span>
                <br />
                Email:{" "}
                <a
                  href="mailto:info@bballorbit.com"
                  className="text-primary hover:text-primary/80 underline"
                >
                  info@bballorbit.com
                </a>
              </p>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Last updated: April 28, 2026
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DataDeletion;
