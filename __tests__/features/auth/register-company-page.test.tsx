/**
 * Public registration screen rendering (feature shell).
 */
import type { ComponentProps } from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { RegisterCompanyPage } from "@/features/auth/pages/register-company-page";
import messages from "../../../public/locales/en.json";
import { clearQueryClientCache } from "@/lib/providers";
import {
  renderWithProviders,
  resetClientTestState,
  stubFetchAuthConfig,
} from "../../helpers/test-app-shell";

const { navigationState, replace } = vi.hoisted(() => ({
  navigationState: { pathname: "/register" },
  replace: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/en/auth/register",
  useRouter: () => ({ refresh: vi.fn(), replace: vi.fn(), push: vi.fn() }),
}));

vi.mock("@/i18n/navigation", () => ({
  Link: ({
    href,
    children,
    ...rest
  }: ComponentProps<"a"> & { href: string }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
  useRouter: () => ({ replace, push: vi.fn() }),
  usePathname: () => navigationState.pathname,
}));

describe("RegisterCompanyPage rendering", () => {
  beforeEach(() => {
    navigationState.pathname = "/register";
    replace.mockClear();
    resetClientTestState();
    stubFetchAuthConfig(true);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    resetClientTestState();
  });

  it("renders the registration shell when public signup is enabled", async () => {
    clearQueryClientCache();
    renderWithProviders(
      <NextIntlClientProvider locale="en" messages={messages}>
        <RegisterCompanyPage />
      </NextIntlClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/create your organization/i)).toBeInTheDocument();
    });

    expect(screen.getByLabelText(/^organization name$/i)).toBeInTheDocument();
    expect(screen.getByText("Organization")).toBeInTheDocument();
    expect(screen.getByText("Your account")).toBeInTheDocument();
    expect(
      screen.getByText(/starts on Free: 5 people and 100 products/i),
    ).toBeInTheDocument();
  });

  it("shows the form while the server has not answered", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(
      () => new Promise(() => {}),
    );
    clearQueryClientCache();
    renderWithProviders(
      <NextIntlClientProvider locale="en" messages={messages}>
        <RegisterCompanyPage />
      </NextIntlClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/create your organization/i)).toBeInTheDocument();
    });
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  it("leaves for sign-in only after the server closes registration", async () => {
    stubFetchAuthConfig(false);
    clearQueryClientCache();
    renderWithProviders(
      <NextIntlClientProvider locale="en" messages={messages}>
        <RegisterCompanyPage />
      </NextIntlClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/create your organization/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(replace).toHaveBeenCalledWith("/auth/login");
    });
  });
});
