import React from 'react';

import { useState, useEffect } from 'react';

const UpcomingItineraries = () => {

  const [itins,setItins]=useState([])

  useEffect(() => {
  fetch('http://localhost:4000/api/tour_guide_itinerary/upcoming').then(response => response.json()).then(data => {  
   
  })
  
  },[])

  return (
    <div>
   {  itins.map((place) => ( 
      <div key={place._id} className="place">
        <h3>{place.name}</h3>
        <p>date: {place.date}</p>
        <p>{place.price}$</p>
        <p>rating: {place.rating}/10</p>
      </div>
     ))}
    </div>
  );
};

export default UpcomingItineraries;