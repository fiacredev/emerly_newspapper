"use client";

import { useAuth } from "../../../src/contexts/auth-context";

import {
  CalendarDays,
  Clock,
  ShieldCheck,
  UserRound,
  Mail,
  CircleCheck,
} from "lucide-react";

function formatDate(date?: string | null) {
  if (!date) return "Not available";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);
}

function formatDateTime(date?: string | null) {
  if (!date) return "No login recorded";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsed);
}

export default function AccountInformation() {
  const { user } = useAuth();

  const details = [
    {
      icon: UserRound,
      label: "Full name",
      value: user?.name || "Not available",
    },
    {
      icon: Mail,
      label: "Email address",
      value: user?.email || "Not available",
    },
    {
      icon: ShieldCheck,
      label: "Account role",
      value: user?.role || "Not available",
    },
    {
      icon: CalendarDays,
      label: "Account created",
      value: formatDate(user?.createdAt),
    },
    {
      icon: Clock,
      label: "Last login",
      value: formatDateTime(user?.lastLogin),
    },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="border-b border-slate-100 pb-5">
          <h2 className="font-semibold text-slate-900">
            Account information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Details associated with your administrator account.
          </p>
        </div>

        <div className="mt-4 divide-y divide-slate-100">
          {details.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex items-center gap-4 py-5"
              >
                <div className="rounded-xl bg-slate-100 p-3 text-slate-500">
                  <Icon size={19} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-1 break-words text-sm font-medium text-slate-800">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-emerald-50 p-3 text-emerald-600">
            <CircleCheck size={22} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              Account access
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Your account is currently available if authentication succeeds.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}