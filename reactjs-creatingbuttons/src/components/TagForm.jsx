import React, { useState, useEffect } from 'react';

export default function TagForm({ addTag, currentTag, isEditing, updateTag }) {
  const [tagName, setTagName] = useState('');

  useEffect(() => {
    if (isEditing) {
      setTagName(currentTag);
    } else {
      setTagName('');
    }
  }, [isEditing, currentTag]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateTag(tagName);
    } else {
      addTag(tagName);
    }
    setTagName('');
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
