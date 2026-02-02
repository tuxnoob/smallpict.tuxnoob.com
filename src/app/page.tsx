"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { locales, defaultLocale } from "../i18n/config";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Detect user's preferred language
    const browserLang = navigator.language.split('-')[0];

    // Check if the browser language is supported
    const targetLocale = (locales as readonly string[]).includes(browserLang)
      ? browserLang
      : defaultLocale;

    router.replace(`/${targetLocale}`);
  }, [router]);

  // Return empty or loading state while redirecting
  return null;
}
