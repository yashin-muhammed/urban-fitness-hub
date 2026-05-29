import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPost } from "@/lib/posts";

export default function PreviewPage() {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="grid place-items-center py-20 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="space-y-4 py-10 text-center">
        <p className="text-sm text-muted-foreground">Post not found.</p>
        <Link to="/admin/posts"><Button variant="outline">Back to posts</Button></Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/admin/posts" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to posts
        </Link>
        <Link to={`/admin/editor?id=${post.id}`}>
          <Button size="sm" className="gap-2"><Pencil className="h-4 w-4" /> Edit</Button>
        </Link>
      </div>

      <article className="mx-auto max-w-3xl">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
          {post.category ?? "Article"}
        </span>
        <h1 className="mt-3 text-balance text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
          {post.title}
        </h1>
        {post.subtitle && (
          <p className="mt-5 text-lg text-muted-foreground">{post.subtitle}</p>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-3 border-b border-border pb-6 text-sm text-muted-foreground">
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
            post.status === "published" ? "bg-success/15 text-success" : "bg-brand/15 text-brand"
          }`}>{post.status}</span>
          <span>Updated {new Date(post.updated_at).toLocaleString()}</span>
        </div>

        {post.cover_url && (
          <div className="mt-8 overflow-hidden rounded-2xl bg-surface">
            <img src={post.cover_url} alt={post.title} className="aspect-[16/9] w-full object-cover" />
          </div>
        )}

        <div
          className="prose prose-neutral mt-10 max-w-none text-[17px] leading-[1.8]"
          dangerouslySetInnerHTML={{ __html: post.content_html || "<p><em>No content yet.</em></p>" }}
        />

        {post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
            {post.tags.map((t) => (
              <span key={t} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">#{t}</span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
