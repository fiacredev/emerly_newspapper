"use client";

import ProtectedRoute from "../components/auth/protected-route";
import AdminShell from "../components/admin/admin-shell";
import { useAuth } from "../../src/contexts/auth-context";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      {user && (
        <AdminShell user={user}>
          {children}
        </AdminShell>
      )}
    </ProtectedRoute>
  );
}