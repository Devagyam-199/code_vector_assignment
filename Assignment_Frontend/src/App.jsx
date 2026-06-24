import { useState } from "react";
import { useProducts } from "./hooks/useProducts";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import { ProductRow } from "./components/ProductRow";
import { CategoryFilter } from "./components/CategoryFilter";

export default function App() {
  const [category, setCategory] = useState("");
  const { products, loading, hasMore, error, loadMore } = useProducts(category);
  const sentinelRef = useInfiniteScroll(loadMore, { enabled: hasMore && !error });

  return (
    <div className="min-h-screen bg-ink text-paper">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <header className="mb-8 flex flex-col gap-6 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-paper">
              Catalog
            </h1>
            <p className="mt-1 font-mono text-xs text-muted">
              {products.length.toLocaleString()} entries loaded · newest first
            </p>
          </div>
        </header>

        <div className="mb-6 border-b border-line">
          <CategoryFilter value={category} onChange={setCategory} />
        </div>

        <div className="hidden grid-cols-[4.5rem_1fr_7rem_6rem_5rem] gap-4 px-1 pb-2 text-[11px] uppercase tracking-wide text-muted sm:grid">
          <span>ID</span>
          <span>Name</span>
          <span>Category</span>
          <span className="text-right">Listed</span>
          <span className="text-right">Price</span>
        </div>

        <main>
          {products.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </main>

        <div className="py-10 text-center font-mono text-xs text-muted">
          {error && <p className="text-red-400">— couldn't load more: {error} —</p>}
          {!error && loading && <p>— loading more entries —</p>}
          {!error && !loading && !hasMore && products.length > 0 && (
            <p>— end of ledger —</p>
          )}
          {!error && !loading && products.length === 0 && (
            <p>— no entries for this category —</p>
          )}
        </div>

        <div ref={sentinelRef} className="h-1" />
      </div>
    </div>
  );
}