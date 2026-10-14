import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CollectionPageSize } from "@/hooks/useCollectionPagination";

type Props = {
  total: number;
  page: number;
  pageSize: CollectionPageSize;
  pageCount: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  disabled?: boolean;
};

export const CollectionPagination = ({ total, page, pageSize, pageCount, setPage, setPageSize, disabled = false }: Props) => (
  <nav aria-label="Collection pagination" className="flex items-center justify-end gap-3 border-t border-border pt-4">
    <span className="sr-only text-xs tabular-nums text-muted-foreground sm:not-sr-only" aria-live="polite">
      {total === 0 ? "0 items" : `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, total)} of ${total}`}
    </span>
    <div className="flex shrink-0 items-center gap-2">
      <span className="whitespace-nowrap text-xs text-muted-foreground sm:text-sm">
        <span className="sm:hidden">Per page</span>
        <span className="hidden sm:inline">Items per page</span>
      </span>
      <Select value={String(pageSize)} onValueChange={(value) => setPageSize(Number(value))} disabled={disabled}>
        <SelectTrigger aria-label="Items per page" className="h-11 w-16 px-2 sm:w-20 sm:px-3"><SelectValue /></SelectTrigger>
        <SelectContent>
          {[20, 50, 100].map((size) => <SelectItem key={size} value={String(size)}>{size}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
    <div className="flex shrink-0 items-center gap-1 sm:gap-2">
      <Button variant="outline" size="icon" className="size-11" aria-label="Previous page" disabled={disabled || page === 1} onClick={() => setPage(page - 1)}>
        <ChevronLeft className="size-4" />
      </Button>
      <span className="min-w-10 whitespace-nowrap text-center text-xs tabular-nums sm:min-w-24 sm:text-sm" role="status" aria-label={`Page ${page} of ${pageCount}`}>
        <span className="sm:hidden">{page} / {pageCount}</span>
        <span className="hidden sm:inline">Page {page} of {pageCount}</span>
      </span>
      <Button variant="outline" size="icon" className="size-11" aria-label="Next page" disabled={disabled || page === pageCount} onClick={() => setPage(page + 1)}>
        <ChevronRight className="size-4" />
      </Button>
    </div>
  </nav>
);
