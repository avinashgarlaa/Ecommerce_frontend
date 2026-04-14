import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const fetchCart = () => {
    API.get("/cart")
      .then(res => setCart(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (id) => {
    await API.delete(`/cart/${id}`);
    fetchCart();
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ❌ Empty cart UI
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl font-semibold">Your cart is empty 🛒</h2>
        <button
          className="mt-4 bg-blue-600 text-white px-5 py-2 rounded"
          onClick={() => navigate("/")}
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-5">

      <div className="grid md:grid-cols-3 gap-5">

        {/* 🛍️ LEFT: CART ITEMS */}
        <div className="md:col-span-2 space-y-4">

          {cart.map(item => (
            <div
              key={item.id}
              className="bg-white p-4 rounded shadow flex gap-4"
            >
              {/* Image */}
              <img
                src={item.image_url}
                alt={item.name}
                className="w-24 h-24 object-contain"
              />

              {/* Details */}
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-500 text-sm">
                  Qty: {item.quantity}
                </p>
                <p className="text-green-600 font-bold mt-1">
                  ₹{item.price}
                </p>

                <button
                  className="text-red-500 text-sm mt-2"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

        </div>

        {/* 💰 RIGHT: PRICE SUMMARY */}
        <div className="bg-white p-5 rounded shadow h-fit">

          <h2 className="text-lg font-bold mb-4">
            Price Details
          </h2>

          <div className="flex justify-between mb-2">
            <span>Total Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Total Price</span>
            <span>₹{total}</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-bold">
            <span>Amount Payable</span>
            <span>₹{total}</span>
          </div>

          <button
            className="bg-orange-500 text-white w-full mt-5 py-2 rounded"
            onClick={() => navigate("/checkout")}
          >
            Place Order
          </button>

        </div>

      </div>

    </div>
  );
}

export default Cart;