import { BadgeCheck } from "lucide-react";
import { useTranslations } from "next-intl";

import { CtaButton, LandingContainer, SectionHeading } from "./landing-ui";

/** The free workspace, and the plans that stay on the same account. */
export function FeaturesPricing() {
  const t = useTranslations("Landing.pricing");

  return (
    <section id="pricing" className="scroll-mt-20 py-20 sm:py-28">
      <LandingContainer>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            align="start"
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-[var(--chart-2)]/15 to-[var(--chart-4)]/10 blur-2xl"
            />
            <div className="rounded-2xl border border-border/70 bg-card p-7 shadow-xl shadow-black/5">
              <BadgeCheck className="size-9 text-[var(--chart-3)]" />
              <p className="mt-5 text-xl font-medium tracking-tight">{t("freeName")}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                {t("freeDetail")}
              </p>
              <p className="mt-4 border-t border-border/60 pt-4 text-sm leading-relaxed text-muted-foreground">
                {t("also")}
              </p>
              <CtaButton href="/auth/register" className="mt-7">
                {t("cta")}
              </CtaButton>
            </div>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}
