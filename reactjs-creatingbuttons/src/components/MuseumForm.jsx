import React, { useState } from 'react';
import axios from 'axios';

function MuseumForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [openingHours, setOpeningHours] = useState('');
    const [ticketPrice, setTicketPrice] = useState({ foreigner: '', native: '', student: '' });
    const [type, setType] = useState('Monuments');
    const [historicalPeriod, setHistoricalPeriod] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newMuseum = {
            name,
            description,
            location,
            openingHours,
            ticketPrice: {
                foreigner: parseFloat(ticketPrice.foreigner),
                native: parseFloat(ticketPrice.native),
                student: parseFloat(ticketPrice.student),
            },
            type,
            historicalPeriod,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/museums', newMuseum);
            setMessage('Museum added successfully!');
            console.log('Museum added successfully:', response.data);
        } catch (error) {
            setMessage('Failed to add museum. Please try again.');
            console.error('There was an error adding the museum:', error);
        }

        // Reset form fields
        setName('');
        setDescription('');
        setLocation('');
        setOpeningHours('');
        setTicketPrice({ foreigner: '', native: '', student: '' });
        setType('Monuments');
        setHistoricalPeriod('');
    };

    return (
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
                min="0"
                required
            />
            <input
                type="number"
                placeholder="Price for Natives"
                value={ticketPrice.native}
                onChange={(e) => setTicketPrice({ ...ticketPrice, native: e.target.value })}
                min="0"
                required
            />
            <input
                type="number"
                placeholder="Price for Students"
                value={ticketPrice.student}
                onChange={(e) => setTicketPrice({ ...ticketPrice, student: e.target.value })}
                min="0"
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
            {message && <p>{message}</p>}
        </form>
    );
}

export default MuseumForm;