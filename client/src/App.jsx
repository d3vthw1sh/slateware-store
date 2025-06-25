import { Routes, Route } from "react-router-dom";
import LandingScreen from "./screens/LandingScreen";
import ProductPage from "./screens/ProductPage";
import SignIn from "./screens/SignIn"; // ✅ matches SignIn.jsx
import SignUp from "./screens/SignUp"; // ✅ matches SignUp.jsx

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingScreen />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
