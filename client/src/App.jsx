// ✅ App.jsx
import { Routes, Route } from "react-router-dom";
import LandingScreen from "./screens/LandingScreen";
import ProductPage from "./screens/ProductPage";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import CartPage from "./screens/CartPage";
import { useEffect, useState } from "react";

function App() {
  // ✅ Load cart from localStorage if it exists
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // ✅ Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Routes>
      <Route path="/" element={<LandingScreen />} />
      <Route
        path="/products"
        element={<ProductPage cart={cart} setCart={setCart} />}
      />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/cart"
        element={<CartPage cart={cart} setCart={setCart} />}
      />
    </Routes>
  );
}

export default App;
