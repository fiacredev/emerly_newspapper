import type { Article, ArticleCategory } from "./article";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface PublishedArticlesResult {
  articles: Article[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface GetPublishedArticlesOptions {
  page?: number;
  limit?: number;
  category?: ArticleCategory | string;
  search?: string;
  featured?: boolean;
}

export async function getPublishedArticles(
  options: GetPublishedArticlesOptions = {}
): Promise<PublishedArticlesResult> {
  const params = new URLSearchParams();

  if (options.page) params.set("page", String(options.page));
  if (options.limit) params.set("limit", String(options.limit));
  if (options.category) params.set("category", String(options.category));
  if (options.search) params.set("search", options.search);
  if (options.featured) params.set("featured", "true");

  const query = params.toString();
  const url = `${API_URL}/news${query ? `?${query}` : ""}`;

  try {
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.status}`);
    }

    const data = await response.json();

    return {
      articles: Array.isArray(data?.articles) ? data.articles : [],
      pagination: data?.pagination ?? {
        total: 0,
        page: options.page ?? 1,
        limit: options.limit ?? 10,
        totalPages: 0,
      },
    };
  } catch (error) {
    console.error("getPublishedArticles error:", error);
    return {
      articles: [],
      pagination: {
        total: 0,
        page: options.page ?? 1,
        limit: options.limit ?? 10,
        totalPages: 0,
      },
    };
  }
}

export async function getPublishedArticleBySlug(
  slug: string
): Promise<Article | null> {
  const url = `${API_URL}/news/${encodeURIComponent(slug)}`;

  try {
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Failed to fetch article: ${response.status}`);
    }

    const data = await response.json();
    return (data?.data as Article) ?? null;
  } catch (error) {
    console.error("getPublishedArticleBySlug error:", error);
    return null;
  }
}

export async function getPublishedCategories(): Promise<string[]> {
  const url = `${API_URL}/news/categories`;

  try {
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data?.data) ? data.data : [];
  } catch (error) {
    console.error("getPublishedCategories error:", error);
    return [];
  }
}
