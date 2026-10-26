import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { toast } from "sonner";

import { Navbar } from "@/components/campusfind/navbar";
import { Hero } from "@/components/campusfind/hero";
import { Filters, type FiltersState } from "@/components/campusfind/filters";
import { ItemGrid, GridSkeleton } from "@/components/campusfind/item-grid";
import { ItemDetailModal } from "@/components/campusfind/item-detail-modal";
import { ReportModal } from "@/components/campusfind/report-modal";
import { SavedDrawer } from "@/components/campusfind/saved-drawer";
import { useCampusTheme } from "@/components/campusfind/use-campus-theme";
import {
  MOCK_ITEMS,
  type CampusItem,
  type ItemType,
} from "@/lib/campusfind/data";
import {
  loadBookmarks,
  saveBookmarks,
  loadUserItems,
  saveUserItems,
  loadClaims,
  saveClaims,
} from "@/lib/campusfind/storage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CampusFind — Campus Lost & Found Portal" },
      {
        name: "description",
        content:
          "Lost something on campus? Browse reported lost & found items, filter by category and building, and post your own report in under a minute.",
      },
      { property: "og:title", content: "CampusFind — Campus Lost & Found Portal" },
      {
        property: "og:description",
        content: "Browse, search and report lost & found items across every campus building.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const DEFAULT_FILTERS: FiltersState = {
  search: "",
  status: "all",
  category: "all",
  location: "all",
  sort: "recent",
};

function Index() {
  const { theme, toggleTheme } = useCampusTheme();

  const [items, setItems] = React.useState<CampusItem[]>(() => [...MOCK_ITEMS]);
  const [bookmarks, setBookmarks] = React.useState<Set<string>>(new Set());
  const [claims, setClaims] = React.useState<Record<string, boolean>>({});
  const [filters, setFilters] = React.useState<FiltersState>(DEFAULT_FILTERS);
  const [loading, setLoading] = React.useState(true);
  const [detail, setDetail] = React.useState<CampusItem | null>(null);
  const [reportOpen, setReportOpen] = React.useState(false);
  const [reportType, setReportType] = React.useState<ItemType>("lost");
  const [savedOpen, setSavedOpen] = React.useState(false);

  // Restore persisted state from localStorage.
  React.useEffect(() => {
    setItems((prev) => [...loadUserItems<CampusItem>(), ...prev]);
    setBookmarks(new Set(loadBookmarks()));
    setClaims(loadClaims());
  }, []);

  // Initial loading skeleton simulation.
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  // Brief skeleton on status / category switches.
  const filterKey = `${filters.status}|${filters.category}|${filters.location}|${filters.sort}`;
  const firstFilterRun = React.useRef(true);
  React.useEffect(() => {
    if (firstFilterRun.current) {
      firstFilterRun.current = false;
      return;
    }
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 420);
    return () => clearTimeout(t);
  }, [filterKey]);

  const resolved = React.useMemo(
    () => items.map((it) => (claims[it.id] ? { ...it, type: "claimed" as const } : it)),
    [items, claims],
  );

  const visible = React.useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    let list = resolved.filter((it) => {
      if (filters.status !== "all" && it.type !== filters.status) return false;
      if (filters.category !== "all" && it.category !== filters.category) return false;
      if (filters.location !== "all" && it.location !== filters.location) return false;
      if (q) {
        const hay = `${it.title} ${it.description} ${it.location} ${it.reporter}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    list = [...list].sort((a, b) => {
      const ka = `${a.date}T${a.time}`;
      const kb = `${b.date}T${b.time}`;
      return filters.sort === "recent" ? kb.localeCompare(ka) : ka.localeCompare(kb);
    });
    return list;
  }, [resolved, filters]);

  const stats = React.useMemo(() => {
    const total = items.length;
    const reunited = items.filter((it) => it.type === "claimed" || claims[it.id]).length;
    return { totalReported: total, reunited, activeItems: total - reunited };
  }, [items, claims]);

  const toggleSave = React.useCallback((id: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      saveBookmarks([...next]);
      return next;
    });
  }, []);

  const addReport = (item: CampusItem) => {
    setItems((prev) => {
      const next = [item, ...prev];
      saveUserItems(next.filter((i) => i.userAdded));
      return next;
    });
    setReportOpen(false);
    toast.success("Posted to the board 🎉", {
      description: `${item.type === "lost" ? "Lost" : "Found"}: ${item.title} — saved on this device.`,
    });
    // Jump to the new item's context so the user sees it immediately.
    setFilters((f) => ({ ...f, status: "all", search: "", category: "all", location: "all", sort: "recent" }));
    document.getElementById("items")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const claimItem = (id: string) => {
    setClaims((prev) => {
      const next = { ...prev, [id]: true };
      saveClaims(next);
      return next;
    });
    setDetail((d) => (d && d.id === id ? { ...d, type: "claimed" } : d));
  };

  const openDetail = (item: CampusItem) => setDetail(item);

  const savedItems = resolved.filter((it) => bookmarks.has(it.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        search={filters.search}
        onSearchChange={(search) => setFilters((f) => ({ ...f, search }))}
        savedCount={bookmarks.size}
        savedOpen={savedOpen}
        onToggleSaved={() => setSavedOpen((o) => !o)}
        onReport={() => {
          setReportType("lost");
          setReportOpen(true);
        }}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <Hero
        totalReported={stats.totalReported}
        reunited={stats.reunited}
        activeItems={stats.activeItems}
        onReportLost={() => {
          setReportType("lost");
          setReportOpen(true);
        }}
        onReportFound={() => {
          setReportType("found");
          setReportOpen(true);
        }}
      />

      <div className="mt-8">
        <Filters
          filters={filters}
          onChange={(patch) => setFilters((f) => ({ ...f, ...patch }))}
          onClear={() => setFilters(DEFAULT_FILTERS)}
          resultCount={visible.length}
        />
      </div>

      <main id="items" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {loading ? (
          <GridSkeleton />
        ) : (
          <ItemGrid
            items={visible}
            bookmarks={bookmarks}
            onToggleSave={toggleSave}
            onOpen={openDetail}
            onClearFilters={() => setFilters(DEFAULT_FILTERS)}
          />
        )}
      </main>

      <footer className="border-t border-border/60 py-8 text-center">
        <p className="font-display text-sm font-bold text-foreground">
          Campus<span className="text-primary">Find</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Helping students reunite with their things · {items.length} items on the board
        </p>
      </footer>

      {detail && (
        <ItemDetailModal
          item={detail}
          saved={bookmarks.has(detail.id)}
          alreadyClaimed={!!claims[detail.id]}
          onClose={() => setDetail(null)}
          onToggleSave={toggleSave}
          onClaim={claimItem}
        />
      )}

      <ReportModal
        open={reportOpen}
        initialType={reportType}
        onClose={() => setReportOpen(false)}
        onSubmit={addReport}
      />

      <SavedDrawer
        open={savedOpen}
        items={savedItems}
        onClose={() => setSavedOpen(false)}
        onUnsave={toggleSave}
        onOpen={(item) => {
          setSavedOpen(false);
          openDetail(item);
        }}
        onClearAll={() => {
          const next = new Set<string>();
          setBookmarks(next);
          saveBookmarks([]);
          toast.info("Saved items cleared");
        }}
      />

      <Toaster position="bottom-right" richColors closeButton />
    </div>
  );
}
