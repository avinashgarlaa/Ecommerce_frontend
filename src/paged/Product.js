import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

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
    await API.post("/cart", {
      product_id: product.id,
      quantity: 1,
    });
    alert("Added to cart 🛒");
  };

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
          <img src={product.image_url} alt={product.name} className="h-80 object-contain" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">{product.name}</h2>

          <p className="mt-2 text-gray-600">{product.description}</p>

          <h3 className="mt-4 text-3xl font-bold text-gray-900">₹{product.price}</h3>

          <p className="mt-1 text-sm text-gray-500">Inclusive of all taxes</p>

          <p className="mt-2 font-medium text-green-700">In Stock</p>

          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={addToCart}
              className="min-w-36 rounded-sm bg-brandYellow px-6 py-3 font-semibold text-gray-900 hover:brightness-95"
            >
              Add to Cart
            </button>

            <button
              className="min-w-36 rounded-sm bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
              onClick={() => navigate("/checkout")}
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