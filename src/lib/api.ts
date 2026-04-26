// Frontend API Client for AWS Lambda Backend

const API_BASE_URL = process.env.NEXT_PUBLIC_LAMBDA_API_URL || "https://api.tuxnoob.com/v1";

/**
 * Gets the current session token from cookies
 * Note: This only works in Client Components. For Server Components, use cookies() from next/headers
 */
const getSessionToken = (): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp('(^| )sp_session=([^;]+)'));
  return match ? match[2] : null;
};

/**
 * Fetches the user's API Keys from Lambda
 */
export async function fetchApiKeys() {
  const token = getSessionToken();
  if (!token) throw new Error("Not authenticated");

  const res = await fetch(`${API_BASE_URL}/user/keys`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  
  if (!res.ok) throw new Error("Failed to fetch API keys");
  return res.json();
}

/**
 * Revokes a specific API key
 */
export async function revokeApiKey(keyId: string) {
  const token = getSessionToken();
  if (!token) throw new Error("Not authenticated");

  const res = await fetch(`${API_BASE_URL}/user/keys/${keyId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  
  if (!res.ok) throw new Error("Failed to revoke API key");
  return res.json();
}

/**
 * Fetches the user's current billable usage and quota
 */
export async function fetchUsage() {
  const token = getSessionToken();
  if (!token) throw new Error("Not authenticated");

  const res = await fetch(`${API_BASE_URL}/usage`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  
  if (!res.ok) throw new Error("Failed to fetch usage");
  return res.json();
}

/**
 * Sends anonymous telemetry for free browser-based conversions
 * This does NOT affect the user's billable quota.
 * It is used strictly for marketing analytics (e.g. "Over 1M images compressed").
 */
export async function sendBrowserConversionTelemetry(event: {
  originalBytes: number;
  newBytes: number;
  format: string;
}) {
  try {
    // Fire and forget
    fetch(`${API_BASE_URL}/telemetry/web`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...event,
        timestamp: new Date().toISOString(),
        // Source helps distinguish traffic origin
        source: "smallpict_web_converter"
      })
    });
  } catch (err) {
    // Silently fail telemetry errors to not disrupt user experience
    console.error("Telemetry failed", err);
  }
}
