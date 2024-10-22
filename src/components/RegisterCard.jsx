import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import './LoginRegis.css';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');  // State for confirm password
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
    } else {
      setErrorMessage(''); // Clear error if passwords match
      console.log('Email:', email);
      console.log('Password:', password);
      // Handle login logic here
    }
  };

  return (
    <div className="register-page">
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh'}}>
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <Card className="shadow">
            <Card.Body>
              <h3 className="text-center mb-4">Register</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail" className="mt-3">
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

                <Form.Group controlId="formConfirmPassword" className="mt-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}

                <Button variant="primary" type="submit" className="mt-4 w-100">
                  Register
                </Button>

                <div className="text-center mt-3">
                <div className="text-center mt-3">
                    Already have an account? <Link to="/Login">Login</Link>
                </div>
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

export default Register;
