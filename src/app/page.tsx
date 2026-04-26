import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { locales, defaultLocale } from "@/i18n/config";

/**
 * Root page: detects the user's preferred locale from Accept-Language
 * and redirects to the appropriate localized route.
 * This runs server-side, so the redirect is instant (no flash of content).
 */
export default async function RootPage() {
  const headerStore = await headers();
  const acceptLanguage = headerStore.get("accept-language") || "";

  // Parse the primary language from Accept-Language header
  const browserLang = acceptLanguage.split(",")[0]?.split("-")[0]?.toLowerCase();

  const targetLocale = browserLang && (locales as readonly string[]).includes(browserLang)
    ? browserLang
    : defaultLocale;

  redirect(`/${targetLocale}`);
}
