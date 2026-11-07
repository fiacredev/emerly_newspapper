import Link from "next/link";
import { type Story } from "../../lib/news";

interface PoliticsProps {
  main: Story;
  related: Story[];
}

export default function Politics({ main, related }: PoliticsProps) {
  return (
    <section className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-[1160px] px-4 py-10 md:py-12">

        <div className="mb-8 flex items-center gap-3">
          <span className="h-6 w-1.5 bg-accent" aria-hidden="true" />
          <h2 className="font-serif text-2xl font-bold text-gray-900 md:text-3xl">
            Politics
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

          {/* Main story */}
          <article className="lg:col-span-7">

            <Link href={`/${main.id}`}>
              <div className="aspect-[16/9] w-full overflow-hidden bg-gray-200">
                {main.image && (
                  <img
                    src={main.image}
                    alt={main.title}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </Link>

            <span className="mt-4 block text-xs font-bold uppercase tracking-wider text-accent">
              {main.category}
            </span>

            <h3 className="mt-2 font-serif text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
              <Link href={`/${main.id}`} className="hover:text-accent">
                {main.title}
              </Link>
            </h3>

            {main.excerpt && (
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                {main.excerpt}
              </p>
            )}

            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-gray-500">
              {main.time}
              {main.author ? ` · ${main.author}` : ""}
            </p>
          </article>

          {/* Related stories */}
          <div className="flex flex-col gap-6 lg:col-span-5 lg:border-l lg:border-gray-200 lg:pl-8">

            {related.map((story) => (
              <article key={story.id} className="flex items-start gap-3">

                <span className="mt-2 h-2 w-2 shrink-0 bg-accent" />

                <div>
                  <h4 className="font-serif text-xl font-bold leading-snug text-gray-900">
                    <Link
                      href={`/${story.id}`}
                      className="hover:text-accent"
                    >
                      {story.title}
                    </Link>
                  </h4>

                  <p className="mt-1 text-xs font-medium text-gray-500">
                    {story.time}
                  </p>
                </div>

              </article>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}