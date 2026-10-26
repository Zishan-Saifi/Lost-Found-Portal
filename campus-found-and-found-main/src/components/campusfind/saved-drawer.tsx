import { BookmarkX, MapPin, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./item-card";
import { cn } from "@/lib/utils";
import { CATEGORY_STYLE, relativeDate, type CampusItem } from "@/lib/campusfind/data";

interface SavedDrawerProps {
  open: boolean;
  items: CampusItem[];
  onClose: () => void;
  onUnsave: (id: string) => void;
  onOpen: (item: CampusItem) => void;
  onClearAll: () => void;
}

export function SavedDrawer({ open, items, onClose, onUnsave, onOpen, onClearAll }: SavedDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="flex items-center gap-2 font-display text-lg font-bold">
            🔖 Saved Items
            {items.length > 0 && (
              <span className="grid min-w-6 place-items-center rounded-full bg-primary px-1.5 text-xs font-bold text-primary-foreground">
                {items.length}
              </span>
            )}
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Your bookmarked items — stored locally on this device.
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <div className="grid size-16 place-items-center rounded-full bg-muted">
              <BookmarkX className="size-8 text-muted-foreground" strokeWidth={1.6} />
            </div>
            <p className="font-display font-semibold text-foreground">Nothing saved yet</p>
            <p className="text-sm text-muted-foreground">
              Tap the bookmark icon on any item card to keep an eye on it here.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-2.5 overflow-y-auto px-4 py-4">
              {items.map((item, i) => {
                const style = CATEGORY_STYLE[item.category];
                return (
                  <div
                    key={item.id}
                    className="animate-fade-up flex cursor-pointer items-center gap-3 rounded-2xl border border-border/80 bg-card p-2.5 transition hover:border-primary/40 hover:shadow-sm"
                    style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}
                    onClick={() => onOpen(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && onOpen(item)}
                    aria-label={`Open ${item.title}`}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-2xl",
                        style.tint,
                      )}
                    >
                      {item.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={item.type} />
                        <span className="truncate text-[12px] text-muted-foreground">{relativeDate(item.date)}</span>
                      </div>
                      <p className="mt-0.5 truncate font-display text-sm font-bold text-foreground">
                        {item.title}
                      </p>
                      <p className="flex items-center gap-1 truncate text-[12px] text-muted-foreground">
                        <MapPin className="size-3" />
                        {item.location}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 rounded-full text-muted-foreground hover:text-destructive"
                      aria-label={`Remove ${item.title} from saved`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onUnsave(item.id);
                      }}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-border px-5 py-3.5">
              <Button
                variant="ghost"
                onClick={onClearAll}
                className="w-full gap-2 rounded-full text-sm text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="size-4" />
                Clear all saved items
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
