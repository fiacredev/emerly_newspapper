"use client";

import { useState } from "react";
import { Bell, LayoutDashboard, Eye } from "lucide-react";

export default function PreferencesSettings() {
  const [notifications, setNotifications] = useState({
    publishing: true,
    journalistActivity: true,
    drafts: false,
  });

  const [compactMode, setCompactMode] = useState(false);
  const [showDescriptions, setShowDescriptions] = useState(true);

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="border-b border-slate-100 pb-5">
          <h2 className="font-semibold text-slate-900">
            Dashboard preferences
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Customize how your admin workspace looks.
          </p>
        </div>

        <div className="mt-6 space-y-6">
          <PreferenceRow
            icon={LayoutDashboard}
            title="Compact dashboard"
            description="Use a more compact layout with reduced spacing."
            checked={compactMode}
            onChange={setCompactMode}
          />

          <PreferenceRow
            icon={Eye}
            title="Show descriptions"
            description="Display additional descriptions throughout the dashboard."
            checked={showDescriptions}
            onChange={setShowDescriptions}
          />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="border-b border-slate-100 pb-5">
          <div className="flex items-center gap-2">
            <Bell size={19} className="text-slate-500" />
            <h2 className="font-semibold text-slate-900">
              Notifications
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Choose which newsroom notifications you prefer.
          </p>
        </div>

        <div className="mt-6 space-y-6">
          <PreferenceRow
            title="Article publishing"
            description="Notifications about published articles."
            checked={notifications.publishing}
            onChange={() => toggleNotification("publishing")}
          />

          <PreferenceRow
            title="Journalist activity"
            description="Updates about journalist account activity."
            checked={notifications.journalistActivity}
            onChange={() => toggleNotification("journalistActivity")}
          />

          <PreferenceRow
            title="Draft reminders"
            description="Reminders about unfinished articles."
            checked={notifications.drafts}
            onChange={() => toggleNotification("drafts")}
          />
        </div>
      </section>

      <p className="rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
        These preferences currently remain in this page's local state.
        Persistent preferences will require a settings API.
      </p>
    </div>
  );
}

function PreferenceRow({
  icon: Icon,
  title,
  description,
  checked,
  onChange,
}: {
  icon?: React.ElementType;
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-start gap-3">
        {Icon && (
          <div className="rounded-lg bg-slate-100 p-2 text-slate-500">
            <Icon size={18} />
          </div>
        )}

        <div>
          <h3 className="text-sm font-medium text-slate-800">
            {title}
          </h3>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-blue-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}