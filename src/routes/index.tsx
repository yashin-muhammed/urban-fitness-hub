import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Play, Mail } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ArticleCard } from "@/components/site/ArticleCard";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { heroArticle, articles, products, events, brands } from "@/lib/mock-data";

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
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <FeaturedReviews />
      <TrendingProducts />
      <LatestNews />
      <BestProducts />
      <Events />
      <Shorts />
      <Brands />
      <Newsletter />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="container-page pt-10 pb-16 md:pt-14">
      <Link to="/blog/$slug" params={{ slug: heroArticle.slug }} className="group block">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-7 overflow-hidden rounded-2xl bg-surface">
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={heroArticle.cover}
                alt={heroArticle.title}
                width={1600}
                height={1000}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
          </div>
          <div className="md:col-span-5">
            <span className="inline-flex items-center rounded-full bg-foreground px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-background">
              Featured · {heroArticle.category}
            </span>
            <h1 className="mt-5 text-balance text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl">
              {heroArticle.title}
            </h1>
            <p className="mt-5 text-pretty text-base text-muted-foreground md:text-lg">
              {heroArticle.excerpt}
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{heroArticle.author}</span>
              <span>·</span>
              <span>{heroArticle.date}</span>
              <span>·</span>
              <span>{heroArticle.readTime}</span>
            </div>
            <Button className="mt-7 gap-2" size="lg">
              Read the review <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Link>
    </section>
  );
}

function FeaturedReviews() {
  return (
    <section className="container-page py-14">
      <SectionHeader eyebrow="In Depth" title="Featured Reviews" href="/blog" />
      <div className="grid gap-10 md:grid-cols-3">
        {articles.map((a) => <ArticleCard key={a.slug} {...a} />)}
      </div>
    </section>
  );
}

function TrendingProducts() {
  return (
    <section className="bg-surface py-16">
      <div className="container-page">
        <SectionHeader eyebrow="This Week" title="Trending Products" href="/blog" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}

function LatestNews() {
  return (
    <section className="container-page py-16">
      <SectionHeader eyebrow="News" title="Latest in Fitness" href="/blog" />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {[...articles, articles[0]].slice(0, 4).map((a, i) => (
          <ArticleCard key={i} {...a} size="compact" />
        ))}
      </div>
    </section>
  );
}

function BestProducts() {
  return (
    <section className="container-page py-16">
      <div className="overflow-hidden rounded-3xl bg-foreground text-background">
        <div className="grid items-center gap-10 p-8 md:grid-cols-2 md:p-14">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
              Best of 2026
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              The gear our editors actually use every day.
            </h2>
            <p className="mt-4 max-w-md text-sm text-background/70">
              Vetted by athletes, tested in real conditions, ranked without paid placements.
            </p>
            <Button variant="secondary" className="mt-6 gap-2">
              See all best lists <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} className="rounded-2xl bg-background p-4 text-foreground">
                <div className="aspect-square overflow-hidden rounded-lg bg-surface">
                  <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <p className="mt-3 line-clamp-2 text-sm font-semibold">{p.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{p.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Events() {
  return (
    <section className="container-page py-16">
      <SectionHeader eyebrow="UAE" title="Upcoming Fitness Events" href="/blog" />
      <div className="grid gap-6 md:grid-cols-3">
        {events.map((e) => (
          <div key={e.title} className="group overflow-hidden rounded-2xl border border-border bg-card">
            <div className="aspect-[16/10] overflow-hidden">
              <img src={e.image} alt={e.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold text-brand">{e.date}</p>
              <h3 className="mt-2 text-lg font-bold">{e.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{e.location}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Shorts() {
  return (
    <section className="bg-surface py-16">
      <div className="container-page">
        <SectionHeader eyebrow="Watch" title="YouTube Shorts" />
        <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:px-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="relative aspect-[9/16] w-[180px] flex-none snap-start overflow-hidden rounded-2xl bg-foreground md:w-[220px]">
              <img
                src={products[i % products.length].image}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover opacity-90 transition-transform duration-500 hover:scale-105"
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
      </div>
    </section>
  );
}

function Brands() {
  return (
    <section className="container-page py-16">
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Brands we've tested
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {brands.map((b) => (
          <span key={b} className="text-lg font-bold tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground">
            {b}
          </span>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="container-page py-16">
      <div className="rounded-3xl bg-surface px-6 py-14 text-center md:px-16">
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
