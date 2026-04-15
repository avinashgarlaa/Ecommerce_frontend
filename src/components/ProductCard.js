import { imageAssets } from "../constants/imageAssets";
import { formatCurrencyINR } from "../utils/format";

function ProductCard({ product, onClick }) {
  const getOriginalPrice = (price) => Math.round(Number(price) * 1.25);
  const getDiscountPercent = (price) =>
    Math.round(((getOriginalPrice(price) - Number(price)) / getOriginalPrice(price)) * 100);
  const rating = Number(product.rating || 4).toFixed(1);
  const reviews = Number(product.review_count || 0).toLocaleString("en-IN");

  return (
    <button
      className="sv-panel group flex h-full w-full cursor-pointer flex-col p-3 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-soft"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-50">
        <div className="absolute left-2 top-2 z-10 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-bold text-slate-700 shadow">
          {product.category}
        </div>
        <img
          src={product.image_url}
          alt={product.name}
          className="h-full w-full object-contain p-3 transition duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = imageAssets.fallbackProduct;
          }}
        />
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <h3 className="line-clamp-2 min-h-10 text-sm font-bold text-slate-800">{product.name}</h3>
        <div className="mt-1 flex items-center gap-2 text-xs">
          <span className="rounded-full bg-green-600 px-2 py-0.5 font-bold text-white">{rating} ★</span>
          <span className="text-slate-500">{reviews} reviews</span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <p className="text-lg font-extrabold text-ink">{formatCurrencyINR(product.price)}</p>
          <p className="text-sm text-slate-500 line-through">{formatCurrencyINR(getOriginalPrice(product.price))}</p>
          <p className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
            {getDiscountPercent(product.price)}% off
          </p>
        </div>

        <p className="mt-1 text-xs font-semibold text-green-700">Free delivery • Cash on Delivery</p>
      </div>
    </button>
  );
}

export default ProductCard;
