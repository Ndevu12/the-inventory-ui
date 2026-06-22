import { useTranslations } from "next-intl";

import { LandingContainer } from "./landing-ui";
import { BrandMark } from "./landing-nav";

/** Marketing footer with link columns and a legal bottom bar. */
export function LandingFooter() {
  const t = useTranslations("Landing.footer");

  const columns: { heading: string; links: { label: string; href: string }[] }[] = [
    {
      heading: t("productHeading"),
      links: [
        { label: t("features"), href: "#features" },
        { label: t("workflow"), href: "#workflow" },
        { label: t("pricing"), href: "#" },
      ],
    },
    {
      heading: t("companyHeading"),
      links: [
        { label: t("about"), href: "#" },
        { label: t("contact"), href: "#" },
        { label: t("careers"), href: "#" },
      ],
    },
    {
      heading: t("resourcesHeading"),
      links: [
        { label: t("docs"), href: "#" },
        { label: t("security"), href: "#" },
        { label: t("status"), href: "#" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border/60 bg-muted/20">
      <LandingContainer className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <BrandMark />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t("tagline")}
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.heading} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold">{column.heading}</h3>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} The Inventory. {t("rights")}
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("privacy")}
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("terms")}
            </a>
          </div>
        </div>
      </LandingContainer>
    </footer>
  );
}
