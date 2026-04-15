import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import { imageAssets } from "../constants/imageAssets";
import { extractErrorMessage, unwrapData } from "../utils/apiResponse";
import { formatCurrencyINR, formatNumberIN } from "../utils/format";

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    API.get(`/products/${id}`)
      .then((res) => {
        setProduct(unwrapData(res) || {});
        setActiveImageIndex(0);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(extractErrorMessage(err, "Unable to load product"));
        setLoading(false);
      });
  }, [id]);

  const addToCart = async () => {
    try {
      setAdding(true);
      await API.post("/cart", {
        product_id: product.id,
        quantity: 1,
      });
      alert("Added to cart");
      return true;
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login", { state: { from: `/product/${id}` } });
        return false;
      }
      alert(extractErrorMessage(err, "Unable to add item to cart"));
      return false;
    } finally {
      setAdding(false);
    }
  };

  const buyNow = async () => {
    const added = await addToCart();
    if (added) {
      navigate("/checkout");
    }
  };

  const originalPrice = Math.round(Number(product.price || 0) * 1.25);
  const discountPercent = originalPrice
    ? Math.round(((originalPrice - Number(product.price || 0)) / originalPrice) * 100)
    : 0;
  const galleryImages =
    Array.isArray(product.image_urls) && product.image_urls.length > 0
      ? product.image_urls
      : [product.image_url, imageAssets.fallbackProduct].filter(Boolean);
  const activeImage = galleryImages[activeImageIndex] || imageAssets.fallbackProduct;
  const specs =
    product.specifications && typeof product.specifications === "object"
      ? Object.entries(product.specifications)
      : [];

  if (loading) {
    return (
      <div className="sv-shell flex h-[70vh] items-center justify-center text-lg font-semibold text-slate-600">
        Loading product...
      </div>
    );
  }

  if (error) {
    return (
      <div className="sv-shell flex h-[70vh] flex-col items-center justify-center gap-3 text-center">
        <p className="font-semibold text-red-600">{error}</p>
        <button className="sv-btn-primary" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <main className="sv-shell animate-floatIn py-5 md:py-7">
      <div className="sv-panel grid gap-6 p-5 md:grid-cols-2 md:gap-10 md:p-7">
        <div className="grid gap-3 md:grid-cols-[72px_1fr]">
          <div className="flex gap-2 overflow-x-auto md:flex-col">
            {galleryImages.map((url, index) => (
              <button
                key={`${url}-${index}`}
                onClick={() => setActiveImageIndex(index)}
                className={`h-16 w-16 flex-shrink-0 rounded-xl border p-1 transition ${
                  index === activeImageIndex ? "border-brandBlue bg-blue-50" : "border-slate-200"
                }`}
              >
                <img src={url} alt={`${product.name}-${index}`} className="h-full w-full rounded-lg object-contain" />
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <img
              src={activeImage}
              alt={product.name}
              className="h-80 object-contain"
              onError={(e) => {
                e.currentTarget.src = imageAssets.fallbackProduct;
              }}
            />
          </div>
        </div>

        <div>
          <h2 className="font-display text-3xl font-extrabold text-ink">{product.name}</h2>

          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
            <span>{product.rating || 4.0} ★</span>
            <span>{formatNumberIN(product.review_count || 0)} ratings</span>
          </div>

          <p className="mt-3 text-slate-600">{product.description}</p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <h3 className="text-4xl font-extrabold text-ink">{formatCurrencyINR(product.price)}</h3>
            <p className="text-lg text-slate-400 line-through">{formatCurrencyINR(originalPrice)}</p>
            <p className="rounded-full bg-green-100 px-2 py-0.5 text-sm font-bold text-green-700">
              {discountPercent}% off
            </p>
          </div>

          <p className="mt-1 text-sm text-slate-500">Inclusive of all taxes</p>

          <p className="mt-3 font-semibold text-green-700">
            {product.stock > 0 ? `In Stock (${product.stock} left)` : "Out of Stock"}
          </p>

          <ul className="mt-3 space-y-1 text-sm text-slate-600">
            <li>Free delivery by tomorrow</li>
            <li>7-day easy returns</li>
            <li>Pay on Delivery available</li>
          </ul>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Specifications</h3>
            {specs.length > 0 ? (
              <div className="space-y-1 text-sm text-slate-700">
                {specs.map(([key, value]) => (
                  <p key={key}>
                    <span className="font-semibold capitalize">{key.replaceAll("_", " ")}:</span>{" "}
                    {String(value)}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">Specifications not available.</p>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={addToCart} disabled={adding || product.stock < 1} className="sv-btn-accent min-w-36 disabled:cursor-not-allowed disabled:opacity-60">
              {adding ? "Adding..." : "Add to Cart"}
            </button>

            <button
              disabled={adding || product.stock < 1}
              className="sv-btn-primary min-w-36 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={buyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Product;
