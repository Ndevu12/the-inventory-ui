"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import type { UseFormRegisterReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/** Password input with a control to show the typed value. */
export function PasswordField({
  id,
  label,
  placeholder,
  autoComplete,
  disabled,
  error,
  registration,
}: {
  id: string;
  label: string;
  placeholder: string;
  autoComplete: "current-password" | "new-password";
  disabled: boolean;
  error?: string;
  registration: UseFormRegisterReturn;
}) {
  const t = useTranslations("Auth.password");
  const [visible, setVisible] = useState(false);
  const errorId = `${id}-error`;

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="pe-11"
          {...registration}
        />
        <button
          type="button"
          className="absolute inset-y-0 end-0 flex w-11 items-center justify-center text-muted-foreground hover:text-foreground"
          aria-label={visible ? t("hide") : t("show")}
          aria-pressed={visible}
          onClick={() => setVisible((current) => !current)}
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      {error ? (
        <p id={errorId} className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
