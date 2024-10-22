import { NavLink } from "react-router-dom";
import "./Navbar.css"; // Assuming you're using a separate CSS file for styling
import logo2 from "../assets/IMG_5295 2.png";

const Navbar = () => {
  return (
    <div className="container w-100">
      <header className="d-flex flex-wrap justify-content-between align-items-center py-1 mb-4 border-bottom header">
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none logo-link"
        >
          <img src={logo2} alt="Logo 2" className="logo-img  " />
          <span className="fs-4 ms-1" style={{ color: "black" }}>
            LR Platinum Tyres
          </span>
        </a>

        <ul className="nav">
          <li className="nav-item">
            <NavLink
              to="/"
              className="nav-link"
              activeClassName="active"
              aria-current="page"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/store" className="nav-link" activeClassName="active">
              Store
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/repair" className="nav-link" activeClassName="active">
              Repair
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/payment"
              className="nav-link"
              activeClassName="active"
            >
              Payment
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/contact"
              className="nav-link"
              activeClassName="active"
            >
              Contact
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/review" className="nav-link" activeClassName="active">
              Review
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/reviewform"
              className="nav-link"
              activeClassName="active"
            >
              Reviewform
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/cart" className="nav-link" activeClassName="active">
              <i className="bi bi-cart-fill"></i>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="#" className="nav-link" activeClassName="active">
              <i className="bi bi-search"></i>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="#" className="nav-link" activeClassName="active">
              <i className="bi bi-person-fill"></i>
            </NavLink>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Navbar;
