// src/components/dashboard/KpiCard.tsx
"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
  className?: string;
}

export default function KpiCard({
  label,
  value,
  delta,
  deltaPositive = true,
  className,
}: KpiCardProps) {
  return (
    <div
      className={cn(
        "bg-zinc-900 border border-zinc-800 rounded-xl p-5 transition-all hover:border-zinc-700",
        className
      )}
    >
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
        {label}
      </p>
      <p className="text-2xl font-bold text-white mt-1.5 tracking-tight">{value}</p>
      {delta && (
        <div className="flex items-center gap-1 mt-2">
          {deltaPositive ? (
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5 text-red-500" />
          )}
          <span
            className={cn(
              "text-xs font-medium",
              deltaPositive ? "text-emerald-500" : "text-red-500"
            )}
          >
            {delta}
          </span>
        </div>
      )}
    </div>
  );
}
