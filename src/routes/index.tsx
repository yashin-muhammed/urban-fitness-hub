import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart, ChevronRight, Play, Mail, MessageCircle } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ArticleCard } from "@/components/site/ArticleCard";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { heroArticle as mockHero, articles as mockArticles, products, brands } from "@/lib/mock-data";
import { listPublishedPosts } from "@/lib/posts";
import { postToCard, type ArticleCardData } from "@/lib/post-display";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Urban Fitness Cart — Honest Reviews of Fitness Gear, Gadgets & Home Gyms" },
      { name: "description", content: "Independent reviews of fitness equipment, sports gadgets and home gym products. Plus the latest fitness news and events across the UAE." },
      { property: "og:title", content: "Urban Fitness Cart" },
      { property: "og:description", content: "Honest reviews of fitness gear, gadgets and home gyms." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { data: published } = useQuery({
    queryKey: ["posts", "published"],
    queryFn: listPublishedPosts,
  });
  const dbCards: ArticleCardData[] = (published ?? []).map(postToCard);

  // Hero = most recent published, fallback to mock
  const hero: ArticleCardData = dbCards[0] ?? mockHero;
  // Article feeds: combine DB posts first, then top up from mock
  const feed: ArticleCardData[] = [...dbCards.slice(1), ...mockArticles];
  const reviewsFeed = feed.slice(0, 3);
  const newsFeed = [...feed].reverse().slice(0, 3);

  const topStories = [
    { kind: "News", title: feed[0]?.title ?? mockArticles[0].title, author: feed[0]?.author ?? mockArticles[0].author, image: feed[0]?.cover ?? mockArticles[0].cover, slug: feed[0]?.slug ?? mockArticles[0].slug },
    { kind: "Versus", title: "PowerBlock Pro 50 vs Bowflex SelectTech: Worth the extra AED 800?", author: "Layla Hassan", image: products[0].image, slug: hero.slug },
    { kind: "Reviews", title: feed[1]?.title ?? mockArticles[1].title, author: feed[1]?.author ?? mockArticles[1].author, image: feed[1]?.cover ?? mockArticles[1].cover, slug: feed[1]?.slug ?? mockArticles[1].slug },
    { kind: "Versus", title: "Garmin Forerunner 965 vs Apple Watch Ultra 2: Which tracks better?", author: "Omar Khalid", image: products[1].image, slug: hero.slug },
    { kind: "News", title: feed[2]?.title ?? mockArticles[2].title, author: feed[2]?.author ?? mockArticles[2].author, image: feed[2]?.cover ?? mockArticles[2].cover, slug: feed[2]?.slug ?? mockArticles[2].slug },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <DealBanner />
      <MainGrid hero={hero} secondary={feed.slice(0, 2)} topStories={topStories} />
      <LatestVideos />
      <CategoryStrip title="Latest reviews" items={reviewsFeed} />
      <BestLists />
      <CategoryStrip title="Fitness news" items={newsFeed} />
      <Brands />
      <Newsletter />
      <SiteFooter />
    </div>
  );
}


function DealBanner() {
  return (
    <section className="container-page pt-8">
      <a
        href="#"
        className="flex items-center justify-center gap-3 rounded-xl bg-brand px-5 py-3.5 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-95"
      >
        <ShoppingCart className="h-4 w-4" />
        Check out the best home-gym & wearable deals this week
        <ChevronRight className="h-4 w-4" />
      </a>
      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        All products featured are independently chosen by us. Urban Fitness Cart may receive a commission on orders placed through retail links.
      </p>
    </section>
  );
}

function MainGrid({
  hero,
  secondary,
  topStories,
}: {
  hero: ArticleCardData;
  secondary: ArticleCardData[];
  topStories: { kind: string; title: string; author: string; image: string; slug: string }[];
}) {
  const secondaryFilled = secondary.length >= 2 ? secondary : [...secondary, ...mockArticles].slice(0, 2);
  return (
    <section className="container-page pt-8 pb-14">
      <div className="grid gap-8 lg:grid-cols-12">
        {/* LEFT — Hero + 2 best products */}
        <div className="lg:col-span-8 space-y-6">
          <Link
            to="/blog/$slug"
            params={{ slug: hero.slug }}
            className="group block overflow-hidden rounded-2xl bg-foreground text-background"
          >
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto">
                <img
                  src={hero.cover}
                  alt={hero.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-brand text-sm font-bold text-brand-foreground ring-4 ring-background/20">
                  9.1
                </span>
              </div>
              <div className="flex flex-col justify-between p-6 md:p-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand">{hero.category}</p>
                  <h1 className="mt-3 text-2xl font-bold leading-tight md:text-[28px]">
                    {hero.title}
                  </h1>
                </div>
                <div className="mt-6 flex items-center gap-3 text-xs text-background/70">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-brand text-[11px] font-bold text-brand-foreground">
                    {hero.author.slice(0, 1)}
                  </span>
                  <span className="font-medium text-background">{hero.author}</span>
                  <span>·</span>
                  <MessageCircle className="h-3.5 w-3.5" /> 12
                </div>
              </div>
            </div>
          </Link>

          <div className="grid gap-6 sm:grid-cols-2">
            {secondaryFilled.map((a) => (
              <Link
                key={a.slug}
                to="/blog/$slug"
                params={{ slug: a.slug }}
                className="group block overflow-hidden rounded-2xl bg-surface"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={a.cover}
                    alt={a.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand">Best products</p>
                  <h3 className="mt-2 text-lg font-bold leading-snug">{a.title}</h3>
                  <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-foreground text-[10px] font-bold text-background">
                      {a.author.slice(0, 1)}
                    </span>
                    {a.author}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT — Top stories */}
        <aside className="lg:col-span-4">
          <h2 className="text-2xl font-bold text-brand">Top stories</h2>
          <ol className="mt-5 space-y-5">
            {topStories.map((s, i) => (
              <li key={i}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: s.slug }}
                  className="group flex items-start gap-4"
                >
                  <span className="mt-1 grid h-7 w-7 flex-none place-items-center rounded-full bg-brand text-xs font-bold text-brand-foreground">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand">{s.kind}</p>
                    <h3 className="mt-1 text-[15px] font-bold leading-snug text-foreground group-hover:text-brand transition-colors">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-[11px] text-muted-foreground">{s.author}</p>
                  </div>
                  <div className="h-16 w-16 flex-none overflow-hidden rounded-lg bg-surface">
                    <img src={s.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
}


function LatestVideos() {
  return (
    <section className="container-page py-12 border-t border-border">
      <div className="mb-6 flex items-center gap-3">
        <h2 className="text-2xl font-bold">Latest videos</h2>
        <ChevronRight className="h-5 w-5 text-brand" />
      </div>
      <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:px-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="relative aspect-[9/16] w-[180px] flex-none snap-start overflow-hidden rounded-2xl bg-foreground md:w-[220px]"
          >
            <img
              src={products[i % products.length].image}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-4">
              <p className="text-xs font-semibold text-white">60s product demo #{i + 1}</p>
            </div>
            <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-foreground">
              <Play className="h-4 w-4 fill-current" />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CategoryStrip({ title, items }: { title: string; items: typeof articles }) {
  return (
    <section className="container-page py-12 border-t border-border">
      <SectionHeader eyebrow="" title={title} href="/blog" />
      <div className="grid gap-8 md:grid-cols-3">
        {items.map((a) => <ArticleCard key={a.slug + title} {...a} />)}
      </div>
    </section>
  );
}

function BestLists() {
  return (
    <section className="container-page py-12 border-t border-border">
      <SectionHeader eyebrow="" title="Best products of 2026" href="/blog" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

function Brands() {
  return (
    <section className="container-page py-12 border-t border-border">
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Brands we've tested
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
        {brands.map((b) => (
          <span
            key={b}
            className="text-lg font-bold tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground"
          >
            {b}
          </span>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="container-page py-14">
      <div className="rounded-3xl bg-surface px-6 py-12 text-center md:px-16">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand text-brand-foreground">
          <Mail className="h-5 w-5" />
        </span>
        <h2 className="mx-auto mt-5 max-w-2xl text-balance text-3xl font-bold tracking-tight md:text-4xl">
          Get the best fitness gear reviews, every Friday.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
          One email. Zero fluff. New launches, deep reviews, deals worth your money.
        </p>
        <form className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
          <Input type="email" placeholder="you@email.com" className="h-12 bg-background" />
          <Button type="submit" size="lg">Subscribe</Button>
        </form>
      </div>
    </section>
  );
}
