import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // If using axios to make HTTP requests

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // To display login error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send POST request to your backend API for authentication
      const response = await axios.post('http://localhost:4000/api/auth', { username, password });
      
      // Assuming the server returns a token and user role upon successful authentication
      const { token, role } = response.data;

      // Save the token in localStorage (or sessionStorage, depending on preference)
      localStorage.setItem('token', token);

      // Redirect user to the appropriate page based on their role
      switch (role) {
        case 'TourGuide':
          navigate('/to-do'); // Replace with your Tour Guide page
          break;
        case 'Tourist':
          navigate('/tourist-dashboard'); // Replace with your Tourist page
          break;
        case 'Advertiser':
          navigate('/advertiser-dashboard'); // Replace with your Advertiser page
          break;
        case 'Seller':
          navigate('/seller-dashboard'); // Replace with your Seller page
          break;
        default:
          navigate('/dashboard'); // Fallback for any other roles
      }
    } catch (err) {
      // Handle errors, e.g., incorrect username/password
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>} {/* Display error message if login fails */}
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
