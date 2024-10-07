import React, { useState } from 'react';

function MuseumForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [openingHours, setOpeningHours] = useState('');
    const [ticketPrice, setTicketPrice] = useState({ foreigner: '', native: '', student: '' });
    const [type, setType] = useState('Monuments');
    const [historicalPeriod, setHistoricalPeriod] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newMuseum = {
            name,
            description,
            location,
            openingHours,
            ticketPrice,
            type,
            historicalPeriod,
        };

        // Send a POST request to the back-end to add the museum
        fetch('/api/museums/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMuseum)
        })
        .then(response => response.json())
        .then(data => {
            setMessage('Museum added successfully!');
            console.log(data);
            // Reset form fields
            setName('');
            setDescription('');
            setLocation('');
            setOpeningHours('');
            setTicketPrice({ foreigner: '', native: '', student: '' });
            setType('Monuments');
            setHistoricalPeriod('');
        })
        .catch(error => {
            setMessage('Error adding museum');
            console.error('Error:', error);
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Museum Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Museum Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Opening Hours"
                    value={openingHours}
                    onChange={(e) => setOpeningHours(e.target.value)}
                    required
                />
                <h4>Ticket Prices</h4>
                <input
                    type="number"
                    placeholder="Price for Foreigners"
                    value={ticketPrice.foreigner}
                    onChange={(e) => setTicketPrice({ ...ticketPrice, foreigner: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Price for Natives"
                    value={ticketPrice.native}
                    onChange={(e) => setTicketPrice({ ...ticketPrice, native: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Price for Students"
                    value={ticketPrice.student}
                    onChange={(e) => setTicketPrice({ ...ticketPrice, student: e.target.value })}
                    required
                />
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="Monuments">Monuments</option>
                    <option value="Museums">Museums</option>
                    <option value="Religious Sites">Religious Sites</option>
                    <option value="Palaces/Castles">Palaces/Castles</option>
                </select>
                <input
                    type="text"
                    placeholder="Historical Period"
                    value={historicalPeriod}
                    onChange={(e) => setHistoricalPeriod(e.target.value)}
                    required
                />
                <button type="submit">Add Museum</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default MuseumForm;
