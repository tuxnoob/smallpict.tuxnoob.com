import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n/config";

// next-intl middleware for locale routing
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});

// Internal routes that require authentication
const PROTECTED_ADMIN_PATHS = ["/admin/dashboard"];

// Public paths that should skip auth checks
const PUBLIC_PATHS = ["/admin/login", "/api/auth"];

function isProtectedAdminPath(pathname: string): boolean {
  return PROTECTED_ADMIN_PATHS.some((path) => pathname.includes(path));
}

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((path) => pathname.startsWith(path));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for API routes, static files, and NextAuth
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes("favicon")
  ) {
    return NextResponse.next();
  }

  // Protect internal dashboard routes with NextAuth JWT
  if (isProtectedAdminPath(pathname)) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const localeMatch = pathname.match(/^\/([a-z]{2})\//);
      const localePrefix = localeMatch ? `/${localeMatch[1]}` : "";

      const url = request.nextUrl.clone();
      url.pathname = `${localePrefix}/admin/login`;
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }

  // Apply next-intl locale routing for everything else
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
