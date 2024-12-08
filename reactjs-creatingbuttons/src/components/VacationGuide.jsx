import React, { useState , useEffect} from "react";
import Stepper from "react-stepper-horizontal";
import vacation1 from '../assets/Trip-Picture-of-Silhouettes-on-a-Swing.jpg'; // Import your image
import vacation2 from '../assets/open_graph_default_image.jpg'; // Import your image
import vacation3 from '../assets/Pool6-copy-q40-Boutique-Hotel.jpg'; // Import your image
import vacation4 from '../assets/Passport-in-Airport-1140x684.jpg'; // Import your image
import vacation5 from '../assets/1_x35VOskbCHxRL_BgLZS0pw.png'; // Import your image
import logo from '../assets/cropped_image.png';
import { useNavigate } from 'react-router-dom';
const buttonStyle = {
  backgroundColor: '#008080',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  width: '100%',
  textAlign: 'center',
  cursor: 'pointer'
};

const VacationGuide = () => {
  const steps = [
    { title: "Choose Destination" },
    { title: "Book Transportation" },
    { title: "Book Accommodations" },
    { title: "Pack Essentials" },
    { title: "Start Journey" },
  ];
  const [selectedOption, setSelectedOption] = useState(null); // State to track the selected transportation option
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // State to track modal visibility
  const [enteredPromocode, setEnteredPromocode] = useState('');
  const [enteredPromocodeCredit, setEnteredPromocodeCredit] = useState('');
  const [touristId, setTouristId] = useState(localStorage.getItem('userId') || ''); // Dynamically set from localStorage
    const [isEditable, setIsEditable] = useState(false);
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isHistoryOptionsVisible, setIsHistoryOptionsVisible] = useState(false);
    const [showPromoModal, setShowPromoModal] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
    const handleMouseEnterHistory = () => setIsHistoryOptionsVisible(true);
    const handleMouseLeaveHistory = () => setTimeout(() => setIsHistoryOptionsVisible(false), 900);
    const handleClosePromoModal = () => setShowPromoModal(false);
    

    useEffect(() => {
        setShowPromoModal(true);
      }, []);
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

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

                  
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    <div style={containerStyle}>
    <div style={{ marginTop: '80px' }}>
  <h1 className="header">Vacation Guide</h1>      <Stepper
        steps={steps}
        activeStep={currentStep}
        circleTop={10}
        activeTitleColor="#008080"  // Teal for active title
        completeTitleColor="#28A745"
        completeBarColor="#28A745"
        activeColor="#008080"  // Teal for active step circle
        defaultBarColor="#CCC"
      />
      <div style={contentStyle}>
        <h2 style={titleStyle}>{steps[currentStep].title}</h2>

        {/* Conditional images for each step */}
        {currentStep === 0 && (
          <>
            <p style={descriptionStyle}>
              Discover your perfect getaway! Whether you're seeking adventure, relaxation, or cultural experiences, choosing the right destination is the first step to an unforgettable vacation. Explore stunning beaches, vibrant cities, serene mountains, or hidden gems around the world. Let us help you find the destination that matches your dream escape!
            </p>
            <img src={vacation1} alt="Vacation Destination" style={imageStyle} />
          </>
        )}

        {currentStep === 1 && (
          <>
            <p style={descriptionStyle}>
              Ready to hit the road? Choosing the best transportation is crucial for a smooth trip. Whether it's a flight, a road trip, or a train journey, we'll help you plan the best route for your destination!
            </p>
            <img src={vacation2} alt="Book Transportation" style={imageStyle} />
          </>
        )}

        {currentStep === 2 && (
          <>
            <p style={descriptionStyle}>
              Comfortable accommodations are key to an enjoyable trip. Explore various options ranging from luxurious resorts to cozy Airbnb rentals that will make your stay unforgettable.
            </p>
            <img src={vacation3} alt="Book Accommodations" style={imageStyle} />
          </>
        )}

        {currentStep === 3 && (
          <>
            <p style={descriptionStyle}>
              Don't forget the essentials! We’ll guide you on what to pack based on your destination and the activities you plan to do. Let's make sure you're fully prepared for your journey!
            </p>
            <img src={vacation4} alt="Pack Essentials" style={imageStyle} />
          </>
        )}

        {currentStep === 4 && (
          <>
            <p style={descriptionStyle}>
              You're ready to embark on your adventure! Get ready to make unforgettable memories and enjoy your vacation to the fullest.
            </p>
            <img src={vacation5} alt="Start Journey" style={imageStyle} />
          </>
        )}

        <p style={descriptionStyle}>
          Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
        </p>
        <div style={buttonContainerStyle}>
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            style={{
              ...buttonStyle,
              backgroundColor: currentStep === 0 ? "#ccc" : "#6c757d",
            }}
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            style={{
              ...buttonStyle,
              backgroundColor:
                currentStep === steps.length - 1 ? "#ccc" : "#008080", // Teal for Next button
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

const containerStyle = {
  padding: "20px",
  maxWidth: "800px",
  margin: "auto",
  backgroundColor: "#f8f9fa",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "30px",
  fontSize: "24px",
  fontWeight: "bold",
  color: "#333",
};

const contentStyle = {
  marginTop: "20px",
  textAlign: "center",
};

const titleStyle = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#333",
};

const descriptionStyle = {
  fontSize: "16px",
  color: "#555",
  margin: "10px 0",
};

const imageStyle = {
  width: "100%",
  borderRadius: "10px",
  marginTop: "20px",
};

const buttonContainerStyle = {
  marginTop: "20px",
};



export default VacationGuide;
