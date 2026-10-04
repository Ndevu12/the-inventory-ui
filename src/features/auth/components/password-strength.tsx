import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

export type PasswordStrengthLevel = "short" | "fair" | "strong";

/** Classify a password by length and character variety. */
export function strengthOf(password: string): PasswordStrengthLevel {
  if (password.length < 8) return "short";
  const groups = [/[a-z]/, /[A-Z]/, /\d/, /[^\da-zA-Z]/].filter((pattern) =>
    pattern.test(password),
  ).length;
  if (password.length >= 12 && groups >= 3) return "strong";
  return "fair";
}

/** A one-line reading of how strong the typed password is. */
export function PasswordStrength({ password }: { password: string }) {
  const t = useTranslations("Auth.password");
  if (!password) return null;

  const level = strengthOf(password);
  const label =
    level === "short"
      ? t("strengthShort")
      : level === "fair"
        ? t("strengthFair")
        : t("strengthStrong");
  const width = level === "short" ? "w-1/3" : level === "fair" ? "w-2/3" : "w-full";

  return (
    <div className="grid gap-1.5">
      <div className="h-1 overflow-hidden rounded-full bg-muted" aria-hidden>
        <div className={cn("h-full rounded-full bg-foreground/70", width)} />
      </div>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
