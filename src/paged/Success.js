import { useLocation, useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const id = query.get("id");

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">

      <div className="bg-white p-10 rounded shadow text-center max-w-md">

        {/* ✅ Success Icon */}
        <div className="text-green-600 text-5xl mb-4">
          ✔
        </div>

        {/* ✅ Title */}
        <h1 className="text-2xl font-bold text-green-600">
          Order Placed Successfully 🎉
        </h1>

        {/* ✅ Order ID */}
        <p className="mt-3 text-gray-600">
          Your Order ID is:
        </p>

        <p className="text-lg font-semibold mt-1">
          #{id}
        </p>

        {/* ✅ Delivery Message */}
        <p className="mt-4 text-gray-500">
          Your order will be delivered within 3-5 days 🚚
        </p>

        {/* ✅ Buttons */}
        <div className="mt-6 flex gap-3 justify-center">

          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="bg-gray-200 px-5 py-2 rounded hover:bg-gray-300"
          >
            View Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default Success;