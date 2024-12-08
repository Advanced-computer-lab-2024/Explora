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
      const response = await axios.post('http://localhost:4000/users/login', { username, password });

      const { token, role } = response.data;

      localStorage.setItem('token', token);

      switch (role) {
        case 'Governor':
            navigate('/tourism-dashboard');
            break;
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
    <div className="login-form-container"> {/* Updated container class */}
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Welcome Back!</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="login-form-group"> {/* Updated form-group class */}
          <label htmlFor="username" className="login-form-label">Username</label>
          <div className="input-wrapper">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="login-form-control"  
            />
            <i className="input-icon fas fa-user"></i>
          </div>
        </div>

        <div className="login-form-group"> {/* Updated form-group class */}
          <label htmlFor="password" className="login-form-label">Password</label>
          <div className="input-wrapper">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-form-control"  
            />
            <i className="input-icon fas fa-lock"></i>
          </div>
        </div>

        <button type="submit" className="login-button">Login</button>

        <div className="login-form-links"> {/* Updated links container class */}
          <p>
            <Link to="/change-password" className="link">Forgot password?</Link>
          </p>
          <p>
            Don't have an account? <Link to="/middle" className="link">Signup</Link>
          </p>
          <p>
            <Link to="/tourist-search" className="link">Continue as a guest</Link>
          </p>
          <p>
            <Link to="/acc-settings" className="link">Admin Access</Link>
          </p>
          <p>
            <Link to="/tourism-dashboard" className="link">Access to Tourism Governor</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
