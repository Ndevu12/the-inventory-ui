"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { confirmEmailVerification } from "../api/auth-api";
import { AuthCardShell } from "../components/auth-card-shell";

type VerifyState = "working" | "success" | "invalid";

/** Confirm the address from the link sent after registration. */
export function VerifyEmailPage({
  uid,
  token,
}: {
  uid: string;
  token: string;
}) {
  const t = useTranslations("Auth.verify");
  const [state, setState] = useState<VerifyState>("working");

  useEffect(() => {
    let cancelled = false;
    confirmEmailVerification({ uid, token })
      .then(() => {
        if (!cancelled) setState("success");
      })
      .catch(() => {
        if (!cancelled) setState("invalid");
      });
    return () => {
      cancelled = true;
    };
  }, [uid, token]);

  const title =
    state === "success" ? t("successTitle") : t("title");
  const subtitle =
    state === "success"
      ? t("success")
      : state === "invalid"
        ? t("invalid")
        : t("working");

  return (
    <AuthCardShell title={title} subtitle={subtitle}>
      {state === "working" ? null : (
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
