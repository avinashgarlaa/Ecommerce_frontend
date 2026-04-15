import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await API.post("/auth/signup", { fullName, email, password });
      localStorage.setItem("shopverse_token", res.data.token);
      localStorage.setItem("shopverse_user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-96px)] max-w-4xl items-center justify-center p-4">
      <div className="grid w-full overflow-hidden rounded bg-white shadow-card md:grid-cols-2">
        <div className="bg-brandBlue p-8 text-white">
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <p className="mt-2 text-blue-100">Create your ShopVerse account in seconds.</p>
        </div>
        <form onSubmit={submit} className="space-y-4 p-8">
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
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
            placeholder="Password (min 6 chars)"
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
          <button
            disabled={loading}
            className="w-full rounded bg-orange-500 py-2 font-semibold text-white hover:bg-orange-600"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
          <p className="text-sm text-gray-600">
            Already have an account? <Link to="/login" className="font-semibold text-brandBlue">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
