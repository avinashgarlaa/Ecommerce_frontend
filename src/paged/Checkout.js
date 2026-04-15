import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const placeOrder = async () => {
    if (!address.trim()) {
      alert("Please enter delivery address");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/order", { address });

      navigate(`/success?id=${res.data.orderId}`);
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-sm bg-white p-5 shadow-card">
          <h2 className="mb-4 text-lg font-bold">Delivery Address</h2>

          <textarea
            placeholder="Enter full address (Name, Phone, Address, City, Pincode)"
            className="w-full rounded-sm border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-brandBlue"
            rows={6}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button
            onClick={placeOrder}
            disabled={loading}
            className={`
              mt-4 w-full rounded-sm py-3 font-semibold text-white
              ${loading ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"}
            `}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>

        <div className="h-fit rounded-sm bg-white p-5 shadow-card">
          <h2 className="mb-4 text-lg font-bold">Order Summary</h2>

          <p className="mb-2 text-gray-600">Secure checkout</p>

          <p className="mb-2 text-gray-600">Fast delivery</p>

          <p className="mb-2 text-gray-600">Cash on Delivery available</p>

          <hr className="my-4" />

          <p className="font-semibold text-green-700">
            You will receive your order within 3-5 days.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;