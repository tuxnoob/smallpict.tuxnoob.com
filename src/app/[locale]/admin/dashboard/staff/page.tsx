"use client";

import { useState } from "react";
import { UserPlus, Trash2 } from "lucide-react";

export default function StaffAllowlistPage() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("editor");

  // Mock data for scaffolding
  const [staff, setStaff] = useState([
    { email: "owner@smallpict.com", role: "admin", status: "active", invitedBy: "System", date: "2023-01-01" },
    { email: "support@smallpict.com", role: "editor", status: "pending_login", invitedBy: "owner@smallpict.com", date: "2023-10-15" }
  ]);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Call Lambda to add to ALLOWLIST#
    setStaff([...staff, {
      email,
      role,
      status: "pending_login",
      invitedBy: "owner@smallpict.com",
      date: new Date().toISOString().split('T')[0]
    }]);
    setEmail("");
  };

  const handleRemove = (emailToRemove: string) => {
    if (!confirm(`Are you sure you want to revoke dashboard access for ${emailToRemove}?`)) return;
    // Call Lambda to remove from ALLOWLIST#
    setStaff(staff.filter(s => s.email !== emailToRemove));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Staff Allowlist</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Manage who can sign in to this internal dashboard via OAuth.
        </p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <h3 className="text-lg font-medium text-white mb-4">Grant Access</h3>
          <form onSubmit={handleInvite} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              required
              placeholder="staff@smallpict.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="editor">Editor (Limited)</option>
              <option value="admin">Admin (Full Access)</option>
            </select>
            <button
              type="submit"
              className="flex items-center justify-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              <UserPlus className="w-4 h-4 mr-2" /> Add
            </button>
          </form>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-800">
            <thead className="bg-zinc-900/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Role</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Invited By</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-zinc-900 divide-y divide-zinc-800">
              {staff.map((s, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300 font-medium">{s.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-zinc-800 text-zinc-300 capitalize">
                      {s.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      s.status === 'active' ? 'bg-green-100/10 text-green-400' : 'bg-yellow-100/10 text-yellow-400'
                    }`}>
                      {s.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">
                    {s.invitedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {s.role !== 'admin' && (
                      <button 
                        onClick={() => handleRemove(s.email)}
                        className="text-red-500 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
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
