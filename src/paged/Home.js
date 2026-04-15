import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import useDebounce from "../hooks/useDebounce";
import { imageAssets } from "../constants/imageAssets";
import { extractErrorMessage, unwrapData } from "../utils/apiResponse";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "All";
  const sort = searchParams.get("sort") || "newest";
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    setLoading(true);
    setError("");
    API.get("/products", {
      params: {
        q: debouncedQuery || undefined,
        category: category === "All" ? undefined : category,
        sort,
      },
    })
      .then((res) => {
        setProducts(unwrapData(res) || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(extractErrorMessage(err, "Unable to load products right now"));
        setLoading(false);
      });
  }, [debouncedQuery, category, sort]);

  const setSort = (nextSort) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", nextSort);
    setSearchParams(params);
  };

  const subtitle = useMemo(() => {
    const parts = [];
    if (query) parts.push(`for "${query}"`);
    if (category !== "All") parts.push(`in ${category}`);
    return parts.join(" ");
  }, [category, query]);
  const featuredPicks = useMemo(() => products.slice(0, 4), [products]);
  const remainingProducts = useMemo(() => products.slice(featuredPicks.length), [products, featuredPicks.length]);
  const valueDeals = useMemo(() => products.filter((item) => Number(item.price) <= 3000).slice(0, 4), [products]);
  const trustPoints = [
    "100% secure checkout",
    "Curated quality products",
    "Fast delivery support",
    "Easy return policy",
  ];

  return (
    <main className="sv-shell animate-floatIn py-5 md:py-7">
      <section className="mb-6 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <div className="sv-panel relative overflow-hidden text-white">
          <img src={imageAssets.homeHero} alt="Shopping collection" className="h-full min-h-64 w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-brandBlue/50 to-transparent" />
          <div className="absolute inset-0 p-6 md:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">Limited Edition</p>
            <h1 className="mt-2 max-w-xl font-display text-3xl font-extrabold leading-tight md:text-4xl">
              Upgrade Your Everyday Shopping
            </h1>
            <p className="mt-3 max-w-xl text-sm text-blue-100 md:text-base">
              Discover handpicked products with honest pricing, quick checkout, and reliable delivery.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button className="sv-btn bg-white text-brandBlue hover:bg-blue-50" onClick={() => navigate("/cart")}>
                Check Cart
              </button>
              <button className="sv-btn border border-white/60 bg-white/10 text-white hover:bg-white/20" onClick={() => navigate("/?sort=price_desc")}>
                Shop Premium
              </button>
            </div>
          </div>
        </div>

        <div className="sv-panel flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
          <img
            src={imageAssets.homePromo}
            alt="Featured shopping"
            className="h-40 w-full rounded-2xl object-cover sm:h-28 sm:w-28"
          />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Today Only</p>
            <h2 className="font-display text-xl font-extrabold text-ink">Save up to 20%</h2>
            <p className="mt-1 text-sm text-slate-600">Fast-moving deals across electronics, home, and fashion.</p>
          </div>
        </div>
      </section>

      <section className="sv-panel mb-5 p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point) => (
            <div key={point} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
              {point}
            </div>
          ))}
        </div>
      </section>

      <section className="sv-panel mb-5 flex flex-col items-start justify-between gap-3 p-4 sm:flex-row sm:items-center">
        <p className="text-sm text-slate-600">
          <span className="font-bold text-ink">{products.length}</span> results {subtitle}
        </p>
        <div className="flex flex-nowrap items-center gap-2 text-sm">
          <label htmlFor="sortBy" className="whitespace-nowrap font-semibold text-slate-600">
            Sort by
          </label>
          <select
            id="sortBy"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="sv-input w-auto min-w-[170px] py-2 pr-8"
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </section>

      {!loading && featuredPicks.length > 0 && (
        <section className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-2xl font-extrabold text-ink">Top Picks This Week</h2>
            <button className="sv-btn-ghost py-2" onClick={() => navigate("/?sort=newest")}>
              View latest
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredPicks.map((p) => (
              <ProductCard key={`featured-${p.id}`} product={p} onClick={() => navigate(`/product/${p.id}`)} />
            ))}
          </div>
        </section>
      )}

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="sv-panel flex min-h-[34vh] flex-col items-center justify-center gap-3 p-6 text-center">
          <p className="font-semibold text-red-600">{error}</p>
          <button className="sv-btn-primary" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="sv-panel flex min-h-[34vh] items-center justify-center p-6 text-center text-slate-500">
          No products found for the selected filters.
        </div>
      ) : remainingProducts.length === 0 ? null : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {remainingProducts.map((p) => (
            <ProductCard key={p.id} product={p} onClick={() => navigate(`/product/${p.id}`)} />
          ))}
        </div>
      )}

      {!loading && valueDeals.length > 0 && (
        <section className="mt-7">
          <h2 className="mb-3 font-display text-2xl font-extrabold text-ink">Best Value Under ₹3,000</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {valueDeals.map((p) => (
              <ProductCard key={`value-${p.id}`} product={p} onClick={() => navigate(`/product/${p.id}`)} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default Home;
