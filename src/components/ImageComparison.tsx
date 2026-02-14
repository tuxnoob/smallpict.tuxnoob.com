"use client";

import { useMotionValue, useTransform, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface ImageComparisonProps {
    beforeLabel: string;
    afterLabel: string;
    beforeSubLabel: string;
    afterSubLabel: string;
}

export default function ImageComparison({ beforeLabel, afterLabel, beforeSubLabel, afterSubLabel }: ImageComparisonProps) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = useCallback((clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
        setSliderPosition(percent);
    }, []);

    const onMouseDown = () => setIsDragging(true);
    const onMouseUp = () => setIsDragging(false);

    const onMouseMove = useCallback((e: MouseEvent) => {
        if (isDragging) handleMove(e.clientX);
    }, [isDragging, handleMove]);

    const onTouchMove = useCallback((e: TouchEvent) => {
        if (isDragging) handleMove(e.touches[0].clientX);
    }, [isDragging, handleMove]);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("touchmove", onTouchMove);
            window.addEventListener("mouseup", onMouseUp);
            window.addEventListener("touchend", onMouseUp);
        }
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("touchend", onMouseUp);
        };
    }, [isDragging, onMouseMove, onTouchMove]);

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden cursor-ew-resize group select-none shadow-2xl ring-1 ring-gray-900/10"
            onMouseDown={(e) => {
                setIsDragging(true);
                handleMove(e.clientX);
            }}
            onTouchStart={(e) => {
                setIsDragging(true);
                handleMove(e.touches[0].clientX);
            }}
        >
            {/* Background (After) */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="/assets/hero-demo.webp"
                    alt="After"
                    fill
                    className="object-cover"
                    priority
                    draggable={false}
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-sm font-bold border border-white/20 z-10 pointer-events-none">
                    350KB <span className="text-green-400 text-xs ml-1 font-normal">({afterLabel})</span>
                </div>
            </div>

            {/* Foreground (Before) - Clipped */}
            <div
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <Image
                    src="/assets/hero-demo.webp"
                    alt="Before"
                    fill
                    className="object-cover"
                    priority
                    draggable={false}
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-sm font-bold border border-white/20 z-10 pointer-events-none">
                    2.3MB <span className="text-red-400 text-xs ml-1 font-normal">({beforeLabel})</span>
                </div>
            </div>

            {/* Slider Handle */}
            <div
                className="absolute inset-y-0 w-1 bg-white shadow-[0_0_20px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="m9 18 6-6-6-6" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 absolute rotate-180"><path d="m9 18 6-6-6-6" /></svg>
                </div>
            </div>
        </div>
    );
}
