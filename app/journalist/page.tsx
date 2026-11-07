
import RecentArticles from "../components/admin/dashboard/recent-articles";
import type { Article } from "../../src/types/article";

export default async function JournalistDashboard() {
  // Temporary data until connected to the backend.
  const articles: Article[] = [];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Journalist Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Welcome to your journalist portal. Manage your articles and settings.
        </p>
      </div>

      {/* Articles */}
      <RecentArticles articles={articles} />
    </div>
  );
}
