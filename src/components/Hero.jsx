import React from 'react';
import logo from '../assets/LR PLATINUM TYRES.png';
import logo3 from '../assets/Screenshot 2024-07-09 at 20.45.08 1.png';
import './Hero.css'; // Import the CSS file for styling


const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero py-5 mb-5 text-center text-white" style={{ backgroundColor: '#000000', width: '100%', height: '400px' }}>
      <img className="d-block mx-auto my-4" src={logo} alt="LR Platinum Tyres Logo" width="650" height="200" />
        <div className="desc row mx-auto align-items-center">
          <div className="col-md-4 d-flex justify-content-center"></div>
          <div className="col-md-4 d-flex justify-content-center">
          <img src={logo3} alt="Logo 3" style={{ maxHeight: '200px', objectFit: 'contain' }} />
          </div>
          <div className="col-md-4 d-flex justify-content-center"></div>
        </div>
      </div>
      <CompanyDescription />
    </div>
  );
};

const CompanyDescription = () => {
  return (
    <div className="description-container">
            <h2>About LR Platinum Tyres</h2>
            <div className="card-group">
                <div className="description-card">
                    <h4>Our Mission</h4>
                    <p>To provide high-quality tyres and exceptional service that meets the needs of our customers.</p>
                </div>
                <div className="description-card">
                    <h4>Our Vision</h4>
                    <p>To be the leading tyre supplier in the region, known for our quality products and outstanding customer service.</p>
                </div>
                <div className="description-card">
                    <h4>Our Values</h4>
                    <p>Integrity, quality, and customer satisfaction are at the core of our business.</p>
                </div>
            </div>
        </div>
  );
};

const Card = ({ title, children }) => {
  return (
    <div className="description-card">
      <h4 className="text-center">{title}</h4>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export default Hero;
