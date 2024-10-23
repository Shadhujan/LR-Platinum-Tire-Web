import React, { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Handle the registration logic here (API call)
      const response = await axios.post("http://localhost:3214/User-register", {
        username,
        email,
        password,
      });

      if (response.data.success) {
        setSuccess("Registration successful! Please log in.");
        setError(""); // Clear error if registration is successful

        // Clear the fields after registration
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          {/* Username input */}
          <div className="form-outline mb-4">
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label className="form-label" htmlFor="username">
              Username
            </label>
          </div>

          {/* Email input */}
          <div className="form-outline mb-4">
            <input
              type="email"
              id="form2Example1"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="form-label" htmlFor="form2Example1">
              Email address
            </label>
          </div>

          {/* Password input */}
          <div className="form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="form-label" htmlFor="form2Example2">
              Password
            </label>
          </div>

          {/* Confirm Password input */}
          <div className="form-outline mb-4">
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label className="form-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary btn-block mb-4">
            Register
          </button>

          <p className="text-center mt-3">
            Already a member? <a href="/loginpage">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
