import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3214/user-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user details in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect to profile page
        window.location.href = "/userprofile"; // Change location to profile page
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }

    // Clear the fields after login
    setEmail("");
    setPassword("");
    setRememberMe(true);
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card p-4" style={{ width: "400px" }}>
        <h1 className="mb-5">Login</h1>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}

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

          {/* Remember Me */}
          <div className="row mb-4">
            <div className="col d-flex align-items-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="form2Example31"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label className="form-check-label" htmlFor="form2Example31">
                  Remember Me
                </label>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary btn-block mb-4">
            Sign in
          </button>
        </form>

        <p className="text-center mt-3">
          Don't have an account? <a href="/registerpage">Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
