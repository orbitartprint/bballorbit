import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const FORM_UID = "d0839f9f3a";

/** Only the inline newsletter is embedded. Individual PDF signups use hosted links. */
export default function KitSignupForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new MutationObserver(() => {
      if (container.querySelector("form")) setReady(true);
    });
    observer.observe(container, { childList: true, subtree: true });
    const script = document.createElement("script");
    script.async = true;
    script.dataset.uid = FORM_UID;
    script.src = `https://bballorbit.kit.com/${FORM_UID}/index.js`;
    script.onerror = () => setFailed(true);
    container.appendChild(script);
    return () => {
      observer.disconnect();
      script.onerror = null;
      // The generated inline form lives entirely inside this React-owned container.
      container.replaceChildren();
    };
  }, []);

  return (
    <section className="w-full max-w-md" aria-labelledby="newsletter-heading">
      <h2 id="newsletter-heading" className="mb-3 text-xl font-semibold">Get the free coaching PDFs</h2>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        Receive the PDFs and Basketball Orbit coaching emails. Check your inbox to confirm your subscription. You can unsubscribe at any time.
      </p>
      <div ref={containerRef} className="[&_button[type=submit]]:!text-black" />
      {!ready && <p className="mt-4 text-sm text-muted-foreground" role="status">
        {failed ? "The signup form could not load. Please reload this page to try again." : "Loading the signup form…"}
      </p>}
      <p className="mt-3 text-xs text-muted-foreground">
        Read our <Link to="/privacy" className="underline underline-offset-4">Privacy Policy</Link>.
      </p>
    </section>
  );
}
