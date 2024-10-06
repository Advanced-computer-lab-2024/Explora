import React, { useState } from 'react';
import TagForm from './TagForm';
import TagList from './TagList';

export default function TagManager() {
  const [tags, setTags] = useState([
    'Historic Areas',
    'Beaches',
    'Family-friendly',
    'Shopping',
    'Budget-friendly'
  ]);
  
  const [currentTag, setCurrentTag] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const addTag = (tag) => {
    setTags([...tags, tag]);
  };

  const editTag = (index) => {
    setCurrentTag(tags[index]);
    setIsEditing(true);
  };

  const updateTag = (updatedTag) => {
    setTags(tags.map((tag) => (tag === currentTag ? updatedTag : tag)));
    setCurrentTag('');
    setIsEditing(false);
  };

  const deleteTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Preference Tags</h1>
      <TagForm
        addTag={addTag}
        currentTag={currentTag}
        isEditing={isEditing}
        updateTag={updateTag}
      />
      <TagList
        tags={tags}
        editTag={editTag}
        deleteTag={deleteTag}
      />
    </div>
  );
}
