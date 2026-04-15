import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/auth/me")
      .then((res) => setProfile(res.data))
      .catch(() => navigate("/login"))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-lg text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-4 md:p-6">
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded bg-white p-5 shadow-card">
          <h2 className="text-lg font-bold">My Profile</h2>
          <p className="mt-3 text-sm text-gray-500">Name</p>
          <p className="font-semibold text-gray-900">{profile?.fullName || "Shopper"}</p>
          <p className="mt-3 text-sm text-gray-500">Email</p>
          <p className="font-semibold text-gray-900">{profile?.email || "-"}</p>
        </div>

        <div className="rounded bg-white p-5 shadow-card md:col-span-2">
          <h3 className="text-lg font-bold text-gray-900">Account Actions</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => navigate("/cart")}
              className="rounded border border-gray-300 px-4 py-3 text-left hover:border-brandBlue hover:text-brandBlue"
            >
              Go to Cart
            </button>
            <button
              onClick={() => navigate("/checkout")}
              className="rounded border border-gray-300 px-4 py-3 text-left hover:border-brandBlue hover:text-brandBlue"
            >
              Continue to Checkout
            </button>
            <button
              onClick={() => navigate("/")}
              className="rounded border border-gray-300 px-4 py-3 text-left hover:border-brandBlue hover:text-brandBlue"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
