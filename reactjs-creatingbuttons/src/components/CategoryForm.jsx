import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is imported

export default function CategoryForm({ addCategory, currentCategory, isEditing, updateCategory, setIsEditing }) {
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (isEditing) {
      setCategoryName(currentCategory.activityType); // Set category name from activityType
    } else {
      setCategoryName(''); // Clear the input for new category
    }
  }, [isEditing, currentCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputData = { activityType: categoryName }; // Prepare the data for the request

    try {
        let response;
        if (isEditing) {
            // For updating
            response = await axios.put(`http://localhost:4000/ActivityCategories/${currentCategory.activityType}`, { newActivityType: categoryName });
            updateCategory({ activityType: categoryName }); // Update the local state
        } else {
            // For adding a new category
            response = await axios.post('http://localhost:4000/ActivityCategories', inputData);
            addCategory({ activityType: response.data.activityType }); // Add the new category to the local state
        }

        console.log(response.data); // Log the response if needed
        
        // Clear the input after submission
        setCategoryName(''); 
    } catch (err) {
        console.error('Error:', err);
        alert('Error adding or updating category: ' + err.response?.data?.message || err.message);
        
        // Optionally clear input on error
        setCategoryName(''); 
    }
};


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Enter category name"
        required
      />
      <button type="submit">{isEditing ? 'Update' : 'Add'} Category</button>
    </form>
  );
}
