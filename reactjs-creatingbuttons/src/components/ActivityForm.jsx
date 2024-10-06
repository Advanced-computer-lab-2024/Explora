import React, { useState, useEffect } from 'react';

export default function ActivityForm({ addActivity, currentActivity, isEditing, updateActivity }) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    location: '',
    price: '',
    category: '',
    tags: '',
    discount: '',
    isBookingOpen: false,
  });

  useEffect(() => {
    if (isEditing && currentActivity) {
      setFormData(currentActivity);
    } else {
      setFormData({
        date: '',
        time: '',
        location: '',
        price: '',
        category: '',
        tags: '',
        discount: '',
        isBookingOpen: false,
      });
    }
  }, [isEditing, currentActivity]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateActivity(formData);
    } else {
      addActivity(formData);
    }
    setFormData({
      date: '',
      time: '',
      location: '',
      price: '',
      category: '',
      tags: '',
      discount: '',
      isBookingOpen: false,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      <input type="time" name="time" value={formData.time} onChange={handleChange} required />
      <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
      <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Price or Price Range" required />
      <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
      <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags" />
      <input type="text" name="discount" value={formData.discount} onChange={handleChange} placeholder="Special Discounts" />
      <label>
        <input type="checkbox" name="isBookingOpen" checked={formData.isBookingOpen} onChange={handleChange} />
        Booking Open
      </label>
      <button type="submit">{isEditing ? 'Update' : 'Add'} Activity</button>
    </form>
  );
}
