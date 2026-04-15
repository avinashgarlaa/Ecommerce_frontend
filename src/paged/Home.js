import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import useDebounce from "../hooks/useDebounce";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "All";
  const sort = searchParams.get("sort") || "newest";
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    setLoading(true);
    API.get("/products", {
      params: {
        q: debouncedQuery || undefined,
        category: category === "All" ? undefined : category,
        sort,
      },
    })
      .then(res => {
        setProducts(res.data?.data || res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [debouncedQuery, category, sort]);

  const setSort = (nextSort) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", nextSort);
    setSearchParams(params);
  };

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      <div className="mb-5 grid gap-4 md:grid-cols-2">
        <div className="rounded bg-gradient-to-r from-brandBlue to-brandBlueDark p-6 text-white">
          <h2 className="text-2xl font-bold">Top Deals For You</h2>
          <p className="mt-1 text-blue-100">
            Best prices on trending products with fast delivery and secure checkout.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1200&q=80"
          alt="Online shopping banner"
          className="h-full min-h-28 w-full rounded object-cover"
        />
      </div>

      <div className="mb-4 flex flex-col items-start justify-between gap-2 rounded bg-white p-3 shadow-card md:flex-row md:items-center">
        <p className="text-sm text-gray-600">
          {products.length} results
          {query ? ` for "${query}"` : ""}
          {category !== "All" ? ` in ${category}` : ""}
        </p>
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="sortBy" className="text-gray-600">
            Sort by:
          </label>
          <select
            id="sortBy"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded border border-gray-300 px-2 py-1"
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="flex min-h-[35vh] items-center justify-center rounded bg-white p-6 text-gray-500 shadow-card">
          No products found for selected filters.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onClick={() => navigate(`/product/${p.id}`)} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;