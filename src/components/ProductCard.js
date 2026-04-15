function ProductCard({ product, onClick }) {
  const getOriginalPrice = (price) => Math.round(Number(price) * 1.25);
  const getDiscountPercent = (price) =>
    Math.round(((getOriginalPrice(price) - Number(price)) / getOriginalPrice(price)) * 100);

  return (
    <div
      className="cursor-pointer rounded-sm bg-white p-3 shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      onClick={onClick}
    >
      <div className="h-44 rounded-sm bg-white p-3">
        <img
          src={product.image_url}
          alt={product.name}
          className="h-full w-full object-contain"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80";
          }}
        />
      </div>

      <h3 className="mt-3 min-h-10 text-sm font-semibold text-gray-800">{product.name}</h3>

      <div className="mt-1 flex flex-wrap items-center gap-2">
        <p className="text-lg font-bold text-gray-900">₹{product.price}</p>
        <p className="text-sm text-gray-500 line-through">₹{getOriginalPrice(product.price)}</p>
        <p className="text-xs font-semibold text-green-700">{getDiscountPercent(product.price)}% off</p>
      </div>

      <p className="text-xs font-medium text-green-700">Free delivery • Cash on Delivery</p>
    </div>
  );
}

export default ProductCard;
