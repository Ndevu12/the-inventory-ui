"use client";

import { use } from "react";

import { ResetPasswordPage } from "@/features/auth";

export default function Page({
  params,
}: {
  params: Promise<{ uid: string; token: string }>;
}) {
  const { uid, token } = use(params);
  return <ResetPasswordPage uid={uid} token={token} />;
}
