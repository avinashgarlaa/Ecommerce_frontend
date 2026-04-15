import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navigation_bar";
import ProtectedRoute from "./component/ProtectedRoute";

import Home from "./paged/Home";
import Product from "./paged/Product";
import Cart from "./paged/Cart";
import Checkout from "./paged/Checkout";
import Success from "./paged/Success";
import Login from "./paged/Login";
import Signup from "./paged/Signup";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="min-h-screen bg-brandGray">
        <Routes>
          <Route path="/" element={<Home />} />
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
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;