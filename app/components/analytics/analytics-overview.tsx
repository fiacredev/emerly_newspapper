"use client";

import {
  Eye,
  FileText,
  TrendingUp,
  Users,
  CalendarDays,
  ArrowUpRight,
  BarChart3,
  Clock,
} from "lucide-react";

const stats = [
  {
    title: "Total views",
    value: "24,850",
    change: "+12.8%",
    icon: Eye,
    color: "blue",
  },
  {
    title: "Published articles",
    value: "86",
    change: "+8.2%",
    icon: FileText,
    color: "green",
  },
  {
    title: "Total articles",
    value: "128",
    change: "+5.4%",
    icon: TrendingUp,
    color: "purple",
  },
  {
    title: "Active journalists",
    value: "12",
    change: "+2",
    icon: Users,
    color: "orange",
  },
];

const categories = [
  { name: "Technology", value: 85, color: "bg-blue-600" },
  { name: "Politics", value: 70, color: "bg-purple-500" },
  { name: "Business", value: 55, color: "bg-emerald-500" },
  { name: "Sports", value: 42, color: "bg-orange-500" },
  { name: "Entertainment", value: 30, color: "bg-pink-500" },
];

const activity = [
  { day: "Mon", value: 45 },
  { day: "Tue", value: 70 },
  { day: "Wed", value: 55 },
  { day: "Thu", value: 90 },
  { day: "Fri", value: 65 },
  { day: "Sat", value: 80 },
  { day: "Sun", value: 50 },
];

export default function AnalyticsOverview() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-slate-500">Performance</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Analytics
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Monitor your newsroom performance and article engagement.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700"
        >
          <CalendarDays size={17} />
          Last 7 days
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          const colors: Record<string, string> = {
            blue: "bg-blue-50 text-blue-600",
            green: "bg-emerald-50 text-emerald-600",
            purple: "bg-purple-50 text-purple-600",
            orange: "bg-orange-50 text-orange-600",
          };

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  {stat.title}
                </p>

                <div className={`rounded-xl p-3 ${colors[stat.color]}`}>
                  <Icon size={20} />
                </div>
              </div>

              <h2 className="mt-4 text-3xl font-bold text-slate-900">
                {stat.value}
              </h2>

              <p className="mt-3 flex items-center gap-1 text-xs font-medium text-emerald-600">
                <ArrowUpRight size={15} />
                {stat.change} <span className="text-slate-400">vs previous period</span>
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-2">

        {/* Weekly activity */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                Weekly performance
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Article engagement throughout the week
              </p>
            </div>

            <BarChart3 className="text-slate-400" size={21} />
          </div>

          <div className="mt-8 flex h-52 items-end justify-between gap-3">
            {activity.map((item) => (
              <div
                key={item.day}
                className="flex h-full flex-1 flex-col items-center justify-end gap-3"
              >
                <div className="flex h-full w-full items-end">
                  <div
                    className="w-full rounded-t-lg bg-blue-500 transition hover:bg-blue-700"
                    style={{ height: `${item.value}%` }}
                  />
                </div>

                <span className="text-xs text-slate-400">
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-slate-900">
            Articles by category
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Content distribution across categories
          </p>

          <div className="mt-8 space-y-6">
            {categories.map((category) => (
              <div key={category.name}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-slate-700">
                    {category.name}
                  </span>
                  <span className="text-slate-400">
                    {category.value}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${category.color}`}
                    style={{ width: `${category.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Additional insights */}
      <section className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Clock size={21} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Publishing activity
              </h3>
              <p className="text-sm text-slate-500">
                Editorial publishing overview
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-slate-500">
            Track when articles are created and published to understand
            your newsroom's editorial activity.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <TrendingUp size={21} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Content performance
              </h3>
              <p className="text-sm text-slate-500">
                Understand audience engagement
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-slate-500">
            Identify popular categories and monitor article views
            to understand which stories attract the most readers.
          </p>
        </div>
      </section>
    </div>
  );
}