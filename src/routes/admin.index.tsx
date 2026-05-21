import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Eye, TrendingUp, Edit3, Plus, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { articles, heroArticle } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const stats = [
  { label: "Published posts", value: "128", change: "+12 this month", icon: FileText },
  { label: "Drafts", value: "9", change: "3 ready to review", icon: Edit3 },
  { label: "Monthly visitors", value: "84,231", change: "+18.4% vs last", icon: Eye },
  { label: "SEO score (avg)", value: "92", change: "Healthy", icon: TrendingUp },
];

function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Good morning, Layla 👋</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here's what's happening with your content today.
          </p>
        </div>
        <Link to="/admin/editor">
          <Button size="lg" className="gap-2"><Plus className="h-4 w-4" /> New post</Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{s.label}</span>
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-muted text-foreground">
                <s.icon className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-4 text-3xl font-bold tracking-tight">{s.value}</p>
            <p className="mt-1 text-xs text-success">{s.change}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent posts</h2>
            <Link to="/admin/posts" className="text-xs font-semibold text-brand inline-flex items-center gap-1">
              View all <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-4 divide-y divide-border">
            {[heroArticle, ...articles].map((a, i) => (
              <div key={i} className="flex items-center gap-4 py-3">
                <img src={a.cover} alt="" loading="lazy" className="h-12 w-16 flex-none rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{a.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{a.category} · {a.date}</p>
                </div>
                <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-[11px] font-semibold text-success">
                  Published
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold">Activity</h2>
          <div className="mt-4 space-y-4">
            {[
              ["Layla", "published “Best adjustable dumbbells of 2026”", "2h ago"],
              ["Omar", "uploaded 12 images", "4h ago"],
              ["Sara", "created a draft", "yesterday"],
              ["Layla", "edited SEO metadata", "yesterday"],
            ].map(([who, what, when], i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 grid h-7 w-7 flex-none place-items-center rounded-full bg-muted text-[11px] font-bold">
                  {String(who).slice(0, 1)}
                </span>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{who}</span> {what}
                  <span className="ml-1 text-xs">· {when}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
