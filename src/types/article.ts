import type { AdminUser } from "./user";

export type ArticleStatus = "draft" | "published" | "archived";

export type ArticleCategory =
  | "general"
  | "politics"
  | "sports"
  | "business"
  | "technology"
  | "health"
  | "science"
  | "entertainment";

export interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: {
    url: string;
    publicId: string;
    altText?: string;
  } | null;
  images: {
    url: string;
    publicId: string;
    altText?: string;
  }[];
  category: ArticleCategory;
  tags: string[];
  author: AdminUser | string;
  status: ArticleStatus;
  source: "original" | "external";
  sourceUrl?: string | null;
  publishedAt: string | null;
  isFeatured: boolean;
  views: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  createdAt: string;
  updatedAt: string;
}
