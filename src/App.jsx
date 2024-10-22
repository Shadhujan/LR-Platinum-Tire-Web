import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';  // Import the Contact page
import Repair from './pages/Repair';
import ReviewForm from './pages/ReviewForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import Payment from './pages/Payment';
import Review from './pages/Review';
import ReviewRead from './pages/ReviewRead';
import ReviewEdit from './pages/ReviewEdit';
import Cart from './pages/Cart';
import FloatingMessageButton from './components/FloatingMessageButton';
import Message from './components/MessageSection';
import ReviewFormSection from './components/ReviewFormSection'
import Login from './pages/Login';
import Register from './components/RegisterCard';



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />  {/* Home page */}
          <Route path="/contact" element={<Contact />} />  {/* Contact page */}
          <Route path="/payment" element={<Payment/>}/>
          <Route path="/repair" element={<Repair/>}/>
          <Route path="/review" element={<Review/>}/>
          <Route path="/reviewRead" element={<ReviewRead/>}/>
          <Route path="/reviewEdit" element={<ReviewEdit/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/Message" element={<Message/>}/>
          <Route path="/reviewform" element={<ReviewForm/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path='/Register' element={<Register/>}/>
          

        </Routes>
        <FloatingMessageButton/>
       </div>
    </Router>
  );
}

export default App;
