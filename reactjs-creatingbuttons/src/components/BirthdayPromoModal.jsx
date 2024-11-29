// BirthdayPromoModal.jsx
import React from 'react';
import './Modal.css'; // Import the same CSS for consistent styling

const BirthdayPromoModal = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                   
                    <button className="modal-close" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="modal-content">
                    <h2>🎉 Happy Birthday!</h2>
                    <p>Celebrate with this special promo code!</p>
                    <p><strong>Use the promo code: BDAY2024</strong> at checkout!</p>
                </div>
            </div>
        </div>
    );
};

export default BirthdayPromoModal;
