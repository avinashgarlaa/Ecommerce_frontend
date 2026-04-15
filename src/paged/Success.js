import { useLocation, useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const id = query.get("id");

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="max-w-md rounded-sm bg-white p-10 text-center shadow-card">
        <div className="mb-4 text-5xl text-green-600">✔</div>

        <h1 className="text-2xl font-bold text-gray-900">Order Placed Successfully</h1>

        <p className="mt-3 text-gray-600">Your Order ID is:</p>

        <p className="mt-1 text-lg font-semibold text-brandBlue">#{id}</p>

        <p className="mt-4 text-gray-500">
          Your order will be delivered within 3-5 business days.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="rounded-sm bg-brandBlue px-5 py-2 text-white hover:bg-brandBlueDark"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="rounded-sm bg-gray-200 px-5 py-2 hover:bg-gray-300"
          >
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Success;