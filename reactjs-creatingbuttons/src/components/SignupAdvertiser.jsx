import React from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const SignupAdvertiser = () => {
    const navigate = useNavigate();  // Initialize useNavigate

    const handleSubmit = (event) => {
        event.preventDefault();  // Prevent the default form submission
        // Here you can handle any form validation or state management before navigating
        
        // Navigate to TodoInput after successful sign up
        navigate('/company');
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>  {/* Handle form submission with handleSubmit */}
                <h1>Signup as an advertiser</h1>  
                <div className="input-box">
                    <input type="text" placeholder='Username' required />
                </div> 
                <div className="input-box">
                    <input type="text" placeholder='Email' required />
                </div>
                <div className="input-box">
                    <input type="password" placeholder='Password' required />
                </div>

                <button type="submit">Signup</button>  {/* When clicked, it will call handleSubmit */}
            </form>
        </div>
    );
};



export default SignupAdvertiser