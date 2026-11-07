import Link from "next/link";

import TopBar from "@/app/components/TopBar";
import Masthead from "@/app/components/Masthead";
import Footer from "@/app/components/Footer";

import {
  getPublishedArticles,
  getPublishedCategories,
} from "@/lib/db-articles";

interface PublishedArticlesPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function PublishedArticlesPage({
  searchParams,
}: PublishedArticlesPageProps) {
  const { category } = await searchParams;
  const selectedCategory = category?.toLowerCase() || "";

  const [categories, result] = await Promise.all([
    getPublishedCategories(),
    getPublishedArticles({
      page: 1,
      limit: 24,
      category: selectedCategory || undefined,
    }),
  ]);

  const articles = result.articles;

  const heading = selectedCategory
    ? `${selectedCategory.charAt(0).toUpperCase()}${selectedCategory.slice(1)} articles`
    : "Published articles";

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-gray-900">
      <TopBar />
      <Masthead />

      <main className="flex-1">
        <section className="mx-auto max-w-[1160px] px-4 py-10 md:py-12">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-6 w-1.5 bg-accent" />
            <h1 className="font-serif text-3xl font-bold text-gray-900 md:text-4xl">
              {heading}
            </h1>
          </div>

          <p className="mb-8 text-sm text-gray-600">
            Browse articles published by our newsroom. Select a category to filter.
          </p>

          {/* Category selector */}
          <div className="mb-10 flex flex-wrap gap-2">
            <Link
              href="/articles"
              className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                selectedCategory === ""
                  ? "bg-accent text-white"
                  : "border border-gray-300 bg-white text-gray-700 hover:border-accent hover:text-accent"
              }`}
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/articles?category=${encodeURIComponent(cat)}`}
                className={`rounded-full px-4 py-2 text-sm font-bold capitalize transition-colors ${
                  selectedCategory === cat.toLowerCase()
                    ? "bg-accent text-white"
                    : "border border-gray-300 bg-white text-gray-700 hover:border-accent hover:text-accent"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

          {articles.length === 0 ? (
            <p className="py-12 text-center text-gray-500">
              No published articles available in this category right now.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <article key={article._id} className="flex flex-col">
                  <Link href={`/articles/${article.slug}`}>
                    <div className="aspect-[4/3] w-full overflow-hidden bg-gray-200">
                      {article.featuredImage?.url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={article.featuredImage.url}
                          alt={article.featuredImage.altText || article.title}
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      )}
                    </div>
                  </Link>

                  <span className="mt-3 block text-xs font-bold uppercase tracking-wider text-accent">
                    {article.category}
                  </span>

                  <h2 className="mt-2 font-serif text-xl font-bold leading-snug text-gray-900">
                    <Link href={`/articles/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>

                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600">
                    {article.excerpt}
                  </p>

                  <p className="mt-3 text-xs font-medium text-gray-500">
                    {article.publishedAt
                      ? new Date(article.publishedAt).toLocaleDateString()
                      : "Recently"}
                    {typeof article.author === "object" && article.author?.name
                      ? ` · ${article.author.name}`
                      : ""}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
