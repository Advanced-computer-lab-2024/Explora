// src/components/MuseumForm.js
import React, { useState } from 'react';
import { TAG_TYPES, HISTORICAL_PERIODS } from '../constants';

function MuseumForm({ onSubmit }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [openingHours, setOpeningHours] = useState('');
    const [ticketPrices, setTicketPrices] = useState({ native: '', foreigner: '', student: '' });
    const [type, setType] = useState('');
    const [period, setPeriod] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, description, location, openingHours, ticketPrices, type, period });
        // Clear form
        setName('');
        setDescription('');
        setLocation('');
        setOpeningHours('');
        setTicketPrices({ native: '', foreigner: '', student: '' });
        setType('');
        setPeriod('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Museum Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
            <input type="text" placeholder="Opening Hours" value={openingHours} onChange={(e) => setOpeningHours(e.target.value)} required />
            <input type="number" placeholder="Ticket Price (Native)" value={ticketPrices.native} onChange={(e) => setTicketPrices({ ...ticketPrices, native: e.target.value })} required />
            <input type="number" placeholder="Ticket Price (Foreigner)" value={ticketPrices.foreigner} onChange={(e) => setTicketPrices({ ...ticketPrices, foreigner: e.target.value })} required />
            <input type="number" placeholder="Ticket Price (Student)" value={ticketPrices.student} onChange={(e) => setTicketPrices({ ...ticketPrices, student: e.target.value })} required />

            <select value={type} onChange={(e) => setType(e.target.value)} required>
                <option value="">Select Type</option>
                {TAG_TYPES.map((tag) => (
                    <option key={tag} value={tag}>{tag}</option>
                ))}
            </select>

            <select value={period} onChange={(e) => setPeriod(e.target.value)} required>
                <option value="">Select Historical Period</option>
                {HISTORICAL_PERIODS.map((period) => (
                    <option key={period} value={period}>{period}</option>
                ))}
            </select>

            <button type="submit">Add Museum</button>
        </form>
    );
}

export default MuseumForm;
