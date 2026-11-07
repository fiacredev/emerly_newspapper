"use client";

import { useAuth } from "../../../src/contexts/auth-context";
import ArticleList from "./article-list";

export default function MyArticles() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-sm text-slate-500">
          Loading your articles...
        </p>
      </div>
    );
  }

  return (
    <ArticleList authorId={user.id || user._id} />
  );
}