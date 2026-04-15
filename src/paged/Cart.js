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

  const updateQuantity = async (id, currentQty, delta) => {
    const nextQty = currentQty + delta;
    if (nextQty < 1) return;
    await API.patch(`/cart/${id}`, { quantity: nextQty });
    fetchCart();
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = Math.round(total * 0.08);
  const deliveryFee = total > 2000 ? 0 : 99;
  const payable = total - discount + deliveryFee;

  // ❌ Empty cart UI
  if (cart.length === 0) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-800">Your cart is empty</h2>
        <button
          className="mt-4 rounded-sm bg-brandBlue px-6 py-2 text-white hover:bg-brandBlueDark"
          onClick={() => navigate("/")}
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      <div className="grid gap-5 md:grid-cols-3">
        <div className="space-y-4 md:col-span-2">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-sm bg-white p-4 shadow-card"
            >
              <img
                src={item.image_url}
                alt={item.name}
                className="h-24 w-24 rounded-sm border border-gray-200 p-2 object-contain"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80";
                }}
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    className="h-7 w-7 rounded-full border border-gray-300 text-sm font-semibold"
                    onClick={() => updateQuantity(item.id, item.quantity, -1)}
                  >
                    -
                  </button>
                  <span className="min-w-6 text-center text-sm font-medium">{item.quantity}</span>
                  <button
                    className="h-7 w-7 rounded-full border border-gray-300 text-sm font-semibold"
                    onClick={() => updateQuantity(item.id, item.quantity, 1)}
                  >
                    +
                  </button>
                </div>
                <p className="mt-1 text-lg font-bold text-gray-900">₹{item.price}</p>

                <button
                  className="mt-2 text-sm font-medium text-red-500 hover:text-red-600"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

        </div>

        <div className="h-fit rounded-sm bg-white p-5 shadow-card">
          <h2 className="mb-4 border-b border-gray-200 pb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
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

          <div className="mb-2 flex justify-between text-green-700">
            <span>Discount</span>
            <span>-₹{discount}</span>
          </div>

          <div className="mb-2 flex justify-between">
            <span>Delivery Fee</span>
            <span>{deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-bold">
            <span>Amount Payable</span>
            <span>₹{payable}</span>
          </div>

          <button
            className="mt-5 w-full rounded-sm bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600"
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