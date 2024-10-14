import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import './ContactSection.css'; // Add a CSS file for custom hover effects

const ContactSection = () => {
  return (
    <Container fluid className="p-5" style={{ backgroundColor: '#fff' }}>
      <Row className="align-items-center">
        {/* Form Section */}
        <Col md={6} className="p-5">
          <h2>Get in touch with us,</h2>
          <p>Feel free to contact us anytime.</p>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>
            <Form.Group controlId="formMessage" className="mt-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter your message" />
            </Form.Group>
            <Button variant="danger" type="submit" className="mt-3">
              SEND
            </Button>
          </Form>
        </Col>

        {/* Contact Info Section */}
        <Col md={6} className="p-5" style={{ backgroundColor: '#000', color: '#fff' }}>
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
              <FaMapMarkerAlt /> 75 B, Aththidiya Road, Bellantara Ln, Dehiwala-Mount Lavinia
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

export default ContactSection;