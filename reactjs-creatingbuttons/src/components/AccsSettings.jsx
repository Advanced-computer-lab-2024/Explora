import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation

export default function AccsSettings() {
  const navigate = useNavigate();  // Initialize the navigate function

  const handleDeleteClick = () => {
    navigate('/admin-view-users');  // Navigate to the AdminViewUsers component
  };

  const handleAddTourismGovernorClick = () => {
    navigate('/login-tourism');  // Navigate to the LogInTourism component
  };

  const handleAddAdminClick = () => {
    navigate('/login-admin');  // Navigate to the LogInAdmin component
  };

  const handleActivityManagementClick = () => {
    navigate('/category-manager');  // Navigate to the CategoryManager component
  };

  const handleTagManagementClick = () => {
    navigate('/tag-manager');  // Navigate to the TagManager component
  };

  const handleViewProductsClick = () => {
    navigate('/product-list');  // Navigate to the ProductList component
  };
  
  const handleViewUploadedDocumentsClick = () => {
    navigate('/admin-documents');  // Navigate to the AdminDocumentViewer component
  };

  // New function for flagging an event
  const handleFlagEventClick = () => {
    navigate('/flagged-events');  // Navigate to the FlaggedEvents component
  };

  return (
    <header>
      <div className="button-container">
        <button onClick={handleDeleteClick}>Delete / De-Activate Your Account</button>
        <button onClick={handleAddTourismGovernorClick}>Add Tourism Governor to the System</button>
        <button onClick={handleAddAdminClick}>Add Another Admin to the System</button>
        <button onClick={handleActivityManagementClick}>Activity Management System</button>
        <button onClick={handleTagManagementClick}>Preference Tag Management System</button>
        <button onClick={handleViewProductsClick}>View Products</button>
        <button onClick={handleViewUploadedDocumentsClick}>View Uploaded Documents</button>
        
        {/* New Flag Event Button */}
        <button onClick={handleFlagEventClick}>Flag Event</button>
      </div>
    </header>
  );
}
