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

      const { token, role, userId } = response.data;
      console.log('Received userId:', userId);  // Log to check if userId is present
      
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);  // Store userId

      switch (role) {
        case 'Governor':
          navigate('/tourism-dashboard');
          break;
        case 'TourGuide':
          navigate(`/terms-tour-guide/${userId}`);
          break;
        case 'Tourist':
          navigate('/tourist-home');
          break;
        case 'Advertiser':
          navigate(`/terms-advertiser/${userId}`);
          break;
        case 'Seller':
          navigate(`/terms-seller/${userId}`);
          break;
        case 'Admin':
          navigate('/');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);  // Set the error message from the backend
      } else {
        setError('Invalid username or password. Please try again.');
      }
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
            <Link to="/forget_password">Forgot password?</Link>
          </p>
          <p>
            <Link to="/guest-home" className="link">Continue as a guest</Link>
          </p>
          <p>
            <Link to="/acc-settings">Admin Access</Link>
          </p>
        </div>
      </form>

      <style jsx>{`
        .login-form-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f4f7fc;
        }

        .login-form {
          background: #fff;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }

        .login-form h2 {
          text-align: center;
          margin-bottom: 20px;
          font-size: 24px;
          font-weight: bold;
          color: #333;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #666;
          margin-bottom: 8px;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-field {
          width: 100%;
          padding: 12px 40px;
          font-size: 16px;
          border-radius: 5px;
          border: 1px solid #ddd;
          background-color: #f7f7f7;
          transition: all 0.3s;
        }

        .input-field:focus {
          outline: none;
          border-color: #4e8ff7;
          background-color: #fff;
        }

        .input-icon {
          position: absolute;
          left: 10px;
          color: #aaa;
          font-size: 18px;
        }

        .login-button {
          width: 100%;
          padding: 12px;
          background-color: #008080;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .login-button:hover {
          background-color: #0066cc;
        }

        .error-message {
          color: red;
          font-size: 14px;
          text-align: center;
          margin-bottom: 20px;
        }

        .login-form-links {
          text-align: center;
          font-size: 14px;
          margin-top: 20px;
        }

        .login-form-links a {
          color: #008080;
          text-decoration: none;
        }

        .login-form-links a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default LoginForm;