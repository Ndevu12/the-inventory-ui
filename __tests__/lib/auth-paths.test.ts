import { describe, expect, it } from "vitest";

import {
  isPublicAuthPath,
  parseLocalePath,
  requiresJwtAccessCookie,
} from "@/lib/auth-paths";

describe("auth-paths", () => {
  it("parseLocalePath strips known locale prefix", () => {
    expect(parseLocalePath("/en/auth/login")).toEqual({
      locale: "en",
      innerPath: "/auth/login",
    });
    expect(parseLocalePath("/fr")).toEqual({ locale: "fr", innerPath: "/" });
    expect(parseLocalePath("/")).toEqual({
      locale: "en",
      innerPath: "/",
    });
  });

  it("parseLocalePath treats unknown first segment as locale-free path", () => {
    expect(parseLocalePath("/auth/login")).toEqual({
      locale: "en",
      innerPath: "/auth/login",
    });
  });

  it("isPublicAuthPath covers the landing, auth and invitation flows", () => {
    expect(isPublicAuthPath("/")).toBe(true);
    expect(isPublicAuthPath("/auth/login")).toBe(true);
    expect(isPublicAuthPath("/auth/register")).toBe(true);
    expect(isPublicAuthPath("/auth/no-organization")).toBe(true);
    expect(isPublicAuthPath("/auth/accept-invitation")).toBe(true);
    expect(isPublicAuthPath("/auth/accept-invitation/abc")).toBe(true);
    expect(isPublicAuthPath("/auth/login/")).toBe(true);
  });

  it("requiresJwtAccessCookie is the complement on dashboard paths", () => {
    expect(requiresJwtAccessCookie("/")).toBe(false);
    expect(requiresJwtAccessCookie("/products")).toBe(true);
    expect(requiresJwtAccessCookie("/dashboard")).toBe(true);
    expect(requiresJwtAccessCookie("/auth/login")).toBe(false);
  });
});
