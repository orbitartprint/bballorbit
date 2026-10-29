import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { readPageBootstrap } from "@/lib/pageBootstrap";
import "./index.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Capture opaque "Script error" cases (often third-party scripts) with extra context
window.addEventListener("error", (event) => {
  console.error("[window.error]", {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error,
  });
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("[window.unhandledrejection]", event.reason);
});

const root = document.getElementById("root")!;
const bootstrap = readPageBootstrap(document, window.location.pathname);
const app = <ErrorBoundary><BrowserRouter><App bootstrap={bootstrap} /></BrowserRouter></ErrorBoundary>;

if (root.dataset.prerendered === "true" && bootstrap) {
  hydrateRoot(root, app, { onRecoverableError: (error) => console.error("[hydration]", error) });
} else {
  createRoot(root).render(app);
}
