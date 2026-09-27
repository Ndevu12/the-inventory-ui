/**
 * Landing composition. The page stays one compressed scroll; section order is the contract.
 */
import type { ComponentProps } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, describe, expect, it, vi } from "vitest";

import { LandingPage } from "@/features/marketing";
import messages from "../../../public/locales/en.json";
import { renderWithProviders, resetClientTestState } from "../../helpers/test-app-shell";

vi.mock("next/navigation", () => ({
  usePathname: () => "/en",
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
  usePathname: () => "/",
}));

function follows(earlier: HTMLElement, later: HTMLElement): boolean {
  return (
    (earlier.compareDocumentPosition(later) &
      Node.DOCUMENT_POSITION_FOLLOWING) !==
    0
  );
}

describe("LandingPage composition", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    resetClientTestState();
  });

  it("places the testimonial directly above the FAQ", () => {
    resetClientTestState();
    renderWithProviders(
      <NextIntlClientProvider locale="en" messages={messages}>
        <LandingPage />
      </NextIntlClientProvider>,
    );

    const workflow = screen.getByRole("heading", {
      name: /up and running in three steps/i,
    });
    const quote = screen.getByText(/we replaced three disconnected tools/i);
    const faq = screen.getByRole("heading", {
      name: /frequently asked questions/i,
    });
    const cta = screen.getByRole("heading", {
      name: /ready to take control of your inventory/i,
    });

    expect(
      screen.queryByRole("heading", {
        name: /one platform for your entire inventory/i,
      }),
    ).toBeNull();
    expect(follows(workflow, quote)).toBe(true);
    expect(follows(quote, faq)).toBe(true);
    expect(follows(faq, cta)).toBe(true);

    const testimonialSection = quote.closest("section");
    expect(testimonialSection?.nextElementSibling?.id).toBe("faq");

    for (const link of screen.getAllByRole("link", { name: "Features" })) {
      expect(link).toHaveAttribute("href", "/features");
    }
    for (const link of screen.getAllByRole("link", { name: "How it works" })) {
      expect(link).toHaveAttribute("href", "/#workflow");
    }
  });
});
