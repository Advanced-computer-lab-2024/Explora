import React, { useState, useEffect } from 'react';

const TAG_TYPES = ['Monuments', 'Museums', 'Religious Sites', 'Palaces/Castles'];

export default function TagForm({ saveTag, currentTag, isEditing }) {
  const [formData, setFormData] = useState({
    name: '',
    type: TAG_TYPES[0],
  });

  useEffect(() => {
    if (isEditing && currentTag) {
      setFormData(currentTag);
    } else {
      setFormData({ name: '', type: TAG_TYPES[0] });
    }
  }, [currentTag, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveTag(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Tag Name"
        required
        style={{ marginRight: '10px' }}
      />
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        style={{ marginRight: '10px' }}
      >
        {TAG_TYPES.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
      <button type="submit">{isEditing ? 'Update Tag' : 'Add Tag'}</button>
    </form>
  );
}
