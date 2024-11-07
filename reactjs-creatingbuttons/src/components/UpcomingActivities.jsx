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
    </div>
  );
};

export default UpcomingActivities;