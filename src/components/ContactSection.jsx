import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
} from "react-icons/fa";
import "./ContactSection.css"; // Add a CSS file for custom hover effects

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3214/Server/Contact/Create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const result = await response.json();
      console.log("Response:", result);

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };

  return (
    <Container fluid className="p-5" style={{ backgroundColor: "#fff" }}>
      <Row className="align-items-center">
        {/* Form Section */}
        <Col md={6} className="p-5">
          <h2>Get in touch with us,</h2>
          <p>Feel free to contact us anytime.</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formMessage" className="mt-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your message"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="danger" type="submit" className="mt-3">
              SEND
            </Button>
          </Form>
        </Col>

        {/* Contact Info Section */}
        <Col
          md={6}
          className="p-5"
          style={{ backgroundColor: "#000", color: "#fff" }}
        >
          <ul className="list-unstyled">
            <li className="mb-3">
              {/* Clickable phone number with hover effect */}
              <a href="tel:+94712708070" className="phone-link">
                <FaPhoneAlt /> +94 71 270 8070
              </a>
            </li>
            <li className="mb-3">
              {/* Clickable email with mailto functionality */}
              <a href="mailto:lrplatinumtyres@gmail.com" className="email-link">
                <FaEnvelope /> lrplatinumtyres@gmail.com
              </a>
            </li>
            <li className="mb-3">
              <FaMapMarkerAlt /> 75 B, Aththidiya Road, Bellantara Ln,
              Dehiwala-Mount Lavinia
            </li>
          </ul>
          <div className="d-flex justify-content-start">
            <FaFacebook className="me-3" size={24} />
            <FaInstagram className="me-3" size={24} />
            <FaWhatsapp className="me-3" size={24} />
            <FaTiktok size={24} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactSection;