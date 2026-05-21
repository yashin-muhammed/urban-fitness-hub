import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { articles, heroArticle } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/posts")({
  component: PostsPage,
});

const rows = [heroArticle, ...articles, ...articles].map((a, i) => ({
  ...a,
  status: i % 4 === 0 ? "Draft" : "Published",
  views: Math.floor(1000 + Math.random() * 9000),
}));

function PostsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Posts</h1>
          <p className="text-sm text-muted-foreground">{rows.length} total · 3 drafts</p>
        </div>
        <Link to="/admin/editor"><Button className="gap-2"><Plus className="h-4 w-4" /> New post</Button></Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-surface text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-3 text-left font-semibold">Title</th>
              <th className="px-5 py-3 text-left font-semibold">Category</th>
              <th className="px-5 py-3 text-left font-semibold">Status</th>
              <th className="px-5 py-3 text-left font-semibold">Views</th>
              <th className="px-5 py-3 text-left font-semibold">Date</th>
              <th />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r, i) => (
              <tr key={i} className="hover:bg-muted/40">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img src={r.cover} alt="" loading="lazy" className="h-10 w-14 flex-none rounded object-cover" />
                    <span className="font-medium">{r.title}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{r.category}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                    r.status === "Published" ? "bg-success/15 text-success" : "bg-brand/15 text-brand"
                  }`}>{r.status}</span>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{r.views.toLocaleString()}</td>
                <td className="px-5 py-3 text-muted-foreground">{r.date}</td>
                <td className="px-5 py-3 text-right">
                  <button className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="More">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
