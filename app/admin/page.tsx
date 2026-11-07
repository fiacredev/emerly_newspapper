import DashboardStats from "../components/admin/dashboard/dashboard-stats";
import RecentArticles from "../components/admin/dashboard/recent-articles";
import type { Article } from "../../src/types/article";
import CurrentDate from "../../app/components/admin/current-date";
import LogoutButton from "../components/admin/logout-button";

interface DashboardPageProps {
  // These will come from your authenticated dashboard API.
  // Replace this example data with your actual API response.
}

export default async function AdminDashboard() {
  // Temporary data until we connect your backend.
  const articles: Article[] = [];

  const stats = {
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    totalJournalists: 0,
    totalViews: 0,
  };

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Dashboard Overview
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Monitor your newsroom and manage your editorial activities.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 shadow-sm">
          <CurrentDate />
        </div>
      </div>

      {/* Statistics */}
      <DashboardStats {...stats} />

      {/* Articles */}
      <RecentArticles articles={articles} />
    </div>
  );
}