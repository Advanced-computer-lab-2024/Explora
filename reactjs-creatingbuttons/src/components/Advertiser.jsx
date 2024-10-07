import React from "react";
//import './Advertiser.css';
const Advertiser = () => {
    return (
        <div className='wrapper'>
        <form action="">
        <h1>Create an activity</h1>  
        <div className="input-box">
            <input type="text" placeholder='date' required />
        </div> 
        <div className="input-box">
            <input type="text" placeholder='time' required />
        </div>
        <div className="input-box">
            <input type="text" placeholder='location' required />
        </div>
       

        <button type="submit">Create</button>
    </form>
</div>

    );
};
export default Advertiser