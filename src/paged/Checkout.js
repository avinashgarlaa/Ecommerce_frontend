import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = () =>
    form.fullName.trim() &&
    form.phone.trim().length >= 10 &&
    form.street.trim() &&
    form.city.trim() &&
    form.state.trim() &&
    form.pincode.trim().length >= 6;

  const placeOrder = async () => {
    if (!isFormValid()) {
      alert("Please fill all delivery details correctly");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/order", {
        address: form,
        paymentMethod,
      });

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

          <div className="grid gap-3">
            <input
              placeholder="Full Name"
              className="w-full rounded-sm border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-brandBlue"
              value={form.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
            />
            <input
              placeholder="Phone Number"
              className="w-full rounded-sm border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-brandBlue"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
            <input
              placeholder="Street Address"
              className="w-full rounded-sm border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-brandBlue"
              value={form.street}
              onChange={(e) => updateField("street", e.target.value)}
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                placeholder="City"
                className="w-full rounded-sm border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-brandBlue"
                value={form.city}
                onChange={(e) => updateField("city", e.target.value)}
              />
              <input
                placeholder="State"
                className="w-full rounded-sm border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-brandBlue"
                value={form.state}
                onChange={(e) => updateField("state", e.target.value)}
              />
            </div>
            <input
              placeholder="Pincode"
              className="w-full rounded-sm border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-brandBlue"
              value={form.pincode}
              onChange={(e) => updateField("pincode", e.target.value)}
            />
          </div>

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

          <div className="my-4">
            <p className="mb-2 text-sm font-semibold text-gray-700">Payment Method</p>
            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                />
                Cash on Delivery
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "UPI"}
                  onChange={() => setPaymentMethod("UPI")}
                />
                UPI
              </label>
            </div>
          </div>

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