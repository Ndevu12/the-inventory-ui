"use client";

import { useMutation } from "@tanstack/react-query";

import * as authApi from "../api/auth-api";

/** Ask the server to email a password reset link. */
export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: (email: string) => authApi.requestPasswordReset(email),
  });
}

/** Set a new password from a reset link. */
export function useConfirmPasswordReset() {
  return useMutation({
    mutationFn: (payload: {
      uid: string;
      token: string;
      new_password: string;
    }) => authApi.confirmPasswordReset(payload),
  });
}

/** Return the server's new-password message, or null when the link failed. */
export function newPasswordError(error: unknown): string | null {
  if (!error || typeof error !== "object" || !("errors" in error)) {
    return null;
  }
  const messages = (error as { errors?: { new_password?: string[] } }).errors
    ?.new_password;
  return messages?.length ? messages.join(" ") : null;
}
