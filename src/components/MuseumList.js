// src/components/MuseumList.js
import React from 'react';

function MuseumList({ museums }) {
    return (
        <div>
            {museums.map((museum, index) => (
                <div key={index}>
                    <h2>{museum.name}</h2>
                    <p>{museum.description}</p>
                    <p>Location: {museum.location}</p>
                    <p>Opening Hours: {museum.openingHours}</p>
                    <p>Ticket Prices:</p>
                    <ul>
                        <li>Native: {museum.ticketPrices.native} USD</li>
                        <li>Foreigner: {museum.ticketPrices.foreigner} USD</li>
                        <li>Student: {museum.ticketPrices.student} USD</li>
                    </ul>
                    <p>Type: {museum.type}</p>
                    <p>Historical Period: {museum.period}</p>
                </div>
            ))}
        </div>
    );
}

export default MuseumList;
