import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-600 text-white p-3 flex justify-between items-center">

      {/* Logo */}
      <h1 
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Flipkart Clone
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        className="w-1/2 px-3 py-1 rounded text-black"
      />

      {/* Cart Button */}
      <button 
        onClick={() => navigate("/cart")}
        className="bg-yellow-400 text-black px-4 py-1 rounded"
      >
        Cart
      </button>

    </div>
  );
}

export default Navbar;