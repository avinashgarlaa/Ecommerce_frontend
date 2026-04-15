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
      <div className="sv-shell flex h-[65vh] items-center justify-center text-lg font-semibold text-slate-600">
        Loading profile...
      </div>
    );
  }

  return (
    <main className="sv-shell animate-floatIn py-5 md:py-7">
      <div className="grid gap-5 md:grid-cols-3">
        <section className="sv-panel p-5">
          <h2 className="font-display text-xl font-extrabold text-ink">My Profile</h2>
          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">Name</p>
          <p className="font-bold text-ink">{profile?.fullName || "Shopper"}</p>
          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">Email</p>
          <p className="font-bold text-ink">{profile?.email || "-"}</p>
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
