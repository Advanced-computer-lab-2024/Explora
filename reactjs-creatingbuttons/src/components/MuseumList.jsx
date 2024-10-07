import React, { useState, useEffect } from 'react';

function MuseumList() {
    const [museums, setMuseums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch the list of museums when the component is mounted
    useEffect(() => {
        fetch('/api/museums')  // Adjust this URL if needed based on your API endpoint
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch museums');
                }
                return response.json();
            })
            .then((data) => {
                setMuseums(data);  // Store fetched data in state
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    // Show a loading message while the museums are being fetched
    if (loading) {
        return <p>Loading museums...</p>;
    }

    // Show an error message if there's an issue fetching the data
    if (error) {
        return <p>Error: {error}</p>;
    }

    // If no museums are added, display a message
    if (museums.length === 0) {
        return <p>No museums added yet.</p>;
    }

    // Render the list of museums
    return (
        <ul>
            {museums.map((museum, index) => (
                <li key={index}>
                    <h2>{museum.name}</h2>
                    <p><strong>Description:</strong> {museum.description}</p>
                    <p><strong>Location:</strong> {museum.location}</p>
                    <p><strong>Opening Hours:</strong> {museum.openingHours}</p>
                    <p><strong>Ticket Prices:</strong> Foreigner: {museum.ticketPrices.foreigner}, Native: {museum.ticketPrices.native}, Student: {museum.ticketPrices.student}</p>
                    <p><strong>Type:</strong> {museum.type}</p>
                    <p><strong>Historical Period:</strong> {museum.historicalPeriod}</p>
                </li>
            ))}
        </ul>
    );
}

export default MuseumList;
