"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { LandingFooter } from "../components/landing-footer";
import { LandingNav } from "../components/landing-nav";
import { CtaButton, LandingContainer, SectionHeading } from "../components/landing-ui";
import {
  readContactAnalyticsConsent,
  storeContactAnalyticsConsent,
  trackContactEvent,
  type ContactAnalyticsConsent,
} from "../lib/contact-analytics";

/** The two real ways to reach the product. There is no separate inbox. */
export function ContactPage() {
  const t = useTranslations("Landing.reach");
  const [consent, setConsent] = useState<ContactAnalyticsConsent | null>(null);
  const [consentReady, setConsentReady] = useState(false);

  useEffect(() => {
    setConsent(readContactAnalyticsConsent());
    setConsentReady(true);
  }, []);

  useEffect(() => {
    if (consent === "granted") trackContactEvent("view");
  }, [consent]);

  function choose(value: ContactAnalyticsConsent) {
    storeContactAnalyticsConsent(value);
    setConsent(value);
  }

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
                <span onClick={() => trackContactEvent("sign-in")}>
                  <CtaButton href="/auth/login">{t("signIn")}</CtaButton>
                </span>
                <span onClick={() => trackContactEvent("get-started")}>
                  <CtaButton href="/auth/register" variant="outline">
                    {t("getStarted")}
                  </CtaButton>
                </span>
              </div>
              <p className="text-center text-sm leading-relaxed text-muted-foreground">
                {t("owner")}
              </p>
              {consentReady && consent === null ? (
                <div className="flex flex-col items-center gap-2 text-center">
                  <p className="text-sm text-muted-foreground">{t("consent")}</p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="text-sm text-primary underline hover:no-underline"
                      onClick={() => choose("granted")}
                    >
                      {t("consentYes")}
                    </button>
                    <button
                      type="button"
                      className="text-sm text-muted-foreground underline hover:no-underline"
                      onClick={() => choose("denied")}
                    >
                      {t("consentNo")}
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </LandingContainer>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
