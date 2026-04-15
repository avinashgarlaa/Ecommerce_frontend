import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate, useSearchParams } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "All";
  const sort = searchParams.get("sort") || "newest";

  useEffect(() => {
    setLoading(true);
    API.get("/products", {
      params: {
        q: query || undefined,
        category: category === "All" ? undefined : category,
        sort,
      },
    })
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [query, category, sort]);

  const setSort = (nextSort) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", nextSort);
    setSearchParams(params);
  };

  const getOriginalPrice = (price) => Math.round(Number(price) * 1.25);
  const getDiscountPercent = (price) =>
    Math.round(((getOriginalPrice(price) - Number(price)) / getOriginalPrice(price)) * 100);

  // 🔄 Loading UI
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-lg font-medium text-gray-600">
        Loading products...
      </div>
    );
  }

  // ❌ Empty state
  if (products.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        No products available
      </div>
    );
  }

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

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="cursor-pointer rounded-sm bg-white p-3 shadow-card transition hover:-translate-y-0.5 hover:shadow-lg"
            onClick={() => navigate(`/product/${p.id}`)}
          >
            <div className="h-44 rounded-sm bg-white p-3">
              <img
                src={p.image_url}
                alt={p.name}
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80";
                }}
              />
            </div>

            <h3 className="mt-3 min-h-10 text-sm font-semibold text-gray-800">
              {p.name}
            </h3>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <p className="text-lg font-bold text-gray-900">₹{p.price}</p>
              <p className="text-sm text-gray-500 line-through">₹{getOriginalPrice(p.price)}</p>
              <p className="text-xs font-semibold text-green-700">{getDiscountPercent(p.price)}% off</p>
            </div>

            <p className="text-xs font-medium text-green-700">
              Free delivery • Cash on Delivery
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;