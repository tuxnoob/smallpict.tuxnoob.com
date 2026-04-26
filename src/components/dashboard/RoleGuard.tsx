// src/components/dashboard/RoleGuard.tsx
"use client";

import { useSession } from "next-auth/react";
import { ShieldAlert } from "lucide-react";
import { canAccessStaffManagement } from "@/lib/auth";

interface RoleGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function AdminGuard({ children, fallback }: RoleGuardProps) {
  const { data: session } = useSession();
  const role = (session?.user as any)?.role || "editor";

  if (!canAccessStaffManagement(role)) {
    return (
      fallback || (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
            <ShieldAlert className="w-6 h-6 text-zinc-500" />
          </div>
          <h3 className="text-lg font-semibold text-white">Access Restricted</h3>
          <p className="text-sm text-zinc-500 mt-1 max-w-sm">
            This section requires admin privileges. Contact your administrator if you need access.
          </p>
        </div>
      )
    );
  }

  return <>{children}</>;
}
