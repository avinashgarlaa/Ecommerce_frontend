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
      <div className="flex justify-center items-center h-screen text-xl">
        Loading products...
      </div>
    );
  }

  // ❌ Empty state
  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        No products available
      </div>
    );
  }

  return (
    <div className="p-5 bg-gray-100 min-h-screen">

      <h2 className="text-xl font-bold mb-5">Trending Products</h2>

      <div className="
        grid 
        grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        gap-5
      ">
        {products.map(p => (
          <div
            key={p.id}
            className="
              bg-white 
              p-4 
              rounded 
              shadow-sm 
              hover:shadow-lg 
              transition 
              cursor-pointer
            "
            onClick={() => navigate(`/product/${p.id}`)}
          >
            {/* Image */}
            <img
              src={p.image_url}
              alt={p.name}
              className="h-40 w-full object-contain"
            />

            {/* Name */}
            <h3 className="text-sm font-semibold mt-2 line-clamp-2">
              {p.name}
            </h3>

            {/* Price */}
            <p className="text-green-600 font-bold mt-1">
              ₹{p.price}
            </p>

            {/* Extra */}
            <p className="text-xs text-gray-500">
              Free delivery
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Home;