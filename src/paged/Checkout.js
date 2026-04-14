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
    <div className="bg-gray-100 min-h-screen p-5">

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-5">

        {/* 📝 LEFT: ADDRESS FORM */}
        <div className="bg-white p-5 rounded shadow">

          <h2 className="text-lg font-bold mb-4">
            Delivery Address
          </h2>

          <textarea
            placeholder="Enter full address (Name, Phone, Address, City, Pincode)"
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={6}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button
            onClick={placeOrder}
            disabled={loading}
            className={`
              w-full mt-4 py-2 rounded text-white
              ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}
            `}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>

        {/* 💰 RIGHT: SUMMARY */}
        <div className="bg-white p-5 rounded shadow h-fit">

          <h2 className="text-lg font-bold mb-4">
            Order Summary
          </h2>

          <p className="text-gray-600 mb-2">
            ✔ Secure Checkout
          </p>

          <p className="text-gray-600 mb-2">
            ✔ Fast Delivery
          </p>

          <p className="text-gray-600 mb-2">
            ✔ Cash on Delivery Available
          </p>

          <hr className="my-4" />

          <p className="text-green-600 font-semibold">
            You will receive your order within 3-5 days 🚚
          </p>

        </div>

      </div>

    </div>
  );
}

export default Checkout;