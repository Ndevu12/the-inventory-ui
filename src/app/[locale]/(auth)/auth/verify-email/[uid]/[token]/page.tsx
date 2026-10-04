"use client";

import { use } from "react";

import { VerifyEmailPage } from "@/features/auth";

export default function Page({
  params,
}: {
  params: Promise<{ uid: string; token: string }>;
}) {
  const { uid, token } = use(params);
  return <VerifyEmailPage uid={uid} token={token} />;
}
