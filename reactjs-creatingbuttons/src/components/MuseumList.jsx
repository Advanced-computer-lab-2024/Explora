import React from 'react';

function MuseumList({ museums }) {
    if (museums.length === 0) {
        return <p>No museums added yet.</p>;
    }

    return (
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
    );
}

export default MuseumList;
