import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
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
      alert("Added to cart 🛒");
    } finally {
      setAdding(false);
    }
  };

  const buyNow = async () => {
    await addToCart();
    navigate("/checkout");
  };

  const originalPrice = Math.round(Number(product.price || 0) * 1.25);
  const discountPercent = originalPrice
    ? Math.round(((originalPrice - Number(product.price || 0)) / originalPrice) * 100)
    : 0;

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-lg font-medium text-gray-600">
        Loading product...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      <div className="grid gap-6 rounded-sm bg-white p-5 shadow-card md:grid-cols-2 md:gap-10">
        <div className="flex items-center justify-center rounded-sm border border-gray-200 p-6">
          <img
            src={product.image_url}
            alt={product.name}
            className="h-80 object-contain"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80";
            }}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <div className="mt-2 inline-flex items-center gap-2 rounded bg-green-600 px-2 py-1 text-xs font-semibold text-white">
            <span>4.3 ★</span>
            <span>8,000+ ratings</span>
          </div>

          <p className="mt-2 text-gray-600">{product.description}</p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h3 className="text-3xl font-bold text-gray-900">₹{product.price}</h3>
            <p className="text-lg text-gray-500 line-through">₹{originalPrice}</p>
            <p className="text-sm font-semibold text-green-700">{discountPercent}% off</p>
          </div>

          <p className="mt-1 text-sm text-gray-500">Inclusive of all taxes</p>

          <p className="mt-2 font-medium text-green-700">In Stock</p>
          <ul className="mt-3 space-y-1 text-sm text-gray-700">
            <li>Free delivery by tomorrow</li>
            <li>7-day easy returns</li>
            <li>Pay on Delivery available</li>
          </ul>

          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={addToCart}
              disabled={adding}
              className="min-w-36 rounded-sm bg-brandYellow px-6 py-3 font-semibold text-gray-900 hover:brightness-95"
            >
              {adding ? "Adding..." : "Add to Cart"}
            </button>

            <button
              className="min-w-36 rounded-sm bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
              onClick={buyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;