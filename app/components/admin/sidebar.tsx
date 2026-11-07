
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRole } from "../../../src/types/user";
import LogoutButton from "./logout-button";

import {
  LayoutDashboard,
  Newspaper,
  FileText,
  Users,
  Settings,
  BarChart3,
  LogOut,
  Globe,
  X,
} from "lucide-react";

import { can } from "../../../src/types/lib/permissions";

interface SidebarProps {
  role: UserRole;
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({
  role,
  open,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  const isJournalist = role === "journalist";

  // Admin navigation: preserve all existing sections.
  const adminNavigation = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      permission: null,
    },
    {
      title: "All Articles",
      href: "/admin/articles",
      icon: Newspaper,
      permission: "viewAllArticles" as const,
    },
    {
      title: "My Articles",
      href: "/admin/my-articles",
      icon: FileText,
      permission: "viewOwnArticles" as const,
    },
    {
      title: "Journalists",
      href: "/admin/journalists",
      icon: Users,
      permission: "manageJournalists" as const,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
      permission: null,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
      permission: null,
    },
  ];

  // Journalist navigation.
  const journalistNavigation = [
    {
      title: "Dashboard",
      href: "/journalist",
      icon: LayoutDashboard,
      permission: null,
    },
    {
      title: "My Articles",
      href: "/journalist/my-articles",
      icon: FileText,
      permission: "viewOwnArticles" as const,
    },
    {
      title: "Settings",
      href: "/journalist/settings",
      icon: Settings,
      permission: null,
    },
  ];

  const navigation = isJournalist
    ? journalistNavigation
    : adminNavigation;

  const visibleNavigation = navigation.filter((item) => {
    if (!item.permission) return true;
    return can(role, item.permission);
  });

  const dashboardPath = isJournalist
    ? "/journalist"
    : "/admin";

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-[260px]
          flex-col bg-[#0b1e3b] text-white
          transition-transform duration-300
          lg:static lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand */}
        <div className="flex h-[76px] items-center justify-between border-b border-white/10 px-6">
          <Link
            href={dashboardPath}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500">
              <Globe size={23} />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
                Newsroom
              </h1>
              <p className="text-xs text-slate-400">
                {isJournalist
                  ? "Journalist Portal"
                  : "Management Portal"}
              </p>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="text-slate-400 lg:hidden"
            aria-label="Close navigation"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-7">
          <p className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500">
            Workspace
          </p>

          <nav className="space-y-1.5">
            {visibleNavigation.map((item) => {
              const active =
                item.href === dashboardPath
                  ? pathname === dashboardPath
                  : pathname === item.href ||
                    pathname.startsWith(item.href + "/");

              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 rounded-xl px-3 py-3
                    text-sm font-medium transition-all
                    ${
                      active
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-950/30"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  <Icon size={19} strokeWidth={1.8} />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 p-4">
          <div className="mb-4 rounded-xl bg-white/5 p-3">
            <p className="text-xs text-slate-400">
              Signed in as
            </p>

            <p className="mt-1 text-sm font-semibold capitalize">
              {role}
            </p>
          </div>

          <LogoutButton />
        </div>
      </aside>
    </>
  );
}
