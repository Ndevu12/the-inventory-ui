import { useTranslations } from "next-intl";

import { CtaButton, LandingContainer, SectionHeading } from "./landing-ui";

/** The free workspace, and the plans that stay on the same account. */
export function FeaturesPricing() {
  const t = useTranslations("Landing.pricing");

  return (
    <section id="pricing" className="scroll-mt-20 py-20 sm:py-28">
      <LandingContainer className="max-w-3xl">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <div className="mt-14 rounded-2xl border border-border/70 bg-card p-8 text-center shadow-sm">
          <p className="text-sm font-semibold tracking-wide text-muted-foreground">
            {t("freeName")}
          </p>
          <p className="mt-3 text-lg font-medium tracking-tight">{t("freeDetail")}</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            {t("also")}
          </p>
          <CtaButton href="/auth/register" className="mt-8">
            {t("cta")}
          </CtaButton>
        </div>
      </LandingContainer>
    </section>
  );
}
