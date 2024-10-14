import React from 'react';
import { Container, Row, Col, Form, Button, Image, Card } from 'react-bootstrap';
import logo from '../assets/IMG_5295 2.png'; // Replace with your actual logo path

const PaymentSection = () => {
  return (
    <>
    <div>
      <Container className="payment-section mb-5" fluid style={{ backgroundColor: '#f2f2f2', height: '100vh', padding: '20px' }}>
        {/* My Cart Section */}
        <Row>
          <Col>
            <Button variant="link" style={{ color: '#000' }}>&lt; My Cart</Button>
          </Col>
        </Row>

        {/* Main Payment Section */}
        <Row className="mt-4">
          {/* Left Side Payment Info */}
          <Col md={8}>
            {/* Payment Details */}
            <Card className="mb-4">
              <Card.Body>
                <h5><strong>Payment</strong></h5>
                <hr />
                <Row>
                  <Col><strong>Bank</strong></Col>
                  <Col><strong>Acc No.</strong></Col>
                  <Col><strong>Branch</strong></Col>
                </Row>
                <Row>
                  <Col>_______Bank</Col>
                  <Col>XXXXXXXXXXX</Col>
                  <Col>__________</Col>
                </Row>
                <Row>
                  <Col>_______Bank</Col>
                  <Col>XXXXXXXXXXX</Col>
                  <Col>__________</Col>
                </Row>
                <Row>
                  <Col>_______Bank</Col>
                  <Col>XXXXXXXXXXX</Col>
                  <Col>__________</Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Shipping Address */}
            <Card className="mb-4">
              <Card.Body>
                <Row>
                  <Col md={10}>
                    <h5><strong>Shipping Address</strong></h5>
                  </Col>
                  <Col md={2} className="text-end">
                    <Button variant="link" style={{ color: '#888' }}>Change</Button>
                  </Col>
                </Row>
                <hr />
                <p>Name</p>
                <p>Contact Number</p>
                <p>Address</p>
              </Card.Body>
            </Card>

            {/* Payment Slip */}
            <Card className="mb-4">
              <Card.Body>
                <h5><strong>Payment Slip</strong></h5>
                <hr />
                <div className="border border-primary p-4" style={{ height: '150px', borderStyle: 'dashed' }}>
                  <p className="text-center text-primary">Upload From Gallery</p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Side Summary */}
          <Col md={4}>
            <Card className="mb-4">
              <Card.Body>
                <h5><strong>Summary</strong></h5>
                <hr />
                <Row>
                  <Col>Subtotal</Col>
                  <Col className="text-end">Rs. 0,000,000</Col>
                </Row>
                <Row>
                  <Col>Shipping Fee</Col>
                  <Col className="text-end">Rs. 0,000,000</Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Image and Description */}
            <Card>
              <Card.Body>
                <Image src={logo} style={{ width: '100%' }} />
                <p className="text-center mt-2">
                  LR Platinum Tyres Keeps Your Information And Payment Safe.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Place Order Button */}
        <Row className="mt-4">
          <Col>
            <Button variant="danger" size="lg" className="w-100">
              Place Order
            </Button>
          </Col>
        </Row>
      </Container>
      </div>
    </>
  );
};

export default PaymentSection;
