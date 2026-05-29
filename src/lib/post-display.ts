import type { Post } from "@/lib/posts";

export type ArticleCardData = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  cover: string;
  author: string;
  date: string;
  readTime: string;
};

const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80";

export function estimateReadTime(html: string): string {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
}

export function formatDate(iso: string | null): string {
  const d = iso ? new Date(iso) : new Date();
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function postToCard(p: Post): ArticleCardData {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.meta_description ?? p.subtitle ?? "",
    category: p.category ?? "Reviews",
    cover: p.cover_url ?? FALLBACK_COVER,
    author: "Editorial",
    date: formatDate(p.published_at ?? p.updated_at),
    readTime: estimateReadTime(p.content_html),
  };
}
