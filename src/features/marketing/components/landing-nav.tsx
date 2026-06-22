"use client";

import { useState } from "react";
import { Boxes, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useAuth } from "@/features/auth/context/auth-context";
import { APP_NAME } from "@/lib/utils/constants";
import { cn } from "@/lib/utils";

import { CtaButton } from "./landing-ui";

const SECTION_LINKS = [
  { key: "features", href: "#features" },
  { key: "workflow", href: "#workflow" },
  { key: "faq", href: "#faq" },
] as const;

/** Brand mark reused in the nav and footer. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2 font-semibold tracking-tight",
        className,
      )}
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--chart-2)] to-[var(--chart-4)] text-white shadow-sm">
        <Boxes className="size-4.5" />
      </span>
      <span className="text-base">{APP_NAME}</span>
    </Link>
  );
}

/** Auth-aware actions: dashboard link when signed in, otherwise sign in / get started. */
function NavActions({ onNavigate }: { onNavigate?: () => void }) {
  const t = useTranslations("Landing.nav");
  const { isReady, isAuthenticated } = useAuth();

  if (isReady && isAuthenticated) {
    return (
      <CtaButton
        href="/dashboard"
        className="w-full sm:w-auto"
        variant="default"
      >
        {t("goToDashboard")}
      </CtaButton>
    );
  }

  return (
    <>
      <Button
        variant="ghost"
        className="h-11 rounded-xl px-4 text-sm font-semibold sm:h-9"
        render={<Link href="/auth/login" onClick={onNavigate} />}
      >
        {t("signIn")}
      </Button>
      <CtaButton href="/auth/register" className="w-full sm:w-auto">
        {t("getStarted")}
      </CtaButton>
    </>
  );
}

export function LandingNav() {
  const t = useTranslations("Landing.nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <BrandMark />

        <div className="hidden items-center gap-1 md:flex">
          {SECTION_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(link.key)}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <span className="mx-1 h-5 w-px bg-border" />
          <NavActions />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8">
            {SECTION_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {t(link.key)}
              </a>
            ))}
            <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-4">
              <span className="text-sm text-muted-foreground">
                {t("language")}
              </span>
              <LanguageSwitcher />
            </div>
            <div className="mt-2 flex flex-col gap-2">
              <NavActions onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
