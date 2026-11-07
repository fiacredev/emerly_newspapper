"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Star,
  Archive,
  Send,
  Loader2,
  RefreshCw,
} from "lucide-react";

import { articleService } from "../../../src/services/article.service";
import type { Article } from "../../../src/types/article2";
import { useAuth } from "../../../src/contexts/auth-context";

const categories = [
  "general",
  "politics",
  "sports",
  "business",
  "technology",
  "health",
  "science",
  "entertainment",
];

interface ArticleListProps {
  authorId?: string;
}

export default function ArticleList({
  authorId,
}: ArticleListProps) {
   
    const { user } = useAuth();

    const basePath =
    user?.role === "journalist" ? "/journalist" : "/admin";

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [actionId, setActionId] = useState<string | null>(null);

  const loadArticles = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
        const response = await articleService.getAll({
        page,
        limit: 10,
        search,
        category,
        status,
        author: authorId,
        });

        setArticles(response.articles);
        setTotal(response.pagination.total);
        setTotalPages(response.pagination.totalPages);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load articles"
      );
    } finally {
      setLoading(false);
    }
  }, [page, search, category, status, authorId]);

  useEffect(() => {
    const timer = setTimeout(loadArticles, 350);
    return () => clearTimeout(timer);
  }, [loadArticles]);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this article?"
    );

    if (!confirmed) return;

    setActionId(id);

    try {
      await articleService.delete(id);
      await loadArticles();
    } catch (err) {
      alert(
        err instanceof Error ? err.message : "Delete failed"
      );
    } finally {
      setActionId(null);
    }
  };

  const handleAction = async (
    id: string,
    action: "publish" | "archive" | "feature"
  ) => {
    setActionId(id);

    try {
      if (action === "publish") {
        await articleService.publish(id);
      }

      if (action === "archive") {
        await articleService.archive(id);
      }

      if (action === "feature") {
        await articleService.toggleFeatured(id);
      }

      await loadArticles();
    } catch (err) {
      alert(
        err instanceof Error ? err.message : "Action failed"
      );
    } finally {
      setActionId(null);
    }
  };

  const statusStyle: Record<string, string> = {
    published: "bg-emerald-50 text-emerald-700",
    draft: "bg-amber-50 text-amber-700",
    archived: "bg-slate-100 text-slate-600",
  };
  

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Articles
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your newsroom content and publications.
          </p>
        </div>

        <Link
          href={`${basePath}/articles/create`}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Article
        </Link>
      </div>

      {/* Overview */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">
          Total articles
        </p>

        <p className="mt-2 text-3xl font-bold text-slate-900">
          {total}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row">
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
            placeholder="Search articles..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none focus:border-blue-500"
        >
          <option value="">All categories</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none focus:border-blue-500"
        >
          <option value="">All statuses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>

        <button
          onClick={loadArticles}
          className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm text-slate-600 hover:bg-slate-50"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Article</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Views</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <Loader2 className="mx-auto animate-spin text-blue-600" />
                    <p className="mt-3 text-sm text-slate-400">
                      Loading articles...
                    </p>
                  </td>
                </tr>
              ) : articles.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-16 text-center text-sm text-slate-400"
                  >
                    No articles found.
                  </td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr
                    key={article._id}
                    className="transition hover:bg-slate-50/70"
                  >
                    <td className="min-w-[260px] px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                          {article.featuredImage?.url && (
                            <img
                              src={article.featuredImage.url}
                              alt={article.featuredImage.altText || article.title}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="max-w-[230px] truncate text-sm font-semibold text-slate-800">
                            {article.title}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {article.author && typeof article.author === "object"
                              ? article.author.name
                              : "Author"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm capitalize text-slate-600">
                      {article.category}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                          statusStyle[article.status]
                        }`}
                      >
                        {article.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {article.views.toLocaleString()}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                      {new Intl.DateTimeFormat("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          timeZone: "UTC",
                        }).format(new Date(article.createdAt))}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <Link
                          href={`${basePath}/articles/${article._id}/edit`}
                          title="Edit article"
                          className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Edit size={17} />
                        </Link>

                        {article.status === "draft" && (
                          <button
                            title="Publish article"
                            disabled={actionId === article._id}
                            onClick={() => handleAction(article._id, "publish")}
                            className="rounded-lg p-2 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-50"
                          >
                            <Send size={17} />
                          </button>
                        )}

                        {article.status === "published" && (
                          <button
                            title="Feature article"
                            disabled={actionId === article._id}
                            onClick={() => handleAction(article._id, "feature")}
                            className={`rounded-lg p-2 hover:bg-amber-50 hover:text-amber-600 ${
                              article.isFeatured
                                ? "text-amber-500"
                                : "text-slate-400"
                            }`}
                          >
                            <Star
                              size={17}
                              fill={article.isFeatured ? "currentColor" : "none"}
                            />
                          </button>
                        )}

                        {article.status !== "archived" && (
                          <button
                            title="Archive article"
                            disabled={actionId === article._id}
                            onClick={() => handleAction(article._id, "archive")}
                            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                          >
                            <Archive size={17} />
                          </button>
                        )}

                        <button
                          title="Delete article"
                          disabled={actionId === article._id}
                          onClick={() => handleDelete(article._id)}
                          className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
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

        {/* Pagination */}
        <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Page {page} of {totalPages} · {total} articles
          </p>

          <div className="flex gap-2">
            <button
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm disabled:opacity-40"
            >
              Previous
            </button>

            <button
              disabled={page >= totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}