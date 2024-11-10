import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/auth/', { username, password });

      const { token, role } = response.data;

      localStorage.setItem('token', token);

      switch (role) {
        case 'TourGuide':
          navigate('/to-do');
          break;
        case 'Tourist':
          navigate('/tourist-dashboard');
          break;
        case 'Advertiser':
          navigate('/advertiser-dashboard');
          break;
        case 'Seller':
          navigate('/seller-dashboard');
          break;
        case 'Governor':
          navigate('/');
          break;
        case 'Admin':
          navigate('/');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome Back!</h2>
        {error && <p className="error-message">{error}</p>}
        
        <div className="form-group">
        <label htmlFor="username">Username</label>
          <div className="input-wrapper">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input-field"
            />
            <i className="input-icon fas fa-user"></i>
          </div>
        </div>

        <div className="form-group">
        <label htmlFor="password">Password</label>
          <div className="input-wrapper">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
            <i className="input-icon fas fa-lock"></i>
          </div>
        </div>

        <button type="submit" className="login-button">Login</button>

        <div className="login-form-links">
          <p>
            <Link to="/reset-password">Forgot password?</Link>
          </p>
          <p>
            Don't have an account? <Link to="/middle">Signup</Link>
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
