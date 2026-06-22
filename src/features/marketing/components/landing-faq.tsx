import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

import { LandingContainer, SectionHeading } from "./landing-ui";

/** Accordion FAQ built on native <details> — no client JS required. */
export function LandingFaq() {
  const t = useTranslations("Landing.faq");

  const items = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
  ];

  return (
    <section id="faq" className="scroll-mt-20 bg-muted/30 py-20 sm:py-28">
      <LandingContainer className="max-w-3xl">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        <div className="mt-12 flex flex-col gap-3">
          {items.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-border/70 bg-card px-5 open:shadow-sm sm:px-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-start text-base font-medium [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45" />
              </summary>
              <p className="pb-5 text-pretty text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </LandingContainer>
    </section>
  );
}
