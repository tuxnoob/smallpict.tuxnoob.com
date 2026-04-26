"use client";

export default function AuditPage() {
  const mockLogs = [
    { ts: "2026-04-24 14:32:01", actor: "owner@smallpict.com", action: "revoke_key", target: "sp_live_••••e5f6", role: "admin" },
    { ts: "2026-04-24 12:15:44", actor: "owner@smallpict.com", action: "add_staff", target: "editor@team.com", role: "admin" },
    { ts: "2026-04-23 09:01:22", actor: "owner@smallpict.com", action: "login", target: "—", role: "admin" },
  ];

  const actionColors: Record<string, string> = {
    revoke_key: "bg-red-500/10 text-red-400",
    add_staff: "bg-green-500/10 text-green-400",
    remove_staff: "bg-orange-500/10 text-orange-400",
    login: "bg-blue-500/10 text-blue-400",
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Audit Logs</h2>
        <p className="mt-1 text-sm text-zinc-400">
          All administrative actions are logged and cannot be deleted.
        </p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-800/50 text-zinc-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Timestamp</th>
              <th className="px-6 py-4">Actor</th>
              <th className="px-6 py-4">Action</th>
              <th className="px-6 py-4">Target</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {mockLogs.map((log, i) => (
              <tr key={i} className="hover:bg-zinc-800/30 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-zinc-500">{log.ts}</td>
                <td className="px-6 py-4 text-zinc-300">{log.actor}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${actionColors[log.action] || "bg-zinc-700 text-zinc-400"}`}>
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-zinc-400">{log.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
