import Link from "next/link";
import { type Story, getStorySlug } from "../../lib/news";

interface LatestNewsProps {
  stories: Story[];
}

export default function LatestNews({ stories }: LatestNewsProps) {
  return (
    <section className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-[1160px] px-4 py-10 md:py-12">

        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-3 font-serif text-2xl font-bold text-gray-900 md:text-3xl">
            <span className="h-6 w-1.5 bg-accent" aria-hidden="true" />
            The Latest
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {stories.map((story) => (
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

              <h3 className="mt-2 font-serif text-lg font-bold leading-snug text-gray-900">
                <Link
                  href={`/${getStorySlug(story)}`}
                  className="hover:text-accent"
                >
                  {story.title}
                </Link>
              </h3>

              <p className="mt-2 text-xs font-medium text-gray-500">
                {story.time}
              </p>

            </article>
          ))}

        </div>
      </div>
    </section>
  );
}