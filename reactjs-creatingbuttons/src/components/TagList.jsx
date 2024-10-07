import React from 'react';

export default function TagList({ tags, editTag, deleteTag }) {
  return (
    <ul>
      {tags.map((tag, index) => (
        <li key={index}>
          {tag}
          <button onClick={() => editTag(index)}>Edit</button>
          <button onClick={() => deleteTag(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
