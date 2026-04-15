import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/products")
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

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
      <div className="mb-5 rounded bg-gradient-to-r from-brandBlue to-brandBlueDark p-6 text-white">
        <h2 className="text-2xl font-bold">Top Deals For You</h2>
        <p className="mt-1 text-blue-100">
          Best prices on trending products with fast delivery.
        </p>
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
              />
            </div>

            <h3 className="mt-3 min-h-10 text-sm font-semibold text-gray-800">
              {p.name}
            </h3>

            <p className="mt-1 text-lg font-bold text-gray-900">₹{p.price}</p>

            <p className="text-xs font-medium text-green-700">
              10% off • Free delivery
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;