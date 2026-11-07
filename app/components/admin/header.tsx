
"use client";

import { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

import type { AdminUser } from "../../../src/types/user";
import LogoutButton from "../../components/admin/logout-button";

interface HeaderProps {
  user: AdminUser;
  onMenuClick: () => void;
}

export default function Header({
  user,
  onMenuClick,
}: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur-md md:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>

        <div className="hidden items-center gap-2 text-sm text-slate-400 sm:flex">
          <span>Workspace</span>
          <span>/</span>
          <span className="font-semibold text-slate-800">
            Dashboard
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        {/* Search */}
        <div className="hidden items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 md:flex">
          <Search size={17} className="text-slate-400" />
          <input
            placeholder="Search..."
            className="w-36 bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
          <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] text-slate-400">
            /
          </kbd>
        </div>

        {/* Notifications */}
        <button
          className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative border-l border-slate-200 pl-3 md:pl-5">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-50"
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
            aria-label="Open profile menu"
          >
            {/* Avatar */}
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-sm font-bold text-blue-700">
              {user.avatar?.url ? (
                <img
                  src={user.avatar.url}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                user.name.charAt(0).toUpperCase()
              )}
            </div>

            {/* User Information */}
            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-slate-800">
                {user.name}
              </p>
              <p className="text-xs capitalize text-slate-400">
                {user.role}
              </p>
            </div>

            <ChevronDown
              size={16}
              className={`hidden text-slate-400 transition-transform sm:block ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Content */}
          {dropdownOpen && (
            <>
              {/* Click outside to close */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
              />

              <div className="absolute right-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-xl">
                {/* Profile Details */}
                <div className="border-b border-slate-100 px-4 py-3">
                  <p className="text-sm font-semibold text-slate-800">
                    {user.name}
                  </p>
                  <p className="text-xs capitalize text-slate-400">
                    {user.role}
                  </p>
                </div>

                {/* Logout Component */}
                <div className="px-2 py-2">
                  <LogoutButton />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
