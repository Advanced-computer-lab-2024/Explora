import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic for login validation if needed
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        
        <div className="login-form-links">
          <p>
            <Link to="/reset-password">Forgot password?</Link>
          </p>
          <p>
            Don't have an account? <Link to="/middle">Signup </Link>
          </p>
          <p>
            <Link to="/tourist-search">Continue as a guest</Link>
          </p>
          <p>
            <Link to="/acc-settings">Admin Access</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
