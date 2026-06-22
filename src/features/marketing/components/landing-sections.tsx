import {
  ArrowRight,
  BadgeCheck,
  Bell,
  Boxes,
  Building2,
  CheckCircle2,
  LineChart,
  Quote,
  ShoppingCart,
  Tags,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { CtaButton, LandingContainer, SectionHeading } from "./landing-ui";

/** Feature grid — six core capabilities of the platform. */
export function LandingFeatures() {
  const t = useTranslations("Landing.features");

  const features: { icon: LucideIcon; title: string; desc: string }[] = [
    { icon: Tags, title: t("catalogTitle"), desc: t("catalogDesc") },
    { icon: Boxes, title: t("trackingTitle"), desc: t("trackingDesc") },
    { icon: Bell, title: t("alertsTitle"), desc: t("alertsDesc") },
    { icon: Building2, title: t("warehousesTitle"), desc: t("warehousesDesc") },
    { icon: ShoppingCart, title: t("procurementTitle"), desc: t("procurementDesc") },
    { icon: LineChart, title: t("reportsTitle"), desc: t("reportsDesc") },
  ];

  return (
    <section id="features" className="scroll-mt-20 py-20 sm:py-28">
      <LandingContainer>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-6 transition-all hover:-translate-y-1 hover:border-border hover:shadow-lg hover:shadow-black/5"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--chart-2)]/12 to-[var(--chart-4)]/12 text-[var(--chart-3)] ring-1 ring-inset ring-[var(--chart-3)]/15">
                <feature.icon className="size-5.5" />
              </span>
              <div className="space-y-1.5">
                <h3 className="text-base font-semibold tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </LandingContainer>
    </section>
  );
}

/** Three-step "how it works" timeline. */
export function LandingWorkflow() {
  const t = useTranslations("Landing.workflow");

  const steps = [
    { title: t("step1Title"), desc: t("step1Desc") },
    { title: t("step2Title"), desc: t("step2Desc") },
    { title: t("step3Title"), desc: t("step3Desc") },
  ];

  return (
    <section id="workflow" className="scroll-mt-20 bg-muted/30 py-20 sm:py-28">
      <LandingContainer>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <div className="relative mt-14 grid gap-8 md:grid-cols-3">
          <div
            aria-hidden
            className="absolute inset-x-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block"
          />
          {steps.map((step, i) => (
            <div key={step.title} className="relative flex flex-col items-start gap-4">
              <span className="flex size-12 items-center justify-center rounded-2xl border border-border/70 bg-background text-lg font-semibold shadow-sm">
                <span className="bg-gradient-to-br from-[var(--chart-2)] to-[var(--chart-4)] bg-clip-text text-transparent">
                  {i + 1}
                </span>
              </span>
              <div className="space-y-1.5">
                <h3 className="text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </LandingContainer>
    </section>
  );
}

/** Split highlight section: value checklist + a stat card. */
export function LandingHighlight() {
  const t = useTranslations("Landing.highlight");

  const points = [t("point1"), t("point2"), t("point3"), t("point4")];

  return (
    <section className="py-20 sm:py-28">
      <LandingContainer>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start gap-6">
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              subtitle={t("subtitle")}
              align="start"
            />
            <ul className="flex flex-col gap-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[var(--chart-3)]" />
                  <span className="text-sm text-foreground/90">{point}</span>
                </li>
              ))}
            </ul>
            <CtaButton href="/auth/register" variant="outline" className="group">
              {t("cta")}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </CtaButton>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-[var(--chart-2)]/15 to-[var(--chart-4)]/10 blur-2xl"
            />
            <div className="rounded-2xl border border-border/70 bg-card p-7 shadow-xl shadow-black/5">
              <BadgeCheck className="size-9 text-[var(--chart-3)]" />
              <p className="mt-5 text-pretty text-xl font-medium leading-relaxed tracking-tight">
                {t("title")}
              </p>
              <div className="mt-7 grid grid-cols-2 gap-4 border-t border-border/60 pt-6">
                {points.map((point) => (
                  <div key={point} className="flex items-start gap-2">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-gradient-to-br from-[var(--chart-2)] to-[var(--chart-4)]" />
                    <span className="text-xs leading-snug text-muted-foreground">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}

/** Metric band — four headline numbers. */
export function LandingMetrics() {
  const t = useTranslations("Landing.metrics");

  const metrics = [
    { value: t("m1Value"), label: t("m1Label") },
    { value: t("m2Value"), label: t("m2Label") },
    { value: t("m3Value"), label: t("m3Label") },
    { value: t("m4Value"), label: t("m4Label") },
  ];

  return (
    <section className="py-8">
      <LandingContainer>
        <div
          className={cn(
            "grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 lg:grid-cols-4",
          )}
        >
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col items-center gap-2 bg-card px-6 py-8 text-center"
            >
              <span className="bg-gradient-to-br from-[var(--chart-2)] to-[var(--chart-4)] bg-clip-text text-4xl font-semibold tracking-tight text-transparent">
                {metric.value}
              </span>
              <span className="text-sm text-muted-foreground">{metric.label}</span>
            </div>
          ))}
        </div>
      </LandingContainer>
    </section>
  );
}

/** Centered testimonial quote. */
export function LandingTestimonial() {
  const t = useTranslations("Landing.testimonial");

  return (
    <section className="py-20 sm:py-28">
      <LandingContainer className="max-w-3xl">
        <figure className="flex flex-col items-center gap-6 text-center">
          <Quote className="size-10 text-[var(--chart-3)]/60" />
          <blockquote className="text-balance text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
            “{t("quote")}”
          </blockquote>
          <figcaption className="flex flex-col items-center gap-0.5">
            <span className="text-sm font-semibold">{t("author")}</span>
            <span className="text-sm text-muted-foreground">{t("role")}</span>
          </figcaption>
        </figure>
      </LandingContainer>
    </section>
  );
}
