// src/lib/admin-api.ts
// Admin Dashboard API Client using typed apiFetch

import { apiGet, apiPost, apiDelete } from "./api-client";
import type {
  Customer,
  CustomerDetail,
  Site,
  ApiKey,
  UsageMetrics,
  TopUser,
  QuotaDistribution,
  AuditLog,
  StaffMember,
  DashboardKpi,
  SystemHealth,
} from "@/types/api";

// ─── Staff Auth ───────────────────────────────────────────

export async function verifyStaff(email: string) {
  return apiPost<{ role: string }>("/admin/auth/verify", { email });
}

// ─── Dashboard Overview ───────────────────────────────────

export async function fetchDashboardOverview() {
  return apiGet<{
    kpis: DashboardKpi[];
    health: SystemHealth[];
    recentActivity: AuditLog[];
  }>("/admin/overview");
}

// ─── Customer Management ──────────────────────────────────

export async function fetchCustomers(params?: { page?: number; search?: string }) {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", String(params.page));
  if (params?.search) query.set("search", params.search);
  return apiGet<{ customers: Customer[]; total: number }>(`/admin/customers?${query}`);
}

export async function fetchCustomerDetail(email: string) {
  return apiGet<CustomerDetail>(`/admin/customers/${encodeURIComponent(email)}`);
}

// ─── Sites ────────────────────────────────────────────────

export async function fetchSites(params?: { page?: number; status?: string }) {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", String(params.page));
  if (params?.status) query.set("status", params.status);
  return apiGet<{ sites: Site[]; total: number }>(`/admin/sites?${query}`);
}

// ─── API Key Operations ───────────────────────────────────

export async function fetchApiKeys() {
  return apiGet<{ keys: ApiKey[]; total: number }>("/admin/keys");
}

export async function revokeCustomerKey(apiKey: string) {
  return apiDelete(`/admin/keys/${encodeURIComponent(apiKey)}`);
}

// ─── Staff Allowlist ──────────────────────────────────────

export async function fetchStaffAllowlist() {
  return apiGet<{ staff: StaffMember[] }>("/admin/staff");
}

export async function addStaffMember(email: string, role: "admin" | "editor") {
  return apiPost("/admin/staff", { email, role });
}

export async function removeStaffMember(email: string) {
  return apiDelete(`/admin/staff/${encodeURIComponent(email)}`);
}

// ─── Usage & Quotas ───────────────────────────────────────

export async function fetchUsageAnalytics(period?: string) {
  const query = period ? `?period=${period}` : "";
  return apiGet<{
    metrics: UsageMetrics;
    topUsers: TopUser[];
    dailyRequests: { date: string; count: number }[];
  }>(`/admin/usage${query}`);
}

export async function fetchQuotaDistribution() {
  return apiGet<{ distributions: QuotaDistribution[]; atRiskUsers: TopUser[] }>(
    "/admin/quotas"
  );
}

// ─── Audit Logs ───────────────────────────────────────────

export async function fetchAuditLogs(params?: { page?: number; limit?: number }) {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));
  return apiGet<{ logs: AuditLog[]; total: number }>(`/admin/audit?${query}`);
}
