"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  UserRound,
  Trash2,
  Power,
  Loader2,
} from "lucide-react";

import {
  userService,
  type Journalist,
} from "../../../src/services/user.service";

export default function JournalistList() {
  const [journalists, setJournalists] = useState<Journalist[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [actionId, setActionId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);

    try {
      const response = await userService.getJournalists({
        page,
        limit: 10,
        search,
        status,
      });

      setJournalists(response.data);
      setTotal(response.pagination.total);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Unable to load journalists"
      );
    } finally {
      setLoading(false);
    }
  }, [page, search, status]);

  useEffect(() => {
    const timer = setTimeout(load, 300);
    return () => clearTimeout(timer);
  }, [load]);

  const handleStatus = async (id: string) => {
    setActionId(id);

    try {
      await userService.toggleStatus(id);
      await load();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Action failed");
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !window.confirm(
        "Delete this journalist account? Their articles will remain in the database."
      )
    ) return;

    setActionId(id);

    try {
      await userService.deleteJournalist(id);
      await load();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Delete failed");
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Journalists
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your newsroom team and their accounts.
          </p>
        </div>

        <Link
          href="/admin/journalists/create"
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add journalist
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Total journalists</p>
          <p className="mt-2 text-3xl font-bold">{total}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">
            Current page
          </p>
          <p className="mt-2 text-3xl font-bold">{page}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search journalists..."
            className="h-11 w-full rounded-xl border border-slate-200 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="h-11 rounded-xl border border-slate-200 px-4 text-sm"
        >
          <option value="">All accounts</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-4">Journalist</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Last login</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center">
                    <Loader2 className="mx-auto animate-spin text-blue-600" />
                  </td>
                </tr>
              ) : journalists.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-sm text-slate-400">
                    No journalists found.
                  </td>
                </tr>
              ) : (
                journalists.map((journalist) => (
                  <tr key={journalist._id}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {journalist.avatar?.url ? (
                          <img
                            src={journalist.avatar.url}
                            alt={journalist.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                            <UserRound size={19} />
                          </div>
                        )}

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {journalist.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {journalist.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        journalist.isActive
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-700"
                      }`}>
                        {journalist.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {journalist.lastLogin
                        ? new Date(journalist.lastLogin).toLocaleDateString()
                        : "Never"}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          disabled={actionId === journalist._id}
                          onClick={() => handleStatus(journalist._id)}
                          title="Toggle account status"
                          className="rounded-lg p-2 text-slate-500 hover:bg-amber-50 hover:text-amber-600"
                        >
                          <Power size={17} />
                        </button>

                        <button
                          disabled={actionId === journalist._id}
                          onClick={() => handleDelete(journalist._id)}
                          title="Delete journalist"
                          className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between border-t border-slate-100 p-4">
          <span className="text-xs text-slate-500">
            Page {page} of {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-lg border px-3 py-2 text-sm disabled:opacity-40"
            >
              Previous
            </button>

            <button
              disabled={page >= totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border px-3 py-2 text-sm disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}