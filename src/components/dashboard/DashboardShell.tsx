// src/components/dashboard/DashboardShell.tsx
"use client";

import { useSession } from "next-auth/react";
import DashboardSidebar from "./DashboardSidebar";
import { redirect, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { dashboardNavItems, canAccessStaffManagement } from "@/lib/auth";
import { cn } from "@/lib/utils";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-zinc-400">Loading...</span>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/admin/login");
  }

  const userRole = (session?.user as any)?.role || "editor";
  const userEmail = session?.user?.email || "";

  const visibleNavItems = dashboardNavItems.filter((item) => {
    if (item.requiresAdmin) return canAccessStaffManagement(userRole);
    return true;
  });

  return (
    <>
      {/* Prevent indexing */}
      <meta name="robots" content="noindex, nofollow" />

      <div className="min-h-screen bg-zinc-950 text-white flex">
        {/* Desktop Sidebar */}
        <DashboardSidebar userEmail={userEmail} userRole={userRole} />

        {/* Mobile Overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Mobile Sidebar Drawer */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-zinc-800 transform transition-transform duration-200 md:hidden flex flex-col",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-800">
            <span className="font-bold text-lg bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              SmallPict
            </span>
            <button onClick={() => setMobileOpen(false)} className="text-zinc-400">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex-1 px-3 py-6 space-y-1">
            {visibleNavItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-indigo-500/10 text-indigo-400"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-zinc-800">
            <span className="text-sm font-medium text-white truncate block">{userEmail}</span>
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{userRole}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <header className="h-16 flex items-center justify-between px-6 lg:px-8 border-b border-zinc-800/50 bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-10">
            <h1 className="text-lg font-semibold truncate">Admin Panel</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden p-2 text-zinc-400 hover:text-white"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
