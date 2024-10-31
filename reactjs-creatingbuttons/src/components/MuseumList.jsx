import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MuseumList() {
    const [museums, setMuseums] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMuseums = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/museums');
                setMuseums(response.data);
            } catch (error) {
                setError('Failed to fetch museums. Please try again later.');
                console.error('Error fetching museums:', error);
            }
        };

        fetchMuseums();
    }, []);

    if (museums.length === 0) {
        return <p>No museums added yet.</p>;
    }

    return (
        <div>
            <h2>Museum List</h2>
            {error && <p>{error}</p>}
            <ul>
                {museums.map((museum, index) => (
                    <li key={index}>
                        <h2>{museum.name}</h2>
                        <p><strong>Description:</strong> {museum.description}</p>
                        <p><strong>Location:</strong> {museum.location}</p>
                        <p><strong>Opening Hours:</strong> {museum.openingHours}</p>
                        <p><strong>Ticket Prices:</strong> Foreigner: {museum.ticketPrice.foreigner}, Native: {museum.ticketPrice.native}, Student: {museum.ticketPrice.student}</p>
                        <p><strong>Type:</strong> {museum.type}</p>
                        <p><strong>Historical Period:</strong> {museum.historicalPeriod}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MuseumList;