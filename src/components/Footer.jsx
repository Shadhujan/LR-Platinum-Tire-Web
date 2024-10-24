import { Link } from 'react-router-dom';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="footer py-4">
        <div className="footer-row">
          {/* Company Logo and About */}
          <div className="footer-col">
            <Link to="/" className="footer-logo" aria-label="Company logo">
              <svg className="bi me-2" width="40" height="32" aria-label="Company logo">
                <use xlinkHref="#bootstrap" />
              </svg>
              <span className="footer-company">LR Platinum Tyres</span>
            </Link>
            <p className="footer-description">
              Providing premium motorbike accessories and ensuring a smooth and safe ride.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-nav">
              <li><Link to="/store" className="footer-link">Store</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="footer-link">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="footer-col">
            <h5 className="footer-title">Follow Us</h5>
            <ul className="footer-social-nav">
              <li><a href="https://www.facebook.com/lrplatinum/" target="_blank" rel="noopener noreferrer"><FaFacebookF className="footer-icon" /> Facebook</a></li>
              <li><a href="https://www.instagram.com/explore/locations/361957887896031/lr-platinum-tire/" target="_blank" rel="noopener noreferrer"><FaInstagram className="footer-icon" /> Instagram</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer"><FaWhatsapp className="footer-icon" /> WhatsApp</a></li>
              <li><a href="https://www.tiktok.com/@lrplatinum?lang=en" target="_blank" rel="noopener noreferrer"><FaTiktok className="footer-icon" /> TikTok</a></li>
            </ul>
          </div>
        </div>

        <hr className="footer-divider" />

        {/* Copyright */}
        <div className="footer-bottom">
          <p>&copy; 2024 LR Platinum Tyres. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
