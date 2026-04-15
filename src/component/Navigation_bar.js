import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get("q") || "");
  const token = localStorage.getItem("shopverse_token");
  const user = JSON.parse(localStorage.getItem("shopverse_user") || "null");
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

  const selectedCategory = useMemo(
    () => searchParams.get("category") || "All",
    [searchParams]
  );

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
    const queryString = params.toString();
    navigate(queryString ? `/?${queryString}` : "/");
  };

  const logout = () => {
    localStorage.removeItem("shopverse_token");
    localStorage.removeItem("shopverse_user");
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-20 shadow-card">
      <div className="bg-brandBlue">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 text-white">
          <button
            className="flex items-center gap-2 text-left"
            onClick={() => navigate("/")}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-500 shadow">
              <span className="text-sm font-black italic text-brandBlue">SV</span>
            </div>
            <div>
              <p className="text-xl font-bold italic leading-none">ShopVerse</p>
              <p className="text-xs text-yellow-100">Smart Deals</p>
            </div>
          </button>

          <form onSubmit={onSearchSubmit} className="hidden flex-1 md:block">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search for products, brands and more"
              className="w-full rounded-sm border-none px-4 py-2 text-sm text-gray-700 shadow-sm placeholder:text-gray-500 focus:outline-none"
            />
          </form>

          {token ? (
            <div className="hidden items-center gap-2 md:flex">
              <button
                className="rounded-sm bg-white px-4 py-2 text-sm font-semibold text-brandBlue hover:bg-blue-50"
                onClick={() => navigate("/checkout")}
              >
                {user?.fullName ? user.fullName.split(" ")[0] : "My Account"}
              </button>
              <button
                className="rounded-sm border border-white/40 px-3 py-2 text-xs font-semibold hover:bg-brandBlueDark"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="rounded-sm bg-white px-6 py-2 text-sm font-semibold text-brandBlue hover:bg-blue-50"
              onClick={() => navigate("/login", { state: { from: location.pathname } })}
            >
              Login
            </button>
          )}

          <button
            onClick={() => navigate("/cart")}
            className="rounded-sm border border-white/30 px-4 py-2 text-sm font-semibold hover:bg-brandBlueDark"
          >
            Cart
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 overflow-x-auto px-4 py-2 text-sm font-medium text-gray-700">
          {categories.map((category) => (
            <button
              key={category}
              className={`whitespace-nowrap ${
                selectedCategory === category && location.pathname === "/"
                  ? "text-brandBlue"
                  : "hover:text-brandBlue"
              }`}
              onClick={() => onCategorySelect(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Navbar;