import React from 'react';
import { Link } from 'react-router-dom';
//import './Header.css';
//import logo from '../Assets/logo.png';  

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav className="header__nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/services">Services</Link></li>
        
        </ul>
      </nav>
    </header>
  );
};

export default Header;
