import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { imageAssets } from "../constants/imageAssets";
import { extractErrorMessage } from "../utils/apiResponse";

function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(
    () => fullName.trim() && email.trim() && password.trim().length >= 6,
    [email, fullName, password]
  );

  useEffect(() => {
    const token = localStorage.getItem("shopverse_token");
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setLoading(true);
      const res = await API.post("/auth/signup", {
        fullName: fullName.trim(),
        email: email.trim(),
        password,
      });
      localStorage.setItem("shopverse_token", res.data.token);
      localStorage.setItem("shopverse_user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      alert(extractErrorMessage(err, "Signup failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="sv-shell flex min-h-[calc(100vh-170px)] items-center justify-center py-6">
      <div className="sv-panel grid w-full max-w-4xl overflow-hidden md:grid-cols-2">
        <div className="relative min-h-52 overflow-hidden p-8 text-white">
          <img src={imageAssets.authSignup} alt="Create account" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-brandBlue/85 to-slate-900/70" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">Join ShopVerse</p>
            <h1 className="mt-2 font-display text-3xl font-extrabold">Create Account</h1>
            <p className="mt-2 text-blue-100">Sign up once and checkout quickly anytime.</p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4 p-8">
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="sv-input"
          />
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
            placeholder="Password (min 6 chars)"
            className="sv-input"
          />
          <button
            disabled={loading || !canSubmit}
            className="sv-btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-brandBlue">
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Signup;
