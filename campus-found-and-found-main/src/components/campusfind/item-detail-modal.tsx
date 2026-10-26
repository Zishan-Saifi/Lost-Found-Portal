import * as React from "react";
import {
  MapPin,
  CalendarDays,
  Clock,
  User,
  Phone,
  Share2,
  HandCoins,
  BadgeCheck,
  ImageOff,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StatusBadge, categoryLabel } from "./item-card";
import { cn } from "@/lib/utils";
import { CATEGORY_STYLE, formatDate, type CampusItem } from "@/lib/campusfind/data";
import { toast } from "sonner";

interface ItemDetailModalProps {
  item: CampusItem | null;
  saved: boolean;
  onClose: () => void;
  onToggleSave: (id: string) => void;
  onClaim: (id: string) => void;
  alreadyClaimed: boolean;
}

export function ItemDetailModal({
  item,
  saved,
  onClose,
  onToggleSave,
  onClaim,
  alreadyClaimed,
}: ItemDetailModalProps) {
  const [confirming, setConfirming] = React.useState(false);
  const [imageFailed, setImageFailed] = React.useState(false);

  React.useEffect(() => {
    setImageFailed(false);
    setConfirming(false);
  }, [item?.id]);

  if (!item) return null;
  const style = CATEGORY_STYLE[item.category];
  const claimed = alreadyClaimed || item.type === "claimed";
  const statusForBadge = claimed ? ("claimed" as const) : item.type;

  const share = async () => {
    const text = `${item.title} — ${claimed ? "Resolved" : item.type === "lost" ? "Lost" : "Found"} at ${item.location} · via CampusFind`;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied!", { description: "Item link summary copied to clipboard." });
    } catch {
      toast.error("Couldn't copy", { description: "Your browser blocked clipboard access." });
    }
  };

  return (
    <>
      <Dialog open onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] max-w-lg gap-0 overflow-y-auto rounded-3xl p-0 sm:max-w-xl">
          {/* Visual header */}
          <div className={cn("relative grid h-44 place-items-center bg-gradient-to-br sm:h-52", style.tint)}>
            {item.imageUrl && !imageFailed ? (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-full w-full rounded-t-3xl object-cover"
                onError={() => setImageFailed(true)}
              />
            ) : item.imageUrl ? (
              <div className="flex flex-col items-center gap-1.5 text-muted-foreground">
                <ImageOff className="size-7" />
                <span className="text-xs">Image unavailable</span>
              </div>
            ) : (
              <span aria-hidden className="font-display text-7xl drop-shadow-sm">
                {item.emoji}
              </span>
            )}
            <StatusBadge status={statusForBadge} className="absolute left-4 top-4 text-xs" />
          </div>

          <div className="p-5 sm:p-6">
            <DialogHeader className="space-y-2 text-left">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                  {style.glyph} {categoryLabel(item.category)}
                </Badge>
              </div>
              <DialogTitle className="font-display text-2xl font-bold leading-tight tracking-tight text-foreground">
                {item.title}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Details for {claimed ? "resolved" : item.type} item {item.title}
              </DialogDescription>
            </DialogHeader>

            <p className="mt-3 text-sm leading-relaxed text-foreground/85">
              {item.description}
            </p>

            <Separator className="my-4" />

            <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <Detail icon={MapPin} label="Location spotted" value={`📍 ${item.location}`} />
              <Detail icon={CalendarDays} label="Date reported" value={formatDate(item.date)} />
              <Detail icon={Clock} label="Time" value={item.time} />
              <Detail icon={User} label="Reported by" value={item.reporter} />
            </dl>

            <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/5 p-3.5">
              <p className="text-[11px] font-bold uppercase tracking-wide text-primary">
                {item.type === "lost" ? "How to help" : "Claim instructions"}
              </p>
              <p className="mt-1.5 flex items-start gap-2 text-sm leading-relaxed text-foreground/90">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
                {item.contact}
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              {claimed ? (
                <Button disabled className="h-11 flex-1 gap-2 rounded-full font-semibold" variant="secondary">
                  <BadgeCheck className="size-4.5" />
                  Item claimed &amp; resolved
                </Button>
              ) : (
                <Button
                  onClick={() => setConfirming(true)}
                  className={cn(
                    "h-11 flex-1 gap-2 rounded-full font-semibold shadow-sm",
                    item.type === "lost" && "bg-status-lost text-status-lost-foreground hover:bg-status-lost/90",
                    item.type === "found" && "bg-status-found text-status-found-foreground hover:bg-status-found/90",
                  )}
                >
                  <HandCoins className="size-4.5" />
                  {item.type === "lost" ? "This is mine — contact reporter" : "Claim Item"}
                </Button>
              )}
              <Button variant="outline" onClick={share} className="h-11 gap-2 rounded-full px-5 font-semibold">
                <Share2 className="size-4" />
                Share
              </Button>
              <Button
                variant="ghost"
                onClick={() => onToggleSave(item.id)}
                className="h-11 gap-2 rounded-full px-5 font-semibold"
                aria-pressed={saved}
              >
                {saved ? "♥ Saved" : "♡ Save"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirming} onOpenChange={setConfirming}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-xl">
              {item.type === "lost" ? "Contact the reporter?" : "Confirm claim"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm leading-relaxed">
              {item.type === "lost"
                ? `Mark "${item.title}" as reunited? We'll record it as claimed and show the reporter's contact (${item.contact}).`
                : `Confirm you're claiming "${item.title}" spotted at ${item.location}? This marks the item as claimed so others know it's resolved.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Not now</AlertDialogCancel>
            <AlertDialogAction
              className="rounded-full bg-status-found font-semibold text-status-found-foreground hover:bg-status-found/90"
              onClick={() => {
                onClaim(item.id);
                setConfirming(false);
                toast.success(item.type === "lost" ? "Marked as reunited 🎉" : "Claim registered 🎉", {
                  description: item.type === "lost"
                    ? "The reporter has been notified via their listed contact."
                    : "Reach out via the listed contact to complete verification.",
                });
              }}
            >
              Yes, proceed
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function Detail({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-muted">
        <Icon className="size-3.5 text-muted-foreground" />
      </span>
      <div className="min-w-0">
        <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</dt>
        <dd className="truncate font-medium text-foreground" title={value}>{value}</dd>
      </div>
    </div>
  );
}
