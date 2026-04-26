"use client";

export default function KeysPage() {
  // TODO: Wire to fetchCustomers() from admin-api.ts
  const mockKeys = [
    { key: "sp_live_••••a1b2", email: "user1@example.com", site: "example.com", status: "active", created: "2026-04-20" },
    { key: "sp_live_••••c3d4", email: "user2@test.org", site: "test.org", status: "active", created: "2026-04-18" },
    { key: "sp_live_••••e5f6", email: "user3@demo.io", site: "demo.io", status: "revoked", created: "2026-04-10" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">API Keys</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Manage all issued API keys across plugin installations.
        </p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-800/50 text-zinc-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">API Key</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Site</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {mockKeys.map((k, i) => (
              <tr key={i} className="hover:bg-zinc-800/30 transition-colors">
                <td className="px-6 py-4 font-mono text-white text-xs">{k.key}</td>
                <td className="px-6 py-4 text-zinc-300">{k.email}</td>
                <td className="px-6 py-4 text-zinc-400">{k.site}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    k.status === "active"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                  }`}>
                    {k.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-zinc-500">{k.created}</td>
                <td className="px-6 py-4">
                  {k.status === "active" && (
                    <button className="text-xs text-red-500 hover:text-red-400 font-medium transition-colors">
                      Revoke
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
