"use client";

import KpiCard from "@/components/dashboard/KpiCard";
import { Activity, CheckCircle2, AlertTriangle } from "lucide-react";

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">System Overview</h2>
        <p className="mt-1 text-sm text-zinc-400">
          High-level metrics across all plugin installations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Total Plugin Users"
          value="1,248"
          delta="+12%"
          deltaPositive={true}
        />
        <KpiCard
          label="Active API Keys"
          value="1,105"
          delta="+5.3%"
          deltaPositive={true}
        />
        <KpiCard
          label="Data Optimized (30d)"
          value="2.4 TB"
          delta="+12%"
          deltaPositive={true}
        />
        <KpiCard
          label="Avg Compression"
          value="68%"
          delta="+2%"
          deltaPositive={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 lg:col-span-2">
          <h3 className="text-sm font-semibold text-white mb-4">Requests (Last 7 Days)</h3>
          <div className="h-40 flex items-end gap-2">
            {[45, 62, 55, 78, 85, 92, 88].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-full bg-indigo-500/20 rounded-t-md relative overflow-hidden group"
                  style={{ height: `${h * 1.5}px` }}
                >
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-indigo-500/60 rounded-t-md transition-all group-hover:bg-indigo-500"
                    style={{ height: "100%" }}
                  />
                </div>
                <span className="text-[10px] text-zinc-500">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-zinc-800">
            <h3 className="text-sm font-semibold text-white">System Health</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-sm text-zinc-300">Lambda API</span>
              </div>
              <span className="text-xs text-zinc-500 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-sm text-zinc-300">DynamoDB</span>
              </div>
              <span className="text-xs text-zinc-500">12ms avg</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-sm text-zinc-300">Image Processor</span>
              </div>
              <span className="text-xs text-zinc-500 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-500" />
                Degraded
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-sm text-zinc-300">Freemius Billing</span>
              </div>
              <span className="text-xs text-zinc-500">Healthy</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-zinc-800 flex items-center gap-2">
          <Activity className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
        </div>
        <div className="divide-y divide-zinc-800">
          {[
            { action: "New customer signup", detail: "pro@agency.io — Pro plan", time: "2 min ago" },
            { action: "API key revoked", detail: "sp_live_••••e5f6", time: "15 min ago" },
            { action: "Staff member added", detail: "editor@team.com by owner", time: "1 hour ago" },
            { action: "Quota alert triggered", detail: "blog@agency.co at 94%", time: "3 hours ago" },
          ].map((item, i) => (
            <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-zinc-800/30 transition-colors">
              <div>
                <p className="text-sm text-zinc-300">{item.action}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{item.detail}</p>
              </div>
              <span className="text-xs text-zinc-600">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
