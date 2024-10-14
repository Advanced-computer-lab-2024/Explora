// src/components/MyActivities.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyActivities = () => {
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState('');

    // Fetching activities from backend
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/activities');
                setActivities(response.data);
            } catch (error) {
                setError('Failed to fetch activities. Please try again later.');
                console.error('Error fetching activities:', error);
            }
        };

        fetchActivities();
    }, []);

    return (
        <div>
            <h1>My Created Activities</h1>
            {error && <p>{error}</p>}
            <ul>
                {activities.length > 0 ? (
                    activities.map((activity) => (
                        <li key={activity.id}>
                            <h2>{activity.name}</h2>
                            <p>{activity.description}</p>
                            <p>Location: {activity.location}</p>
                            <p>Type: {activity.type}</p>
                            <p>Opening Hours: {activity.openingHours}</p>
                            <h4>Ticket Prices</h4>
                            <ul>
                                <li>Native: ${activity.ticketPrices.native}</li>
                                <li>Foreigner: ${activity.ticketPrices.foreigner}</li>
                                <li>Student: ${activity.ticketPrices.student}</li>
                            </ul>
                        </li>
                    ))
                ) : (
                    <p>No activities found.</p>
                )}
            </ul>
        </div>
    );
};

export default MyActivities;