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
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { faBookmark , faBell} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';


export default function Touristhome() {
  const navigate = useNavigate();
  const [showPromoModal, setShowPromoModal] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHistoryOptionsVisible, setIsHistoryOptionsVisible] = useState(false);

  const handleClosePromoModal = () => setShowPromoModal(false);

  useEffect(() => {
    setShowPromoModal(true);
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
  const handleMouseEnterHistory = () => setIsHistoryOptionsVisible(true);
  const handleMouseLeaveHistory = () => setTimeout(() => setIsHistoryOptionsVisible(false), 900);

  const buttonStyle = {
    backgroundColor: '#008080',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    width: '100%',
    textAlign: 'center',
    cursor: 'pointer'
  };
  const handleViewPastBookedEventsClick = () => {
    navigate('/PastBookedEvents');
};
const handleViewUpcomingBookedEventsClick = () => {
  navigate('/UpcomingBookedEvents');
};
  const handleAccountDeletionClick = () => {
    navigate('/request-account-deletion');
  };

  const handleBookTransportationClick = () => {
    navigate('/book-transportation');
  };

  const handleBookFlightClick = () => {
    navigate('/book-flight');
  };

  const handleViewPreviousActivitiesClick = () => {
    navigate('/tourist-previous-activities');
  };

  const handleViewPastItinerariesClick = () => {
    navigate('/tourist-past-itineraries');
  };

  const handleViewPastActivitiesClick = () => {
    navigate('/tourist-previous-activities');
  };

  const handleBookHotelClick = () => {
    navigate('/hotel-booking');
  };

  const handleBookmarkedeventsClick = () => {
    navigate('/Bookmarks');
  };

  const handleViewNotificationsClick = () => {
      navigate('/Notifications');
  }; 
  const handleViewOrdersClick = () => {
    navigate('/order_list');
}; 

  
 
  // New handler for viewing all booked transportations
  const handleViewBookedTransportationsClick = () => {
    navigate('/view-booked-transportations');
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
    else if (query === " past booked events" ) {
      navigate('/PastBookedEvents');
    }else if (query === "upcoming booked events" ) {
      navigate('/UpcomingBookedEvents');
    }
    else if (query === "bookmarks" ) {
      navigate('/Bookmarks');
    }
    else if (query === "notifications" ) {
      navigate('/Notifications');
    }
    else if (query === "promo codes" ) {
      navigate('/my-promo-codes');
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
          <a href="/UpcomingBookedEvents" style={{ color: 'white', textDecoration: 'none' }}>Upcoming Events</a>

          <a href="/product-list-tourist" style={{ color: 'white', textDecoration: 'none' }}>Products</a>
          <a href="/Notifications" style={{ color: 'white', textDecoration: 'none' }}>Notifications</a>


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
                onClick={() => navigate('/')}
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
              <button
                onClick={() => navigate('/Bookmarks')}
                style={buttonStyle}
              >
                Bookmarks
              </button>
              <button
                onClick={() => navigate('/my-promo-codes')}
                style={buttonStyle}
              >
                My Promo Codes
              </button>
              <button
                onClick={() => navigate('/my-promo-codes')}
                style={buttonStyle}
              >
                Current Orders
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
                  <button
                    onClick={() => navigate('/PastBookedEvents')}
                    style={buttonStyle}
                  >
                    Booked Events
                  </button>
                  <button
                    onClick={() => navigate('/order_list')}
                    style={buttonStyle}
                  >
                    View Orders
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
        <button  onClick={handleViewPastBookedEventsClick}>       <FontAwesomeIcon icon={faReceipt} />
 View All My Previously Booked Events</button>
        <button onClick={handleViewUpcomingBookedEventsClick}> <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24"><path d="M17 3v-2c0-.552.447-1 1-1s1 .448 1 1v2c0 .552-.447 1-1 1s-1-.448-1-1zm-12 1c.553 0 1-.448 1-1v-2c0-.552-.447-1-1-1-.553 0-1 .448-1 1v2c0 .552.447 1 1 1zm13 13v-3h-1v4h3v-1h-2zm-5 .5c0 2.481 2.019 4.5 4.5 4.5s4.5-2.019 4.5-4.5-2.019-4.5-4.5-4.5-4.5 2.019-4.5 4.5zm11 0c0 3.59-2.91 6.5-6.5 6.5s-6.5-2.91-6.5-6.5 2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5zm-14.237 3.5h-7.763v-13h19v1.763c.727.33 1.399.757 2 1.268v-9.031h-3v1c0 1.316-1.278 2.339-2.658 1.894-.831-.268-1.342-1.111-1.342-1.984v-.91h-9v1c0 1.316-1.278 2.339-2.658 1.894-.831-.268-1.342-1.111-1.342-1.984v-.91h-3v21h11.031c-.511-.601-.938-1.273-1.268-2z"/></svg> View All My Upcoming Booked Events</button>
        <button onClick={handleBookmarkedeventsClick}>   <FontAwesomeIcon icon={faBookmark} style={{ marginRight: '8px' }} />
Bookmarked Events</button>
        <button onClick={handleViewNotificationsClick}>   <FontAwesomeIcon icon={faBell} style={{ marginRight: '8px' }} />
View Notifications</button>
<button onClick={handleViewOrdersClick}> <FontAwesomeIcon icon={faReceipt}/>
 View All My Orders</button>

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
      {showPromoModal && <BirthdayPromoModal onClose={handleClosePromoModal} />}

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
