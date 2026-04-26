"use client";

import { useState } from "react";
import { Search, ShieldAlert } from "lucide-react";

export default function CustomersPage() {
  const [search, setSearch] = useState("");

  // Mock data for scaffolding
  const customers = [
    { email: "user@example.com", siteUrl: "https://example.com", apiStatus: "active", plan: "free", joined: "2023-10-12" },
    { email: "client@test.org", siteUrl: "https://test.org", apiStatus: "revoked", plan: "free", joined: "2023-11-05" },
    { email: "pro@agency.io", siteUrl: "https://agency.io", apiStatus: "active", plan: "pro", joined: "2024-01-20" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Customers & Sites</h2>
          <p className="mt-1 text-sm text-zinc-400">
            View all WordPress plugin installations and manage their API keys.
          </p>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-zinc-800">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-zinc-500" />
            </div>
            <input
              type="text"
              placeholder="Search by email or site URL..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-zinc-700 rounded-md leading-5 bg-zinc-950 text-zinc-300 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-800">
            <thead className="bg-zinc-900/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Site URL</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Plan</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">API Status</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-zinc-900 divide-y divide-zinc-800">
              {customers.map((c, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">{c.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400 hover:text-blue-300">
                    <a href={c.siteUrl} target="_blank" rel="noopener noreferrer">{c.siteUrl}</a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-zinc-800 text-zinc-300 capitalize">
                      {c.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      c.apiStatus === 'active' ? 'bg-green-100/10 text-green-400' : 'bg-red-100/10 text-red-400'
                    }`}>
                      {c.apiStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {c.apiStatus === 'active' && (
                      <button className="text-red-500 hover:text-red-400 flex items-center justify-end w-full">
                        <ShieldAlert className="w-4 h-4 mr-1" /> Revoke
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
