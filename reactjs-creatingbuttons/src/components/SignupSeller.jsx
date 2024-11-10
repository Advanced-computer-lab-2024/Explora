import React from "react";
import { useNavigate } from "react-router-dom";

const SignupSeller = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    // You can add form validation or API calls here if needed
    navigate('/seller-home'); // Redirect to Sellerhome after signup
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit} className="login-form-container">
        <h1 className="form-title">Signup as a Seller</h1>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            className="input-field"
            placeholder="Username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="input-field"
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="input-field"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit" className="login-button">Signup</button>
      </form>
    </div>
  );
};

export default SignupSeller;
