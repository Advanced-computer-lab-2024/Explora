import React, { useState, useEffect } from 'react';

export default function PlaceForm({ savePlace, currentPlace, isEditing }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    openingHours: '',
    ticketPrices: { foreigner: 0, native: 0, student: 0 },
    tags: [],
  });

  const allowedTags = ['Monuments', 'Museums', 'Religious Sites', 'Palaces/Castles'];

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
        tags: [],
      });
    }
  }, [currentPlace, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'tags') {
      const selectedTags = Array.from(e.target.selectedOptions, (option) => option.value);
      setFormData({
        ...formData,
        tags: selectedTags,
      });
    } else if (name.includes('ticketPrices')) {
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
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        required
      />
      <input
        name="openingHours"
        value={formData.openingHours}
        onChange={handleChange}
        placeholder="Opening Hours"
        required
      />
      <input
        name="ticketPrices.foreigner"
        value={formData.ticketPrices.foreigner}
        onChange={handleChange}
        placeholder="Foreigner Ticket Price"
        type="number"
        required
      />
      <input
        name="ticketPrices.native"
        value={formData.ticketPrices.native}
        onChange={handleChange}
        placeholder="Native Ticket Price"
        type="number"
        required
      />
      <input
        name="ticketPrices.student"
        value={formData.ticketPrices.student}
        onChange={handleChange}
        placeholder="Student Ticket Price"
        type="number"
        required
      />
      <select
        name="tags"
        multiple
        value={formData.tags}
        onChange={handleChange}
      >
        {allowedTags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
      <button type="submit">{isEditing ? 'Update' : 'Add'} Place</button>
    </form>
  );
}
