import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navigation_bar";

import Home from "./paged/Home";
import Product from "./paged/Product";
import Cart from "./paged/Cart";
import Checkout from "./paged/Checkout";
import Success from "./paged/Success";

function App() {
  return (
    <BrowserRouter>

      {/* ✅ Navbar (shown on all pages) */}
      <Navbar />

      {/* ✅ Main content area */}
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;