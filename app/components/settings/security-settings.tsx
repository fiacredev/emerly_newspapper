"use client";

import { useState } from "react";
import { LockKeyhole, ShieldCheck, Eye, EyeOff } from "lucide-react";

export default function SecuritySettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="border-b border-slate-100 pb-5">
          <h2 className="font-semibold text-slate-900">
            Change password
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Keep your administrator account secure.
          </p>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Current password
            </label>
            <input
              type="password"
              disabled
              placeholder="Current password"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              New password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                disabled
                placeholder="Enter new password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 pr-11 text-sm"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Confirm new password
            </label>

            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                disabled
                placeholder="Confirm new password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 pr-11 text-sm"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3 text-slate-400"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="button"
            disabled
            className="w-full cursor-not-allowed rounded-xl bg-slate-300 py-3 text-sm font-semibold text-white sm:w-auto sm:px-6"
          >
            Update password
          </button>

          <p className="text-xs text-amber-700">
            Password changes require a backend endpoint that verifies the
            current password before updating it.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
            <ShieldCheck size={21} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              JWT authentication
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Your portal uses JWT authentication. Protected API requests
              require a valid bearer token, and inactive accounts cannot
              access protected resources.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}