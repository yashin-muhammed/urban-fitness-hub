import { Upload, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products, articles, heroArticle } from "@/lib/mock-data";

export default function MediaPage() {
  const all = [heroArticle.cover, ...articles.map((a) => a.cover), ...products.map((p) => p.image)];
  const media = [...all, ...all, ...all];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Media Library</h1>
          <p className="text-sm text-muted-foreground">{media.length} files · 1.2 GB used</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search media…" className="h-10 pl-9" />
          </div>
          <Button className="gap-2"><Upload className="h-4 w-4" /> Upload</Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {media.map((src, i) => (
          <div key={i} className="group relative aspect-square overflow-hidden rounded-lg bg-surface">
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
          </div>
        ))}
      </div>
    </div>
  );
}
