import React from 'react';
import { FaEnvelope } from 'react-icons/fa'; // Importing the envelope icon from react-icons
import { useNavigate } from 'react-router-dom';
import './FloatingMessageButton.css';  // Import the CSS for styling

const FloatingMessageButton = () => {
  const navigate = useNavigate();

  // Handle click to navigate to Message page
  const handleClick = () => {
    navigate('/Message');
  };

  return (
    <div className="floating-button" onClick={handleClick}>
      <FaEnvelope size={30} color="#fff" />
    </div>
  )
  
};

export default FloatingMessageButton;