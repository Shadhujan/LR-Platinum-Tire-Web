const Footer = () => {
    return (
      <div className="container">
        <footer style={{ paddingTop: '60px' }} className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
          <div className="col mb-3">
            <a href="/" className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none">
              <svg className="bi me-2" width="40" height="32">
                <use xlinkHref="#bootstrap" />
              </svg>
            </a>
            <p className="text-body-secondary">&copy; 2024</p>
          </div>
  
          <div className="col mb-3"></div>
  
          <div className="col mb-3">
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">Motorcycles</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">Gears & Accessories</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">Helmets</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">Spare Parts</a>
              </li>
            </ul>
          </div>
  
          <div className="col mb-3">
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">Store</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">Contact</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">About</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">Privacy Policy</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">Terms & Condition</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">Career</a>
              </li>
            </ul>
          </div>
  
          <div className="col mb-3">
            <h5>Social Media</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">Facebook</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">Instagram</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">Whatsapp</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">Tiktok</a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    );
  };
  
  export default Footer;
  