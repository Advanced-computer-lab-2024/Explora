import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUserPlus, faCity, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import './Touristhome.css'; // Ensure styles match your new design
import aboutImage from '../assets/about.jpg';
import destI1 from '../assets/destination-1.jpg'
import destI2 from '../assets/destination-2.jpg'
import destI3 from '../assets/destination-3.jpg'
import destI4 from '../assets/destination-4.jpg'
import { Link } from 'react-router-dom';


export default function Touristhome() {
  return (
    <div className="main-container">
      {/* Background Image */}
      <div className="background-image">
      <header className="site-header">
    <div className="header-content">
      <nav className="navigation">
        <ul>
          
        </ul>
      </nav>
    </div>
    <div className="logout">
    <Link to="/test">Log In / Sign Up</Link>
  </div>
  </header>
  <div className="logo">
    <h1>Explora</h1>
  </div>
</div>


      {/* About Us Section */}
      <div className="popular-destinations">
        <h2>About Us</h2>
      </div>

      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-image">
          <img src={aboutImage} alt="Tourist" />
        </div>
        <div className="welcome-text">
          <h2>
            Welcome to <span className="highlight">Explora!</span>
          </h2>
          <p>
          Explora is an innovative travel planning platform designed to revolutionize how you experience the world. Whether you’re a seasoned traveler or embarking on your first adventure, Explora provides all the tools you need to seamlessly plan, organize, and enjoy your trips. From creating detailed itineraries to managing bookings, Explora simplifies every aspect of travel, ensuring you focus on what truly matters—exploring new destinations and making unforgettable memories.
          </p>
          <p>
           
          </p>
          <ul className="features-list">
            <li>
              <FontAwesomeIcon icon={faCheck} className="icon" /> First Class Flights
            </li>
            <li>
              <FontAwesomeIcon icon={faCheck} className="icon" /> 5 Star Accommodations
            </li>
            <li>
              <FontAwesomeIcon icon={faCheck} className="icon" /> 150 Premium City Tours
            </li>
            <li>
              <FontAwesomeIcon icon={faCheck} className="icon" /> Handpicked Hotels
            </li>
            <li>
              <FontAwesomeIcon icon={faCheck} className="icon" /> Latest Model Vehicles
            </li>
            <li>
              <FontAwesomeIcon icon={faCheck} className="icon" /> 24/7 Service
            </li>
          </ul>
        </div>
      </div>
      <div className="popular-destinations">
        <h2>Services</h2>
      </div>
      {/* Non-Clickable Buttons */}
      <div className="custom-button-container">
  <div className="custom-button">
    <FontAwesomeIcon icon={faUserPlus} className="custom-icon" />
    WorldWide Tours
  </div>
  <div className="custom-button">
    <FontAwesomeIcon icon={faCity} className="custom-icon" />
    Hotel Reservation
  </div>
  <div className="custom-button">
    <FontAwesomeIcon icon={faUserMinus} className="custom-icon" />
    Travel Guides
  </div>
  <div className="custom-button">
    <FontAwesomeIcon icon={faUserMinus} className="custom-icon" />
    Event Management
  </div><div className="custom-button">
    <FontAwesomeIcon icon={faUserMinus} className="custom-icon" />
    Flight Booking
  </div><div className="custom-button">
    <FontAwesomeIcon icon={faUserMinus} className="custom-icon" />
    Quality Products
  </div>
</div>

<div className="popular-destinations">
  <h2>Popular Destinations</h2>
  <div className="destinations-grid">
    <div className="destination-item">
      <img src={destI1} alt="Thailand" />
      <div className="destination-label">Thailand</div>
    </div>
    <div className="destination-item">
      <img src={destI2} alt="Indonesia" />
      <div className="destination-label">Indonesia</div>
    </div>
    <div className="destination-item">
      <img src={destI3} alt="Malaysia" />
      <div className="destination-label">Malaysia</div>
    </div>
    <div className="destination-item">
      <img src={destI4} alt="Australia" />
      <div className="destination-label">Australia</div>
    </div>
  </div>
</div>

<div className="easy-steps">
  <h2 className="steps-title">
    <span className="steps-highlight">Process</span>
    <br />
    3 Easy Steps
  </h2>
  <div className="steps-container">
    <div className="step-item">
      <div className="step-icon">
        <i className="fas fa-globe"></i>
      </div>
      <h3>Choose A Destination</h3>
      <p>
        
      </p>
    </div>
    <div className="step-item">
      <div className="step-icon">
        <i className="fas fa-dollar-sign"></i>
      </div>
      <h3>Pay Online</h3>
      <p>
       
      </p>
    </div>
    <div className="step-item">
      <div className="step-icon">
        <i className="fas fa-plane"></i>
      </div>
      <h3>Fly Today</h3>
      <p>
       
      </p>
    </div>
  </div>
</div>
<div className="popular-destinations">
      <h2>
  Our Clients Say!
</h2>
<div className="testimonials-container">
          <div className="testimonial">
            <img src="client1.jpg" alt="Client 1" className="testimonial-image" />
            <h3>John Doe</h3>
            <p>New York, USA</p>
            <p>Basant and Haidy are the best front end people ever</p>
          </div>
          <div className="testimonial highlight">
            <img src="client2.jpg" alt="Client 2" className="testimonial-image" />
            <h3>Jane Smith</h3>
            <p>Los Angeles, USA</p>
            <p>Thank you Basant and Haidy for the best website ever</p>
          </div>
          <div className="testimonial">
            <img src="client3.jpg" alt="Client 3" className="testimonial-image" />
            <h3>Sam Wilson</h3>
            <p>Chicago, USA</p>
            <p>i luv basant and haidy 4ever</p>
          </div>
          </div>
          </div>



      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h3>Company</h3>
            <ul>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contact</h3>
            <ul>
              <li>123 Street, New York, USA</li>
              <li>+012 345 67890</li>
              <li>info@example.com</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Gallery</h3>
            <div className="gallery">
              <img src="gallery1.jpg" alt="Gallery 1" />
              <img src="gallery2.jpg" alt="Gallery 2" />
              <img src="gallery3.jpg" alt="Gallery 3" />
            </div>
          </div>
          <div className="footer-column">
            <h3>Newsletter</h3>
            <p>Subscribe to our newsletter</p>
            <form>
              <input type="email" placeholder="Your email" />
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© Your Site Name, All Rights Reserved. Designed by HTML Codex</p>
        </div>
      </footer>
    </div>
  );
}
