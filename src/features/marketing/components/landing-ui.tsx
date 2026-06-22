import type { ComponentProps, ReactNode } from "react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Page-width wrapper shared by every landing section. */
export function LandingContainer({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

/** Small uppercase label that sits above a section heading. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground backdrop-blur">
      <span className="size-1.5 rounded-full bg-gradient-to-br from-[var(--chart-2)] to-[var(--chart-4)]" />
      {children}
    </span>
  );
}

/** Centered section heading with optional eyebrow + subtitle. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "start";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-start",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

/** Gradient-filled emphasis text used in hero/section titles. */
export function GradientText({ children }: { children: ReactNode }) {
  return (
    <span className="bg-gradient-to-br from-[var(--chart-2)] via-[var(--chart-3)] to-[var(--chart-4)] bg-clip-text text-transparent">
      {children}
    </span>
  );
}

type CtaButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ComponentProps<typeof Button>["variant"];
  className?: string;
};

/** Larger, marketing-sized call-to-action rendered as an internal link. */
export function CtaButton({
  href,
  children,
  variant = "default",
  className,
}: CtaButtonProps) {
  return (
    <Button
      variant={variant}
      className={cn(
        "h-11 rounded-xl px-5 text-sm font-semibold shadow-sm transition-transform hover:-translate-y-0.5",
        className,
      )}
      render={<Link href={href} />}
    >
      {children}
    </Button>
  );
}
