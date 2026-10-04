import { useTranslations } from "next-intl";

import { CtaButton, LandingContainer, SectionHeading } from "./landing-ui";

const PAID_PLANS = ["starter", "professional", "enterprise"] as const;

/** Free as the way in, and the three paid plans beside it. */
export function FeaturesPricing() {
  const t = useTranslations("Landing.pricing");

  return (
    <section id="pricing" className="scroll-mt-20 py-20 sm:py-28">
      <LandingContainer>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-2">
          <article className="relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card p-8 shadow-xl shadow-black/5">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-gradient-to-br from-[var(--chart-2)]/20 to-[var(--chart-4)]/10 blur-2xl"
            />
            <span className="text-xs font-medium tracking-wide text-muted-foreground">
              {t("free.kind")}
            </span>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight">{t("free.name")}</h3>
            <p className="mt-2 text-base leading-relaxed text-foreground/90">
              {t("free.detail")}
            </p>
            <CtaButton href="/auth/register" className="relative mt-8 w-fit">
              {t("cta")}
            </CtaButton>
          </article>
          <article className="flex flex-col rounded-2xl border border-border/70 bg-card p-8">
            <h3 className="text-lg font-semibold tracking-tight">{t("paidTitle")}</h3>
            <ul className="mt-6 divide-y divide-border/70">
              {PAID_PLANS.map((plan) => (
                <li
                  key={plan}
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                >
                  <span className="text-base font-medium">{t(`${plan}.name`)}</span>
                  <span className="text-xs font-medium tracking-wide text-muted-foreground">
                    {t("paidKind")}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {t("paidNote")}
            </p>
          </article>
        </div>
      </LandingContainer>
    </section>
  );
}
