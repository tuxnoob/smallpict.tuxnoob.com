// src/hooks/useImageWorker.ts
"use client";

import { useEffect, useRef, useCallback } from "react";

export interface WorkerMessage {
  id: string;
  success: boolean;
  blob?: Blob;
  width?: number;
  height?: number;
  originalSize?: number;
  newSize?: number;
  error?: string;
}

export function useImageWorker(
  onMessage: (msg: WorkerMessage) => void
) {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../workers/image.worker.ts", import.meta.url)
    );

    workerRef.current.onmessage = (e: MessageEvent<WorkerMessage>) => {
      onMessage(e.data);
    };

    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, [onMessage]);

  const postMessage = useCallback(
    (data: {
      id: string;
      file: File;
      quality: number;
      maxWidth?: number;
      format?: string;
    }) => {
      workerRef.current?.postMessage(data);
    },
    []
  );

  return { postMessage };
}
