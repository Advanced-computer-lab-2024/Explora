import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UpcomingItineraries = () => {
  const [itins, setItins] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/tour_guide_itinerary/upcoming')
      .then(response => response.json())
      .then(data => {
        data = data.map((itin) => {
          // Check if 'date' exists before trying to split it
          const formattedDate = itin.date ? itin.date.split('T')[0] : 'No Date Available';
          return { ...itin, date: formattedDate };
        });
        console.log(data);
        setItins(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      {itins.map((itin) => (
        <div key={itin._id} className="itin">
          <h3>{itin.name}</h3>
          <p>date: {itin.date}</p>
          <p>{itin.price}$</p>
          <p>rating: {itin.rating}/10</p>
        </div>
      ))}
      <Link to="/EventActivityItineraryBooking">
        <button style={{ padding: '10px', margin: '10px', fontSize: '16px' }}>Book a ticket to an itinerary</button>
      </Link>
    </div>
  );
};

export default UpcomingItineraries;



