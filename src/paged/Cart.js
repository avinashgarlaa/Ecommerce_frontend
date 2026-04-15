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
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
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

          <hr className="my-3" />

          <div className="flex justify-between font-bold">
            <span>Amount Payable</span>
            <span>₹{total}</span>
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