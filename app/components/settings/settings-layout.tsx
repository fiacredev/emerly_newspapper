"use client";

import { useState } from "react";
import {
  UserRound,
  ShieldCheck,
  SlidersHorizontal,
  Info,
} from "lucide-react";

import ProfileSettings from "./profile-settings";
import SecuritySettings from "./security-settings";
import PreferencesSettings from "./preferences-settings";
import AccountInformation from "./account-information";

const tabs = [
  { id: "profile", label: "My profile", icon: UserRound },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "preferences", label: "Preferences", icon: SlidersHorizontal },
  { id: "account", label: "Account information", icon: Info },
] as const;

type Tab = (typeof tabs)[number]["id"];

export default function SettingsLayout() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  return (
    <div className="space-y-7">
      <div>
        <p className="text-sm text-slate-500">Workspace</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Settings
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage your profile, security and dashboard preferences.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[245px_minmax(0,1fr)]">
        {/* Settings navigation */}
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-3">
          <p className="px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Account settings
          </p>

          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                    active
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Settings content */}
        <div className="min-w-0">
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "preferences" && <PreferencesSettings />}
          {activeTab === "account" && <AccountInformation />}
        </div>
      </div>
    </div>
  );
}