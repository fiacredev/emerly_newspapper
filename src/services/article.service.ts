import { apiRequest } from "@/lib/api";

import type {
  Article,
  ArticleListResponse,
  SingleArticleResponse,
} from "../types/article2";

export interface ArticleFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
  featured?: boolean;
  author?: string;
}

export interface ArticleInput {
  title: string;
  slug: string; 
  excerpt: string;
  content: string;
  category: string;
  tags: string[];

  featuredImage: Article["featuredImage"];
  images: Article["images"];

  source: "original" | "external";
  sourceUrl?: string | null;

  seo?: Article["seo"];
}

export const articleService = {
  getAll: (filters: ArticleFilters = {}) => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.set(key, String(value));
      }
    });

    return apiRequest<ArticleListResponse>(
      `/articles?${params.toString()}`,
      { auth: true }
    );
  },

  getById: (id: string) =>
    apiRequest<SingleArticleResponse>(
      `/articles/${id}`,
      { auth: true }
    ),

  create: (data: ArticleInput) =>
    apiRequest<SingleArticleResponse>("/articles", {
      method: "POST",
      auth: true,
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<ArticleInput>) =>
    apiRequest<SingleArticleResponse>(`/articles/${id}`, {
      method: "PATCH",
      auth: true,
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiRequest<{ success: boolean; message: string }>(
      `/articles/${id}`,
      {
        method: "DELETE",
        auth: true,
      }
    ),

  publish: (id: string) =>
    apiRequest<SingleArticleResponse>(
      `/articles/${id}/publish`,
      { method: "PATCH", auth: true }
    ),

  archive: (id: string) =>
    apiRequest<SingleArticleResponse>(
      `/articles/${id}/archive`,
      { method: "PATCH", auth: true }
    ),

  toggleFeatured: (id: string) =>
    apiRequest<SingleArticleResponse>(
      `/articles/${id}/feature`,
      { method: "PATCH", auth: true }
    ),
};