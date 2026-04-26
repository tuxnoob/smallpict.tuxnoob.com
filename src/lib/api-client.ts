// src/lib/api-client.ts
// Typed fetch wrapper for Lambda API with error handling

import type { ApiResponse, ApiError } from "@/types/api";

const API_BASE = process.env.NEXT_PUBLIC_LAMBDA_API_URL || "https://api.tuxnoob.com/v1";

class ApiClientError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.code = code;
  }
}

function getSessionToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )sp_session=([^;]+)"));
  return match ? match[2] : null;
}

async function parseError(response: Response): Promise<ApiError> {
  let body: Record<string, unknown> = {};
  try {
    body = await response.json();
  } catch {
    // ignore parse errors
  }
  return {
    message: (body.message as string) || `API Error: ${response.status}`,
    code: (body.code as string) || undefined,
    status: response.status,
  };
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getSessionToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await parseError(response);
    throw new ApiClientError(error.message, error.status, error.code);
  }

  // Some endpoints may return 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  const json = await response.json();
  // Support both { data: T } envelope and raw T responses
  const data = (json as ApiResponse<T>).data ?? (json as T);
  return data;
}

export async function apiGet<T>(endpoint: string): Promise<T> {
  return apiFetch<T>(endpoint, { method: "GET" });
}

export async function apiPost<T>(endpoint: string, body?: unknown): Promise<T> {
  return apiFetch<T>(endpoint, {
    method: "POST",
    body: body ? JSON.stringify(body) : undefined,
  });
}

export async function apiDelete<T>(endpoint: string): Promise<T> {
  return apiFetch<T>(endpoint, { method: "DELETE" });
}

export { ApiClientError };
