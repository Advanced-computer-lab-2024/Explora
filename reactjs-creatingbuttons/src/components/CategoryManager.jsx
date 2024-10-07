import React, { useState, useEffect } from 'react';
import CategoryForm from './CategoryForm';
import DataTable from 'react-data-table-component'; // Import DataTable
import { MdDelete, MdEdit } from 'react-icons/md';
import axios from 'axios';

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const columns = [
    {
      name: 'Category Type',
      selector: row => row.activityType,
      sortable: true,
    },
    {
      name: 'Delete',
      cell: row => (
        <button onClick={() => handleDelete(row.activityType)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
          <MdDelete color="red" size={20} />
        </button>
      ),
      ignoreRowClick: true,
      button: 'true', // if you keep this
    },
    {
      name: 'Update',
      cell: row => (
        <button onClick={() => handleEdit(row.activityType)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
          <MdEdit color="blue" size={20} />
        </button>
      ),
      ignoreRowClick: true,
      button: 'true', // if you keep this
    },
  ];
  
  const handleDelete = async (activityType) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');
    if (!confirmDelete) {
      return;
    } 
    try {
      await axios.delete(`http://localhost:4000/ActivityCategories/${activityType}`);
      setCategories(categories.filter(category => category.activityType !== activityType));
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  };

  const handleEdit = (activityType) => {
    const category = categories.find(cat => cat.activityType === activityType);
    console.log('Editing category:', category);
    setCurrentCategory(category);
    setIsEditing(true);
  };

  const updateCategory = async (updatedCategory) => {
    try {
        console.log('Updating category:', currentCategory.activityType, 'with:', updatedCategory.activityType);
        
        const inputData = { newActivityType: updatedCategory.activityType };

        const response = await axios.put(`http://localhost:4000/ActivityCategories/${currentCategory.activityType}`, inputData);

        console.log('Response from update:', response.data);

        // Update the categories state immediately after the successful response
        setCategories(prevCategories => 
            prevCategories.map(category => 
                category.activityType === currentCategory.activityType 
                    ? { ...category, activityType: updatedCategory.activityType } 
                    : category
            )
        );
        

        // Reset the current category and editing state to allow for new entries
        setCurrentCategory(''); // Reset current category
        setIsEditing(false); // Set editing mode to false
    } catch (error) {
        console.error('Error updating category:', error);
    }
};

  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/ActivityCategories');
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const addCategory = (category) => {
    setCategories([...categories, category]);
  };

  return (
    <header>
      <div>
        <h1>Activity Categories</h1>
        <CategoryForm
          addCategory={addCategory}
          currentCategory={currentCategory}
          isEditing={isEditing}
          updateCategory={updateCategory}
        />
        <DataTable
          columns={columns}
          data={categories}
          title="Activity Categories"
          pagination
          dense
        />
        {console.log('Updated categories:', categories)} {/* Log categories after update */}
      </div>
    </header>
  );
}
