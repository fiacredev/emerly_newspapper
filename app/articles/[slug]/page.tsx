import Link from "next/link";
import { notFound } from "next/navigation";

import TopBar from "@/app/components/TopBar";
import Masthead from "@/app/components/Masthead";
import Footer from "@/app/components/Footer";

import { getPublishedArticleBySlug } from "@/lib/db-articles";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}


export default async function PublishedArticlePage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-gray-900">
      <TopBar />
      <Masthead />

      <main className="flex-1">
        <article className="mx-auto max-w-[1160px] px-4 py-10 md:py-14">
          <Link
            href="/articles"
            className="text-xs font-bold uppercase tracking-wider text-accent"
          >
            ← Published Articles
          </Link>

          <span className="mt-6 block text-xs font-bold uppercase tracking-wider text-accent">
            {article.category}
          </span>

          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              {article.excerpt}
            </p>
          )}

          <p className="mt-3 text-xs font-medium uppercase tracking-wide text-gray-500">
            {article.publishedAt
              ? new Date(article.publishedAt).toLocaleString()
              : "Recently"}
            {typeof article.author === "object" && article.author?.name
              ? ` · ${article.author.name}`
              : ""}
          </p>

          {article.featuredImage?.url && (
            <div className="mt-8 aspect-[16/9] w-full overflow-hidden bg-gray-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.featuredImage.url}
                alt={article.featuredImage.altText || article.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div
            className="mt-8 max-w-[680px] text-lg leading-relaxed text-gray-800 [&_p]:mb-6"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {Array.isArray(article.tags) && article.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
