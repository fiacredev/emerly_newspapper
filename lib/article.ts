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

export type ArticleSource = "original" | "external";

export interface ArticleImage {
  url: string;
  publicId: string;
  altText?: string;
}

export interface ArticleSEO {
  metaTitle?: string;
  metaDescription?: string;
}

export interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;

  featuredImage: ArticleImage | null;

  images: ArticleImage[];

  category: ArticleCategory;

  tags: string[];

  author: AdminUser | string;

  status: ArticleStatus;

  source: ArticleSource;

  sourceUrl: string | null;

  publishedAt: string | null;

  isFeatured: boolean;

  views: number;

  seo?: ArticleSEO;

  createdAt: string;
  updatedAt: string;
}