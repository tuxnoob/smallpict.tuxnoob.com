// src/lib/seo.ts
// Metadata builder utilities for App Router

import type { Metadata } from "next";
import { locales, defaultLocale, type Locale } from "@/i18n/config";

const SITE_URL = "https://smallpict.tuxnoob.com";
const SITE_NAME = "SmallPict";

interface BuildMetadataOptions {
  locale: string;
  title: string;
  description: string;
  pathname?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  locale,
  title,
  description,
  pathname = "/",
  ogImage = "/og/default.png",
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const canonicalUrl = `${SITE_URL}/${locale}${pathname}`;
  const xDefaultUrl = `${SITE_URL}/${defaultLocale}${pathname}`;

  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${SITE_URL}/${l}${pathname}`;
  }

  return {
    title: `${title} — ${SITE_NAME}`,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function buildRootMetadata(locale: Locale): Metadata {
  return buildMetadata({
    locale,
    title: "Smart Image Compression for WordPress",
    description:
      "SmallPict automatically reduces image sizes so your WordPress website loads faster without complicated settings.",
    pathname: "/",
    ogImage: "/og/default.png",
  });
}

export function generateHreflangTags(pathname: string = "/") {
  return locales.map((l) => ({
    rel: "alternate" as const,
    hrefLang: l,
    href: `${SITE_URL}/${l}${pathname}`,
  }));
}
