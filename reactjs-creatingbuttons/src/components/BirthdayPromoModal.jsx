import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Modal.css'; // Import the same CSS for consistent styling

const BirthdayPromoModal = ({ onClose }) => {
    const [touristId, setTouristId] = useState(localStorage.getItem('userId') || '');
    const [promoCodes, setPromoCodes] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchPromoCodes = async () => {
            if (!touristId) {
                setErrorMessage('User not logged in. Please log in first.');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:4000/promoCode/${touristId}`);
                setPromoCodes(response.data.touristPromoCodes);
            } catch (error) {
                console.error('Error fetching promo codes:', error);
                setErrorMessage('Could not load promo codes. Please try again later.');
            }
        };

        fetchPromoCodes();
    }, [touristId]);

    if (promoCodes.length === 0) {
        return null; // Do not render anything if there are no promo codes
    }

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
                    {errorMessage ? (
                        <p>{errorMessage}</p>
                    ) : (
                        promoCodes.map((promo) => (
                            <div key={promo._id}>
                                <p>Celebrate with this special promo code!</p>
                                <p><strong>Use the promo code: {promo.code}</strong> at checkout!</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default BirthdayPromoModal;