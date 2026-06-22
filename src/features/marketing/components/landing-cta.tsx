import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { CtaButton, LandingContainer } from "./landing-ui";

/** Closing call-to-action band. */
export function LandingCta() {
  const t = useTranslations("Landing.cta");

  return (
    <section className="py-20 sm:py-28">
      <LandingContainer>
        <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-primary to-primary/85 px-6 py-16 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(40rem 20rem at 50% -20%, var(--chart-2), transparent)",
            }}
          />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
              {t("title")}
            </h2>
            <p className="text-pretty text-lg leading-relaxed text-primary-foreground/80">
              {t("subtitle")}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <CtaButton
                href="/auth/register"
                variant="secondary"
                className="group"
              >
                {t("primary")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </CtaButton>
              <CtaButton
                href="/auth/login"
                variant="outline"
                className="border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                {t("secondary")}
              </CtaButton>
            </div>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}
