// src/components/dashboard/DashboardSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  Globe,
  KeyRound,
  BarChart3,
  PieChart,
  ClipboardList,
  Settings,
  LogOut,
} from "lucide-react";
import type { StaffRole } from "@/types/auth";
import { dashboardNavItems, canAccessStaffManagement } from "@/lib/auth";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const iconMap: Record<string, React.ReactNode> = {
  Overview: <LayoutDashboard className="w-4 h-4" />,
  Customers: <Users className="w-4 h-4" />,
  Sites: <Globe className="w-4 h-4" />,
  "API Keys": <KeyRound className="w-4 h-4" />,
  Usage: <BarChart3 className="w-4 h-4" />,
  Quotas: <PieChart className="w-4 h-4" />,
  "Audit Logs": <ClipboardList className="w-4 h-4" />,
  Settings: <Settings className="w-4 h-4" />,
};

interface DashboardSidebarProps {
  userEmail: string;
  userRole: StaffRole;
}

export default function DashboardSidebar({ userEmail, userRole }: DashboardSidebarProps) {
  const pathname = usePathname();

  const visibleNavItems = dashboardNavItems.filter((item) => {
    if (item.requiresAdmin) {
      return canAccessStaffManagement(userRole);
    }
    return true;
  });

  return (
    <div className="w-64 bg-zinc-900 border-r border-zinc-800 hidden md:flex flex-col shrink-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-zinc-800">
        <Link
          href="/"
          className="font-bold tracking-tight text-lg bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
        >
          SmallPict
        </Link>
        <span className="ml-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 px-1.5 py-0.5 bg-zinc-800 rounded">
          Internal
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {visibleNavItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-indigo-500/10 text-indigo-400"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
              )}
            >
              {iconMap[item.label]}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-zinc-800">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-white truncate">{userEmail}</span>
          <span
            className={cn(
              "text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full w-max",
              userRole === "admin"
                ? "bg-indigo-500/10 text-indigo-400"
                : "bg-zinc-800 text-zinc-500"
            )}
          >
            {userRole}
          </span>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="mt-3 flex items-center gap-2 text-xs text-zinc-500 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
