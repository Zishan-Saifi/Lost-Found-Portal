import * as React from "react";
import { Camera, Image, Type, MapPin, Calendar, Phone, FileText, Tag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  CATEGORIES,
  LOCATIONS,
  REPORT_EMOJIS,
  type CampusItem,
  type CategoryId,
  type ItemType,
} from "@/lib/campusfind/data";
import { toast } from "sonner";

interface ReportModalProps {
  open: boolean;
  initialType?: ItemType;
  onClose: () => void;
  onSubmit: (item: CampusItem) => void;
}

interface FormState {
  type: ItemType;
  title: string;
  category: CategoryId | "";
  location: string;
  date: string;
  time: string;
  contact: string;
  description: string;
  emoji: string;
  imageUrl: string;
}

const todayISO = () => new Date().toISOString().slice(0, 10);
const nowTime = () =>
  new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });

const initialForm = (type: ItemType): FormState => ({
  type,
  title: "",
  category: "",
  location: "",
  date: todayISO(),
  time: nowTime(),
  contact: "",
  description: "",
  emoji: "",
  imageUrl: "",
});

export function ReportModal({ open, initialType = "lost", onClose, onSubmit }: ReportModalProps) {
  const [form, setForm] = React.useState<FormState>(() => initialForm(initialType));

  React.useEffect(() => {
    if (open) setForm(initialForm(initialType));
  }, [open, initialType]);

  const patch = (p: Partial<FormState>) => setForm((f) => ({ ...f, ...p }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.category || !form.location || !form.contact.trim()) {
      toast.error("Missing details", {
        description: "Please fill in the title, category, location and contact info.",
      });
      return;
    }
    const item: CampusItem = {
      id: `cf-u-${Date.now()}`,
      type: form.type,
      title: form.title.trim(),
      category: form.category,
      location: form.location,
      date: form.date || todayISO(),
      time: form.time || nowTime(),
      contact: form.contact.trim(),
      description:
        form.description.trim() ||
        `${form.type === "lost" ? "Lost" : "Found"} ${form.title.trim()} at ${form.location}.`,
      reporter: form.contact.includes("@") ? (form.contact.split("@")[0] ?? "You") : "You",
      emoji: form.emoji || "📦",
      ...(form.imageUrl.trim() ? { imageUrl: form.imageUrl.trim() } : {}),
      userAdded: true,
    };
    onSubmit(item);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] max-w-lg overflow-y-auto rounded-3xl p-0 sm:max-w-xl">
        <div className="sticky top-0 z-10 border-b border-border bg-card/95 px-5 pb-4 pt-5 backdrop-blur sm:px-6">
          <DialogHeader className="space-y-1.5 text-left">
            <DialogTitle className="font-display text-xl font-bold text-foreground">
              Report an Item
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Post a lost or found item — it appears on the board instantly and stays after refresh.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-3 grid grid-cols-2 gap-2 rounded-2xl bg-muted p-1" role="tablist" aria-label="Item type">
            {(["lost", "found"] as ItemType[]).map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={form.type === t}
                onClick={() => patch({ type: t })}
                className={cn(
                  "rounded-xl py-2 text-sm font-semibold transition-all duration-200",
                  form.type === t
                    ? t === "lost"
                      ? "bg-status-lost text-status-lost-foreground shadow-sm"
                      : "bg-status-found text-status-found-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t === "lost" ? "😟 I Lost It" : "🙌 I Found It"}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4 px-5 pb-6 sm:px-6">
          <Field icon={Type} label="Item title">
            <Input
              value={form.title}
              onChange={(e) => patch({ title: e.target.value })}
              placeholder="e.g. Blue Hydro Flask water bottle"
              className="rounded-xl"
              maxLength={70}
            />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field icon={Tag} label="Category">
              <Select value={form.category} onValueChange={(v) => patch({ category: v as CategoryId })}>
                <SelectTrigger className="rounded-xl" aria-label="Category">
                  <SelectValue placeholder="Pick a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field icon={MapPin} label="Location">
              <Select value={form.location} onValueChange={(v) => patch({ location: v })}>
                <SelectTrigger className="rounded-xl" aria-label="Location">
                  <SelectValue placeholder="Where?" />
                </SelectTrigger>
                <SelectContent>
                  {LOCATIONS.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field icon={Calendar} label="Date">
              <Input
                type="date"
                value={form.date}
                onChange={(e) => patch({ date: e.target.value })}
                className="rounded-xl"
              />
            </Field>
            <Field icon={Calendar} label="Time">
              <Input
                type="time"
                value={form.time}
                onChange={(e) => patch({ time: e.target.value })}
                className="rounded-xl"
              />
            </Field>
          </div>

          <Field icon={Phone} label="Contact info">
            <Input
              value={form.contact}
              onChange={(e) => patch({ contact: e.target.value })}
              placeholder="Email or phone, e.g. you@campus.edu · +91 …"
              className="rounded-xl"
            />
          </Field>

          <Field icon={FileText} label="Description">
            <Textarea
              value={form.description}
              onChange={(e) => patch({ description: e.target.value })}
              placeholder="Colour, markings, contents, exactly where it was left/found…"
              className="min-h-24 rounded-xl"
              maxLength={400}
            />
          </Field>

          <Field icon={Camera} label="Thumbnail — pick an icon or paste an image URL">
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Thumbnail presets">
              {REPORT_EMOJIS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => patch({ emoji: form.emoji === e ? "" : e, imageUrl: "" })}
                  aria-pressed={form.emoji === e}
                  className={cn(
                    "grid size-9 place-items-center rounded-xl border text-lg transition-all",
                    form.emoji === e
                      ? "border-primary bg-primary/10 shadow-sm"
                      : "border-border bg-background hover:border-primary/40",
                  )}
                >
                  {e}
                </button>
              ))}
            </div>
            <div className="relative mt-2">
              <Image className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={form.imageUrl}
                onChange={(e) => patch({ imageUrl: e.target.value, emoji: e.target.value ? "" : form.emoji })}
                placeholder="https://…/photo.jpg (optional)"
                className="rounded-xl pl-9"
                type="url"
              />
            </div>
          </Field>

          <div className="flex gap-3 pt-1">
            <Button type="button" variant="outline" onClick={onClose} className="h-11 flex-1 rounded-full font-semibold">
              Cancel
            </Button>
            <Button type="submit" className="h-11 flex-1 rounded-full font-semibold shadow-sm">
              Post to board
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="flex items-center gap-1.5 text-[13px] font-semibold text-foreground">
        <Icon className="size-3.5 text-muted-foreground" />
        {label}
      </Label>
      {children}
    </div>
  );
}
