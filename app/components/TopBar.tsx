import Link from "next/link";
import { connection } from "next/server";

const sections = [
  { name: "World", slug: "general" },
  { name: "Politics", slug: "politics" },
  { name: "Business", slug: "business" },
  { name: "Technology", slug: "technology" },
  { name: "Science", slug: "science" },
  { name: "Health", slug: "health" },
  { name: "Sports", slug: "sports" },
  { name: "Culture", slug: "entertainment" },
];

export default async function TopBar() {
  await connection();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="border-b border-gray-200 bg-white text-xs text-gray-600">
      <div className="mx-auto flex max-w-[1160px] items-center justify-between gap-4 px-4 py-2.5">

        <p className="hidden font-medium md:block">
          {today}
        </p>

        <nav className="flex items-center gap-5 overflow-x-auto">
          {sections.map((section) => (
            <Link
              key={section.slug}
              href={`/${section.slug}`}
              className="whitespace-nowrap font-medium text-gray-700 transition-colors hover:text-accent"
            >
              {section.name}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/articles"
            className="rounded-sm border border-accent px-3 py-1 font-bold text-accent transition-colors hover:bg-accent hover:text-white"
          >
            Exclusive content
          </Link>

          <a
            href="/subscribe"
            className="rounded-sm bg-accent px-3 py-1 font-bold text-white transition-colors hover:bg-accent-dark"
          >
            Subscribe
          </a>
        </div>

      </div>
    </div>
  );
}