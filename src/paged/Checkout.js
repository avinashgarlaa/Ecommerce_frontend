import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { extractErrorMessage } from "../utils/apiResponse";
import { formatCurrencyINR } from "../utils/format";

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
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = () =>
    Boolean(
      form.fullName.trim() &&
        /^[0-9]{10}$/.test(form.phone.trim()) &&
        form.street.trim() &&
        form.city.trim() &&
        form.state.trim() &&
        /^[0-9]{6}$/.test(form.pincode.trim())
    );

  useEffect(() => {
    setError("");
    API.get("/cart")
      .then((res) => setCartItems(Array.isArray(res.data) ? res.data : []))
      .catch((err) => {
        console.log(err);
        setError(extractErrorMessage(err, "Unable to load checkout details"));
      });
  }, []);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0),
    [cartItems]
  );
  const deliveryFee = subtotal > 2000 ? 0 : subtotal > 0 ? 99 : 0;
  const total = subtotal + deliveryFee;
  const canPlaceOrder = cartItems.length > 0 && isFormValid() && !loading;

  const placeOrder = async () => {
    if (!canPlaceOrder) return;

    try {
      setLoading(true);
      const res = await API.post("/order", {
        address: form,
        paymentMethod,
      });
      navigate(`/success?id=${res.data.orderId}`);
    } catch (err) {
      console.log(err);
      alert(extractErrorMessage(err, "Unable to place order"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="sv-shell animate-floatIn py-5 md:py-7">
      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}
      <div className="grid gap-5 md:grid-cols-2">
        <section className="sv-panel p-5">
          <h2 className="font-display mb-4 text-xl font-extrabold text-ink">Delivery Address</h2>

          <div className="grid gap-3">
            <input
              placeholder="Full Name"
              className="sv-input"
              value={form.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
            />
            <input
              placeholder="Phone Number"
              className="sv-input"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
            <input
              placeholder="Street Address"
              className="sv-input"
              value={form.street}
              onChange={(e) => updateField("street", e.target.value)}
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                placeholder="City"
                className="sv-input"
                value={form.city}
                onChange={(e) => updateField("city", e.target.value)}
              />
              <input
                placeholder="State"
                className="sv-input"
                value={form.state}
                onChange={(e) => updateField("state", e.target.value)}
              />
            </div>
            <input
              placeholder="Pincode"
              className="sv-input"
              value={form.pincode}
              onChange={(e) => updateField("pincode", e.target.value)}
            />
          </div>

          <button
            onClick={placeOrder}
            disabled={!canPlaceOrder}
            className="sv-btn-primary mt-4 w-full disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </section>

        <aside className="sv-panel h-fit p-5">
          <h2 className="font-display mb-4 text-xl font-extrabold text-ink">Order Summary</h2>

          <div className="space-y-3">
            {cartItems.length === 0 ? (
              <p className="text-sm text-slate-500">No items in cart.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="line-clamp-1 text-slate-700">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-semibold">{formatCurrencyINR(Number(item.price) * item.quantity)}</span>
                </div>
              ))
            )}
          </div>

          <hr className="my-4 border-slate-200" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Subtotal</span>
              <span>{formatCurrencyINR(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Delivery</span>
              <span>{deliveryFee === 0 ? "Free" : formatCurrencyINR(deliveryFee)}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-ink">
              <span>Total</span>
              <span>{formatCurrencyINR(total)}</span>
            </div>
          </div>

          <div className="my-4">
            <p className="mb-2 text-sm font-bold text-slate-700">Payment Method</p>
            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2 text-slate-700">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                />
                Cash on Delivery
              </label>
              <label className="flex items-center gap-2 text-slate-700">
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

          <hr className="my-4 border-slate-200" />

          <p className="font-semibold text-green-700">You will receive your order within 3-5 days.</p>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;
