/**
 * Features page: grid, comparison, and pricing. The landing scroll is unchanged.
 */
import type { ComponentProps } from "react";
import { cleanup, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, describe, expect, it, vi } from "vitest";

import { FeaturesPage } from "@/features/marketing";
import messages from "../../../public/locales/en.json";
import { renderWithProviders, resetClientTestState } from "../../helpers/test-app-shell";

vi.mock("next/navigation", () => ({
  usePathname: () => "/en/features",
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
  useRouter: () => ({ replace: vi.fn(), push: vi.fn() }),
  usePathname: () => "/features",
}));

describe("FeaturesPage", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    resetClientTestState();
  });

  it("shows the feature grid, the comparison, and the four plans", () => {
    resetClientTestState();
    renderWithProviders(
      <NextIntlClientProvider locale="en" messages={messages}>
        <FeaturesPage />
      </NextIntlClientProvider>,
    );

    expect(
      screen.getByRole("heading", {
        name: /one platform for your entire inventory/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /the same work, without the spreadsheets/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /four plans/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Starter" })).toBeInTheDocument();
    expect(screen.getByText("5 people and 100 products")).toBeInTheDocument();
    expect(document.getElementById("comparison")?.nextElementSibling?.id).toBe(
      "pricing",
    );
    expect(screen.queryByRole("heading", { name: /frequently asked questions/i })).toBeNull();
    for (const link of screen.getAllByRole("link", { name: "Features" })) {
      expect(link).toHaveAttribute("href", "/features");
    }
    for (const link of screen.getAllByRole("link", { name: "How it works" })) {
      expect(link).toHaveAttribute("href", "/#workflow");
    }
    expect(screen.getByRole("link", { name: "FAQ" })).toHaveAttribute(
      "href",
      "/#faq",
    );
    expect(screen.queryByRole("button", { name: "See the comparison" })).toBeNull();
  });
});