import PricingSection from "@/components/PricingSection";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { locales } from "@/i18n/config";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pricing" });
  return buildMetadata({
    locale,
    title: t("heading"),
    description: t("subheading"),
    pathname: "/pricing",
    ogImage: "/og/pricing.png",
  });
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PricingSection />;
}
