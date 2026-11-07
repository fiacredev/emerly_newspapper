import Link from "next/link";

import type { Article } from "../../../../src/types/article";

interface RecentArticlesProps {
  articles: Article[];
}

const statusStyles = {
  published: "bg-emerald-50 text-emerald-700",
  draft: "bg-amber-50 text-amber-700",
  archived: "bg-slate-100 text-slate-600",
};

export default function RecentArticles({
  articles,
}: RecentArticlesProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <div>
          <h2 className="font-bold text-slate-900">
            Recent Articles
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Latest activity in your newsroom
          </p>
        </div>

        <Link
          href="/admin/articles"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          View all
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <th className="px-5 py-4 font-semibold">Article</th>
              <th className="px-5 py-4 font-semibold">Category</th>
              <th className="px-5 py-4 font-semibold">Status</th>
              <th className="px-5 py-4 font-semibold">Views</th>
              <th className="px-5 py-4 font-semibold">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {articles.map((article) => (
              <tr
                key={article._id}
                className="transition hover:bg-slate-50/70"
              >
                <td className="min-w-[230px] px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                      {article.featuredImage?.url && (
                        <img
                          src={article.featuredImage.url}
                          alt={article.title}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>

                    <div>
                      <p className="max-w-[240px] truncate text-sm font-semibold text-slate-800">
                        {article.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {article.slug}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span className="text-sm capitalize text-slate-600">
                    {article.category}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                      statusStyles[article.status]
                    }`}
                  >
                    {article.status}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {article.views.toLocaleString()}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                  {new Date(article.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}

            {articles.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-12 text-center text-sm text-slate-400"
                >
                  No articles found yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}