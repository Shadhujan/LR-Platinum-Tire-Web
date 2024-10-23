import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Fetch user data from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/auth/update-password", {
        newPassword,
      });
      setMessage(response.data.message);
      setNewPassword("");
    } catch (error) {
      setMessage("Error updating password");
    }
  };

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem("user");
    // Redirect to login page
    navigate("/loginpage");
  };

  return (
    <div className="container">
      {user ? (
        <div className="card p-4">
          <h2 className="text-center mb-4">Profile</h2>
          <div className="mb-3">
            <strong>Username:</strong> {user.username}
          </div>
          <div className="mb-3">
            <strong>Email:</strong> {user.email}
          </div>

          <form onSubmit={handleUpdatePassword}>
            <div className="form-outline mb-4">
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="New Password"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block mb-4">
              Update Password
            </button>
          </form>
          {message && <div className="alert alert-info">{message}</div>}

          {/* Logout button */}
          <button className="btn btn-danger btn-block" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ProfilePage;
