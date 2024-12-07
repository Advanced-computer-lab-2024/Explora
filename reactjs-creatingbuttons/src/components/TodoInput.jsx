import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BirthdayPromoModal from './BirthdayPromoModal'; // Import the modal
import './Touristhome.css'; // Import the CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faExclamation, 
  faCircleXmark, 
  faLock, 
  faPlane, 
  faBus, 
  faCity, 
  faBinoculars, 
  faHotel, 
  faCar, 
  faGripLines, 
  faUserPlus, 
  faUsers, 
  faUserMinus // Ensure faUserMinus is imported
} from '@fortawesome/free-solid-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faShop } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';




export default function Touristhome() {
  const navigate = useNavigate();
  const [showPromoModal, setShowPromoModal] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");


  const handleClosePromoModal = () => setShowPromoModal(false);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();

    if (query === "profile") {
      navigate('/ProfileDetailsPage'); // Redirect to the ProfileDetailsPage
    } else if (query === "activities" || query === "activity") {
      navigate('/UpcomingActivities'); // Redirect to the UpcomingActivities page
    } else if (query === "tour" || query === "guide" || query === "tour guide" || query === "itinerary" || query === "itineraries") {
      navigate('/itinerariesList'); // Redirect to the Book Flight page
    
    } else if (query === "create itinerary" || query === "create") {
      navigate('/create-itinerary'); // Redirect to the Book Hotel page
    } else if (query === "products" || query === "product") {
      navigate('/product-list-tourist'); // Redirect to the Product Card Tourist page
    }
    // Add any other search functionality if needed
  };

  useEffect(() => {
    setShowPromoModal(true);
  }, []);

  const handleUpdateProfileClick = () => navigate('/tourist-profile');
  const handleViewComplaintsClick = () => navigate('/complaints');
  const handleFileComplaintClick = () => navigate('/file-complaint');
  const handleAccountDeletionClick = () => navigate('/request-account-deletion');
  const handleBookTransportationClick = () => navigate('/book-transportation');
  const handleBookFlightClick = () => navigate('/book-flight');
  const handleViewPastItinerariesClick = () => navigate('/tourist-past-itineraries');
  const handleViewPastActivitiesClick = () => navigate('/tourist-previous-activities');
  const handleBookHotelClick = () => navigate('/book-hotel');
  const handleViewBookedTransportationsClick = () => navigate('/view-booked-transportations');
  const handleUseGuideClick = () => {
    navigate('/vacation-guide'); // Navigate to the VacationGuide component
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

{/* Services Text Section */}
<div className="services-section">
<FontAwesomeIcon icon={faHeadset} className="service-icon" />

  <span className="services-text">Tour Guide Services</span>
</div>




      <div className="button-container">
      <button onClick={() => navigate('/create-profile')}>
  <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: '8px' }} /> Create Profile
</button>


<button onClick={() => navigate('/tour-guide-itinerary')}>
  <FontAwesomeIcon icon={faCity} style={{ marginRight: '8px' }} /> Tour Guide Itinerary
</button>


     

      {/* New button for Account Deletion Request */}
      <button onClick={() => navigate('/request-account-deletion')}>
  <FontAwesomeIcon icon={faUserMinus} style={{ marginRight: '8px' }} /> Request Account Deletion
</button>

      </div>
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
