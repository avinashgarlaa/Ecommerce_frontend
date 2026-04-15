import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { imageAssets } from "../constants/imageAssets";
import { extractErrorMessage } from "../utils/apiResponse";

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/auth/me")
      .then((res) => setProfile(res.data))
      .catch((err) => {
        if (err?.response?.status === 401) {
          navigate("/login");
          return;
        }
        setError(extractErrorMessage(err, "Unable to load profile"));
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <div className="sv-shell flex h-[65vh] items-center justify-center text-lg font-semibold text-slate-600">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="sv-shell flex h-[65vh] flex-col items-center justify-center gap-3 text-center">
        <p className="font-semibold text-red-600">{error}</p>
        <button className="sv-btn-primary" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  const displayName = profile?.fullName || "Shopper";
  const displayInitial = displayName.trim().charAt(0).toUpperCase() || "U";

  return (
    <main className="sv-shell animate-floatIn py-5 md:py-7">
      <div className="grid gap-5 md:grid-cols-3">
        <section className="sv-panel overflow-hidden">
          <img src={imageAssets.profileCover} alt="Profile cover" className="h-28 w-full object-cover" />
          <div className="p-5">
          <h2 className="font-display text-xl font-extrabold text-ink">My Profile</h2>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brandBlue text-lg font-extrabold text-white">
              {displayInitial}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">User</p>
              <p className="font-bold text-ink">{displayName}</p>
            </div>
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">Name</p>
          <p className="font-bold text-ink">{displayName}</p>
          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">Email</p>
          <p className="font-bold text-ink">{profile?.email || "-"}</p>
          </div>
        </section>

        <section className="sv-panel p-5 md:col-span-2">
          <h3 className="font-display text-xl font-extrabold text-ink">Quick Actions</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            <button onClick={() => navigate("/")} className="sv-btn-primary">
              Continue Shopping
            </button>
            <button onClick={() => navigate("/cart")} className="sv-btn-ghost">
              Go to Cart
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Profile;
