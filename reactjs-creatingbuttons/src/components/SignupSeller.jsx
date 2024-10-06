import React from "react";
import { useNavigate } from "react-router-dom";

const SignupSeller = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    // You can add form validation or API calls here if needed
    navigate('/seller-home'); // Redirect to Sellerhome after signup
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Signup as a seller</h1>  
        <div className="input-box">
          <input type="text" placeholder='Username' required />
        </div> 
        <div className="input-box">
          <input type="text" placeholder='Email' required />
        </div>
        <div className="input-box">
          <input type="password" placeholder='Password' required />
        </div>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupSeller;
