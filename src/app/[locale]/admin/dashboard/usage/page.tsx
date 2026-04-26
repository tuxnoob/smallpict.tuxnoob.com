"use client";

export default function UsagePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Usage Analytics</h2>
        <p className="mt-1 text-sm text-zinc-400">
          System-wide usage metrics across all customers this month.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Requests", value: "145,230", delta: "+8.2%" },
          { label: "Data Processed", value: "2.4 TB", delta: "+12%" },
          { label: "Avg Compression", value: "68%", delta: "+2%" },
          { label: "Unique Sites", value: "412", delta: "+15" },
        ].map((m) => (
          <div key={m.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{m.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{m.value}</p>
            <p className="text-xs text-green-500 mt-1">{m.delta}</p>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-zinc-800">
          <h3 className="text-lg font-medium text-white">Top Users by Volume</h3>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-800/50 text-zinc-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Plan</th>
              <th className="px-6 py-3">Requests</th>
              <th className="px-6 py-3">Data (MB)</th>
              <th className="px-6 py-3">Quota %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {[
              { email: "photographer@studio.com", plan: "pro", requests: 12400, mb: 890, pct: 45 },
              { email: "blog@agency.co", plan: "starter", requests: 8200, mb: 420, pct: 84 },
              { email: "dev@freelance.io", plan: "free", requests: 320, mb: 28, pct: 28 },
            ].map((u) => (
              <tr key={u.email} className="hover:bg-zinc-800/30 transition-colors">
                <td className="px-6 py-4 text-zinc-300">{u.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    u.plan === "pro" ? "bg-blue-500/10 text-blue-400" :
                    u.plan === "starter" ? "bg-purple-500/10 text-purple-400" :
                    "bg-zinc-700 text-zinc-400"
                  }`}>{u.plan}</span>
                </td>
                <td className="px-6 py-4 text-zinc-400">{u.requests.toLocaleString()}</td>
                <td className="px-6 py-4 text-zinc-400">{u.mb}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${u.pct > 80 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${u.pct}%` }} />
                    </div>
                    <span className="text-xs text-zinc-500">{u.pct}%</span>
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
