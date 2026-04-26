// src/lib/auth.ts
// Auth helpers for client and server

import type { StaffRole } from "@/types/auth";

export function isAdmin(role?: string): boolean {
  return role === "admin";
}

export function isEditorOrAdmin(role?: string): boolean {
  return role === "editor" || role === "admin";
}

export function canAccessStaffManagement(role?: string): boolean {
  return isAdmin(role);
}

export function canAccessSettings(role?: string): boolean {
  return isAdmin(role);
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  requiresAdmin?: boolean;
}

export const dashboardNavItems: NavItem[] = [
  { label: "Overview", href: "/admin/dashboard" },
  { label: "Customers", href: "/admin/dashboard/customers" },
  { label: "Sites", href: "/admin/dashboard/sites" },
  { label: "API Keys", href: "/admin/dashboard/keys" },
  { label: "Usage", href: "/admin/dashboard/usage" },
  { label: "Quotas", href: "/admin/dashboard/quotas" },
  { label: "Audit Logs", href: "/admin/dashboard/audit" },
  { label: "Settings", href: "/admin/dashboard/settings", requiresAdmin: true },
];
