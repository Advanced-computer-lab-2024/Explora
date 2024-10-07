import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActivityForm = () => {
  const [activity, setActivity] = useState({
    name: '',
    description: '',
    categoryName: '' // Make sure categoryName is a field
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the available categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/categories');
        setCategories(response.data); // Set the available categories
      } catch (err) {
        console.error(err);
        setError('Error fetching categories');
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setActivity({ ...activity, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if the category is valid before submitting
    const selectedCategory = categories.find(cat => cat.name === activity.categoryName);
    if (!selectedCategory) {
      setError('Selected category not found');
      return; // Stop the submission
    }
    
    try {
      const response = await axios.post('http://localhost:4000/api/activity/create', {
        name: activity.name,
        description: activity.description,
        category: selectedCategory._id // Use the category ID in the request
      });
      
      alert(response.data.message);
      setError('');
    } catch (err) {
      console.error(err);
      setError(err.response ? err.response.data.message : 'Server error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Activity Name"
        value={activity.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Activity Description"
        value={activity.description}
        onChange={handleChange}
        required
      />
      <select
        name="categoryName"
        value={activity.categoryName}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        {categories.map(category => (
          <option key={category._id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <button type="submit">Create Activity</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default ActivityForm;
