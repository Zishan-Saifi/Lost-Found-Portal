import { Skeleton } from "@/components/ui/skeleton";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ItemCard } from "./item-card";
import type { CampusItem } from "@/lib/campusfind/data";

export function GridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-label="Loading items"
      aria-busy="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-3xl border border-border/80 bg-card">
          <Skeleton className="h-36 rounded-none sm:h-40" />
          <div className="space-y-3 p-4">
            <Skeleton className="h-4 w-24 rounded-full" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-2/3" />
            <Skeleton className="h-3.5 w-1/2 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="animate-fade-up mx-auto flex max-w-md flex-col items-center rounded-3xl border border-dashed border-border bg-card/60 px-8 py-14 text-center">
      <div className="grid size-20 place-items-center rounded-full bg-muted">
        <SearchX className="size-10 text-muted-foreground" strokeWidth={1.6} />
      </div>
      <h3 className="mt-5 font-display text-xl font-bold text-foreground">No items found</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Nothing matches your search or filters yet. Try a different keyword, or reset the
        filters to see everything on campus.
      </p>
      <Button onClick={onClear} className="mt-6 gap-2 rounded-full px-5 font-semibold">
        Clear filters
      </Button>
    </div>
  );
}

interface ItemGridProps {
  items: CampusItem[];
  bookmarks: Set<string>;
  onToggleSave: (id: string) => void;
  onOpen: (item: CampusItem) => void;
  onClearFilters: () => void;
}

export function ItemGrid({ items, bookmarks, onToggleSave, onOpen, onClearFilters }: ItemGridProps) {
  if (items.length === 0) return <EmptyState onClear={onClearFilters} />;
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item, i) => (
        <ItemCard
          key={item.id}
          item={item}
          index={i}
          saved={bookmarks.has(item.id)}
          onToggleSave={onToggleSave}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}
