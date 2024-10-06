import React, { useState } from 'react';
import { Link } from "react-router-dom";
const CompanyProfilePage = () => {
    return(
<header>
<div className='wrapper'>
<form action="">
<h1>hello advertiser</h1>  
<div> 
<Link to="/amanager">
<button type="button">Create activity</button></Link></div> 
<div> 
<Link to="/profileform">
<button type="button">Create new Profile</button></Link></div> 
<div> 
<Link to="/profile">
<button type="button">View profiles</button></Link></div> 
</form>
</div>
</header>
    );
};
export default CompanyProfilePage;