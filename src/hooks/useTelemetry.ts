// src/hooks/useTelemetry.ts
"use client";

import { useCallback } from "react";
import { createTelemetryEvent, sendTelemetry } from "@/lib/telemetry";

export function useTelemetry() {
  const trackConversion = useCallback(
    (
      originalBytes: number,
      newBytes: number,
      format: string,
      width?: number,
      height?: number
    ) => {
      const event = createTelemetryEvent(
        originalBytes,
        newBytes,
        format,
        width,
        height
      );
      sendTelemetry(event);
    },
    []
  );

  return { trackConversion };
}
