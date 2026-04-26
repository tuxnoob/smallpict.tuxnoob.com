// src/app/[locale]/(marketing)/tool/page.tsx
import ImageConverter from "@/components/tool/ImageConverter";
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
  const t = await getTranslations({ locale, namespace: "Tool" });
  return buildMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    pathname: "/tool",
    ogImage: "/og/tool.png",
  });
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ToolPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="relative pt-24 pb-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Free Image Converter
          </h1>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            Convert PNG and JPEG to WebP instantly in your browser.
            No uploads. No tracking. 100% private.
          </p>
        </div>

        <ImageConverter />
      </div>
    </section>
  );
}
