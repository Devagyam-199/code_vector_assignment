const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
export async function fetchProducts({ category, cursor, limit = 20 }) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (cursor) params.set("cursor", cursor);
  params.set("limit", limit);

  const res = await fetch(`${BASE_URL}/api/v1/products?${params.toString()}`);

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  return res.json();
}