import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CATEGORIES, LOCATIONS, type CategoryId } from "@/lib/campusfind/data";

export type StatusFilter = "all" | "lost" | "found" | "claimed";
export type SortOrder = "recent" | "oldest";

export interface FiltersState {
  search: string;
  status: StatusFilter;
  category: CategoryId | "all";
  location: string;
  sort: SortOrder;
}

interface FiltersProps {
  filters: FiltersState;
  onChange: (patch: Partial<FiltersState>) => void;
  onClear: () => void;
  resultCount: number;
}

const STATUS_TABS: { id: StatusFilter; label: string; dot: string }[] = [
  { id: "all", label: "All", dot: "bg-foreground/40" },
  { id: "lost", label: "Lost", dot: "bg-status-lost" },
  { id: "found", label: "Found", dot: "bg-status-found" },
  { id: "claimed", label: "Claimed", dot: "bg-muted-foreground" },
];

export function Filters({ filters, onChange, onClear, resultCount }: FiltersProps) {
  const hasFilters =
    filters.search !== "" ||
    filters.status !== "all" ||
    filters.category !== "all" ||
    filters.location !== "all";

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6" aria-label="Search and filters">
      <div className="rounded-3xl border border-border/80 bg-card/60 p-4 shadow-sm backdrop-blur sm:p-5">
        <div className="flex flex-col gap-4">
          {/* Status tabs + sort */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Tabs
              value={filters.status}
              onValueChange={(v) => onChange({ status: v as StatusFilter })}
            >
              <TabsList className="h-9 rounded-full bg-muted/70 p-1">
                {STATUS_TABS.map((t) => (
                  <TabsTrigger
                    key={t.id}
                    value={t.id}
                    className="gap-1.5 rounded-full px-3.5 text-[13px] font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm"
                  >
                    <span className={cn("size-1.5 rounded-full", t.dot)} />
                    {t.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              {hasFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClear}
                  className="gap-1.5 rounded-full text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="size-3.5" />
                  Clear filters
                </Button>
              )}
              <Select value={filters.sort} onValueChange={(v) => onChange({ sort: v as SortOrder })}>
                <SelectTrigger className="h-9 w-[9.5rem] rounded-full border-border bg-card text-[13px] shadow-sm" aria-label="Sort order">
                  <SlidersHorizontal className="size-3.5 text-muted-foreground" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Categories">
            <button
              onClick={() => onChange({ category: "all" })}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200",
                filters.category === "all"
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              All Categories
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => onChange({ category: c.id })}
                title={c.short}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200",
                  filters.category === c.id
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Location + search */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={filters.search}
                onChange={(e) => onChange({ search: e.target.value })}
                placeholder="Search by item name, description or building…"
                className="h-10 w-full rounded-xl border border-border bg-background pl-9 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-ring/30"
                aria-label="Search items"
              />
            </div>
            <Select
              value={filters.location}
              onValueChange={(v) => onChange({ location: v })}
            >
              <SelectTrigger className="h-10 w-full rounded-xl border-border bg-background text-sm shadow-sm sm:w-56" aria-label="Filter by location">
                <SelectValue placeholder="All locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All locations</SelectItem>
                {LOCATIONS.map((l) => (
                  <SelectItem key={l} value={l}>
                    📍 {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="shrink-0 text-[13px] font-medium text-muted-foreground sm:text-right">
              {resultCount} item{resultCount === 1 ? "" : "s"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
