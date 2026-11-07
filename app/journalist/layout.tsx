
"use client";

import AdminShell from "../components/admin/admin-shell";
import { useAuth } from "../../src/contexts/auth-context";

export default function JournalistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <AdminShell user={user}>
      {children}
    </AdminShell>
  );
}
