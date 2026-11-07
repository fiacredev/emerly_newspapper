import type { Article, ArticleCategory } from "./article";

const NEWS_API_URL = "https://newsapi.org/v2";

export async function getTopStories(): Promise<Article[]> {
  try {
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
      throw new Error("NEWS_API_KEY is missing");
    }

    const response = await fetch(
      `${NEWS_API_URL}/top-headlines?language=en&pageSize=20&apiKey=${apiKey}`,
      {
        next: { revalidate: 900 },
      }
    );

    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== "ok") {
      throw new Error(data.message || "Failed to retrieve news");
    }

    return data.articles.map((item: any, index: number) => ({
      _id: item.url || String(index),
      title: item.title || "Untitled",
      slug: `news-${index}-${Date.parse(item.publishedAt || "") || index}`,
      excerpt: item.description || "",
      content: item.content || "",
      featuredImage: item.urlToImage
        ? {
            url: item.urlToImage,
            publicId: "",
            altText: item.title || "",
          }
        : null,
      images: [],
      category: "general",
      tags: [],
      author: item.author || "NewsAPI",
      status: "published",
      source: "external",
      sourceUrl: item.url,
      publishedAt: item.publishedAt || null,
      isFeatured: index === 0,
      views: 0,
      createdAt: item.publishedAt || new Date().toISOString(),
      updatedAt: item.publishedAt || new Date().toISOString(),
    }));
  } catch (error) {
    console.error("getTopStories error:", error);
    return [];
  }
}

export async function getTopStoriesByCategory(
  category: ArticleCategory
): Promise<Article[]> {
  try {
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
      throw new Error("NEWS_API_KEY is missing");
    }

    const categoryMap: Record<ArticleCategory, string> = {
      general: "general",
      politics: "general",
      sports: "sports",
      business: "business",
      technology: "technology",
      health: "health",
      science: "science",
      entertainment: "entertainment",
    };

    const params = new URLSearchParams({
      category: categoryMap[category],
      language: "en",
      pageSize: "10",
      apiKey,
    });

    const response = await fetch(
      `${NEWS_API_URL}/top-headlines?${params.toString()}`,
      { next: { revalidate: 900 } }
    );

    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== "ok") {
      throw new Error(data.message || "Failed to retrieve category news");
    }

    return data.articles.map((item: any, index: number) => ({
      _id: item.url || String(index),
      title: item.title || "Untitled",
      slug: `news-${index}-${Date.parse(item.publishedAt || "") || index}`,
      excerpt: item.description || "",
      content: item.content || "",
      featuredImage: item.urlToImage
        ? {
            url: item.urlToImage,
            publicId: "",
            altText: item.title || "",
          }
        : null,
      images: [],
      category,
      tags: [],
      author: item.author || "NewsAPI",
      status: "published",
      source: "external",
      sourceUrl: item.url,
      publishedAt: item.publishedAt || null,
      isFeatured: false,
      views: 0,
      createdAt: item.publishedAt || new Date().toISOString(),
      updatedAt: item.publishedAt || new Date().toISOString(),
    }));
  } catch (error) {
    console.error("getTopStoriesByCategory error:", error);
    return [];
  }
}