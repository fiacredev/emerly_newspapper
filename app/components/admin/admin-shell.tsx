"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import type { AdminUser } from "../../../src/types/user";

interface AdminShellProps {
  user: AdminUser;
  children: React.ReactNode;
}

export default function AdminShell({
  user,
  children,
}: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">

      {/* Sidebar */}
      <Sidebar
        role={user.role}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main workspace */}
      <div className="min-w-0 flex-1">

        {/* Header */}
        <Header
          user={user}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Page content */}
        <main className="mx-auto w-full max-w-[1600px] p-5 md:p-8">
          {children}
        </main>

      </div>
    </div>
  );
}