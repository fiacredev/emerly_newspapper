"use client";

import { useAuth } from "../../../src/contexts/auth-context";
import { Camera, UserRound, Mail, ShieldCheck } from "lucide-react";

export default function ProfileSettings() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="border-b border-slate-100 pb-5">
          <h2 className="font-semibold text-slate-900">
            Profile information
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Your administrator account information.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-50 text-2xl font-bold text-blue-700">
            {user?.avatar?.url ? (
              <img
                src={user.avatar.url}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              user?.name?.charAt(0).toUpperCase() || "A"
            )}
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              {user?.name || "Administrator"}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {user?.email}
            </p>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <ShieldCheck size={13} />
              {user?.role || "admin"}
            </span>
          </div>
        </div>

        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full name
            </label>
            <div className="relative">
              <UserRound
                size={17}
                className="absolute left-3 top-3.5 text-slate-400"
              />
              <input
                value={user?.name || ""}
                readOnly
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email address
            </label>
            <div className="relative">
              <Mail
                size={17}
                className="absolute left-3 top-3.5 text-slate-400"
              />
              <input
                value={user?.email || ""}
                readOnly
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-600 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
          Profile editing is not enabled yet. currently my backend only
          provides an endpoint for reading your profile, but is on the way as soon as possible i will work it, once this platform is facing traffic.
        </div>
      </section>
    </div>
  );
}