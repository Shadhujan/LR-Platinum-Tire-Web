import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="container w-100">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
          <span className="fs-4">LR platinum Tyres</span>
        </a>

        <ul className="nav">
          <li className="nav-item">
            <NavLink to="/" className="nav-link" activeClassName="active" aria-current="page">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/store" className="nav-link" activeClassName="active">Store</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/repair" className="nav-link" activeClassName="active">Repair</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/payment" className="nav-link" activeClassName="active">Payment</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className="nav-link" activeClassName="active">Contact</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/review" className="nav-link" activeClassName="active">Review</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/reviewform" className="nav-link" activeClassName="active">Reviewform</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/cart" className="nav-link" activeClassName="active"><i className="bi bi-cart-fill"></i></NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="#" className="nav-link" activeClassName="active"><i className="bi bi-search"></i></NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="#" className="nav-link" activeClassName="active"><i className="bi bi-person-fill"></i></NavLink>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Navbar;