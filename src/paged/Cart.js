import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { imageAssets } from "../constants/imageAssets";
import { extractErrorMessage } from "../utils/apiResponse";
import { formatCurrencyINR } from "../utils/format";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingId, setPendingId] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchCart = () => {
    setError("");
    API.get("/cart")
      .then((res) => setCart(Array.isArray(res.data) ? res.data : []))
      .catch((err) => {
        console.log(err);
        setError(extractErrorMessage(err, "Unable to load cart"));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (id) => {
    try {
      setPendingId(id);
      await API.delete(`/cart/${id}`);
      fetchCart();
    } catch (err) {
      console.log(err);
      alert(extractErrorMessage(err, "Unable to remove item"));
    } finally {
      setPendingId(null);
    }
  };

  const updateQuantity = async (id, currentQty, delta) => {
    const nextQty = currentQty + delta;
    if (nextQty < 1) return;

    try {
      setPendingId(id);
      await API.patch(`/cart/${id}`, { quantity: nextQty });
      fetchCart();
    } catch (err) {
      console.log(err);
      alert(extractErrorMessage(err, "Unable to update quantity"));
    } finally {
      setPendingId(null);
    }
  };

  const totals = useMemo(() => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = Math.round(total * 0.08);
    const deliveryFee = total > 2000 ? 0 : 99;
    const payable = total - discount + deliveryFee;
    return { total, discount, deliveryFee, payable };
  }, [cart]);

  if (loading) {
    return (
      <div className="sv-shell flex h-[65vh] items-center justify-center text-lg font-semibold text-slate-600">
        Loading cart...
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="sv-shell flex min-h-[70vh] items-center justify-center py-6">
        <div className="sv-panel w-full max-w-lg overflow-hidden text-center">
          <img src={imageAssets.emptyCart} alt="Empty cart" className="h-48 w-full object-cover" />
          <div className="p-8">
            <h2 className="font-display text-2xl font-extrabold text-ink">Your cart is empty</h2>
            <p className="mt-2 text-sm text-slate-600">Browse products and add your favorites to continue.</p>
            <button className="sv-btn-primary mt-5" onClick={() => navigate("/")}>
              Shop Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="sv-shell animate-floatIn py-5 md:py-7">
      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}
      <div className="grid gap-5 md:grid-cols-3">
        <section className="space-y-4 md:col-span-2">
          {cart.map((item) => {
            const disabled = pendingId === item.id;
            return (
              <div key={item.id} className="sv-panel flex gap-4 p-4">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="h-24 w-24 rounded-xl border border-slate-200 bg-slate-50 p-2 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = imageAssets.fallbackCart;
                  }}
                />

                <div className="flex-1">
                  <h3 className="font-bold text-slate-800">{item.name}</h3>
                  <p className="mt-1 text-lg font-extrabold text-ink">{formatCurrencyINR(item.price)}</p>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      className="h-8 w-8 rounded-full border border-slate-300 text-sm font-bold text-slate-700 disabled:opacity-40"
                      onClick={() => updateQuantity(item.id, item.quantity, -1)}
                      disabled={disabled}
                    >
                      -
                    </button>
                    <span className="min-w-6 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      className="h-8 w-8 rounded-full border border-slate-300 text-sm font-bold text-slate-700 disabled:opacity-40"
                      onClick={() => updateQuantity(item.id, item.quantity, 1)}
                      disabled={disabled}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="mt-3 text-sm font-semibold text-red-500 disabled:opacity-40"
                    onClick={() => removeItem(item.id)}
                    disabled={disabled}
                  >
                    {disabled ? "Updating..." : "Remove"}
                  </button>
                </div>
              </div>
            );
          })}
        </section>

        <aside className="sv-panel h-fit p-5">
          <h2 className="mb-4 border-b border-slate-200 pb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
            Price Details
          </h2>

          <div className="mb-2 flex justify-between">
            <span>Total Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="mb-2 flex justify-between">
            <span>Total Price</span>
            <span>{formatCurrencyINR(totals.total)}</span>
          </div>

          <div className="mb-2 flex justify-between text-green-700">
            <span>Discount</span>
            <span>-{formatCurrencyINR(totals.discount)}</span>
          </div>

          <div className="mb-2 flex justify-between">
            <span>Delivery Fee</span>
            <span>{totals.deliveryFee === 0 ? "Free" : `₹${totals.deliveryFee}`}</span>
          </div>

          <hr className="my-3 border-slate-200" />

          <div className="flex justify-between text-base font-extrabold text-ink">
            <span>Amount Payable</span>
            <span>{formatCurrencyINR(totals.payable)}</span>
          </div>

          <button className="sv-btn-primary mt-5 w-full" onClick={() => navigate("/checkout")}>
            Place Order
          </button>
        </aside>
      </div>
    </main>
  );
}

export default Cart;
