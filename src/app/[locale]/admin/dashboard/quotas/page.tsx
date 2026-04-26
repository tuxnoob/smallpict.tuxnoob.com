// src/app/[locale]/admin/dashboard/quotas/page.tsx
"use client";

import { AlertTriangle } from "lucide-react";

export default function QuotasPage() {
  const distributions = [
    { plan: "free", count: 842, totalQuota: "20 MB", used: "12.4 MB", percent: 62 },
    { plan: "starter", count: 312, totalQuota: "200 MB", used: "145 MB", percent: 72 },
    { plan: "pro", count: 94, totalQuota: "600 MB", used: "489 MB", percent: 81 },
  ];

  const atRisk = [
    { email: "blog@agency.co", plan: "starter", quotaPercent: 94 },
    { email: "dev@freelance.io", plan: "free", quotaPercent: 98 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Quota Tracking</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Plan distribution and users approaching limits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {distributions.map((d) => (
          <div key={d.plan} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-zinc-300 capitalize">{d.plan}</span>
              <span className="text-xs text-zinc-500">{d.count} users</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>{d.used}</span>
                <span>{d.totalQuota}</span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    d.percent > 80 ? "bg-red-500" : d.percent > 60 ? "bg-amber-500" : "bg-emerald-500"
                  }`}
                  style={{ width: `${d.percent}%` }}
                />
              </div>
              <p className="text-xs text-zinc-500 text-right">{d.percent}% avg used</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-zinc-800 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-medium text-white">At Risk Users (&gt;90%)</h3>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-800/50 text-zinc-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Plan</th>
              <th className="px-6 py-3">Quota Usage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {atRisk.map((u) => (
              <tr key={u.email} className="hover:bg-zinc-800/30 transition-colors">
                <td className="px-6 py-4 text-zinc-300">{u.email}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-zinc-700 text-zinc-300 capitalize">
                    {u.plan}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: `${u.quotaPercent}%` }} />
                    </div>
                    <span className="text-xs text-red-400 font-medium">{u.quotaPercent}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
