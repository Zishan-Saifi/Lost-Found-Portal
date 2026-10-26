import { Bookmark, BookmarkCheck, MapPin, CalendarDays, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  CATEGORY_STYLE,
  CATEGORIES,
  relativeDate,
  type CampusItem,
} from "@/lib/campusfind/data";

export function StatusBadge({ status, className }: { status: CampusItem["type"] | "claimed"; className?: string }) {
  const map = {
    lost: { label: "Lost", cls: "bg-status-lost text-status-lost-foreground" },
    found: { label: "Found", cls: "bg-status-found text-status-found-foreground" },
    claimed: { label: "Claimed ✓", cls: "bg-claimed text-claimed-foreground" },
  } as const;
  const s = map[status];
  return (
    <Badge
      className={cn(
        "rounded-full border-transparent px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide shadow-sm",
        s.cls,
        className,
      )}
    >
      {s.label}
    </Badge>
  );
}

export function categoryLabel(id: CampusItem["category"]) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

interface ItemCardProps {
  item: CampusItem;
  saved: boolean;
  onToggleSave: (id: string) => void;
  onOpen: (item: CampusItem) => void;
  index?: number;
}

export function ItemCard({ item, saved, onToggleSave, onOpen, index = 0 }: ItemCardProps) {
  const style = CATEGORY_STYLE[item.category];
  const status: "lost" | "found" | "claimed" = item.type;

  return (
    <article
      className="group animate-fade-up relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-within:ring-2 focus-within:ring-ring/50"
      style={{ animationDelay: `${Math.min(index, 10) * 55}ms` }}
      onClick={() => onOpen(item)}
      onKeyDown={(e) => e.key === "Enter" && onOpen(item)}
      tabIndex={0}
      role="button"
      aria-label={`${status === "lost" ? "Lost" : "Found"}: ${item.title}`}
    >
      {/* Thumbnail */}
      <div className={cn("relative grid h-36 place-items-center bg-gradient-to-br sm:h-40", style.tint)}>
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <>
            <span className={cn("absolute inset-3 rounded-2xl ring-1 ring-inset opacity-70", style.ring)} />
            <span
              aria-hidden
              className="font-display text-6xl drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
            >
              {item.emoji}
            </span>
          </>
        )}
        <StatusBadge status={status} className="absolute left-3 top-3" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(item.id);
          }}
          aria-label={saved ? "Remove from saved items" : "Save item"}
          aria-pressed={saved}
          className={cn(
            "absolute right-3 top-3 grid size-9 place-items-center rounded-full border shadow-sm backdrop-blur transition-all duration-200 active:scale-90",
            saved
              ? "border-primary/40 bg-primary text-primary-foreground"
              : "border-border/60 bg-background/80 text-muted-foreground hover:text-foreground",
          )}
        >
          {saved ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
            {style.glyph} {categoryLabel(item.category)}
          </Badge>
        </div>
        <h3 className="font-display text-[15px] font-bold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {item.title}
        </h3>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
          {item.description}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-[12px] text-muted-foreground">
          <span className="inline-flex items-center gap-1 font-medium text-foreground/80">
            <MapPin className="size-3.5 text-primary" />
            {item.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="size-3.5" />
            {relativeDate(item.date)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" />
            {item.time}
          </span>
        </div>
      </div>
    </article>
  );
}
