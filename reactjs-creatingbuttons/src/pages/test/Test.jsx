import React, { useState } from 'react';
import './test.css'; // Import your CSS file here
import Register from '../Register/Register.jsx'; // Adjust path if necessary
import TestLogin from '../../components/testLogin.jsx'; // Adjust path if necessary

const Test = () => {
    const [isSignUp, setIsSignUp] = useState(true); // State to track the form

    const toggleForm = () => {
        setIsSignUp((prev) => {
            console.log('Toggling form. New value:', !prev); // Log the toggle
            return !prev; // Toggle between Sign Up and Sign In
        });
    };

    console.log('isSignUp:', isSignUp); // Log current state

    return (
        <div className={`test-container ${isSignUp ? '' : 'active'}`} id="test-container">
            {isSignUp ? ( // Conditionally render based on state
                <div className="test-form-container test-sign-up">
                    <Register />
                </div>
            ) : (
                <div className="test-form-container test-sign-in">
                    <TestLogin />
                </div>
            )}
            <div className="test-toggle-container">
                <div className="test-toggle">
                    <div className="test-toggle-panel test-toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all of the site features</p>
                        <button
                            type="button"
                            onClick={toggleForm}
                            id="login"
                            className="test-button"
                        >
                            Sign up
                        </button>
                    </div>
                    <div className="test-toggle-panel test-toggle-right">
                        <h1>Hello, Friend!</h1>
                        <p>Register with your personal details to use all of the site features</p>
                        <button
                            type="button"
                            onClick={toggleForm}
                            id="register"
                            className="test-button"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Test;
