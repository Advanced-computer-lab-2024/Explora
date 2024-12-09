import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MuseumsManager() {
  const [museums, setMuseums] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    openingHours: '',
    ticketPrices: { foreigner: '', native: '', student: '' },
    tags: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentMuseumId, setCurrentMuseumId] = useState(null);

  const allowedTags = ['Monuments', 'Museums', 'Religious Sites', 'Palaces/Castles'];

  useEffect(() => {
    fetchMuseums();
  }, []);

  // Fetch all museums
  const fetchMuseums = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/museums/museums');
      if (Array.isArray(response.data)) {
        setMuseums(response.data);
      } else {
        console.error('Response is not an array');
      }
    } catch (error) {
      console.error('Error fetching museums:', error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'tags') {
      const selectedTags = Array.from(e.target.selectedOptions, (option) => option.value);
      setFormData((prev) => ({ ...prev, tags: selectedTags }));
    } else if (['foreigner', 'native', 'student'].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        ticketPrices: { ...prev.ticketPrices, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:4000/api/museums/${currentMuseumId}`, formData);
      } else {
        await axios.post('http://localhost:4000/api/museums/', formData);
      }
      fetchMuseums();
      resetForm();
    } catch (error) {
      console.error('Error saving museum:', error);
    }
  };

  // Edit a museum
  const handleEdit = (museum) => {
    setFormData(museum);
    setIsEditing(true);
    setCurrentMuseumId(museum._id);
  };

  // Delete a museum
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/museums/${id}`);
      fetchMuseums();
    } catch (error) {
      console.error('Error deleting museum:', error);
    }
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      location: '',
      openingHours: '',
      ticketPrices: { foreigner: '', native: '', student: '' },
      tags: [],
    });
    setIsEditing(false);
    setCurrentMuseumId(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{isEditing ? 'Edit Museum' : 'Add Museum'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <textarea
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
          name="foreigner"
          value={formData.ticketPrices.foreigner}
          onChange={handleChange}
          placeholder="Foreigner Ticket Price"
          required
        />
        <input
          name="native"
          value={formData.ticketPrices.native}
          onChange={handleChange}
          placeholder="Native Ticket Price"
          required
        />
        <input
          name="student"
          value={formData.ticketPrices.student}
          onChange={handleChange}
          placeholder="Student Ticket Price"
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
        <button type="submit">{isEditing ? 'Update Museum' : 'Add Museum'}</button>
        {isEditing && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <h2>Museums</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Description</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Location</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Opening Hours</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Ticket Prices</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Tags</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(museums) && museums.length > 0 ? (
            museums.map((museum) => (
              <tr key={museum._id}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{museum.name}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{museum.description}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{museum.location}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{museum.openingHours}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  Foreigner: ${museum.ticketPrices.foreigner} | Native: ${museum.ticketPrices.native} | Student: ${museum.ticketPrices.student}
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  {museum.tags && museum.tags.length > 0 ? museum.tags.join(', ') : 'No tags'}
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  <button onClick={() => handleEdit(museum)}>Edit</button>
                  <button onClick={() => handleDelete(museum._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                No museums available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}