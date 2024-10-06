import React, { useState } from 'react';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';

export default function CategoryManager() {
  const [categories, setCategories] = useState([
    'Food',
    'Stand-up Comedy',
    'Concert',
    'Party',
    'Bazaars',
    'Exhibitions',
    'Sports Matches',
    'Parks',
  ]);
  const [currentCategory, setCurrentCategory] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const addCategory = (category) => {
    setCategories([...categories, category]);
  };

  const editCategory = (index) => {
    setCurrentCategory(categories[index]);
    setIsEditing(true);
  };

  const updateCategory = (updatedCategory) => {
    setCategories(
      categories.map((category) =>
        category === currentCategory ? updatedCategory : category
      )
    );
    setCurrentCategory('');
    setIsEditing(false);
  };

  const deleteCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
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
      <CategoryList
        categories={categories}
        editCategory={editCategory}
        deleteCategory={deleteCategory}
      />
    </div>
    </header>
  );
}
