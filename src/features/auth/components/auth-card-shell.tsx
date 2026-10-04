import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type AuthCardShellProps = {
  formMaxWidth?: "md" | "lg";
  title: string;
  subtitle: string;
  note?: string;
  children: ReactNode;
};

/** The sign-in card: one title edge, then the form. */
export function AuthCardShell({
  formMaxWidth = "md",
  title,
  subtitle,
  note,
  children,
}: AuthCardShellProps) {
  const maxW = formMaxWidth === "lg" ? "max-w-lg" : "max-w-md";

  return (
    <div className="w-full px-4 py-8">
      <div
        className={cn(
          "mx-auto w-full rounded-2xl border border-border/70 bg-card p-6 shadow-xl shadow-black/5 sm:p-8",
          maxW,
        )}
      >
        <div className="text-start">
          <h1 className="text-balance text-2xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
          {note ? (
            <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground/90">
              {note}
            </p>
          ) : null}
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
