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

export interface ArticleImage {
  url: string;
  publicId: string;
  altText: string;
}

export interface ArticleAuthor {
  _id: string;
  name: string;
  email?: string;
  role?: "admin" | "journalist";
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

  author: ArticleAuthor | null;

  status: ArticleStatus;
  source: "original" | "external";
  sourceUrl: string | null;

  publishedAt: string | null;
  isFeatured: boolean;
  views: number;

  seo: ArticleSEO;

  createdAt: string;
  updatedAt: string;
}

export interface ArticlePagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ArticleListResponse {
  success: boolean;
  articles: Article[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface SingleArticleResponse {
  success: boolean;
  data: Article;
}