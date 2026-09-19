import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PublicLibraryNotice = ({ isFetching, onRetry }: { isFetching: boolean; onRetry: () => void }) => (
  <div role="status" className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
    <p>We couldn’t load the latest drills. This saved copy may be out of date.</p>
    <Button variant="outline" size="sm" className="gap-2" onClick={onRetry} disabled={isFetching}>
      <RefreshCw className="h-4 w-4" />{isFetching ? "Loading…" : "Try again"}
    </Button>
  </div>
);
