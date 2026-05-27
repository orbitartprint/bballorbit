import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";

import Footer from "@/components/ui/footer";
import Navigation from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormStatus = "idle" | "submitting" | "success" | "error";

const deletionRequestUrl = import.meta.env.VITE_ACCOUNT_DELETION_REQUEST_URL as string | undefined;

const genericSuccessMessage =
  "Check your inbox. If this email is associated with BballOrbit Practice Planner data, we've sent a confirmation link. The link expires after 60 minutes.";

const genericErrorMessage =
  "We couldn't submit your request right now. Please try again or contact us by email.";

const isValidEmail = (email: string) =>
  email.length <= 255 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const DataDeletion = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState<string | null>(null);

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


Thank you.`,
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    setMessage(null);

    if (!isValidEmail(normalizedEmail)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!deletionRequestUrl) {
      console.warn("VITE_ACCOUNT_DELETION_REQUEST_URL is not configured.");
      setStatus("error");
      setMessage(genericErrorMessage);
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch(deletionRequestUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      if (!response.ok) {
        throw new Error("Deletion request endpoint returned an error.");
      }

      setStatus("success");
      setMessage(genericSuccessMessage);
    } catch (error) {
      console.warn("Data deletion request failed.", error);
      setStatus("error");
      setMessage(genericErrorMessage);
    }
  };

  const isSubmitting = status === "submitting";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto max-w-4xl px-4 py-8 pt-24">
        <Button variant="outline" onClick={() => navigate("/")} className="mb-6">
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Button>

        <div className="rounded-lg border bg-card p-6 shadow-sm sm:p-8">
          <h1 className="mb-4 text-3xl font-bold text-foreground">
            Account & Data Deletion
          </h1>

          <p className="mb-8 leading-relaxed text-muted-foreground">
            Use this page to request deletion of your BballOrbit Practice Planner
            account and associated app data. Deletion only starts after you confirm
            ownership of the email address. If you can still log in to the Practice
            Planner, the fastest way is Profile &rarr; Account & Data &rarr; Delete
            Account.
          </p>

          <div className="space-y-8 leading-relaxed text-muted-foreground">
            <section>
              <h2 className="mb-2 text-xl font-semibold text-foreground">
                Fastest option for logged-in users
              </h2>
              <p>
                If you can still log in to the Practice Planner, the fastest way to
                delete your account is inside the app: Profile &rarr; Account & Data
                &rarr; Delete Account. This starts the authenticated account deletion
                flow directly from your signed-in account.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-semibold text-foreground">
                Request deletion by email verification
              </h2>
              <p>
                Enter the email address connected to your Practice Planner account.
                We will send a confirmation link to that inbox. If you confirm the
                link, the deletion process starts. The link expires after 60 minutes.
              </p>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="account-deletion-email">Email address</Label>
                  <Input
                    id="account-deletion-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="coach@example.com"
                    autoComplete="email"
                    required
                    disabled={isSubmitting}
                    aria-describedby="account-deletion-message"
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="min-h-11 w-full sm:w-auto">
                  {isSubmitting ? "Sending confirmation..." : "Send deletion confirmation link"}
                </Button>

                <div id="account-deletion-message" aria-live="polite">
                  {message && (
                    <p
                      className={`rounded-md border p-4 text-sm leading-6 ${
                        status === "success"
                          ? "border-primary/30 bg-primary/5 text-foreground"
                          : "border-destructive/30 bg-destructive/5 text-foreground"
                      }`}
                    >
                      {message}
                    </p>
                  )}
                </div>
              </form>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-semibold text-foreground">
                What happens next
              </h2>
              <ol className="list-decimal space-y-2 pl-6">
                <li>Enter your account email address in the form above.</li>
                <li>Confirm the deletion request from the verification email.</li>
                <li>After confirmation, deletion starts for matching Practice Planner data.</li>
              </ol>
              <p className="mt-3">
                For privacy, this form does not reveal whether an email address is
                associated with an account.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-semibold text-foreground">
                What data will be deleted
              </h2>
              <p>
                When your verified request is processed, we delete app-owned data
                associated with the verified email address where possible.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Practice Planner account profile</li>
                <li>Saved practice plans</li>
                <li>Practice sections</li>
                <li>Custom drill notes and app-specific data</li>
                <li>App preferences and email sync data</li>
                <li>User-owned app storage files where applicable</li>
                <li>Support or contact records connected to the verified email where possible</li>
                <li>Kit/email subscriber records connected to the request where possible</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-semibold text-foreground">
                External services
              </h2>
              <p>
                Kit/email subscriber data will be removed from BballOrbit email
                systems. Freemius subscriptions and app access are handled as part
                of account deletion when linked to the account.
              </p>
              <p className="mt-3">
                Billing, invoice, tax, accounting, refund, fraud-prevention, or
                dispute records may remain with Freemius or payment providers where
                legally required.
              </p>
              <p className="mt-3">
                If an external provider requires manual completion for full removal,
                we will handle it based on your verified request.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-semibold text-foreground">
                Email fallback
              </h2>
              <p>
                If this form does not work or you need help, email us at{" "}
                <a
                  href="mailto:info@bballorbit.com"
                  className="text-primary underline hover:text-primary/80"
                >
                  info@bballorbit.com
                </a>
                .
              </p>

              <div className="mt-4">
                <Button asChild variant="outline">
                  <a
                    href={`mailto:info@bballorbit.com?subject=${deletionEmailSubject}&body=${deletionEmailBody}`}
                  >
                    <Mail size={16} className="mr-2" />
                    Email us for help
                  </a>
                </Button>
              </div>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-semibold text-foreground">
                Privacy Policy
              </h2>
              <p>
                For more information about how we collect, use, and protect personal
                data, please review our{" "}
                <a href="/privacy" className="text-primary underline hover:text-primary/80">
                  Privacy Policy
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-semibold text-foreground">
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
                  className="text-primary underline hover:text-primary/80"
                >
                  info@bballorbit.com
                </a>
              </p>
            </section>

            <div className="border-t border-border pt-4">
              <p className="text-sm text-muted-foreground">
                Last updated: May 26, 2026
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
