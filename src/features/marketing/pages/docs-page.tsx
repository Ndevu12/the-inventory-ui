"use client";

import { useTranslations } from "next-intl";

import { LandingFooter } from "../components/landing-footer";
import { LandingNav } from "../components/landing-nav";
import { LandingContainer, SectionHeading } from "../components/landing-ui";

/** A short guide to the work the product actually does. */
export function DocsPage() {
  const t = useTranslations("Landing.guide");

  const topics = [
    { title: t("catalogTitle"), body: t("catalogBody") },
    { title: t("stockTitle"), body: t("stockBody") },
    { title: t("ordersTitle"), body: t("ordersBody") },
    { title: t("reportsTitle"), body: t("reportsBody") },
    { title: t("languagesTitle"), body: t("languagesBody") },
    { title: t("plansTitle"), body: t("plansBody") },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingNav />
      <main className="flex-1">
        <section className="scroll-mt-20 py-16 sm:py-24">
          <LandingContainer>
            <SectionHeading
              level="h1"
              eyebrow={t("eyebrow")}
              title={t("title")}
              subtitle={t("subtitle")}
            />
            <ul className="mx-auto mt-14 flex max-w-3xl flex-col divide-y divide-border/70 rounded-2xl border border-border/70 bg-card">
              {topics.map((topic) => (
                <li key={topic.title} className="px-6 py-5">
                  <h2 className="text-base font-semibold tracking-tight">
                    {topic.title}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {topic.body}
                  </p>
                </li>
              ))}
            </ul>
          </LandingContainer>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
