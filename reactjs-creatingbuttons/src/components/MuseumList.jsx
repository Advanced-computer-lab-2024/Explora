import React from 'react';

function MuseumList({ museums, onDelete }) {
    if (museums.length === 0) {
        return <p>No museums available. Add one!</p>;
    }

    return (
        <ul>
            {museums.map((museum, index) => (
                <li key={index}>
                    <h2>{museum.name}</h2>
                    <p>{museum.description}</p>
                    <p><strong>Location:</strong> {museum.location}</p>
                    <p><strong>Opening Hours:</strong> {museum.openingHours}</p>
                    <p><strong>Ticket Price (Foreigner):</strong> ${museum.ticketPrice?.foreigner || "N/A"}</p>
                    <p><strong>Ticket Price (Native):</strong> ${museum.ticketPrice?.native || "N/A"}</p>
                    <p><strong>Ticket Price (Student):</strong> ${museum.ticketPrice?.student || "N/A"}</p>
                    <p><strong>Type:</strong> {museum.type}</p>
                    <p><strong>Historical Period:</strong> {museum.historicalPeriod || "N/A"}</p> {/* Add this line */}
                    <button onClick={() => onDelete(index)}>Delete</button>
                </li>
            ))}
        </ul>
    );
}

export default MuseumList;
