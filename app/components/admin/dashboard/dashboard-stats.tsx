import {
  Newspaper,
  FileEdit,
  Users,
  Eye,
} from "lucide-react";

import StatCard from "../stat-card";

interface DashboardStatsProps {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalJournalists: number;
  totalViews: number;
}

export default function DashboardStats({
  totalArticles,
  publishedArticles,
  draftArticles,
  totalJournalists,
  totalViews,
}: DashboardStatsProps) {
  const stats = [
    {
      title: "Total Articles",
      value: totalArticles,
      description: "All articles in your newsroom",
      icon: Newspaper,
      color: "blue" as const,
    },
    {
      title: "Published",
      value: publishedArticles,
      description: "Articles currently published",
      icon: FileEdit,
      color: "green" as const,
    },
    {
      title: "Draft Articles",
      value: draftArticles,
      description: "Articles awaiting publication",
      icon: FileEdit,
      color: "orange" as const,
    },
    {
      title: "Total Views",
      value: totalViews.toLocaleString(),
      description: "Combined article views",
      icon: Eye,
      color: "purple" as const,
    },
    {
      title: "Journalists",
      value: totalJournalists,
      description: "Registered newsroom journalists",
      icon: Users,
      color: "blue" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}