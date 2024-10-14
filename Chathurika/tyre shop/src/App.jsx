import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Store from "./pages/Store";
import ItemDescription from "./pages/ItemDescription";
import Products from "./pages/admin/Products";
import ProductDescription from "./pages/admin/ProductDescription";
import AddProduct from "./pages/admin/AddProduct";
import UpdateProduct from "./pages/admin/UpdateProduct";

function App() {
  return (
    <BrowserRouter>
      <div className="text-3xl font-bold bg-[#020202]">
        <NavBar />
      </div>
      <Routes>
        <Route path="/store" element={<Store />} />
        <Route path="/store/:id" element={<ItemDescription />} />
        <Route path="/admin/store" element={<Products />} />
        <Route path="/admin/store/:id" element={<ProductDescription />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/update-product/:id" element={<UpdateProduct />} />
      </Routes>
      <div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
