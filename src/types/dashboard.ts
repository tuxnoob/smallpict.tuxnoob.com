// src/types/dashboard.ts

import type {
  Customer,
  Site,
  ApiKey,
  UsageMetrics,
  TopUser,
  QuotaDistribution,
  AuditLog,
  StaffMember,
  DashboardKpi,
  SystemHealth,
} from "./api";

export interface DashboardOverviewData {
  kpis: DashboardKpi[];
  health: SystemHealth[];
  recentActivity: AuditLog[];
}

export interface CustomersPageData {
  customers: Customer[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface SitesPageData {
  sites: Site[];
  totalCount: number;
}

export interface KeysPageData {
  keys: ApiKey[];
  totalCount: number;
}

export interface UsagePageData {
  metrics: UsageMetrics;
  topUsers: TopUser[];
  dailyRequests: { date: string; count: number }[];
}

export interface QuotasPageData {
  distributions: QuotaDistribution[];
  atRiskUsers: TopUser[];
}

export interface AuditPageData {
  logs: AuditLog[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface StaffPageData {
  staff: StaffMember[];
  totalCount: number;
}
