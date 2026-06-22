import {
  ArrowRight,
  BarChart3,
  PackageCheck,
  Sparkles,
  TriangleAlert,
  Wallet,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { CtaButton, GradientText, LandingContainer } from "./landing-ui";

/** Decorative product mock — a stylized dashboard, purely presentational. */
function ProductPreview() {
  const t = useTranslations("Landing.preview");

  const kpis = [
    { icon: Wallet, label: t("totalStock"), value: "$1.28M", accent: "from-[var(--chart-2)] to-[var(--chart-3)]" },
    { icon: TriangleAlert, label: t("lowStock"), value: "12", accent: "from-amber-400 to-orange-500" },
    { icon: PackageCheck, label: t("orders"), value: "37", accent: "from-[var(--chart-3)] to-[var(--chart-4)]" },
  ];

  const bars = [42, 68, 55, 81, 60, 92, 74, 88];

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-[var(--chart-2)]/25 via-[var(--chart-4)]/15 to-transparent blur-2xl"
      />
      <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xl shadow-black/5 ring-1 ring-black/[0.02]">
        <div className="flex items-center gap-2 border-b border-border/70 bg-muted/40 px-4 py-3">
          <span className="size-2.5 rounded-full bg-red-400/70" />
          <span className="size-2.5 rounded-full bg-amber-400/70" />
          <span className="size-2.5 rounded-full bg-green-400/70" />
          <span className="ms-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <BarChart3 className="size-3.5" />
            {t("title")}
          </span>
        </div>
        <div className="space-y-4 p-4 sm:p-5">
          <div className="grid grid-cols-3 gap-3">
            {kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-xl border border-border/60 bg-background/60 p-3"
              >
                <span
                  className={cn(
                    "flex size-7 items-center justify-center rounded-lg bg-gradient-to-br text-white",
                    kpi.accent,
                  )}
                >
                  <kpi.icon className="size-3.5" />
                </span>
                <p className="mt-2 text-base font-semibold tracking-tight sm:text-lg">
                  {kpi.value}
                </p>
                <p className="truncate text-[11px] text-muted-foreground">
                  {kpi.label}
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-border/60 bg-background/60 p-4">
            <p className="mb-3 text-xs font-medium text-muted-foreground">
              {t("movements")}
            </p>
            <div className="flex h-28 items-end gap-2">
              {bars.map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-[var(--chart-2)] to-[var(--chart-4)] opacity-90"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LandingHero() {
  const t = useTranslations("Landing.hero");
  const tStats = useTranslations("Landing.stats");

  const stats = [
    { value: tStats("uptimeValue"), label: tStats("uptimeLabel") },
    { value: tStats("warehousesValue"), label: tStats("warehousesLabel") },
    { value: tStats("realtimeValue"), label: tStats("realtimeLabel") },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Decorative backdrop: soft glow + grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-[var(--chart-2)]/20 via-[var(--chart-4)]/10 to-transparent blur-3xl" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklab, var(--border) 55%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--border) 55%, transparent) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse 70% 55% at 50% 0%, black, transparent)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 55% at 50% 0%, black, transparent)",
          }}
        />
      </div>

      <LandingContainer className="py-16 sm:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="size-3.5 text-[var(--chart-3)]" />
              {t("badge")}
            </span>

            <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {t("title")} <GradientText>{t("titleHighlight")}</GradientText>
            </h1>

            <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {t("subtitle")}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <CtaButton href="/auth/register" className="group">
                {t("ctaPrimary")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </CtaButton>
              <CtaButton href="/auth/login" variant="outline">
                {t("ctaSecondary")}
              </CtaButton>
            </div>

            <p className="text-sm text-muted-foreground">{t("note")}</p>

            <dl className="mt-2 grid w-full max-w-md grid-cols-3 gap-4 border-t border-border/60 pt-6">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <dt className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {stat.value}
                  </dt>
                  <dd className="text-xs leading-tight text-muted-foreground">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <ProductPreview />
        </div>
      </LandingContainer>
    </section>
  );
}
