// src/types/api.ts

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status: number;
}

// ─── Customer Types ───────────────────────────────────────

export interface Customer {
  email: string;
  siteUrl: string;
  apiStatus: "active" | "revoked" | "pending";
  plan: PlanTier;
  joinedAt: string;
  lastActiveAt?: string;
}

export interface CustomerDetail extends Customer {
  apiKey: string;
  usageThisMonth: number;
  quotaLimit: number;
  sites: Site[];
}

// ─── Site Types ───────────────────────────────────────────

export interface Site {
  domain: string;
  pluginVersion: string;
  wordpressVersion?: string;
  lastPingAt: string;
  status: "active" | "inactive" | "error";
  monthlyRequests: number;
}

// ─── API Key Types ────────────────────────────────────────

export interface ApiKey {
  id: string;
  keyPrefix: string;
  email: string;
  site: string;
  status: "active" | "revoked";
  createdAt: string;
  revokedAt?: string;
}

// ─── Usage Types ──────────────────────────────────────────

export interface UsageMetrics {
  totalRequests: number;
  dataProcessedBytes: number;
  avgCompressionRatio: number;
  uniqueSites: number;
  period: string;
}

export interface TopUser {
  email: string;
  plan: PlanTier;
  requests: number;
  dataBytes: number;
  quotaPercent: number;
}

// ─── Quota Types ──────────────────────────────────────────

export interface QuotaDistribution {
  plan: PlanTier;
  count: number;
  totalQuotaBytes: number;
  usedQuotaBytes: number;
}

// ─── Audit Types ──────────────────────────────────────────

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: "admin" | "editor";
  action: AuditAction;
  target: string;
  metadata?: Record<string, unknown>;
}

export type AuditAction =
  | "login"
  | "logout"
  | "revoke_key"
  | "add_staff"
  | "remove_staff"
  | "update_staff_role"
  | "view_customer"
  | "export_data";

// ─── Staff Types ──────────────────────────────────────────

export interface StaffMember {
  email: string;
  role: "admin" | "editor";
  status: "active" | "pending_login";
  invitedBy: string;
  invitedAt: string;
  lastLoginAt?: string;
  providers?: string[];
}

// ─── Plan Types ───────────────────────────────────────────

export type PlanTier =
  | "free"
  | "starter"
  | "pro"
  | "business"
  | "agency"
  | "enterprise";

export interface PlanConfig {
  id: PlanTier;
  planId: string;
  title: string;
  monthlyPrice: string;
  annualPrice: string;
  description: string;
  features: string[];
  quota: string;
  highlight?: boolean;
  buttonText?: string;
}

// ─── Telemetry Types ──────────────────────────────────────

export interface BrowserTelemetryEvent {
  originalBytes: number;
  newBytes: number;
  format: string;
  width?: number;
  height?: number;
  timestamp: string;
  source: string;
  clientHash?: string;
  browser?: string;
  region?: string;
}

// ─── Dashboard Types ──────────────────────────────────────

export interface DashboardKpi {
  label: string;
  value: string;
  delta: string;
  deltaPositive: boolean;
  trend?: number[];
}

export interface SystemHealth {
  service: string;
  status: "operational" | "degraded" | "down";
  latencyMs?: number;
  lastChecked: string;
}
