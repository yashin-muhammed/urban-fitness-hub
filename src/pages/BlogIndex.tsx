import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search, LayoutGrid, List } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ArticleCard } from "@/components/site/ArticleCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { articles, heroArticle, categories } from "@/lib/mock-data";
import { listPublishedPosts } from "@/lib/posts";
import { postToCard, type ArticleCardData } from "@/lib/post-display";

export default function BlogIndex() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState<"grid" | "list">("grid");

  const searchCat = searchParams.get("category") ?? undefined;
  const cat = searchCat && categories.includes(searchCat) ? searchCat : "All";
  const setCat = (c: string) => {
    if (c === "All") setSearchParams({});
    else setSearchParams({ category: c });
  };

  const { data: published } = useQuery({
    queryKey: ["posts", "published"],
    queryFn: listPublishedPosts,
  });
  const dbCards: ArticleCardData[] = (published ?? []).map(postToCard);
  const mock: ArticleCardData[] = [heroArticle, ...articles, ...articles, ...articles];
  const combined: ArticleCardData[] = dbCards.length > 0 ? [...dbCards, ...mock] : mock;
  const all = cat === "All" ? combined : combined.filter((a) => a.category === cat);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container-page py-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">Editorial</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">All Reviews & Stories</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Independently tested gear, real-world reviews, and the latest from across the fitness world.
        </p>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="container-page flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  cat === c
                    ? "bg-foreground text-background"
                    : "bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search articles…" className="h-10 w-[220px] bg-background pl-9" />
            </div>
            <div className="flex rounded-md border border-border bg-background">
              <Button variant="ghost" size="icon" aria-label="Grid view" onClick={() => setView("grid")}
                className={view === "grid" ? "bg-muted" : ""}>
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="List view" onClick={() => setView("list")}
                className={view === "list" ? "bg-muted" : ""}>
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        {view === "grid" ? (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {all.map((a, i) => <ArticleCard key={i} {...a} />)}
          </div>
        ) : (
          <div className="divide-y divide-border">
            {all.map((a, i) => (
              <a key={i} href="#" className="flex gap-6 py-6 group">
                <img src={a.cover} alt={a.title} loading="lazy" className="h-32 w-48 flex-none rounded-lg object-cover" />
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand">{a.category}</span>
                  <h3 className="mt-1 text-xl font-bold leading-snug group-hover:text-brand">{a.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{a.excerpt}</p>
                  <p className="mt-3 text-xs text-muted-foreground">{a.author} · {a.date} · {a.readTime}</p>
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="mt-12 flex items-center justify-center gap-2">
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              className={`h-9 w-9 rounded-md text-sm font-medium transition-colors ${
                n === 1 ? "bg-foreground text-background" : "border border-border hover:bg-muted"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
