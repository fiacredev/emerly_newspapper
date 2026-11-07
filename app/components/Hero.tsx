import Link from "next/link";
import { type Story, getStorySlug } from "../../lib/news";

interface HeroProps {
  lead: Story;
  secondary: Story[];
}

export default function Hero({ lead, secondary }: HeroProps) {
  return (
    <section className="mx-auto max-w-[1160px] px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Lead story */}
        <article className="lg:col-span-7">
          <div className="aspect-[16/9] w-full overflow-hidden bg-gray-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lead.image} alt={lead.title} className="h-full w-full object-cover" />
          </div>
          <span className="mt-4 block text-xs font-bold uppercase tracking-wider text-accent">
            {lead.category}
          </span>
          <h2 className="mt-2 font-serif text-4xl font-bold leading-[1.05] tracking-tight text-gray-900 md:text-5xl">
            <Link href={`/${getStorySlug(lead)}`} className="hover:text-accent">
              {lead.title}
            </Link>
          </h2>
          {lead.excerpt ? (
            <p className="mt-4 text-base leading-relaxed text-gray-600">{lead.excerpt}</p>
          ) : null}
          <p className="mt-4 text-xs font-medium uppercase tracking-wide text-gray-500">
            {lead.time}
            {lead.author ? ` · ${lead.author}` : ""}
          </p>
        </article>

        {/* Secondary stories */}
        <div className="flex flex-col gap-8 lg:col-span-5 lg:border-l lg:border-gray-200 lg:pl-8">
          {secondary.map((story) => (
            <article key={story.id} className="flex gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={story.image}
                alt=""
                className="h-24 w-24 shrink-0 object-cover"
              />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent">
                  {story.category}
                </span>
                <h3 className="mt-1.5 font-serif text-xl font-bold leading-snug text-gray-900">
                  <Link href={`/${getStorySlug(story)}`} className="hover:text-accent">
                    {story.title}
                  </Link>
                </h3>
                <p className="mt-1 text-xs font-medium text-gray-500">{story.time}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
