"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { AuthCardShell } from "../components/auth-card-shell";
import { useRequestPasswordReset } from "../hooks/use-password-reset";
import {
  createForgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "../helpers/auth-schemas";

/** Ask for an email, then say a link is on its way when the request is accepted. */
export function ForgotPasswordPage() {
  const t = useTranslations("Auth.forgot");
  const tVal = useTranslations("Auth.validation");
  const requestReset = useRequestPasswordReset();

  const schema = useMemo(
    () =>
      createForgotPasswordSchema({
        emailRequired: tVal("emailRequired"),
        validEmail: tVal("validEmail"),
      }),
    [tVal],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  function onSubmit(values: ForgotPasswordFormValues) {
    requestReset.mutate(values.email);
  }

  const sent = requestReset.isSuccess;

  return (
    <AuthCardShell
      title={sent ? t("sentTitle") : t("title")}
      subtitle={sent ? t("sent") : t("subtitle")}
    >
      {sent ? (
        <p className="text-center text-sm">
          <Link
            href="/auth/login"
            className="text-primary underline hover:no-underline"
          >
            {t("back")}
          </Link>
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {requestReset.isError ? (
            <p
              role="alert"
              className="rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {t("failed")}
            </p>
          ) : null}
          <div className="grid gap-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder={t("emailPlaceholder")}
              disabled={requestReset.isPending}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
            />
            {errors.email ? (
              <p id="email-error" className="text-xs text-destructive">
                {errors.email.message}
              </p>
            ) : null}
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={requestReset.isPending}
          >
            {requestReset.isPending ? <Loader2 className="animate-spin" /> : null}
            {requestReset.isPending ? t("submitting") : t("submit")}
          </Button>
        </form>
      )}
    </AuthCardShell>
  );
}
