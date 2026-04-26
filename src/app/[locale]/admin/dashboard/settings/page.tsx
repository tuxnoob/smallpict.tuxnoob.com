// src/app/[locale]/admin/dashboard/settings/page.tsx
"use client";

import AdminGuard from "@/components/dashboard/RoleGuard";
import { Shield, Bell, Lock } from "lucide-react";

export default function SettingsPage() {
  return (
    <AdminGuard>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Manage dashboard configuration and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Notifications</h3>
                <p className="text-xs text-zinc-500">Configure alert thresholds</p>
              </div>
            </div>
            <div className="space-y-3">
              <label className="flex items-center justify-between py-2">
                <span className="text-sm text-zinc-300">Quota alerts</span>
                <input type="checkbox" defaultChecked className="rounded border-zinc-700 bg-zinc-800 text-indigo-500" />
              </label>
              <label className="flex items-center justify-between py-2">
                <span className="text-sm text-zinc-300">New customer alerts</span>
                <input type="checkbox" defaultChecked className="rounded border-zinc-700 bg-zinc-800 text-indigo-500" />
              </label>
              <label className="flex items-center justify-between py-2">
                <span className="text-sm text-zinc-300">System health alerts</span>
                <input type="checkbox" className="rounded border-zinc-700 bg-zinc-800 text-indigo-500" />
              </label>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Security</h3>
                <p className="text-xs text-zinc-500">Session and access settings</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-zinc-300">Session timeout</span>
                <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">24 hours</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-zinc-300">2FA requirement</span>
                <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">Disabled</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-zinc-300">Audit log retention</span>
                <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">90 days</span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Danger Zone</h3>
                <p className="text-xs text-zinc-500">Irreversible actions</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-t border-zinc-800/50">
              <div>
                <p className="text-sm text-zinc-300">Export all data</p>
                <p className="text-xs text-zinc-500">Download a JSON export of all dashboard data</p>
              </div>
              <button className="px-4 py-2 text-xs font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
                Export
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
