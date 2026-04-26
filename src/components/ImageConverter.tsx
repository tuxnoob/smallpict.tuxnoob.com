"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { sendBrowserConversionTelemetry } from "@/lib/api";

type ProcessedImage = {
  id: string;
  name: string;
  status: "processing" | "success" | "error";
  error?: string;
  blob?: Blob;
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
  
  const workerRef = useRef<Worker | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize web worker
  useEffect(() => {
    // Standard Next.js Web Worker instantiation
    workerRef.current = new Worker(new URL('../workers/image.worker.ts', import.meta.url));
    
    workerRef.current.onmessage = (e: MessageEvent) => {
      const result = e.data;
      
      setImages((prev) => 
        prev.map((img) => {
          if (img.id === result.id) {
            if (result.success) {
              // Send telemetry for marketing metrics
              sendBrowserConversionTelemetry({
                originalBytes: result.originalSize || 0,
                newBytes: result.newSize || 0,
                format: "webp"
              });

              return {
                ...img,
                status: "success",
                blob: result.blob,
                originalSize: result.originalSize,
                newSize: result.newSize,
                width: result.width,
                height: result.height
              };
            } else {
              return {
                ...img,
                status: "error",
                error: result.error
              };
            }
          }
          return img;
        })
      );
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const newImages: ProcessedImage[] = [];
    
    Array.from(files).forEach((file) => {
      // Filter for images only
      if (!file.type.startsWith("image/")) return;
      
      const id = Math.random().toString(36).substring(2, 9);
      newImages.push({
        id,
        name: file.name,
        status: "processing",
        originalSize: file.size
      });
      
      // Send to worker
      workerRef.current?.postMessage({
        id,
        file,
        quality,
        maxWidth: maxWidth > 0 ? maxWidth : undefined
      });
    });
    
    setImages((prev) => [...newImages, ...prev]);
  }, [quality, maxWidth]);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

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
    // Replace extension with .webp
    const originalName = img.name.replace(/\.[^/.]+$/, "");
    a.download = `${originalName}.webp`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    // In a real implementation, you might zip these up using jszip
    // For scaffolding, we just trigger individual downloads
    images.filter(img => img.status === "success").forEach(img => {
      handleDownload(img);
    });
  };

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quality: {quality}%
          </label>
          <input 
            type="range" 
            min="10" 
            max="100" 
            value={quality} 
            onChange={(e) => setQuality(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <p className="text-xs text-gray-500 mt-1">Lower quality = smaller file size</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Width (px)
          </label>
          <input 
            type="number" 
            value={maxWidth} 
            onChange={(e) => setMaxWidth(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">0 to keep original dimensions</p>
        </div>
      </div>

      {/* Dropzone */}
      <div 
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`mt-4 flex justify-center px-6 pt-10 pb-12 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400 bg-gray-50"
        }`}
      >
        <div className="space-y-2 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="flex text-sm text-gray-600 justify-center">
            <span className="relative bg-transparent rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
              Upload a file
            </span>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 50MB</p>
          <p className="text-xs font-semibold text-green-600 mt-2">Processed entirely in your browser 🔒</p>
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

      {/* Results List */}
      {images.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Converted Images ({images.length})</h3>
            <button
              onClick={handleDownloadAll}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition"
            >
              Download All Success
            </button>
          </div>
          
          <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {images.map((img) => (
              <li key={img.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center flex-1 min-w-0">
                  <div className="flex-shrink-0 h-12 w-12 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                    {img.blob ? (
                      <img src={URL.createObjectURL(img.blob)} alt={img.name} className="h-full w-full object-cover" />
                    ) : (
                      <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    )}
                  </div>
                  <div className="ml-4 flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {img.name}
                    </p>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      {img.status === "processing" && (
                        <span className="flex items-center text-yellow-600">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      )}
                      {img.status === "error" && (
                        <span className="text-red-500">{img.error}</span>
                      )}
                      {img.status === "success" && (
                        <span className="flex gap-3">
                          <span className="line-through text-gray-400">{formatBytes(img.originalSize)}</span>
                          <span className="font-semibold text-green-600">
                            {formatBytes(img.newSize)} 
                            {img.originalSize && img.newSize && ` (-${Math.round((1 - img.newSize / img.originalSize) * 100)}%)`}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="ml-4 flex-shrink-0">
                  {img.status === "success" && (
                    <button
                      onClick={() => handleDownload(img)}
                      className="font-medium text-blue-600 hover:text-blue-500 px-3 py-1 bg-blue-50 rounded-md"
                    >
                      Download WebP
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
