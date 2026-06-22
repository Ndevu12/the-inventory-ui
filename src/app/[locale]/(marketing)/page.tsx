import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { LandingPage } from "@/features/marketing";
import { APP_NAME } from "@/lib/utils/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Landing.hero" });
  return {
    title: `${APP_NAME} — ${t("titleHighlight")}`,
    description: t("subtitle"),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LandingPage />;
}
