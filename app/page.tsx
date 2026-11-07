import Link from "next/link";
import TopBar from "./components/TopBar";
import Masthead from "./components/Masthead";
import Hero from "./components/Hero";
import LatestNews from "./components/LatestNews";
import Politics from "./components/Politics";
import Footer from "./components/Footer";
import CurrentDate from "../app/components/admin/current-date";

import { getLatestNews } from "../lib/news";

// export const revalidate = 900;

export default async function Home() {
  const stories = await getLatestNews();

  // Handle empty API responses
  if (!stories || stories.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <TopBar />
        <Masthead />

        <main className="mx-auto max-w-[1160px] px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">
            No news available right now
          </h1>
          <p className="mt-3 text-gray-500">
            Please check back later.
          </p>
        </main>

        <Footer />
      </div>
    );
  }

  const breakingStory = stories[0];
  const heroLead = stories[0];
  const heroSecondary = stories.slice(1, 3);
  const latestStoriesList = stories.slice(3, 7);

  const politicsMainStory =
    stories.find(
      (story) => story.category.toLowerCase() === "politics"
    ) ?? stories[2] ?? stories[0];

  const politicsRelatedStories = stories
    .filter((story) => story.id !== politicsMainStory.id)
    .slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-gray-900">

      {/* Breaking news */}
      <div className="bg-accent text-white">
        <div className="mx-auto flex max-w-[1160px] items-center gap-3 px-4 py-2.5">

          <span className="flex shrink-0 items-center justify-center bg-white px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-accent">
            Breaking
          </span>

          <p className="truncate text-sm font-bold">
            <Link
              href={`/${breakingStory.id}`}
              className="hover:text-white/80"
            >
              {breakingStory.title}
            </Link>
          </p>

        </div>
      </div>

      <TopBar />
      <Masthead />

      <main className="flex-1">
        <Hero
          lead={heroLead}
          secondary={heroSecondary}
        />

        <LatestNews stories={latestStoriesList} />

        <Politics
          main={politicsMainStory}
          related={politicsRelatedStories}
        />
      </main>

      <Footer />

    </div>
  );
}