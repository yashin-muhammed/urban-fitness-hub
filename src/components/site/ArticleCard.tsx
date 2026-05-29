import { Link } from "react-router-dom";

type Props = {
  slug: string;
  title: string;
  excerpt?: string;
  category: string;
  cover: string;
  author: string;
  date: string;
  readTime: string;
  size?: "default" | "compact";
};

export function ArticleCard({ slug, title, excerpt, category, cover, author, date, readTime, size = "default" }: Props) {
  return (
    <Link to={`/blog/${slug}`} className="group block">
      <div className="overflow-hidden rounded-xl bg-surface">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={cover}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </div>
      <div className="pt-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand">{category}</span>
        <h3 className={`mt-2 font-bold leading-snug text-foreground transition-colors group-hover:text-brand ${
          size === "compact" ? "text-base" : "text-xl"
        }`}>
          {title}
        </h3>
        {excerpt && size !== "compact" && (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{excerpt}</p>
        )}
        <p className="mt-3 text-xs text-muted-foreground">
          {author} · {date} · {readTime}
        </p>
      </div>
    </Link>
  );
}
