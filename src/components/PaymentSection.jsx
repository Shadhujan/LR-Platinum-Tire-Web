import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import './PaymentSection.css';
import logo from '../assets/IMG_5295 2.png'; // Replace with your own logo

const PaymentSection = () => {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null); // State for the uploaded image

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Preview the image
    }
  };

  const removeImage = () => {
    setImage(null); // Clear the image
  };

  return (
    <Container className="payment-container my-5">
      <Row>
        <Col md={8}>
          {/* Payment Information */}
          <Card className="mb-4">
            <Card.Body>
              <h5 className="mb-3"><strong>Payment</strong></h5>
              <Row>
                <Col><strong>Bank</strong></Col>
                <Col><strong>Acc No.</strong></Col>
                <Col><strong>Branch</strong></Col>
              </Row>
              <Row>
                <Col>_________ Bank</Col>
                <Col>XXXXXXXXXXXX</Col>
                <Col>_</Col>
              </Row>
              <Row>
                <Col>_________ Bank</Col>
                <Col>XXXXXXXXXXXX</Col>
                <Col>_</Col>
              </Row>
              <Row>
                <Col>_________ Bank</Col>
                <Col>XXXXXXXXXXXX</Col>
                <Col>_</Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Shipping Address */}
          <Card className="mb-4">
            <Card.Body>
              <h5 className="mb-3"><strong>Shipping Address</strong></h5>
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter your name" 
                    value={name} 
                    onChange={handleChange(setName)} 
                  />
                </Form.Group>

                <Form.Group controlId="formContactNumber">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="XXX-XXX-XXXX" 
                    value={contactNumber} 
                    onChange={handleChange(setContactNumber)} 
                  />
                </Form.Group>

                <Form.Group controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    placeholder="Enter your address" 
                    value={address} 
                    onChange={handleChange(setAddress)} 
                  />
                </Form.Group>
                <Button variant="link" className="p-0 mt-2">Change</Button>
              </Form>
            </Card.Body>
          </Card>

          {/* Payment Slip Upload */}
          <Card className="mb-4">
            <Card.Body>
              <h5 className="mb-3"><strong>Payment Slip</strong></h5>
              <div className="upload-box">
                <p className="text-center">
                  <label htmlFor="formFile" className="upload-label">
                    {image ? 'Uploaded Payment Slip' : 'Upload From Gallery'}
                  </label>
                  <Form.Control 
                    id="formFile" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    style={{ display: 'none' }} // Hide the file input
                  />
                </p>
                {image && (
                  <div className="text-center mt-3">
                    <img src={image} alt="Uploaded" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }} />
                    <Button variant="danger" className="mt-2" onClick={removeImage}>Remove Slip</Button>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Order Summary */}
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <h5 className="mb-3"><strong>Summary</strong></h5>
              <Row>
                <Col>Subtotal</Col>
                <Col className="text-end">Rs. 0.00</Col>
              </Row>
              <Row>
                <Col>Shipping Fee</Col>
                <Col className="text-end">Rs. 0.00</Col>
              </Row>
              <Button variant="success" className="mt-3 w-100">Confirm and Pay</Button>
            </Card.Body>
          </Card>

          {/* Logo and Security Information */}
          <Card className="text-center">
            <Card.Body>
              <img src={logo} alt="LR Platinum Tyres" className="mb-3" style={{ width: '100px' }} />
              <p className="small text-muted">LR Platinum Tyres Keeps Your Information And Payment Secure</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentSection;