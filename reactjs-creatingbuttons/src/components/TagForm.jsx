import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TagForm({ addTag, currentTag, isEditing, updateTag }) {
  const [tagName, setTagName] = useState('');

  useEffect(() => {
    if (isEditing) {
      setTagName(currentTag.tag); // Set tag name for editing
    } else {
      setTagName(''); // Clear the input for adding a new tag
    }
  }, [isEditing, currentTag]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputData = { tag: tagName };
  
    try {
      let response;
      if (isEditing) {
        // For updating
        await axios.put(`http://localhost:4000/PrefrenceTag/${currentTag.tag}`, { newTag: tagName });
        updateTag({ tag: tagName }); // Update the local state
      } else {
        // For adding a new tag
        response = await axios.post('http://localhost:4000/PrefrenceTag', inputData);
        addTag({ tag: response.data.tag }); // Add the new tag to the local state
      }  
      setTagName('');
    } catch (err) {
      console.error('Error:', err);
      alert('Error adding or updating tag: ' + (err.response ? err.response.data.message : err.message));
      
      // Optionally clear input on error
      setTagName('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={tagName}
        onChange={(e) => setTagName(e.target.value)}
        placeholder="Enter preference tag"
        required
      />
      <button type="submit">{isEditing ? 'Update' : 'Add'} Tag</button>
    </form>
  );
}
