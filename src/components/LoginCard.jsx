import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, NavLink } from 'react-bootstrap';
import './LoginRegis.css';
import { Link } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    // Handle login logic here

    
  };

  

  return (
    <div className="login-page">
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', }}>
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <Card className="shadow">
            <Card.Body>
              <h3 className="text-center mb-4">Login</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-4 w-100">
                  Login
                </Button>
                <div className="text-center mt-3">
                    New user? <Link to="/Register">Register</Link>
                </div>
               
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Login;
