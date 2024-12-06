import React, { useState } from "react";
import Stepper from "react-stepper-horizontal";
import vacation1 from '../assets/Trip-Picture-of-Silhouettes-on-a-Swing.jpg'; // Import your image
import vacation2 from '../assets/open_graph_default_image.jpg'; // Import your image
import vacation3 from '../assets/Pool6-copy-q40-Boutique-Hotel.jpg'; // Import your image
import vacation4 from '../assets/Passport-in-Airport-1140x684.jpg'; // Import your image
import vacation5 from '../assets/1_x35VOskbCHxRL_BgLZS0pw.png'; // Import your image

const VacationGuide = () => {
  const steps = [
    { title: "Choose Destination" },
    { title: "Book Transportation" },
    { title: "Book Accommodations" },
    { title: "Pack Essentials" },
    { title: "Start Journey" },
  ];

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
    <div style={containerStyle}>
      <h1 style={headerStyle}>Vacation Guide</h1>
      <Stepper
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

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  margin: "0 10px",
  transition: "background-color 0.3s ease",
};

export default VacationGuide;
