import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Capture opaque "Script error" cases (often third-party scripts) with extra context
window.addEventListener("error", (event) => {
  // eslint-disable-next-line no-console
  console.error("[window.error]", {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error,
  });
});

window.addEventListener("unhandledrejection", (event) => {
  // eslint-disable-next-line no-console
  console.error("[window.unhandledrejection]", event.reason);
});

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

