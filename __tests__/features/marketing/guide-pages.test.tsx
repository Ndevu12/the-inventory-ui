/**
 * Guide and contact are real pages, reached from the footer.
 */
import type { ComponentProps } from "react";
import { cleanup, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ContactPage, DocsPage } from "@/features/marketing";
import messages from "../../../public/locales/en.json";
import { renderWithProviders, resetClientTestState } from "../../helpers/test-app-shell";

vi.mock("next/navigation", () => ({
  usePathname: () => "/en/docs",
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
  usePathname: () => "/docs",
}));

describe("guide and contact", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    resetClientTestState();
  });

  it("shows the guide and links documentation from the footer", () => {
    resetClientTestState();
    renderWithProviders(
      <NextIntlClientProvider locale="en" messages={messages}>
        <DocsPage />
      </NextIntlClientProvider>,
    );

    expect(
      screen.getByRole("heading", { name: /how the work is organized/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Documentation" })).toHaveAttribute(
      "href",
      "/docs",
    );
  });

  it("offers sign-in and registration instead of a dead form", () => {
    resetClientTestState();
    renderWithProviders(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ContactPage />
      </NextIntlClientProvider>,
    );

    expect(
      screen.getByRole("heading", { name: /reach the product/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });
});
