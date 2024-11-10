import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { MdDelete, MdEdit } from 'react-icons/md';
import TagForm from './TagForm';

export default function TagManagers() {
  // Hardcoded initial tags data
  const [tags, setTags] = useState([
    { id: 1, name: 'Ancient Rome', type: 'Monuments' },
    { id: 2, name: 'Renaissance Art', type: 'Museums' },
    { id: 3, name: 'Medieval Cathedral', type: 'Religious Sites' },
    { id: 4, name: 'Royal Palace', type: 'Palaces/Castles' },
  ]);

  const [currentTag, setCurrentTag] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Columns for the DataTable
  const columns = [
    {
      name: 'Tag Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Type',
      selector: row => row.type,
      sortable: true,
    },
    {
      name: 'Edit',
      cell: row => (
        <button onClick={() => handleEdit(row)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
          <MdEdit color="blue" size={20} />
        </button>
      ),
      ignoreRowClick: true,
      button: true,
    },
    {
      name: 'Delete',
      cell: row => (
        <button onClick={() => handleDelete(row.id)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
          <MdDelete color="red" size={20} />
        </button>
      ),
      ignoreRowClick: true,
      button: true,
    },
  ];

  // Delete Handler
  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this tag?');
    if (confirmDelete) {
      setTags(tags.filter(tag => tag.id !== id));
    }
  };

  // Edit Handler
  const handleEdit = (tag) => {
    setCurrentTag(tag);
    setIsEditing(true);
  };

  // Save Tag (Add or Update)
  const saveTag = (tag) => {
    if (isEditing) {
      setTags(tags.map(t => (t.id === currentTag.id ? tag : t)));
      setIsEditing(false);
    } else {
      const newTag = { ...tag, id: tags.length + 1 };
      setTags([...tags, newTag]);
    }
    setCurrentTag(null);
  };

  return (
    <div>
      <h2>Manage Tags for Historical Locations</h2>
      <TagForm saveTag={saveTag} currentTag={currentTag} isEditing={isEditing} />
      <DataTable
        columns={columns}
        data={tags}
        title="Tags List"
        pagination
        dense
      />
    </div>
  );
}
