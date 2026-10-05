"use client";

import { useQuery } from "@tanstack/react-query";

import * as authApi from "../api/auth-api";
import { authKeys } from "../auth-query-keys";

/** Read whether this deployment allows public registration. */
export function useAuthConfig() {
  return useQuery({
    queryKey: authKeys.config,
    queryFn: authApi.fetchAuthConfig,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
