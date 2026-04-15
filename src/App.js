import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./component/Navigation_bar";
import ProtectedRoute from "./component/ProtectedRoute";
import Loader from "./components/Loader";
import Footer from "./components/Footer";

const Home = lazy(() => import("./paged/Home"));
const Product = lazy(() => import("./paged/Product"));
const Cart = lazy(() => import("./paged/Cart"));
const Checkout = lazy(() => import("./paged/Checkout"));
const Success = lazy(() => import("./paged/Success"));
const Login = lazy(() => import("./paged/Login"));
const Signup = lazy(() => import("./paged/Signup"));
const Profile = lazy(() => import("./paged/Profile"));

function RootEntry() {
  const token = localStorage.getItem("shopverse_token");
  return token ? <Home /> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />

        <Suspense fallback={<Loader label="Preparing your shopping experience..." />}>
          <Routes>
            <Route path="/" element={<RootEntry />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/success"
              element={
                <ProtectedRoute>
                  <Success />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
