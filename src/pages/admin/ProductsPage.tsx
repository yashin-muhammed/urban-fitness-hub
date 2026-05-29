import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/lib/mock-data";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-sm text-muted-foreground">Tag these in any article. Affiliate links tracked automatically.</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Add product</Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...products, ...products].map((p, i) => <ProductCard key={i} product={p} />)}
      </div>
    </div>
  );
}
