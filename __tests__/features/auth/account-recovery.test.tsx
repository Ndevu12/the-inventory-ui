/**
 * Password reset and email confirmation screens.
 */
import type { ComponentProps, ReactNode } from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ForgotPasswordPage } from "@/features/auth/pages/forgot-password-page";
import { ResetPasswordPage } from "@/features/auth/pages/reset-password-page";
import { VerifyEmailPage } from "@/features/auth/pages/verify-email-page";
import messages from "../../../public/locales/en.json";

const recovery = vi.hoisted(() => ({
  requestPasswordReset: vi.fn(),
  confirmPasswordReset: vi.fn(),
  confirmEmailVerification: vi.fn(),
}));

vi.mock("@/features/auth/api/auth-api", () => recovery);

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
  usePathname: () => "/auth/forgot-password",
}));

function renderRecovery(ui: ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {ui}
    </NextIntlClientProvider>,
  );
}

describe("account recovery", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("asks for an email and then says the reset link is on its way", async () => {
    recovery.requestPasswordReset.mockResolvedValue({ detail: "ok" });
    renderRecovery(<ForgotPasswordPage />);

    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: "ada@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /email me a link/i }));

    await waitFor(() => {
      expect(recovery.requestPasswordReset).toHaveBeenCalledWith("ada@example.com");
    });
    expect(screen.getByText(/reset link is on its way/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to sign in/i })).toHaveAttribute(
      "href",
      "/auth/login",
    );
  });

  it("rejects a short password and saves a matching one", async () => {
    recovery.confirmPasswordReset.mockResolvedValue({ detail: "ok" });
    renderRecovery(<ResetPasswordPage uid="abc" token="tok" />);

    fireEvent.change(screen.getByLabelText(/^new password$/i), {
      target: { value: "short" },
    });
    fireEvent.change(screen.getByLabelText(/^confirm password$/i), {
      target: { value: "short" },
    });
    fireEvent.click(screen.getByRole("button", { name: /update password/i }));
    expect(
      await screen.findByText("New password must be at least 8 characters"),
    ).toBeInTheDocument();
    expect(recovery.confirmPasswordReset).not.toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText(/^new password$/i), {
      target: { value: "LongPassword1" },
    });
    fireEvent.change(screen.getByLabelText(/^confirm password$/i), {
      target: { value: "LongPassword1" },
    });
    fireEvent.click(screen.getByRole("button", { name: /update password/i }));

    await waitFor(() => {
      expect(recovery.confirmPasswordReset).toHaveBeenCalledWith({
        uid: "abc",
        token: "tok",
        new_password: "LongPassword1",
      });
    });
    expect(screen.getByText(/sign in with the new password/i)).toBeInTheDocument();
  });

  it("confirms an email link and shows when the link is no longer valid", async () => {
    recovery.confirmEmailVerification.mockResolvedValueOnce({ detail: "ok" });
    const { unmount } = renderRecovery(
      <VerifyEmailPage uid="abc" token="tok" />,
    );
    expect(await screen.findByText(/address is confirmed/i)).toBeInTheDocument();
    unmount();

    recovery.confirmEmailVerification.mockRejectedValueOnce(new Error("invalid"));
    renderRecovery(<VerifyEmailPage uid="abc" token="bad" />);
    expect(await screen.findByText(/no longer valid/i)).toBeInTheDocument();
  });
});
