import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Touristhome.css'; // Import the CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {
  faUserMinus,
  faUserPlus,
  faBinoculars,
  faHeart,
  faBagShopping,
  faFile,
  faShop,
  faExclamation,
  faUsers,
  faFlag,
  faPercent,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/cropped_image.png';
const buttonStyle = {
  backgroundColor: '#008080',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  width: '100%',
  textAlign: 'center',
  cursor: 'pointer'
};

export default function Touristhome() {
  const navigate = useNavigate();
  const [showPromoModal, setShowPromoModal] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  const handleClosePromoModal = () => setShowPromoModal(false);
  const [message, setMessage] = useState('');
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [badgeLevel, setBadgeLevel] = useState('');
  const [guideRatings, setGuideRatings] = useState({});
  const [guideComments, setGuideComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHistoryOptionsVisible, setIsHistoryOptionsVisible] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
  const handleMouseEnterHistory = () => setIsHistoryOptionsVisible(true);
  const handleMouseLeaveHistory = () => setTimeout(() => setIsHistoryOptionsVisible(false), 900);

  useEffect(() => {
      setShowPromoModal(true);
    }, []);

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
    <div>
           <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '1px 5px',
          backgroundColor: '#008080',
          color: 'white',
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1000,
          justifyContent: 'space-between',
        }}
      >
        <img src={logo} alt="Logo" style={{ height: '80px', marginRight: '10px' }} />

        {/* Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="/acc-settings" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="/flagged-events" style={{ color: 'white', textDecoration: 'none' }}>Flag Event</a>
          

          <a href="/product-list" style={{ color: 'white', textDecoration: 'none' }}>Products</a>


        </div>

        {/* SVG Icon */}
        <div style={{ marginLeft: 'auto', marginRight: '60px' }}>
          <svg
            onClick={toggleDropdown}
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="54"
            viewBox="0 0 24 24"
            style={{ cursor: 'pointer', color: 'white' }}
          >
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z" fill="white" />
          </svg>
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '80px',
                right: '0',
                backgroundColor: '#008080',
                color: 'white',
                borderRadius: '5px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                width: '200px',
                padding: '10px 0',
                zIndex: 1000,
              }}
              onMouseEnter={handleMouseEnterHistory}
              onMouseLeave={handleMouseLeaveHistory}
            >
              <button
                onClick={() => navigate('/category-manager')}
                style={buttonStyle}
              >
                Manage Activities
              </button>
              <button
                onClick={() => navigate('/tag-manager')}
                style={buttonStyle}
              >
                Manage Prefrences
              </button>
              <a
                href="/history"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  textAlign: 'center',
                  display: 'block',
                }}
              >
                Manage Accounts
              </a>

              <button
                onClick={() => navigate('/admin-documents')}
                style={buttonStyle}
              >
                View Uploaded Documents
              </button>
              <button
                onClick={() => navigate('/')}
                style={buttonStyle}
              >
                Log Out
              </button>
              <button
                onClick={() => navigate('/admin-complaints')}
                style={buttonStyle}
              >
                View Complaints
              </button>
              <button
                onClick={() => navigate('/viewDeleteRequests')}
                style={buttonStyle}
              >
                View Delete Requests
              </button>
              <button
                onClick={() => navigate('/promo-code')}
                style={buttonStyle}
              >
                Create Promo Code
              </button>
            

              {isHistoryOptionsVisible && (
                <div
                  style={{
                    position: 'absolute',
                    top: '80px',
                    right: '220px',
                    backgroundColor: '#008080',
                    color: 'white',
                    borderRadius: '5px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    width: '200px',
                    padding: '10px 0',
                    zIndex: 1000,
                  }}
                >
                  <button
                    onClick={() => navigate('/admin-view-users')}
                    style={buttonStyle}
                  >
Delete Accounts                  </button>
                  <button
                    onClick={() => navigate('/login-tourism')}
                    style={buttonStyle}
                  >
Add Tourism Governor                  </button>
                  <button
                    onClick={() => navigate('/login-admin')}
                    style={buttonStyle}
                  >
Add Admin                  </button>
                  

                  
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
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
        <button onClick={handleDeleteClick}>       <FontAwesomeIcon icon={faUsers} />
Delete / De-Activate Your Account</button>
        <button onClick={handleAddTourismGovernorClick}>       <FontAwesomeIcon icon={faUserPlus} />
Add Tourism Governor to the System</button>
        <button onClick={handleAddAdminClick}>       <FontAwesomeIcon icon={faUserPlus} />
Add Another Admin to the System</button>
        <button onClick={handleActivityManagementClick}>       <FontAwesomeIcon icon={faBinoculars} />
Activity Management System</button>
        <button onClick={handleTagManagementClick}>       <FontAwesomeIcon icon={faHeart} />
Preference Tag Management System</button>
        <button onClick={handleViewProductsClick}>       <FontAwesomeIcon icon={faShop} />
View Products</button>
        <button onClick={handleViewUploadedDocumentsClick}>       <FontAwesomeIcon icon={faFile} />
View Uploaded Documents</button>
        <button onClick={handleComplaintsClick}>       <FontAwesomeIcon icon={faExclamation} />
View Complaints</button>
        <button onClick={handleDeleteRequestsClick}>       <FontAwesomeIcon icon={faUserMinus} />
View Delete Requests</button>
        <button onClick={handleFlagEventClick}>       <FontAwesomeIcon icon={faFlag} />
Flag Event</button>
        <button onClick={handleCreatePromoCodeClick}>       <FontAwesomeIcon icon={faPercent} />
Create Promo Code</button>
        <button onClick={handleSalesReportClick}>       <FontAwesomeIcon icon={faChartLine} />
Sales Report</button>
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
    </div>
  );
}
