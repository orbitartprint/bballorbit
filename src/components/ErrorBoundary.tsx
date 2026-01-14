import React from "react";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  error?: unknown;
};

/**
 * Catches runtime errors so third‑party script crashes don’t leave users on a blank screen.
 * Keeps app behavior the same except for showing a minimal fallback UI when an error occurs.
 */
export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: unknown): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, info: unknown) {
    // eslint-disable-next-line no-console
    console.error("[ErrorBoundary] Caught error:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background text-foreground">
          <main className="mx-auto max-w-2xl px-6 py-16">
            <h1 className="text-2xl font-semibold">Something went wrong</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              A script failed to load or crashed. Try reloading the page.
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow"
            >
              Reload
            </button>
          </main>
        </div>
      );
    }

    return this.props.children;
  }
}
