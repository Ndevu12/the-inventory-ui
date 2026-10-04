"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createLoginSchema,
  type LoginFormValues,
} from "../helpers/auth-schemas";
import { PasswordField } from "./password-field";

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
  isPending: boolean;
  serverError: string | null;
}

export function LoginForm({ onSubmit, isPending, serverError }: LoginFormProps) {
  const t = useTranslations("Auth.login");
  const tVal = useTranslations("Auth.validation");

  const schema = useMemo(
    () =>
      createLoginSchema({
        usernameRequired: tVal("usernameRequired"),
        passwordRequired: tVal("passwordRequired"),
      }),
    [tVal],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const usernameErrorId = "username-error";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      {serverError && (
        <div
          role="alert"
          className="rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {serverError}
        </div>
      )}

      <div className="grid gap-2">
        <Label htmlFor="username">{t("username")}</Label>
        <Input
          id="username"
          type="text"
          placeholder={t("usernamePlaceholder")}
          autoComplete="username"
          autoFocus
          disabled={isPending}
          aria-invalid={errors.username ? true : undefined}
          aria-describedby={errors.username ? usernameErrorId : undefined}
          {...register("username")}
        />
        {errors.username && (
          <p id={usernameErrorId} className="text-xs text-destructive">
            {errors.username.message}
          </p>
        )}
      </div>

      <PasswordField
        id="password"
        label={t("password")}
        placeholder={t("passwordPlaceholder")}
        autoComplete="current-password"
        disabled={isPending}
        error={errors.password?.message}
        registration={register("password")}
      />

      <Button type="submit" size="lg" className="w-full" disabled={isPending}>
        {isPending && <Loader2 className="animate-spin" />}
        {isPending ? t("signingIn") : t("signIn")}
      </Button>
    </form>
  );
}
