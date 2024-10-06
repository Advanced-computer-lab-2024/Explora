import React from "react";
//import './SignupAdvertiser.css';
import { Link } from "react-router-dom";
const SignupAdvertiser = () => {
    return (
        <div className='wrapper'>
        <form action="">
        <h1>Signup as an advertiser</h1>  
        <div className="input-box">
            <input type="text" placeholder='Username'  />
        </div> 
        <div className="input-box">
            <input type="text" placeholder='Email'  />
        </div>
        <div className="input-box">
            <input type="password" placeholder='Password'  />
        </div>
     <div> 
<Link to="/company">
        <button type="button">Signup</button></Link></div> 
    </form>
</div>
   );
};
export default SignupAdvertiser