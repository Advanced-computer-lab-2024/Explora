import React from 'react';
import { useNavigate } from 'react-router-dom';
import BirthdayPromoModal from './BirthdayPromoModal'; // Import the modal
import './Touristhome.css'; // Import the CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faExclamation, faCircleXmark, faLock, faPlane, faBus, faCity, faBinoculars, faHotel, faCar, faGripLines, faUserMinus } from '@fortawesome/free-solid-svg-icons'; // Import the grip lines icon
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logo from '../assets/cropped_image.png';

export default function Touristhome() {
  const navigate = useNavigate();
  const [showPromoModal, setShowPromoModal] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHistoryOptionsVisible, setIsHistoryOptionsVisible] = useState(false);

  const handleUpdateProfileClick = () => {
    navigate('/tourist-profile');
  };

  const handleViewComplaintsClick = () => {
    navigate('/complaints');
  };

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
  const handleMouseEnterHistory = () => setIsHistoryOptionsVisible(true);
  const handleMouseLeaveHistory = () => setTimeout(() => setIsHistoryOptionsVisible(false), 500);

  const buttonStyle = {
    backgroundColor: '#008080',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    width: '100%',
    textAlign: 'center',
    cursor: 'pointer'
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    if (query === "profile") {
      navigate('/ProfileDetailsPage');
    } else if (query === "activities" || query === "activity") {
      navigate('/UpcomingActivities');
    } else if (query === "flights" || query === "flight") {
      navigate('/book-flight');
    } else if (query === "itineraries" || query === "itinerary") {
      navigate('/UpcomingItineraries');
    } else if (query === "hotels" || query === "hotel") {
      navigate('/book-hotel');
    } else if (query === "products" || query === "product") {
      navigate('/product-list-tourist');
    }
  };

  return (
    <div className="main-container">
      {/* New Navigation Bar */}
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
          <a href="/tourist-home" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="/UpcomingActivities" style={{ color: 'white', textDecoration: 'none' }}>Activities</a>
          <a href="/book-flight" style={{ color: 'white', textDecoration: 'none' }}>Flights</a>
          <a href="/book-hotel" style={{ color: 'white', textDecoration: 'none' }}>Hotels</a>
          <a href="/UpcomingItineraries" style={{ color: 'white', textDecoration: 'none' }}>Itineraries</a>
          <a href="/product-list-tourist" style={{ color: 'white', textDecoration: 'none' }}>Products</a>
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
                onClick={() => navigate('/ProfileDetailsPage')}
                style={buttonStyle}
              >
                Profile
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
                History
              </a>

              <button
                onClick={() => navigate('/cart')}
                style={buttonStyle}
              >
                Cart
              </button>
              <button
                onClick={() => navigate('/logout')}
                style={buttonStyle}
              >
                Log Out
              </button>
              <button
                onClick={() => navigate('/file-complaint')}
                style={buttonStyle}
              >
                File Complaint
              </button>
              <button
                onClick={() => navigate('/change-password')}
                style={buttonStyle}
              >
                Change Password
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
                    onClick={() => navigate('/tourist-previous-activities')}
                    style={buttonStyle}
                  >
                    Past Activities
                  </button>
                  <button
                    onClick={() => navigate('/tourist-past-itineraries')}
                    style={buttonStyle}
                  >
                    Past Itineraries
                  </button>
                  <button
                    onClick={() => navigate('/past-orders')}
                    style={buttonStyle}
                  >
                    Past Orders
                  </button>
                  <button
                    onClick={() => navigate('/view-booked-transportations')}
                    style={buttonStyle}
                  >
                    Booked Transportations
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Background Image */}
      <div className="background-image">
        {/* Other sections and page content here */}
        <div className="logo">
          {/* Search Bar */}
          <div className="search-bar-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search for destinations, activities, and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Main content buttons */}
      <div className="button-container">
        <button onClick={() => navigate('/tourist-profile')}>
          <FontAwesomeIcon icon={faUser} />
          Update Profile
        </button>
        <button onClick={() => navigate('/complaints')}>
          <FontAwesomeIcon icon={faExclamation} />
          View Issued Complaints
        </button>
        <button onClick={() => navigate('/file-complaint')}>
          <FontAwesomeIcon icon={faCircleXmark} />
          File a Complaint
        </button>
        <button onClick={() => navigate('/change-password')}>
          <FontAwesomeIcon icon={faLock} />
          Change My Password
        </button>
        <button onClick={() => navigate('/book-flight')}>
          <FontAwesomeIcon icon={faPlane} />
          Book Flight
        </button>
        <button onClick={() => navigate('/book-transportation')}>
          <FontAwesomeIcon icon={faBus} />
          Book Transportation
        </button>
        <button onClick={() => navigate('/tourist-past-itineraries')}>
          <FontAwesomeIcon icon={faCity} />
          View Past Itineraries
        </button>
        <button onClick={() => navigate('/tourist-previous-activities')}>
          <FontAwesomeIcon icon={faBinoculars} />
          View Past Activities
        </button>
        <button onClick={() => navigate('/book-hotel')}>
          <FontAwesomeIcon icon={faHotel} />
          Book Hotel
        </button>
        <button onClick={() => navigate('/view-booked-transportations')}>
          <FontAwesomeIcon icon={faCar} />
          View All My Booked Transportations
        </button>
        <button onClick={() => navigate('/vacation-guide')}>
          <FontAwesomeIcon icon={faGlobe} />
          User Guide
        </button>
        <button onClick={() => navigate('/request-account-deletion')}>
          <FontAwesomeIcon icon={faUserMinus} />
          Request Account Deletion
        </button>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <h2>
          <FontAwesomeIcon icon={faUsers} />
          Our Clients Say!
        </h2>
        <div className="testimonials-container">
          {/* Testimonials content here */}
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
            <form>
              <input type="email" placeholder="Your email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}
