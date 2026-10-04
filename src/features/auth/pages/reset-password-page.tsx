"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

import { confirmPasswordReset } from "../api/auth-api";
import { AuthCardShell } from "../components/auth-card-shell";
import { PasswordField } from "../components/password-field";
import { PasswordStrength } from "../components/password-strength";
import {
  createResetPasswordSchema,
  type ResetPasswordFormValues,
} from "../helpers/auth-schemas";

/** Set a new password from the link in the reset email. */
export function ResetPasswordPage({
  uid,
  token,
}: {
  uid: string;
  token: string;
}) {
  const t = useTranslations("Auth.reset");
  const tVal = useTranslations("Auth.validation");
  const [done, setDone] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const schema = useMemo(
    () =>
      createResetPasswordSchema({
        newMin: tVal("newPasswordMin"),
        confirmRequired: tVal("confirmPasswordRequired"),
        mismatch: tVal("passwordsMismatch"),
      }),
    [tVal],
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { new_password: "", confirm_password: "" },
  });

  async function onSubmit(values: ResetPasswordFormValues) {
    setInvalid(false);
    setPasswordError(null);
    setPending(true);
    try {
      await confirmPasswordReset({
        uid,
        token,
        new_password: values.new_password,
      });
      setDone(true);
    } catch (error) {
      const passwordErrors = (error as { errors?: { new_password?: string[] } })
        .errors?.new_password;
      if (passwordErrors?.length) {
        setPasswordError(passwordErrors.join(" "));
      } else {
        setInvalid(true);
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <AuthCardShell
      title={done ? t("successTitle") : t("title")}
      subtitle={done ? t("success") : t("subtitle")}
    >
      {done ? (
        <p className="text-center text-sm">
          <Link
            href="/auth/login"
            className="text-primary underline hover:no-underline"
          >
            {t("signIn")}
          </Link>
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {invalid || passwordError ? (
            <p
              role="alert"
              className="rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {passwordError ?? t("invalid")}
            </p>
          ) : null}
          <PasswordField
            id="new-password"
            label={t("password")}
            placeholder={t("passwordPlaceholder")}
            autoComplete="new-password"
            disabled={pending}
            error={errors.new_password?.message}
            registration={register("new_password")}
          />
          <PasswordStrength password={watch("new_password")} />
          <PasswordField
            id="confirm-password"
            label={t("confirm")}
            placeholder={t("confirmPlaceholder")}
            autoComplete="new-password"
            disabled={pending}
            error={errors.confirm_password?.message}
            registration={register("confirm_password")}
          />
          <Button type="submit" size="lg" className="w-full" disabled={pending}>
            {pending ? <Loader2 className="animate-spin" /> : null}
            {pending ? t("submitting") : t("submit")}
          </Button>
        </form>
      )}
    </AuthCardShell>
  );
}
