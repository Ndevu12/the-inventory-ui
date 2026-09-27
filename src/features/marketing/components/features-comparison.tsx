import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { LandingContainer, SectionHeading } from "./landing-ui";

/** Spreadsheets beside the platform, one card each. */
export function FeaturesComparison() {
  const t = useTranslations("Landing.comparison");

  const rows = [
    { label: t("stockLabel"), sheets: t("stockSheets"), platform: t("stockPlatform") },
    { label: t("alertsLabel"), sheets: t("alertsSheets"), platform: t("alertsPlatform") },
    { label: t("auditLabel"), sheets: t("auditSheets"), platform: t("auditPlatform") },
    { label: t("languageLabel"), sheets: t("languageSheets"), platform: t("languagePlatform") },
  ];

  return (
    <section id="comparison" className="scroll-mt-20 bg-muted/30 py-20 sm:py-28">
      <LandingContainer>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <div className="flex flex-col gap-6 rounded-2xl border border-border/70 bg-card p-7">
            <h3 className="text-lg font-semibold tracking-tight text-muted-foreground">
              {t("spreadsheets")}
            </h3>
            <ul className="flex flex-col gap-4">
              {rows.map((row) => (
                <li key={row.label} className="flex flex-col gap-1">
                  <span className="text-xs font-medium tracking-wide text-muted-foreground">
                    {row.label}
                  </span>
                  <span className="text-sm text-foreground/80">{row.sheets}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-[var(--chart-2)]/15 to-[var(--chart-4)]/10 blur-2xl"
            />
            <div className="flex h-full flex-col gap-6 rounded-2xl border border-border/70 bg-card p-7 shadow-xl shadow-black/5">
              <h3 className="bg-gradient-to-br from-[var(--chart-2)] to-[var(--chart-4)] bg-clip-text text-lg font-semibold tracking-tight text-transparent">
                {t("platform")}
              </h3>
              <ul className="flex flex-col gap-4">
                {rows.map((row) => (
                  <li key={row.label} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[var(--chart-3)]" />
                    <span className="flex flex-col gap-1">
                      <span className="text-xs font-medium tracking-wide text-muted-foreground">
                        {row.label}
                      </span>
                      <span className="text-sm text-foreground/90">{row.platform}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}
