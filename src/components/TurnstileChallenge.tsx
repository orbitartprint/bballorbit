import { useEffect, useRef, useState } from "react";

type TurnstileOptions = { sitekey: string; action: string; theme: "dark"; size: "flexible"; callback: (token: string) => void; "expired-callback": () => void; "error-callback": () => void };
declare global { interface Window { turnstile?: { ready: (callback: () => void) => void; render: (container: HTMLElement, options: TurnstileOptions) => string; remove: (widget: string) => void }; } }
let loading: Promise<void> | undefined;
function loadTurnstile() {
  if (window.turnstile) return Promise.resolve();
  if (loading) return loading;
  loading = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => { script.remove(); loading = undefined; reject(new Error("Anti-spam verification unavailable.")); };
    document.head.appendChild(script);
  });
  return loading;
}

export default function TurnstileChallenge({ siteKey, resetKey, onToken }: { siteKey: string; resetKey: number; onToken: (token: string) => void }) {
  const container = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;
    let widget: string | undefined;
    onToken(""); setFailed(false);
    const failure = () => { if (!cancelled) { onToken(""); setFailed(true); } };
    void loadTurnstile().then(() => window.turnstile?.ready(() => {
      if (cancelled || !container.current) return;
      widget = window.turnstile!.render(container.current, { sitekey: siteKey, action: "website-contact", theme: "dark", size: "flexible", callback: token => { if (!cancelled) onToken(token); }, "expired-callback": () => { if (!cancelled) onToken(""); }, "error-callback": failure });
    })).catch(failure);
    return () => { cancelled = true; if (widget) window.turnstile?.remove(widget); };
  }, [siteKey, resetKey, retry, onToken]);
  if (!siteKey) return <p className="text-sm text-muted-foreground">The form is temporarily unavailable. Please email <a className="underline" href="mailto:info@bballorbit.com">info@bballorbit.com</a>.</p>;
  return <div className="space-y-2"><div ref={container} /><p className="text-xs text-muted-foreground">Protected against spam by Cloudflare Turnstile.</p>{failed && <p role="status" className="text-sm text-muted-foreground">Verification could not load. <button type="button" className="underline" onClick={() => setRetry(value => value + 1)}>Retry verification</button> or email <a className="underline" href="mailto:info@bballorbit.com">info@bballorbit.com</a>.</p>}</div>;
}
