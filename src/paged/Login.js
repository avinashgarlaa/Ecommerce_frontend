import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";
import { imageAssets } from "../constants/imageAssets";
import { extractErrorMessage } from "../utils/apiResponse";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("default@shopverse.local");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  const targetPath = location.state?.from || "/";
  const canSubmit = useMemo(() => email.trim() && password.trim(), [email, password]);

  useEffect(() => {
    const token = localStorage.getItem("shopverse_token");
    if (token) {
      navigate("/", { replace: true });
      return;
    }

    if (sessionStorage.getItem("shopverse_session_expired") === "1") {
      setNotice("Your session expired. Please login again.");
      sessionStorage.removeItem("shopverse_session_expired");
    }
  }, [navigate]);

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setLoading(true);
      const res = await API.post("/auth/login", { email: email.trim(), password });
      localStorage.setItem("shopverse_token", res.data.token);
      localStorage.setItem("shopverse_user", JSON.stringify(res.data.user));
      navigate(targetPath, { replace: true });
    } catch (err) {
      alert(extractErrorMessage(err, "Login failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="sv-shell flex min-h-[calc(100vh-170px)] items-center justify-center py-6">
      <div className="sv-panel grid w-full max-w-4xl overflow-hidden md:grid-cols-2">
        <div className="relative min-h-52 overflow-hidden p-8 text-white">
          <img src={imageAssets.authLogin} alt="Login experience" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-brandBlue/85 to-slate-900/70" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">Welcome Back</p>
            <h1 className="mt-2 font-display text-3xl font-extrabold">Login</h1>
            <p className="mt-2 text-blue-100">Access your cart, saved profile, and faster checkout.</p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4 p-8">
          {notice && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800">
              {notice}
            </div>
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="sv-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="sv-input"
          />
          <button
            disabled={loading || !canSubmit}
            className="sv-btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-sm text-slate-600">
            New user?{" "}
            <Link to="/signup" className="font-bold text-brandBlue">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Login;
