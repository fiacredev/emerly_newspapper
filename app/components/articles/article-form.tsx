"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Send, Loader2 } from "lucide-react";

import { articleService } from "../../../src/services/article.service";
import ImageUrlInput from "./image-url-input";
import RichTextEditor from "./rich-text-editor";

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

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export default function ArticleForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "general",
    tags: "",
    source: "original" as "original" | "external",
    sourceUrl: "",
    featuredImage: null as {
      url: string;
      publicId: string;
      altText: string;
    } | null,
    metaTitle: "",
    metaDescription: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (key: string, value: unknown) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const submit = async (event: React.FormEvent) => {
  event.preventDefault();
  setLoading(true);
  setError("");

  try {
    await articleService.create({
      title: form.title,
      slug: generateSlug(form.title), // Automatically generates slug
      excerpt: form.excerpt,
      content: form.content,
      category: form.category,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      featuredImage: form.featuredImage,
      images: [],
      source: form.source,
      sourceUrl: form.sourceUrl || null,
      seo: {
        metaTitle: form.metaTitle,
        metaDescription: form.metaDescription,
      },
    });

    router.push("/admin/articles");
    router.refresh();
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : "Unable to create article"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">

        {/* Main editor */}
        <div className="space-y-5">
          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold text-slate-900">
              Article information
            </h2>

            <input
              required
              minLength={5}
              maxLength={200}
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Enter your article headline..."
              className="w-full border-b border-slate-200 pb-4 text-2xl font-bold outline-none placeholder:text-slate-300"
            />

            <textarea
              required
              maxLength={500}
              rows={3}
              value={form.excerpt}
              onChange={(e) => update("excerpt", e.target.value)}
              placeholder="Write a short article summary..."
              className="w-full resize-none rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-blue-500"
            />

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Article content
              </label>

              <RichTextEditor
                value={form.content}
                onChange={(value) => update("content", value)}
              />
            </div>
          </section>

          {/* SEO */}
          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold text-slate-900">
              SEO settings
            </h2>

            <input
              maxLength={70}
              value={form.metaTitle}
              onChange={(e) => update("metaTitle", e.target.value)}
              placeholder="Meta title (maximum 70 characters)"
              className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-500"
            />

            <textarea
              maxLength={160}
              rows={3}
              value={form.metaDescription}
              onChange={(e) => update("metaDescription", e.target.value)}
              placeholder="Meta description (maximum 160 characters)"
              className="w-full resize-none rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-500"
            />
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold text-slate-900">
              Publishing details
            </h2>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">
                Category
              </label>

              <select
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-3 text-sm"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">
                Tags
              </label>

              <input
                value={form.tags}
                onChange={(e) => update("tags", e.target.value)}
                placeholder="News, politics, economy"
                className="w-full rounded-xl border border-slate-200 p-3 text-sm"
              />
              <p className="text-xs text-slate-400">
                Separate tags with commas.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">
                Article source
              </label>

              <select
                value={form.source}
                onChange={(e) => update("source", e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-3 text-sm"
              >
                <option value="original">Original article</option>
                <option value="external">External article</option>
              </select>
            </div>

            {form.source === "external" && (
              <input
                required
                type="url"
                value={form.sourceUrl}
                onChange={(e) => update("sourceUrl", e.target.value)}
                placeholder="Original publisher URL"
                className="w-full rounded-xl border border-slate-200 p-3 text-sm"
              />
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <ImageUrlInput
            value={form.featuredImage}
            onChange={(image) => update("featuredImage", image)}
            />
          </section>

          <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              Save as draft
            </button>

            <p className="text-center text-xs text-slate-400">
              Articles are saved as drafts first. Admins can publish them later.
            </p>
          </section>
        </aside>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}
    </form>
  );
}