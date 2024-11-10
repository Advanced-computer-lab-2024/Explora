import React, { useState, useEffect } from 'react';

export default function PlaceForm({ savePlace, currentPlace, isEditing }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    openingHours: '',
    ticketPrices: { foreigner: 0, native: 0, student: 0 },
  });

  useEffect(() => {
    if (isEditing && currentPlace) {
      setFormData(currentPlace);
    } else {
      setFormData({
        name: '',
        description: '',
        location: '',
        openingHours: '',
        ticketPrices: { foreigner: 0, native: 0, student: 0 },
      });
    }
  }, [currentPlace, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handling nested ticketPrices object
    if (name.includes('ticketPrices')) {
      const [_, key] = name.split('.');
      setFormData({
        ...formData,
        ticketPrices: {
          ...formData.ticketPrices,
          [key]: Number(value),
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    savePlace(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
      <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
      <input name="openingHours" value={formData.openingHours} onChange={handleChange} placeholder="Opening Hours" required />
      <input name="ticketPrices.foreigner" value={formData.ticketPrices.foreigner} onChange={handleChange} placeholder="Foreigner Ticket Price" type="number" required />
      <input name="ticketPrices.native" value={formData.ticketPrices.native} onChange={handleChange} placeholder="Native Ticket Price" type="number" required />
      <input name="ticketPrices.student" value={formData.ticketPrices.student} onChange={handleChange} placeholder="Student Ticket Price" type="number" required />
      <button type="submit">{isEditing ? 'Update' : 'Add'} Place</button>
    </form>
  );
}
