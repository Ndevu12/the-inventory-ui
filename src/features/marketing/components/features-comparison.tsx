import { useTranslations } from "next-intl";

import { LandingContainer, SectionHeading } from "./landing-ui";

/** Spreadsheets beside the platform, one row per job. */
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
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/70 text-start">
                <th className="px-5 py-4 font-medium text-muted-foreground" scope="col" />
                <th className="px-5 py-4 text-start font-semibold" scope="col">
                  {t("spreadsheets")}
                </th>
                <th className="px-5 py-4 text-start font-semibold" scope="col">
                  <span className="bg-gradient-to-br from-[var(--chart-2)] to-[var(--chart-4)] bg-clip-text text-transparent">
                    {t("platform")}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-border/60 last:border-0">
                  <th className="px-5 py-4 text-start font-medium" scope="row">
                    {row.label}
                  </th>
                  <td className="px-5 py-4 text-muted-foreground">{row.sheets}</td>
                  <td className="px-5 py-4">{row.platform}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LandingContainer>
    </section>
  );
}
