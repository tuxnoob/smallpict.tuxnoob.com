"use client";

import { SessionProvider } from "next-auth/react";

/**
 * Client-side wrapper that provides NextAuth SessionProvider context.
 * Used by the admin server layout which can't be "use client" itself
 * because it needs to export `dynamic = "force-dynamic"`.
 */
export function AdminProviders({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
