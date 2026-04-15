import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("default@shopverse.local");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);

  const targetPath = location.state?.from || "/";

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("shopverse_token", res.data.token);
      localStorage.setItem("shopverse_user", JSON.stringify(res.data.user));
      navigate(targetPath, { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-96px)] max-w-4xl items-center justify-center p-4">
      <div className="grid w-full overflow-hidden rounded bg-white shadow-card md:grid-cols-2">
        <div className="bg-brandBlue p-8 text-white">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="mt-2 text-blue-100">Get access to your Cart, Orders and Wishlist.</p>
        </div>
        <form onSubmit={submit} className="space-y-4 p-8">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
          <button
            disabled={loading}
            className="w-full rounded bg-orange-500 py-2 font-semibold text-white hover:bg-orange-600"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-sm text-gray-600">
            New user? <Link to="/signup" className="font-semibold text-brandBlue">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
