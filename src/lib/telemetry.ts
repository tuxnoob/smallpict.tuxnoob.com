// src/lib/telemetry.ts
// Privacy-aware telemetry for browser tool usage

import type { BrowserTelemetryEvent } from "@/types/api";

const API_BASE = process.env.NEXT_PUBLIC_LAMBDA_API_URL || "https://api.tuxnoob.com/v1";
const SOURCE = "smallpict_web_converter";

function hashString(str: string): string {
  // Simple djb2 hash for privacy
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return (hash >>> 0).toString(16);
}

function getBrowserInfo(): { browser: string; region: string } {
  const ua = navigator.userAgent;
  let browser = "unknown";
  if (ua.includes("Chrome")) browser = "chrome";
  else if (ua.includes("Firefox")) browser = "firefox";
  else if (ua.includes("Safari")) browser = "safari";
  else if (ua.includes("Edge")) browser = "edge";

  const region = navigator.language.split("-")[0] || "unknown";
  return { browser, region };
}

function getClientHash(): string {
  // Create a privacy-preserving client fingerprint
  // This is NOT for tracking individuals across sessions
  const seed = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
  ].join("|");
  return hashString(seed);
}

export function createTelemetryEvent(
  originalBytes: number,
  newBytes: number,
  format: string,
  width?: number,
  height?: number
): BrowserTelemetryEvent {
  const { browser, region } = getBrowserInfo();
  return {
    originalBytes,
    newBytes,
    format,
    width,
    height,
    timestamp: new Date().toISOString(),
    source: SOURCE,
    clientHash: getClientHash(),
    browser,
    region,
  };
}

export async function sendTelemetry(event: BrowserTelemetryEvent): Promise<void> {
  try {
    // Fire and forget — do not block user experience
    await fetch(`${API_BASE}/telemetry/web`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
      // Ensure this doesn't hang
      signal: AbortSignal.timeout(5000),
    });
  } catch {
    // Silently fail telemetry errors
  }
}
