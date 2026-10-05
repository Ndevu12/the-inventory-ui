"use client";

import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@/i18n/navigation";
import { toast } from "sonner";

import { useAuthStore } from "@/lib/auth-store";
import * as authApi from "../api/auth-api";
import { useAuth } from "../context/auth-context";
import type { RegisterRequest } from "../types/auth.types";
import { useAuthConfig } from "./use-auth-config";

/** Create an organization and sign the owner in. */
export function useRegister() {
  const { invalidate } = useAuth();
  const { setUser, setTenant, setMemberships } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: RegisterRequest) => authApi.register(payload),
    onSuccess: (data) => {
      setUser(data.user);
      setTenant(data.tenant.slug);
      setMemberships(data.memberships);
      invalidate();
      toast.success(
        `Welcome! Your organization ${data.tenant.name} has been created.`,
      );
      router.replace("/dashboard");
    },
    onError: (error) => {
      toast.error(
        (error as { message?: string }).message ?? "Registration failed",
      );
    },
  });
}

/** Leave registration when the server says public signup is closed. */
export function useLeaveWhenRegistrationClosed() {
  const { data } = useAuthConfig();
  const router = useRouter();

  useEffect(() => {
    if (data && !data.allow_registration) {
      router.replace("/auth/login");
    }
  }, [data, router]);
}
