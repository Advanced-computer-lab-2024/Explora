import React, { useState } from 'react';

const ProductCard = ({ product }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrice, setEditedPrice] = useState(product.price);
  const [editedDescription, setEditedDescription] = useState(product.description);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Here, you might want to update the product details in the parent component or an API
    // For now, it just sets the editing mode to false
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h2 className="product-title">{product.name}</h2>
      
      {/* Display either editable fields or static text based on editing state */}
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="edit-input"
            placeholder="Edit description"
          />
          <input
            type="number"
            value={editedPrice}
            onChange={(e) => setEditedPrice(Number(e.target.value))}
            className="edit-input"
            placeholder="Edit price"
          />
          <button onClick={handleSaveClick}>Save</button>
        </>
      ) : (
        <>
          <p className="product-description">{editedDescription}</p>
          <p className="product-price">${editedPrice.toFixed(2)}</p>
        </>
      )}

      <p className="product-seller">Seller: {product.seller}</p>
      <p className="product-ratings">Ratings: {product.ratings} ★</p>
      <p className="product-reviews">{product.reviews} reviews</p>
      
      {/* Edit Icon on the last line */}
      <button className="edit-button" onClick={handleEditClick}>
        <i className="fa-solid fa-pen-to-square"></i>
      </button>
    </div>
  );
};

export default ProductCard;
