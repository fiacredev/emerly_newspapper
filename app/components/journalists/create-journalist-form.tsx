"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { userService } from "../../../src/services/user.service";

export default function CreateJournalistForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      await userService.createJournalist(form);
      router.push("/admin/journalists");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to create account"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-2xl space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Create journalist account
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Give a new newsroom member access to the editorial platform.
        </p>
      </div>

      {[
        { key: "name", label: "Full name", type: "text" },
        { key: "email", label: "Email address", type: "email" },
        { key: "password", label: "Temporary password", type: "password" },
      ].map((field) => (
        <div key={field.key} className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            {field.label}
          </label>

          <input
            required
            minLength={field.key === "name" ? 2 : field.key === "password" ? 8 : undefined}
            type={field.type}
            value={form[field.key as keyof typeof form]}
            onChange={(e) =>
              setForm({ ...form, [field.key]: e.target.value })
            }
            className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
          />
        </div>
      ))}

      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm"
        >
          Cancel
        </button>

        <button
          disabled={loading}
          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create journalist"}
        </button>
      </div>
    </form>
  );
}