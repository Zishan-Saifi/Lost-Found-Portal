import { Search, Plus, Bookmark, Compass, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Theme } from "./use-campus-theme";

interface NavbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  savedCount: number;
  savedOpen: boolean;
  onToggleSaved: () => void;
  onReport: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export function Navbar({
  search,
  onSearchChange,
  savedCount,
  savedOpen,
  onToggleSaved,
  onReport,
  theme,
  onToggleTheme,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <a href="#top" className="flex shrink-0 items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Compass className="size-5" strokeWidth={2.2} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold tracking-tight text-foreground">
              Campus<span className="text-primary">Find</span>
            </span>
            <span className="mt-0.5 hidden text-[11px] font-medium text-muted-foreground sm:block">
              Lost &amp; Found Portal
            </span>
          </span>
        </a>

        <div className="relative mx-auto hidden w-full max-w-sm md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search items, places, buildings…"
            className="h-10 w-full rounded-full border border-border bg-card pl-9 pr-4 text-sm text-foreground shadow-inner outline-none transition placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-ring/40"
            aria-label="Search items"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSaved}
            aria-pressed={savedOpen}
            className={cn(
              "relative gap-1.5 rounded-full text-sm",
              savedOpen && "bg-accent text-accent-foreground",
            )}
          >
            <Bookmark className={cn("size-4", savedCount > 0 && "fill-primary text-primary")} />
            <span className="hidden sm:inline">Saved</span>
            {savedCount > 0 && (
              <span className="grid min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
                {savedCount}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="rounded-full"
          >
            {theme === "dark" ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
          </Button>

          <Button
            onClick={onReport}
            className="gap-1.5 rounded-full px-4 font-semibold shadow-sm"
          >
            <Plus className="size-4" strokeWidth={2.6} />
            <span>Report an Item</span>
          </Button>
        </div>
      </div>

      {/* Mobile search row */}
      <div className="border-t border-border/60 px-4 py-2.5 md:hidden">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search items, places, buildings…"
            className="h-10 w-full rounded-full border border-border bg-card pl-9 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-ring/40"
            aria-label="Search items"
          />
        </div>
      </div>
    </header>
  );
}
