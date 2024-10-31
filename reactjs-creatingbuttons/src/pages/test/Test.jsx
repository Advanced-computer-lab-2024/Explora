import React, { useState } from 'react';
import './test.css'; // Import your CSS file here
import Register from '../Register/Register.jsx'; // Adjust path if necessary
import Login from '../Login/Login.jsx'; // Adjust path if necessary

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
        <div className={`container ${isSignUp ? '' : 'active'}`} id="container">
            {isSignUp ? ( // Conditionally render based on state
                <div className="form-container sign-up">
                    <Register />
                </div>
            ) : (
                <div className="form-container sign-in">
                    <Login />
                </div>
            )}
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all of the site features</p>
                        <button type="button" onClick={toggleForm} id="login">Sign up</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Hello, Friend!</h1>
                        <p>Register with your personal details to use all of the site features</p>
                        <button type="button" onClick={toggleForm} id="register">Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Test;
