import { useCallback, useEffect, useRef, useState } from "react";
import { fetchProducts } from "../api/productsApi";

const PAGE_SIZE = 24;

export function useProducts(category) {
  const [products, setProducts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const requestIdRef = useRef(0);

  const loadPage = useCallback(
    async ({ reset }) => {
      const thisRequestId = ++requestIdRef.current;
      setLoading(true);
      setError(null);

      try {
        const result = await fetchProducts({
          category,
          cursor: reset ? null : cursor,
          limit: PAGE_SIZE,
        });

        if (thisRequestId !== requestIdRef.current) return;

        setProducts((prev) => (reset ? result.data : [...prev, ...result.data]));
        setCursor(result.nextCursor);
        setHasMore(result.hasMore);
      } catch (err) {
        if (thisRequestId !== requestIdRef.current) return;
        setError(err.message || "Failed to load products");
      } finally {
        if (thisRequestId === requestIdRef.current) setLoading(false);
      }
    },
    [category, cursor],
  );

  useEffect(() => {
    setProducts([]);
    setCursor(null);
    setHasMore(true);
    loadPage({ reset: true });
  }, [category]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    loadPage({ reset: false });
  }, [loading, hasMore, loadPage]);

  return { products, loading, hasMore, error, loadMore };
}