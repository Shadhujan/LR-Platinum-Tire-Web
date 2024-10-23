import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact"; // Import the Contact page
import Repair from "./pages/Repair";
import ReviewForm from "./pages/ReviewForm";
import "bootstrap/dist/css/bootstrap.min.css";
import Payment from "./pages/Payment";
import Review from "./pages/Review";
import ReviewRead from "./pages/ReviewRead";
import ReviewEdit from "./pages/ReviewEdit";
import Cart from "./pages/Cart";
import FloatingMessageButton from "./components/FloatingMessageButton";
import Message from "./components/MessageSection";
import ReviewFormSection from "./components/ReviewFormSection";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import UserProfile from "./pages/ProfilePage";
import Store from "./pages/Store";
import ItemDescription from "./pages/ItemDescription";
import Products from "./pages/admin/Products";
import ProductDescription from "./pages/admin/ProductDescription";
import AddProduct from "./pages/admin/AddProduct";
import UpdateProduct from "./pages/admin/UpdateProduct";
import firebase from 'firebase/compat/app';
import { Icon } from '@iconify/react';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page */}
          <Route path="/contact" element={<Contact />} /> {/* Contact page */}
          <Route path="/payment" element={<Payment />} />
          <Route path="/repair" element={<Repair />} />
          <Route path="/review" element={<Review />} />
          <Route path="/reviewRead" element={<ReviewRead />} />
          <Route path="/reviewEdit/:reviewId" element={<ReviewEdit />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Message" element={<Message />} />
          <Route path="/reviewform" element={<ReviewForm />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/registerpage" element={<RegisterPage />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/:id" element={<ItemDescription />} />
          <Route path="/admin/store" element={<Products />} />
          <Route path="/admin/store/:id" element={<ProductDescription />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/update-product/:id" element={<UpdateProduct />} />

        </Routes>
        <FloatingMessageButton />
      </div>
    </Router>
  );
}

export default App;
