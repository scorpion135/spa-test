import { Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import CreateProductPage from "./pages/CreateProductPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />
      <Route path="/create-product" element={<CreateProductPage />} />
      <Route path="/create-product/:id" element={<CreateProductPage />} />
    </Routes>
  );
}

export default App;
