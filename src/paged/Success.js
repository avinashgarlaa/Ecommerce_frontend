import { useLocation, useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const id = query.get("id");

  return (
    <main className="sv-shell flex min-h-[70vh] items-center justify-center py-6">
      <div className="sv-panel max-w-md p-10 text-center">
        <div className="mb-4 text-5xl text-green-600">✔</div>
        <h1 className="font-display text-2xl font-extrabold text-ink">Order Placed Successfully</h1>
        <p className="mt-3 text-slate-600">Your Order ID is:</p>
        <p className="mt-1 text-lg font-bold text-brandBlue">#{id}</p>
        <p className="mt-4 text-slate-500">Your order will be delivered within 3-5 business days.</p>

        <button onClick={() => navigate("/")} className="sv-btn-primary mt-6">
          Continue Shopping
        </button>
      </div>
    </main>
  );
}

export default Success;
