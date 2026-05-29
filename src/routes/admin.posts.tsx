import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Plus, Pencil, Trash2, Eye, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { listPosts, deletePost, type Post } from "@/lib/posts";

export const Route = createFileRoute("/admin/posts")({
  component: PostsPage,
});

function PostsPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: rows, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: listPosts,
  });

  const del = useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => {
      toast.success("Post deleted");
      qc.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const drafts = rows?.filter((r) => r.status === "draft").length ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Posts</h1>
          <p className="text-sm text-muted-foreground">
            {rows?.length ?? 0} total · {drafts} draft{drafts === 1 ? "" : "s"}
          </p>
        </div>
        <Link to="/admin/editor">
          <Button className="gap-2"><Plus className="h-4 w-4" /> New post</Button>
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {isLoading ? (
          <div className="grid place-items-center py-16 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : !rows || rows.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-muted-foreground">No posts yet.</p>
            <Link to="/admin/editor">
              <Button className="mt-4 gap-2"><Plus className="h-4 w-4" /> Create your first post</Button>
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-surface text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3 text-left font-semibold">Title</th>
                <th className="px-5 py-3 text-left font-semibold">Category</th>
                <th className="px-5 py-3 text-left font-semibold">Status</th>
                <th className="px-5 py-3 text-left font-semibold">Updated</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r: Post) => (
                <tr key={r.id} className="hover:bg-muted/40">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {r.cover_url ? (
                        <img src={r.cover_url} alt="" loading="lazy" className="h-10 w-14 flex-none rounded object-cover" />
                      ) : (
                        <div className="h-10 w-14 flex-none rounded bg-muted" />
                      )}
                      <span className="font-medium">{r.title || "Untitled"}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{r.category ?? "—"}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                      r.status === "published" ? "bg-success/15 text-success" : "bg-brand/15 text-brand"
                    }`}>{r.status}</span>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{new Date(r.updated_at).toLocaleDateString()}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => navigate({ to: "/admin/preview/$id", params: { id: r.id } })}
                        className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                        aria-label="Preview"
                        title="Preview"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => navigate({ to: "/admin/editor", search: { id: r.id } })}
                        className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                        aria-label="Edit"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${r.title}"? This can't be undone.`)) del.mutate(r.id);
                        }}
                        className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        aria-label="Delete"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
