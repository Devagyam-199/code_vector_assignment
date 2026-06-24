export function ProductRow({ product }) {
  const date = new Date(product.created_at);
  const formattedDate = date.toLocaleDateString(undefined, {
    year: "2-digit",
    month: "short",
    day: "2-digit",
  });

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-line/60 px-1 py-3 transition-colors hover:bg-surface sm:grid-cols-[4.5rem_1fr_7rem_6rem_5rem] sm:gap-4">
      <span className="hidden font-mono text-xs text-muted sm:block">
        {String(product.id).padStart(6, "0")}
      </span>

      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-paper">{product.name}</p>
        <p className="mt-0.5 flex items-center gap-2 text-xs text-muted sm:hidden">
          <span className="font-mono">#{product.id}</span>
          <span aria-hidden="true">·</span>
          <span className="uppercase tracking-wide">{product.category}</span>
        </p>
      </div>

      <span className="hidden truncate text-xs uppercase tracking-wide text-muted sm:block">
        {product.category}
      </span>

      <span className="hidden text-right font-mono text-xs text-muted sm:block">
        {formattedDate}
      </span>

      <span className="text-right font-mono text-sm text-copper">${product.price}</span>
    </div>
  );
}