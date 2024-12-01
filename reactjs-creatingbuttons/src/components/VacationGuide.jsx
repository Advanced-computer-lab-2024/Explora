import React, { useState } from "react";
import Stepper from "react-stepper-horizontal";

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
        activeTitleColor="#007BFF"
        completeTitleColor="#28A745"
        completeBarColor="#28A745"
        activeColor="#007BFF"
        defaultBarColor="#CCC"
      />
      <div style={contentStyle}>
        <h2 style={titleStyle}>{steps[currentStep].title}</h2>
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
                currentStep === steps.length - 1 ? "#ccc" : "#007BFF",
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
