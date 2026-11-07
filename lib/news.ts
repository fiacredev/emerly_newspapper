import type { ArticleCategory } from "./article";
import {
  getTopStories,
  getTopStoriesByCategory,
} from "./news-api";

export interface Story {
  id: string;
  slug?: string;
  _id?: string;
  category: string;
  title: string;
  excerpt?: string;
  body?: string[];
  time: string;
  author?: string;
  image?: string;
}

// Original sample stories
export const breakingNews: Story = {
  id: "breaking-news",
  category: "Breaking News",
  title: "Senate Reaches Late-Night Deal to End Government Shutdown, Averting Default",
  time: "12 min ago",
};

export const leadStory: Story = {
  id: "lead-senate-deal",
  category: "Politics",
  title: "Senate Reaches Late-Night Deal to End Government Shutdown, Averting Default",
  excerpt:
    "After a marathon session that stretched past midnight, leaders announced a compromise that would fund the government through the next fiscal year.",
  body: [
    "The Senate reached a late-night deal early Thursday, ending a government shutdown that stretched through two tense weeks and brought the country to the brink of default.",
    "Lawmakers announced the compromise just after 1 a.m., capping a marathon negotiation session that lasted more than 12 hours.",
    "In a statement, the majority leader said the deal was hard-won and praised colleagues across the aisle.",
  ],
  time: "38 min ago",
  author: "By National Political Desk",
  image: "https://picsum.photos/seed/wp-1/1200/800",
};

export const secondaryStories: Story[] = [
  {
    id: "sec-data-privacy",
    category: "Supreme Court",
    title: "Supreme Court Hears Arguments in Landmark Data Privacy Case",
    time: "1 hr ago",
    author: "By Jane Holloway",
    image: "https://picsum.photos/seed/wp-2/400/400",
  },
  {
    id: "sec-markets",
    category: "Business",
    title: "Markets Rally as Inflation Cools, Sparking Rate-Cut Optimism",
    time: "2 hrs ago",
    author: "By Priya Nair",
    image: "https://picsum.photos/seed/wp-3/400/400",
  },
];

export const latestStories: Story[] = [
  {
    id: "lat-climate",
    category: "Climate",
    title: "Historic Climate Summit Reaches Agreement on Global Carbon Targets",
    time: "12 min ago",
    image: "https://picsum.photos/seed/wp-4/400/300",
  },
  {
    id: "lat-antitrust",
    category: "Technology",
    title: "Antitrust Trial Against Tech Giants Heads to Court",
    time: "45 min ago",
    image: "https://picsum.photos/seed/wp-5/400/300",
  },
  {
    id: "lat-health",
    category: "Health",
    title: "Hospitals Trial AI Triage Systems, Early Data Finds Promise",
    time: "1 hr ago",
    image: "https://picsum.photos/seed/wp-6/400/300",
  },
  {
    id: "lat-sports",
    category: "Sports",
    title: "Marathon World Record Falls in Thrilling Finish",
    time: "2 hrs ago",
    image: "https://picsum.photos/seed/wp-7/400/300",
  },
];

export const politicsMain: Story = {
  id: "pol-marathon-night",
  category: "Capitol Hill",
  title: "Inside the Marathon Night That Broke the Budget Impasse",
  excerpt:
    "The deal came together in the final hours, with leaders trading concessions and late-night negotiations that few thought were possible.",
  time: "6 hrs ago",
  author: "By Marcus Reed",
  image: "https://picsum.photos/seed/wp-8/800/600",
};

export const politicsRelated: Story[] = [
  {
    id: "pol-white-house",
    category: "White House",
    title: "White House Signals Flexibility on Defense Spending",
    time: "3 hrs ago",
  },
  {
    id: "pol-energy",
    category: "Congress",
    title: "House Committee Advances Sweeping Energy Bill",
    time: "5 hrs ago",
  },
  {
    id: "pol-veto",
    category: "Senate",
    title: "Veto Override Battle Looms After Senate Fails to Block Bill",
    time: "8 hrs ago",
  },
  {
    id: "pol-polls",
    category: "Polls",
    title: "New Poll Shows Tight Race Heading Into Midterms",
    time: "12 hrs ago",
  },
];

// Generate story URL
export function getStorySlug(story?: Story | null): string {
  if (!story) return "";

  return story.id;
}

// Convert backend Article format into frontend Story format
function articleToStory(
  article: Awaited<ReturnType<typeof getTopStories>>[number]
): Story {
  return {
    id: article.slug || article._id || "",
    slug: article.slug,
    _id: article._id,
    title: article.title,
    category: article.category,
    excerpt: article.excerpt,
    body: article.content ? [article.content] : [],
    time: article.publishedAt
      ? new Date(article.publishedAt).toLocaleString()
      : "Recently",
    author:
      typeof article.author === "string"
        ? article.author
        : article.author?.name || "News Desk",
    image: article.featuredImage?.url || undefined,
  };
}


// Fetch latest external news
export async function getLatestNews(): Promise<Story[]> {
  const articles = await getTopStories();
  return articles.map(articleToStory);
}

// Fetch news by category
export async function getStoryByCategory(
  category: ArticleCategory
): Promise<Story[]> {
  const articles = await getTopStoriesByCategory(category);

  return articles.map(articleToStory);
}