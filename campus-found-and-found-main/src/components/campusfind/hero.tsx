import { SearchX, PackageSearch, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  totalReported: number;
  reunited: number;
  activeItems: number;
  onReportLost: () => void;
  onReportFound: () => void;
}

export function Hero({ totalReported, reunited, activeItems, onReportLost, onReportFound }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border/60">
      {/* Decorative backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          background:
            "radial-gradient(640px 260px at 12% -10%, var(--primary) 0%, transparent 60%), radial-gradient(560px 240px at 88% -20%, var(--status-found) 0%, transparent 62%)",
          opacity: 0.14,
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-12 sm:px-6 sm:pb-12 sm:pt-16">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
              </span>
              Live on campus · Updated daily
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
              Lost something on campus?
              <br />
              <span className="text-primary">We&apos;ll help you find it.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Browse reported lost &amp; found items across every campus building, or post a
              report in under a minute. Someone out there has your stuff.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" className="h-12 rounded-full px-6 text-base font-semibold shadow-md" onClick={onReportLost}>
                😟 I Lost Something
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-2 px-6 text-base font-semibold shadow-sm"
                onClick={onReportFound}
              >
                🙌 I Found Something
              </Button>
            </div>
          </div>

          <dl className="grid w-full max-w-md grid-cols-3 gap-3 lg:w-auto lg:min-w-[26rem]">
            {[
              { icon: PackageSearch, label: "Total Reported", value: totalReported, tint: "text-sky-600 dark:text-sky-400" },
              { icon: HeartHandshake, label: "Reunited", value: reunited, tint: "text-emerald-600 dark:text-emerald-400" },
              { icon: SearchX, label: "Active Items", value: activeItems, tint: "text-amber-600 dark:text-amber-400" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border/80 bg-card/80 p-4 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <s.icon className={`size-5 ${s.tint}`} />
                <dt className="mt-2.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {s.label}
                </dt>
                <dd className="font-display text-2xl font-bold text-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
