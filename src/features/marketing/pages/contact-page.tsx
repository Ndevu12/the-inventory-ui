"use client";

import { useTranslations } from "next-intl";

import { LandingFooter } from "../components/landing-footer";
import { LandingNav } from "../components/landing-nav";
import { CtaButton, LandingContainer, SectionHeading } from "../components/landing-ui";

/** The two real ways to reach the product. There is no separate inbox. */
export function ContactPage() {
  const t = useTranslations("Landing.reach");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingNav />
      <main className="flex-1">
        <section className="py-16 sm:py-24">
          <LandingContainer>
            <SectionHeading
              level="h1"
              eyebrow={t("eyebrow")}
              title={t("title")}
              subtitle={t("subtitle")}
            />
            <div className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <CtaButton href="/auth/login">{t("signIn")}</CtaButton>
                <CtaButton href="/auth/register" variant="outline">
                  {t("getStarted")}
                </CtaButton>
              </div>
              <p className="text-center text-sm leading-relaxed text-muted-foreground">
                {t("owner")}
              </p>
            </div>
          </LandingContainer>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
