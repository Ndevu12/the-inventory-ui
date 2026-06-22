import { Boxes } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { APP_NAME } from "@/lib/utils/constants";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-muted/30">
      {/* Decorative backdrop matching the marketing landing */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-15%] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-[var(--chart-2)]/15 via-[var(--chart-4)]/10 to-transparent blur-3xl" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklab, var(--border) 50%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--border) 50%, transparent) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse 60% 50% at 50% 0%, black, transparent)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 50% at 50% 0%, black, transparent)",
          }}
        />
      </div>

      <header className="flex items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-semibold tracking-tight"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--chart-2)] to-[var(--chart-4)] text-white shadow-sm">
            <Boxes className="size-4.5" />
          </span>
          <span className="text-base">{APP_NAME}</span>
        </Link>
        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 pb-12">
        {children}
      </main>
    </div>
  );
}
