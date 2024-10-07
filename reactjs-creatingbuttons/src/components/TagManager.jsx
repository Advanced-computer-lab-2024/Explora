import React, { useState, useEffect } from 'react';
import TagForm from './TagForm';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { MdDelete, MdEdit } from 'react-icons/md';

export default function TagManager() {
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const columns = [
    {
      name: 'Tag',
      selector: row => row.tag,
      sortable: true,
    },
    {
      name: 'Delete',
      cell: row => (
        <button onClick={() => handleDelete(row.tag)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
          <MdDelete color="red" size={20} />
        </button>
      ),
      ignoreRowClick: true,
      button: true,
    },
    {
      name: 'Update',
      cell: row => (
        <button onClick={() => handleEdit(row)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
          <MdEdit color="blue" size={20} />
        </button>
      ),
      ignoreRowClick: true,
      button: true,
    },
  ];

  const handleDelete = async (tag) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this tag?');
    if (!confirmDelete) {
      return;
    }
    try {
      await axios.delete(`http://localhost:4000/PrefrenceTag/${tag}`);
      setTags(tags.filter(item => item.tag !== tag));
    } catch (err) {
      console.error('Error deleting tag:', err);
    }
  };

  const handleEdit = (tag) => {
    console.log('Editing tag:', tag);
    setCurrentTag(tag); // Set the selected tag for editing
    setIsEditing(true);
  };

  const updateTag = async (updatedTag) => {
    try {
      const inputData = { newTag: updatedTag.tag };
      const response = await axios.put(`http://localhost:4000/PrefrenceTag/${currentTag.tag}`, inputData);

      console.log('Response from update:', response.data);

      // Update the tags state immediately after the successful response
      setTags(prevTags =>
        prevTags.map(tag => 
          tag.tag === currentTag.tag ? { ...tag, tag: updatedTag.tag } : tag
        )
      );

      // Reset the current tag and editing state to allow for new entries
      setCurrentTag({});
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating tag:', error);
    }
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get('http://localhost:4000/PrefrenceTag');
        setTags(response.data);
      } catch (err) {
        console.error('Error fetching tags:', err);
      }
    };

    fetchTags();
  }, []);

  const addTag = (tag) => {
    setTags([...tags, tag]);
  };

  return (
    <header>
      <div>
        <h1>Preference Tags</h1>
        <TagForm
          addTag={addTag}
          currentTag={currentTag}
          isEditing={isEditing}
          updateTag={updateTag}
        />
        <DataTable
          columns={columns}
          data={tags}
          title="Preference Tags"
          pagination
          dense
        />
        {console.log('Updated tags:', tags)}
      </div>
    </header>
  );
}
