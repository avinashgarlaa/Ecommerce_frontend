import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get("q") || "");
  const token = localStorage.getItem("shopverse_token");
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("shopverse_user") || "null");
  } catch (_) {
    user = null;
  }
  const isHomePage = location.pathname === "/";
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  const categories = [
    "All",
    "Mobiles",
    "Fashion",
    "Electronics",
    "Home",
    "Appliances",
    "Travel",
    "Grocery",
  ];

  const selectedCategory = useMemo(() => searchParams.get("category") || "All", [searchParams]);
  const shortName = user?.fullName ? user.fullName.split(" ")[0] : "My Account";
  const userMark = shortName.trim().charAt(0).toUpperCase() || "U";

  useEffect(() => {
    setSearchText(searchParams.get("q") || "");
  }, [searchParams]);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (searchText.trim()) {
      params.set("q", searchText.trim());
    } else {
      params.delete("q");
    }

    if (!token) {
      navigate("/login", { state: { from: "/" } });
      return;
    }

    const queryString = params.toString();
    navigate(queryString ? `/?${queryString}` : "/");
  };

  const onCategorySelect = (category) => {
    const params = new URLSearchParams(searchParams);

    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    if (!token) {
      navigate("/login", { state: { from: "/" } });
      return;
    }

    const queryString = params.toString();
    navigate(queryString ? `/?${queryString}` : "/");
  };

  const logout = () => {
    localStorage.removeItem("shopverse_token");
    localStorage.removeItem("shopverse_user");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/85 backdrop-blur-lg">
      <div className="sv-shell py-3">
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <button
            className="flex items-center gap-2 rounded-xl px-2 py-1 transition hover:bg-slate-100"
            onClick={() => navigate(token ? "/" : "/login")}
            aria-label="Go to home"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brandBlue via-blue-600 to-cyan-500 text-sm font-extrabold text-white shadow-soft">
              SV
            </div>
            <div className="text-left">
              <p className="font-display text-lg font-extrabold leading-none text-ink">ShopVerse</p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Premium Deals</p>
            </div>
          </button>

          {!isAuthPage && (
            <form onSubmit={onSearchSubmit} className="order-3 w-full md:order-none md:flex-1">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search products, brands, categories"
                className="sv-input"
              />
            </form>
          )}

          <div className="ml-auto flex items-center gap-2">
            {token ? (
              <>
                <button className="sv-btn-ghost gap-2" onClick={() => navigate("/profile")}>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brandBlue text-[11px] font-bold text-white">
                    {userMark}
                  </span>
                  {shortName}
                </button>
                <button className="sv-btn-ghost" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <button
                className="sv-btn-primary"
                onClick={() => navigate("/login", { state: { from: location.pathname } })}
              >
                Login
              </button>
            )}

            <button
              onClick={() => navigate("/cart")}
              className="sv-btn-primary"
            >
              Cart
            </button>
          </div>
        </div>
      </div>

      {!isAuthPage && (
        <div className="border-t border-slate-200/70 bg-white/90">
          <div className="sv-shell flex items-center gap-2 overflow-x-auto py-2.5">
            {categories.map((category) => {
              const active = selectedCategory === category && location.pathname === "/";
              return (
                <button
                  key={category}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                    active
                      ? "bg-brandBlue text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                  onClick={() => onCategorySelect(category)}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {isHomePage && token && (
        <div className="border-t border-slate-200/70 bg-gradient-to-r from-white via-blue-50 to-orange-50">
          <div className="sv-shell flex items-center gap-6 overflow-x-auto py-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <p>Top Deals</p>
            <p>Express Delivery</p>
            <p>New Launches</p>
            <p>Verified Sellers</p>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
