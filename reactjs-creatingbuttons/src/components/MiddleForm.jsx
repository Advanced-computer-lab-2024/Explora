import React from "react";
import { useNavigate } from 'react-router-dom';

const MiddleForm = () => {
    const navigate = useNavigate();

    const handlesignup = (path) => {
        navigate(path);
    };

    return (
        <header>
        <div className='middle-form-container'>
            <div className='middle-form'>
                <h1>Select Account Type</h1>   
                <div className="button-group">
                    <button type="button" onClick={() => handlesignup('/tourist-profile')} className="signup-button">Sign up as a Tourist</button>
                    <button type="button" onClick={() => handlesignup('/signuptourguide')} className="signup-button">Sign up as a Tour Guide</button>
                    <button type="button" onClick={() => handlesignup('/signupadvertiser')} className="signup-button">Sign up as an Advertiser</button>
                    <button type="button" onClick={() => handlesignup('/signupseller')} className="signup-button">Sign up as a Seller</button>
                </div>
            </div>
        </div>
        </header>
    );
};

export default MiddleForm;
