import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer-container py-3">
      <footer className="footer">
        <div className="col">
          <Link to="/" className="footer-logo" aria-label="Company logo">
            <svg className="bi me-2" width="40" height="32" aria-label="Company logo">
              <use xlinkHref="#bootstrap" />
            </svg>
          </Link>
        </div>

        <div className="col">
          <h5 className="footer-title">Accessories</h5>
          <ul className="footer-nav">
            <li><Link to="#" className="footer-link">Motorcycles</Link></li>
            <li><Link to="#" className="footer-link">Gears & Accessories</Link></li>
            <li><Link to="#" className="footer-link">Helmets</Link></li>
            <li><Link to="#" className="footer-link">Spare Parts</Link></li>
          </ul>
        </div>

        <div className="col">
          <h5 className="footer-title">Pages</h5>
          <ul className="footer-nav">
            <li><Link to="/store" className="footer-link">Store</Link></li>
            <li><Link to="/contact" className="footer-link">Contact</Link></li>
            <li><Link to="/about" className="footer-link">About</Link></li>
            <li><Link to="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions" className="footer-link">Terms & Conditions</Link></li>
            <li><Link to="/career" className="footer-link">Career</Link></li>
          </ul>
        </div>

        <div className="col">
          <h5 className="footer-title">Social Media</h5>
          <ul className="footer-nav">
            <li><a href="https://www.facebook.com/lrplatinum/" target="_blank" rel="noopener noreferrer" className="footer-link">Facebook</a></li>
            <li><a href="https://www.instagram.com/explore/locations/361957887896031/lr-platinum-tire/" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer" className="footer-link">WhatsApp</a></li>
            <li><a href="https://www.tiktok.com/@lrplatinum?lang=en" target="_blank" rel="noopener noreferrer" className="footer-link">TikTok</a></li>
          </ul>
        </div>

      </footer>
      <Link to="#" className="footer-copyright my-2">&copy; 2024 LR Platinum Tyres. All rights reserved.</Link>
    </div>
  );
};

export default Footer;