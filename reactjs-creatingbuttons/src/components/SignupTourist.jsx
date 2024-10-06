import React from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const SignupTourist = () => {
    const navigate = useNavigate();  // Initialize navigate function

    const handleSubmit = (event) => {
        event.preventDefault();
        // You can add any validation or API call logic here
        navigate('/tourist-home');  // Redirect to Touristhome when form is submitted
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>  {/* Attach the handleSubmit function */}
                <h1>Signup as a tourist</h1>  
                <div className="input-box">
                    <input type="text" placeholder='Username' required />
                </div> 
                <div className="input-box">
                    <input type="text" placeholder='Email' required />
                </div>
                <div className="input-box">
                    <input type="password" placeholder='Password' required />
                </div>
                <div className="input-box">
                    <input type="text" placeholder='Mobile Number' required />
                </div>
                <div className="input-box">
                    <input type="text" placeholder='Nationality' required />
                </div>
                <div className="input-box">
                    <input type="text" placeholder='Date of birth' required />
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox" />Job</label>
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox" />Student</label>
                </div>
                
                <button type="submit">Signup</button> 
            </form>
        </div>
    );
};

export default SignupTourist;
