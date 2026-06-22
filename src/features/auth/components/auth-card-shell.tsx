import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type AuthCardShellProps = {
  formMaxWidth?: "md" | "lg";
  title: string;
  subtitle: string;
  formIcon: LucideIcon;
  children: ReactNode;
};

/**
 * Centered authentication card (login, register, etc.). Marketing copy now lives
 * on the public landing page, so this shell is intentionally focused on the form.
 */
export function AuthCardShell({
  formMaxWidth = "md",
  title,
  subtitle,
  formIcon: FormIcon,
  children,
}: AuthCardShellProps) {
  const maxW = formMaxWidth === "lg" ? "max-w-lg" : "max-w-md";

  return (
    <div className="w-full px-4 py-8">
      <div
        className={cn(
          "mx-auto w-full rounded-2xl border bg-background/80 p-6 shadow-sm backdrop-blur-sm sm:p-8",
          maxW,
        )}
      >
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--chart-2)] to-[var(--chart-4)] text-white shadow-sm">
            <FormIcon className="h-6 w-6" />
          </div>
          <h1 className="text-balance text-xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="mt-1.5 text-pretty text-sm text-muted-foreground">
            {subtitle}
          </p>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
