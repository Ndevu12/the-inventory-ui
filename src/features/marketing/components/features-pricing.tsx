import { useTranslations } from "next-intl";

import { CtaButton, LandingContainer, SectionHeading } from "./landing-ui";

const PLANS = ["free", "starter", "professional", "enterprise"] as const;

/** Renders Free plus the three paid plans. */
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
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <li
              key={plan}
              className="flex flex-col gap-2 rounded-2xl border border-border/70 bg-card p-6"
            >
              <span className="text-xs font-medium tracking-wide text-muted-foreground">
                {t(`${plan}.kind`)}
              </span>
              <h3 className="text-xl font-medium tracking-tight">{t(`${plan}.name`)}</h3>
              <p className="text-sm leading-relaxed text-foreground/90">
                {t(`${plan}.detail`)}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <CtaButton href="/auth/register">{t("cta")}</CtaButton>
        </div>
      </LandingContainer>
    </section>
  );
}
