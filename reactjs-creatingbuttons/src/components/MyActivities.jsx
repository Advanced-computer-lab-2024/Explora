// src/components/MyActivities.js
import React, { useEffect, useState } from 'react';

// Mock data for testing purposes
const mockActivities = [
    {
        id: 1,
        name: 'Great Pyramid of Giza',
        description: 'An ancient pyramid located in Egypt.',
        location: 'Giza, Egypt',
        type: 'Monument',
        openingHours: '9 AM - 5 PM',
        ticketPrices: {
            native: 100,
            foreigner: 200,
            student: 50
        }
    },
    {
        id: 2,
        name: 'Louvre Museum',
        description: 'The world’s largest art museum in Paris, France.',
        location: 'Paris, France',
        type: 'Museum',
        openingHours: '9 AM - 6 PM',
        ticketPrices: {
            native: 150,
            foreigner: 250,
            student: 100
        }
    },
    {
        id: 3,
        name: 'Notre-Dame Cathedral',
        description: 'A famous gothic cathedral located in Paris.',
        location: 'Paris, France',
        type: 'Religious Site',
        openingHours: '8 AM - 7 PM',
        ticketPrices: {
            native: 0,
            foreigner: 0,
            student: 0
        }
    },
    // Add more mock activities here if needed
];

const MyActivities = () => {
    const [activities, setActivities] = useState([]);

    // Mimicking API call
    useEffect(() => {
        // In real case, this would be an API call
        setActivities(mockActivities);
    }, []);

    return (
        <div>
            <h1>My Created Activities</h1>
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
