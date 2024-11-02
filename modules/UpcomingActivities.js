import React from 'react';

import { useState, useEffect } from 'react';

const UpcomingActivities = () => {

  const [places,setPlaces]=useState([])

  useEffect(() => {
  fetch('http://localhost:4000/api/activity/upcoming').then(response => response.json()).then(data => {  
      data=data.map((place)=>{return {...place,date:place.date.split('T')[0]}})
      console.log(data)
      setPlaces(data);
  })
  
  },[])

  return (
  <div>
   {  places.map((place) => ( 
      <div key={place._id} className="place">
        <h3>{place.name}</h3>
        <p>date: {place.date}</p>
        <p>{place.price}$</p>
        <p>rating: {place.rating}/10</p>

       
      </div>
     ))}
     <div>
       {/* Link button your bookings */}
       <Link to="/UpcomingBookings">
          <button style={buttonStyle}>View Your Bookings</button>
        </Link>
     </div>
    
  </div>
    
  );
};

const buttonStyle = {
  margin: '0 10px',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

export default UpcomingActivities;
