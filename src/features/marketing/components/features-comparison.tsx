import { useTranslations } from "next-intl";

import { LandingContainer, SectionHeading } from "./landing-ui";

/** One list: the spreadsheet habit beside the platform, row by row. */
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
        <div className="mt-14 overflow-hidden rounded-2xl border border-border/70 bg-card">
          <div className="hidden grid-cols-[9rem_1fr_1fr] gap-4 border-b border-border/70 px-6 py-3 text-xs font-medium tracking-wide text-muted-foreground sm:grid">
            <span />
            <span>{t("spreadsheets")}</span>
            <span className="text-foreground">{t("platform")}</span>
          </div>
          <ul>
            {rows.map((row) => (
              <li
                key={row.label}
                className="grid gap-1 border-b border-border/60 px-6 py-5 last:border-b-0 sm:grid-cols-[9rem_1fr_1fr] sm:items-center sm:gap-4"
              >
                <span className="text-xs font-medium tracking-wide text-muted-foreground">
                  {row.label}
                </span>
                <span className="text-sm text-muted-foreground">{row.sheets}</span>
                <span className="text-sm font-medium text-foreground">{row.platform}</span>
              </li>
            ))}
          </ul>
        </div>
      </LandingContainer>
    </section>
  );
}
