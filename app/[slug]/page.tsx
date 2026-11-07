
import Link from "next/link";
import { notFound } from "next/navigation";

import TopBar from "@/app/components/TopBar";
import Masthead from "@/app/components/Masthead";
import Footer from "@/app/components/Footer";

import {
  getLatestNews,
  getStoryByCategory,
  getStorySlug,
  type Story,
} from "@/lib/news";

import type { ArticleCategory } from "@/lib/article";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

const categories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
  "politics",
];

export default async function ArticlePage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;

  // Retrieve latest articles
  
const stories = await getLatestNews();

let article = stories.find(
  (story) => getStorySlug(story) === slug
);

// Search category articles if not found in latest news
if (!article) {
  for (const category of categories) {
    const categoryStories = await getStoryByCategory(
      category as ArticleCategory
    );

    article = categoryStories.find(
      (story) => getStorySlug(story) === slug
    );

    if (article) break;
  }
}

  // ARTICLE PAGE
  if (article) {
    const relatedStories = stories
      .filter((story) => story.id !== article.id)
      .slice(0, 3);

    return (
      <div className="flex min-h-screen flex-col bg-white font-sans text-gray-900">
        <TopBar />
        <Masthead />

        <main className="flex-1">
          <article className="mx-auto max-w-[1160px] px-4 py-10 md:py-14">

            <Link
              href="/"
              className="text-xs font-bold uppercase tracking-wider text-accent"
            >
              ← Top Stories
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
              {article.time}
              {article.author ? ` · ${article.author}` : ""}
            </p>

            {article.image && (
              <div className="mt-8 aspect-[16/9] w-full overflow-hidden bg-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="mt-8 max-w-[680px]">
              {article.body?.map((paragraph, index) => (
                <p
                  key={index}
                  className="mb-6 text-lg leading-relaxed text-gray-800"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8">
              <p className="text-sm text-gray-600">
                Read the complete report from the original publisher.
              </p>
            </div>

            <div className="mt-12 border-t border-gray-200 pt-8">
              <h2 className="font-serif text-2xl font-bold text-gray-900 md:text-3xl">
                Related coverage
              </h2>

              <ul className="mt-6 flex flex-col gap-6">
                {relatedStories.map((story) => (
                  <li key={story.id} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 bg-accent" />

                    <div>
                      <h3 className="font-serif text-xl font-bold leading-snug text-gray-900">
                        <Link href={`/${getStorySlug(story)}`}>
                          {story.title}
                        </Link>
                      </h3>

                      <p className="mt-1 text-xs font-medium text-gray-500">
                        {story.time}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </article>
        </main>

        <Footer />
      </div>
    );
  }

  // CATEGORY PAGE
  const category = categories.includes(slug.toLowerCase())
    ? slug.toLowerCase()
    : null;

  if (!category) {
    notFound();
  }

  const sectionStories = await getStoryByCategory(
    category as Parameters<typeof getStoryByCategory>[0]
  );

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-gray-900">
      <TopBar />
      <Masthead />

      <main className="flex-1">
        <section className="mx-auto max-w-[1160px] px-4 py-10 md:py-12">

          <div className="mb-8 flex items-center gap-3">
            <span className="h-6 w-1.5 bg-accent" />

            <h1 className="font-serif text-3xl font-bold capitalize text-gray-900 md:text-4xl">
              {category} News
            </h1>
          </div>

          {sectionStories.length === 0 ? (
            <p className="py-12 text-center text-gray-500">
              No articles available in this category right now.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {sectionStories.map((story) => (
                <article key={story.id}>

                  <Link href={`/${getStorySlug(story)}`}>
                    <div className="aspect-[4/3] w-full overflow-hidden bg-gray-200">
                      {story.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={story.image}
                          alt={story.title}
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      )}
                    </div>
                  </Link>

                  <span className="mt-3 block text-xs font-bold uppercase tracking-wider text-accent">
                    {story.category}
                  </span>

                  <h2 className="mt-2 font-serif text-xl font-bold leading-snug text-gray-900">
                    <Link href={`/${getStorySlug(story)}`}>
                      {story.title}
                    </Link>
                  </h2>

                  <p className="mt-2 text-xs font-medium text-gray-500">
                    {story.time}
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
