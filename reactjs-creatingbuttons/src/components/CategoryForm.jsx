import React, { useState, useEffect } from 'react';

export default function CategoryForm({ addCategory, currentCategory, isEditing, updateCategory }) {
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (isEditing) {
      setCategoryName(currentCategory);
    } else {
      setCategoryName('');
    }
  }, [isEditing, currentCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateCategory(categoryName);
    } else {
      addCategory(categoryName);
    }
    setCategoryName('');
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
