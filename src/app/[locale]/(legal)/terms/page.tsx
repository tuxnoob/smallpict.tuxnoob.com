import { useTranslations } from "next-intl";
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
  const t = await getTranslations({ locale, namespace: "Terms" });
  return buildMetadata({
    locale,
    title: t("title"),
    description: t("s1_content"),
    pathname: "/terms",
  });
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TermsContent />;
}

function TermsContent() {
  const t = useTranslations("Terms");

  return (
    <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-white mb-8">{t("title")}</h1>
      <p className="text-sm text-gray-500 mb-8">{t("lastUpdated")}</p>

      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">{t("s1_title")}</h2>
        <p className="text-gray-400 mb-4">{t("s1_content")}</p>

        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">{t("s2_title")}</h2>
        <p className="text-gray-400 mb-4">{t("s2_content")}</p>

        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">{t("s3_title")}</h2>
        <p className="text-gray-400 mb-4">{t("s3_content")}</p>
        <ul className="list-disc list-inside text-gray-400 mb-4 space-y-2">
          <li>{t("s3_item1")}</li>
          <li>{t("s3_item2")}</li>
          <li>{t("s3_item3")}</li>
        </ul>

        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">{t("s4_title")}</h2>
        <p className="text-gray-400 mb-4">{t("s4_content")}</p>

        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">{t("s5_title")}</h2>
        <p className="text-gray-400 mb-4">{t("s5_content")}</p>

        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">{t("s6_title")}</h2>
        <p className="text-gray-400 mb-4">{t("s6_content")}</p>
      </div>
    </div>
  );
}
