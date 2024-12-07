import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Touristhome.css'; // Import the CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadset, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Touristhome() {
  const navigate = useNavigate();
  const [showPromoModal, setShowPromoModal] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  const handleClosePromoModal = () => setShowPromoModal(false);

  useEffect(() => {
    setShowPromoModal(true);
  }, []);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();

    if (query === "accounts") {
      navigate('/admin-view-users');
    
    } else if (query === "products" || query === "product") {
      navigate('/product-list-tourist');

  } else if (query === "document" || query === "documents") {
    navigate('/admin-documents');
  }
  else if (query === "complaint" || query === "complaints") {
    navigate('/admin-complaints');
  }
  else if (query === "delete" ) {
    navigate('/viewDeleteRequests');
  }
  else if (query === "flag event" ) {
    navigate('/flagged-events');
  }
  else if (query === "promo code" ) {
    navigate('/promo-code');
  }
    // Add more search functionality if needed
  };

  const handleDeleteClick = () => {
    navigate('/admin-view-users');  // Navigate to the AdminViewUsers component
  };

  const handleAddTourismGovernorClick = () => {
    navigate('/login-tourism');  // Navigate to the LogInTourism component
  };
  const handleCreatePromoCodeClick = () => {
    navigate('/promo-code');  // Navigate to the PromoCode component
  };
  const handleAddAdminClick = () => {
    navigate('/login-admin');  // Navigate to the LogInAdmin component
  };

  const handleActivityManagementClick = () => {
    navigate('/category-manager');  // Navigate to the CategoryManager component
  };

  const handleTagManagementClick = () => {
    navigate('/tag-manager');  // Navigate to the TagManager component
  };

  const handleViewProductsClick = () => {
    navigate('/product-list');  // Navigate to the ProductList component
  };

  const handleViewUploadedDocumentsClick = () => {
    navigate('/admin-documents');  // Navigate to the AdminDocumentViewer component
  };

  const handleFlagEventClick = () => {
    navigate('/flagged-events');  // Navigate to the FlaggedEvents component
  };

  const handleComplaintsClick = () => {
    navigate('/admin-complaints');  // Navigate to the AdminComplaints component
  };

  const handleDeleteRequestsClick = () => {
    navigate('/viewDeleteRequests');  // Navigate to the AdminDeleteRequests component
  };

  const handleCreatePromoCodeClick = () => {
    navigate('/promo-code');  // Navigate to the PromoCode component
  };

  const handleSalesReportClick = () => {
    navigate('/sales-report'); // Navigate to the Sales Report component
  };

  const handleHomeClick = () => navigate('/home');
  const handleLogoutClick = () => navigate('/logout');

  return (
    <div className="main-container">
      {/* Background Image */}
      <div className="background-image">
        <header className="site-header">
          <div className="header-content">
            <nav className="navigation">
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </nav>
          </div>
          <div className="logout">
            <Link to="/">Log Out</Link>
          </div>
        </header>

        <div className="logo">
          <h1>Explora</h1>

          {/* Search Bar */}
          <div className="search-bar-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search for destinations, activities, and more..."
              value={searchQuery} // Bind the input value to searchQuery
              onChange={(e) => setSearchQuery(e.target.value)} // Update the state on change
            />
            <button className="search-button" onClick={handleSearch}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="search-icon"
              >
                <path
                  d="m15.97 17.031c-1.479 1.238-3.384 1.985-5.461 1.985-4.697 0-8.509-3.812-8.509-8.508s3.812-8.508 8.509-8.508c4.695 0 8.508 3.812 8.508 8.508 0 2.078-.747 3.984-1.985 5.461l4.749 4.75c.146.146.219.338.219.531 0 .587-.537.75-.75.75-.192 0-.384-.073-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="services-section">
        <FontAwesomeIcon icon={faHeadset} className="service-icon" />
        <span className="services-text">Services</span>
      </div>

      {/* Button Container */}
      <div className="button-container">
        <button onClick={handleDeleteClick}>Delete / De-Activate Your Account</button>
        <button onClick={handleAddTourismGovernorClick}>Add Tourism Governor to the System</button>
        <button onClick={handleAddAdminClick}>Add Another Admin to the System</button>
        <button onClick={handleActivityManagementClick}>Activity Management System</button>
        <button onClick={handleTagManagementClick}>Preference Tag Management System</button>
        <button onClick={handleViewProductsClick}>View Products</button>
        <button onClick={handleViewUploadedDocumentsClick}>View Uploaded Documents</button>
        <button onClick={handleComplaintsClick}>View Complaints</button>
        <button onClick={handleDeleteRequestsClick}>View Delete Requests</button>
        <button onClick={handleFlagEventClick}>Flag Event</button>
        <button onClick={handleCreatePromoCodeClick}>Create Promo Code</button>
        <button onClick={handleSalesReportClick}>Sales Report</button>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <h2>
          <FontAwesomeIcon icon={faUsers} />
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

      {/* Footer */}
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
