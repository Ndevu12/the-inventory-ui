"use client";

import { useEffect, useState } from "react";

import * as authApi from "../api/auth-api";

export type EmailVerificationStatus = "working" | "success" | "invalid";

/** Confirm an address from the link sent after registration. */
export function useEmailVerification(
  uid: string,
  token: string,
): EmailVerificationStatus {
  const [status, setStatus] = useState<EmailVerificationStatus>("working");

  useEffect(() => {
    let cancelled = false;
    setStatus("working");
    authApi
      .confirmEmailVerification({ uid, token })
      .then(() => {
        if (!cancelled) setStatus("success");
      })
      .catch(() => {
        if (!cancelled) setStatus("invalid");
      });
    return () => {
      cancelled = true;
    };
  }, [uid, token]);

  return status;
}
