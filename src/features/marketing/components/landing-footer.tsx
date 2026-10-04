import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { LandingContainer } from "./landing-ui";
import { BrandMark } from "./landing-nav";

/** Footer limited to destinations that exist. */
export function LandingFooter() {
  const t = useTranslations("Landing.footer");

  const links = [
    { label: t("features"), href: "/features" },
    { label: t("workflow"), href: "/#workflow" },
    { label: t("pricing"), href: "/features#pricing" },
    { label: t("docs"), href: "/docs" },
    { label: t("contact"), href: "/contact" },
  ];

  return (
    <footer className="border-t border-border/60 bg-muted/20">
      <LandingContainer className="py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex max-w-xs flex-col gap-4">
            <BrandMark />
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t("tagline")}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold">{t("productHeading")}</h3>
            <ul className="flex flex-col gap-2.5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-12 border-t border-border/60 pt-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} The Inventory. {t("rights")}
        </p>
      </LandingContainer>
    </footer>
  );
}
