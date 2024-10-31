import React, { useState } from 'react';
import './AdminComplaintCard.css';
import Image from '../../../assets/images/complaint_img.jpg';

const AdminComplaintCard = ({ title, date, status, body, reply: existingReply, onUpdate, id }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [reply, setReply] = useState('');
    const [newStatus, setNewStatus] = useState(status);

    const handleClick = () => {
        setShowDetails(!showDetails);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedComplaint = {};

        if (reply) {
            updatedComplaint.reply = reply;
        }

        if (newStatus !== status) { 
            updatedComplaint.status = newStatus; 
        }

        if (Object.keys(updatedComplaint).length > 0) {
            await onUpdate({ id, ...updatedComplaint });
        }

        // Reset the reply and status after submission
        setReply('');
        setNewStatus(status);
        setShowDetails(false); // Close the panel after submitting
    };

    return (
        <div className="complaint-card">
            <div className="image-container">
                <img src={Image} alt="Complaint" />
            </div>
            <div className="info-container">
                <h3>{title}</h3>
                <p>Date: {new Date(date).toLocaleDateString()}</p>
                <p>Status: {status}</p>
                <button onClick={handleClick}>View Details</button>
            </div>

            {showDetails && (
                <div className="details-panel">
                    <div className="panel-content">
                        <button className="close-button" onClick={handleClick}>Close</button>
                        
                        <h4>Complaint Details</h4>
                        <p><strong>Title:</strong> {title}</p>
                        <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
                        <p><strong>Status:</strong> {status}</p>
                        <p><strong>Body:</strong> {body}</p> {/* Displaying the body of the complaint */}
                        <p><strong>Reply:</strong> {existingReply || 'No replies yet'}</p> {/* Displaying the existing reply */}
                        
                        <h4>Reply to Complaint</h4>
                        <form onSubmit={handleSubmit}>
                            <textarea
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                placeholder="Type your reply here..."
                            />
                            <div>
                                <label htmlFor="status">Change Status:</label>
                                <select
                                    id="status"
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Resolved">Resolved</option>
                                </select>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminComplaintCard;
