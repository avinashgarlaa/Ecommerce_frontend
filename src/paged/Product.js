import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function Product() {
  const { id } = useParams();
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
      <div className="flex justify-center items-center h-screen">
        Loading product...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-5">

      <div className="bg-white p-5 rounded shadow grid md:grid-cols-2 gap-10">

        {/* 🖼️ LEFT: IMAGE */}
        <div className="flex justify-center items-center">
          <img
            src={product.image_url}
            alt={product.name}
            className="h-80 object-contain"
          />
        </div>

        {/* 📦 RIGHT: DETAILS */}
        <div>

          <h2 className="text-2xl font-bold">{product.name}</h2>

          <p className="text-gray-600 mt-2">
            {product.description}
          </p>

          <h3 className="text-green-600 text-2xl font-bold mt-4">
            ₹{product.price}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Inclusive of all taxes
          </p>

          <p className="text-green-600 mt-2">
            ✔ In Stock
          </p>

          {/* 🛒 BUTTONS */}
          <div className="flex gap-4 mt-6">

            <button
              onClick={addToCart}
              className="bg-yellow-400 px-6 py-2 font-semibold hover:bg-yellow-500"
            >
              Add to Cart
            </button>

            <button
              className="bg-orange-500 text-white px-6 py-2 font-semibold hover:bg-orange-600"
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