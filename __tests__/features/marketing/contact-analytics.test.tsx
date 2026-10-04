/**
 * Contact counts stay off until the visitor allows them.
 */
import type { ComponentProps } from "react";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ContactPage } from "@/features/marketing";
import { POST } from "@/app/api/contact-analytics/route";
import messages from "../../../public/locales/en.json";
import { renderWithProviders, resetClientTestState } from "../../helpers/test-app-shell";

vi.mock("next/navigation", () => ({
  usePathname: () => "/en/contact",
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
  usePathname: () => "/contact",
}));

describe("contact analytics", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    resetClientTestState();
  });

  it("sends a page view only after the visitor allows counts", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, { status: 204 }),
    );
    resetClientTestState();
    renderWithProviders(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ContactPage />
      </NextIntlClientProvider>,
    );

    expect(screen.getByText(/count anonymous visits/i)).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Allow" }));

    await waitFor(() => {
      const recorded = fetchMock.mock.calls.filter(([input]) =>
        String(input).includes("/api/contact-analytics"),
      );
      expect(recorded).toHaveLength(1);
      expect(JSON.parse(String(recorded[0][1]?.body))).toEqual({
        event: "view",
        path: "/contact",
      });
    });
  });

  it("counts a sign-in click from the page, not before consent", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, { status: 204 }),
    );
    resetClientTestState();
    renderWithProviders(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ContactPage />
      </NextIntlClientProvider>,
    );

    const main = screen.getByRole("main");
    fireEvent.click(within(main).getByRole("button", { name: "Sign in" }));
    expect(
      fetchMock.mock.calls.some(([input]) =>
        String(input).includes("/api/contact-analytics"),
      ),
    ).toBe(false);

    fireEvent.click(screen.getByRole("button", { name: "Allow" }));
    await waitFor(() => {
      expect(
        fetchMock.mock.calls.some(([input]) =>
          String(input).includes("/api/contact-analytics"),
        ),
      ).toBe(true);
    });
    fetchMock.mockClear();

    fireEvent.click(within(main).getByRole("button", { name: "Sign in" }));
    await waitFor(() => {
      const recorded = fetchMock.mock.calls.filter(([input]) =>
        String(input).includes("/api/contact-analytics"),
      );
      expect(JSON.parse(String(recorded.at(-1)?.[1]?.body))).toEqual({
        event: "sign-in",
        path: "/contact",
      });
    });
  });

  it("accepts a known contact event and rejects anything else", async () => {
    const ok = await POST(
      new Request("http://localhost/api/contact-analytics", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ event: "view" }),
      }),
    );
    expect(ok.status).toBe(204);

    const rejected = await POST(
      new Request("http://localhost/api/contact-analytics", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ event: "form-submit" }),
      }),
    );
    expect(rejected.status).toBe(400);
  });
});
