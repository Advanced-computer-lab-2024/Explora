import React from 'react';

export default function CategoryList({ categories, editCategory, deleteCategory }) {
  return (
    <ul>
      {categories.map((category, index) => (
        <li key={index}>
          {category}
          <button onClick={() => editCategory(index)}>Edit</button>
          <button onClick={() => deleteCategory(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
