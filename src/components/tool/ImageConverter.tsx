"use client";

import { useState, useRef, useCallback } from "react";
import { useImageWorker } from "@/hooks/useImageWorker";
import { useTelemetry } from "@/hooks/useTelemetry";
import {
  Upload,
  Download,
  X,
  ImageIcon,
  FileImage,
  Lock,
  ChevronDown,
  ChevronUp,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ProcessedImage = {
  id: string;
  name: string;
  status: "processing" | "success" | "error";
  error?: string;
  blob?: Blob;
  previewUrl?: string;
  originalSize?: number;
  newSize?: number;
  width?: number;
  height?: number;
};

export default function ImageConverter() {
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [quality, setQuality] = useState<number>(80);
  const [maxWidth, setMaxWidth] = useState<number>(1920);
  const [showSettings, setShowSettings] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { trackConversion } = useTelemetry();

  const handleWorkerMessage = useCallback(
    (result: {
      id: string;
      success: boolean;
      blob?: Blob;
      width?: number;
      height?: number;
      originalSize?: number;
      newSize?: number;
      error?: string;
    }) => {
      setImages((prev) =>
        prev.map((img) => {
          if (img.id === result.id) {
            if (result.success && result.blob) {
              trackConversion(
                result.originalSize || 0,
                result.newSize || 0,
                "webp",
                result.width,
                result.height
              );

              return {
                ...img,
                status: "success",
                blob: result.blob,
                previewUrl: URL.createObjectURL(result.blob),
                originalSize: result.originalSize,
                newSize: result.newSize,
                width: result.width,
                height: result.height,
              };
            } else {
              return {
                ...img,
                status: "error",
                error: result.error || "Processing failed",
              };
            }
          }
          return img;
        })
      );
    },
    [trackConversion]
  );

  const { postMessage } = useImageWorker(handleWorkerMessage);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const newImages: ProcessedImage[] = [];

      Array.from(files).forEach((file) => {
        if (!file.type.startsWith("image/")) return;

        const id = Math.random().toString(36).substring(2, 9);
        newImages.push({
          id,
          name: file.name,
          status: "processing",
          originalSize: file.size,
        });

        postMessage({
          id,
          file,
          quality,
          maxWidth: maxWidth > 0 ? maxWidth : undefined,
          format: "webp",
        });
      });

      setImages((prev) => [...newImages, ...prev]);
    },
    [quality, maxWidth, postMessage]
  );

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const formatBytes = (bytes?: number) => {
    if (!bytes) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleDownload = (img: ProcessedImage) => {
    if (!img.blob) return;
    const url = URL.createObjectURL(img.blob);
    const a = document.createElement("a");
    a.href = url;
    const originalName = img.name.replace(/\.[^/.]+$/, "");
    a.download = `${originalName}.webp`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    images.filter((img) => img.status === "success").forEach((img) => {
      handleDownload(img);
    });
  };

  const handleRemove = (id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img?.previewUrl) URL.revokeObjectURL(img.previewUrl);
      return prev.filter((i) => i.id !== id);
    });
  };

  const handleClearAll = () => {
    images.forEach((img) => {
      if (img.previewUrl) URL.revokeObjectURL(img.previewUrl);
    });
    setImages([]);
  };

  const totalSavings = images.reduce((acc, img) => {
    if (img.status === "success" && img.originalSize && img.newSize) {
      return acc + (img.originalSize - img.newSize);
    }
    return acc;
  }, 0);

  const successCount = images.filter((i) => i.status === "success").length;

  return (
    <div className="space-y-6">
      {/* Settings Panel */}
      <div className="glass-card rounded-xl overflow-hidden">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="w-full flex items-center justify-between px-5 py-3 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
        >
          <span className="flex items-center gap-2">
            <FileImage className="w-4 h-4 text-indigo-400" />
            Output Settings
          </span>
          {showSettings ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 pt-1 grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-white/5">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                    Quality: {quality}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <p className="text-xs text-zinc-600 mt-1.5">
                    Lower quality = smaller file size
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                    Max Width (px)
                  </label>
                  <input
                    type="number"
                    value={maxWidth}
                    onChange={(e) => setMaxWidth(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <p className="text-xs text-zinc-600 mt-1.5">
                    0 to keep original dimensions
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dropzone */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center px-6 py-14 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
          isDragging
            ? "border-indigo-500 bg-indigo-500/5"
            : "border-zinc-700 hover:border-zinc-500 bg-zinc-900/30"
        }`}
      >
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-4">
          <Upload className="w-7 h-7 text-indigo-400" />
        </div>
        <p className="text-base font-medium text-white">
          Drop images here or click to browse
        </p>
        <p className="text-sm text-zinc-500 mt-1">
          PNG, JPG, GIF up to 50MB each
        </p>
        <div className="flex items-center gap-1.5 mt-3 text-xs text-emerald-400/80">
          <Lock className="w-3 h-3" />
          Processed entirely in your browser
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="sr-only"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Results */}
      {images.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Stats bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-400">
                {successCount} of {images.length} converted
              </span>
              {totalSavings > 0 && (
                <span className="text-sm text-emerald-400 font-medium">
                  {formatBytes(totalSavings)} saved
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadAll}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Download All
              </button>
              <button
                onClick={handleClearAll}
                className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                title="Clear all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Image grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {images.map((img) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass-card rounded-xl overflow-hidden group"
                >
                  {/* Preview */}
                  <div className="aspect-[4/3] bg-zinc-900 relative overflow-hidden">
                    {img.previewUrl ? (
                      <img
                        src={img.previewUrl}
                        alt={img.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {img.status === "processing" ? (
                          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-zinc-600" />
                        )}
                      </div>
                    )}

                    {/* Overlay actions */}
                    {img.status === "success" && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(img);
                          }}
                          className="p-2.5 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-colors"
                        >
                          <Download className="w-5 h-5 text-white" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(img.id);
                          }}
                          className="p-2.5 bg-white/10 hover:bg-red-500/20 rounded-lg backdrop-blur-sm transition-colors"
                        >
                          <X className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="text-sm font-medium text-white truncate">
                      {img.name}
                    </p>

                    {img.status === "processing" && (
                      <p className="text-xs text-amber-400 mt-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                        Processing...
                      </p>
                    )}

                    {img.status === "error" && (
                      <p className="text-xs text-red-400 mt-1.5">{img.error}</p>
                    )}

                    {img.status === "success" && (
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-500 line-through">
                            {formatBytes(img.originalSize)}
                          </span>
                          <span className="text-emerald-400 font-medium">
                            {formatBytes(img.newSize)}
                          </span>
                        </div>
                        {img.originalSize && img.newSize && (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-500 rounded-full"
                                style={{
                                  width: `${Math.min(
                                    (img.newSize / img.originalSize) * 100,
                                    100
                                  )}%`,
                                }}
                              />
                            </div>
                            <span className="text-xs font-medium text-emerald-400">
                              -
                              {Math.round(
                                (1 - img.newSize / img.originalSize) * 100
                              )}
                              %
                            </span>
                          </div>
                        )}
                        {img.width && img.height && (
                          <p className="text-[10px] text-zinc-600">
                            {img.width} × {img.height} px
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </div>
  );
}
