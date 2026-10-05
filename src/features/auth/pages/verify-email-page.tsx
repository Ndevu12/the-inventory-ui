"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { AuthCardShell } from "../components/auth-card-shell";
import { useEmailVerification } from "../hooks/use-email-verification";

/** Confirm the address from the link sent after registration. */
export function VerifyEmailPage({
  uid,
  token,
}: {
  uid: string;
  token: string;
}) {
  const t = useTranslations("Auth.verify");
  const status = useEmailVerification(uid, token);

  const title = status === "success" ? t("successTitle") : t("title");
  const subtitle =
    status === "success"
      ? t("success")
      : status === "invalid"
        ? t("invalid")
        : t("working");

  return (
    <AuthCardShell title={title} subtitle={subtitle}>
      {status === "working" ? null : (
        <p className="text-center text-sm">
          <Link
            href="/auth/login"
            className="text-primary underline hover:no-underline"
          >
            {t("signIn")}
          </Link>
        </p>
      )}
    </AuthCardShell>
  );
}
