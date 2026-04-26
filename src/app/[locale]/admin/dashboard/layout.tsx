import { AdminProviders } from "@/components/auth/AdminProviders";
import DashboardShell from "@/components/dashboard/DashboardShell";

export const dynamic = "force-dynamic";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProviders>
      <DashboardShell>{children}</DashboardShell>
    </AdminProviders>
  );
}
