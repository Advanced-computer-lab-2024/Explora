import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ActivityList2 = () => {
    const [activities, setActivities] = useState([]);
    const [categories, setCategories] = useState([]);  // For categories
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();
    // For tags
    const [editingActivity, setEditingActivity] = useState(null);
    const [selectedActivity, setSelectedActivity] = useState(null); // New state for selected activity
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        time: '',
        location: '',
        price: '',
        category: '', // This will hold the selected category's activityType
        tags: [], // This will hold the selected tags
        discount: '',
        bookingOpen: false,
    });

    useEffect(() => {
        fetchActivities();
        fetchCategories();
        fetchTags();
    }, []);

    // Fetch all activities from the backend
    const fetchActivities = async () => {
        const advertiserId = localStorage.getItem('userId'); // Retrieve advertiserId
        if (!advertiserId) {
            console.error('No advertiserId found in localStorage');
            return;
        }
    
        try {
            const response = await axios.get(`http://localhost:4000/api/Activity/act/${advertiserId}`);
            setActivities(response.data);
        } catch (err) {
            console.error('Error fetching activities:', err);
        }
    };
    
    // Fetch all categories from the backend
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:4000/ActivityCategories');
            setCategories(response.data); // Assuming this returns a list of categories
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    // Fetch all tags from the backend
    const fetchTags = async () => {
        try {
            const response = await axios.get('http://localhost:4000/PrefrenceTag');
            setTags(response.data); // Assuming this returns a list of tags
        } catch (err) {
            console.error('Error fetching tags:', err);
        }
    };

    // Handle the deletion of an activity
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/Activity/${id}`);
            fetchActivities(); // Refresh the list after deleting
            alert('Activity deleted successfully');
        } catch (err) {
            console.error('Error deleting activity:', err);
            alert('Failed to delete activity.');
        }
    };

    // Handle the form fields for editing an activity
    const onEdit = (activity) => {
        setEditingActivity(activity);
        setFormData({
            name: activity.name,
            date: activity.date,
            time: activity.time,
            location: activity.location,
            price: activity.price,
            category: activity.category ? activity.category.activityType : '', // Set the category name or ID
            tags: activity.tags ? activity.tags.map(tag => tag.tag) : [],  // Set the tags, assuming tags are an array of objects
            discount: activity.specialDiscounts,
            bookingOpen: activity.bookingOpen,
        });
    };

    // Handle form field changes (text inputs)
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle tag checkbox changes
    const handleTagChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevData) => {
            let newTags = [...prevData.tags];
            if (checked) {
                newTags.push(value); // Add the tag if checked
            } else {
                newTags = newTags.filter((tag) => tag !== value); // Remove the tag if unchecked
            }
            return {
                ...prevData,
                tags: newTags,
            };
        });
    };

    // Submit the form and update the activity
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:4000/Activity/${editingActivity._id}`, formData);
            
            // Update the activities list with the updated activity
            setActivities((prevActivities) =>
                prevActivities.map((activity) =>
                    activity._id === editingActivity._id ? response.data : activity
                )
            );

            // Clear form and editing state
            alert('Activity updated successfully');
            setEditingActivity(null); // Reset editing activity
            setFormData({
                name: '',
                date: '',
                time: '',
                location: '',
                price: '',
                category: '', // Reset category
                tags: [], // Reset tags
                discount: '',
                bookingOpen: false,
            });

        } catch (err) {
            console.error('Error updating activity:', err);
            alert('Failed to update activity.');
        }
    };

    // Handle View activity details
    const handleView = (activity) => {
        setSelectedActivity(activity);
    };

    // Close the view activity details
    const closeView = () => {
        setSelectedActivity(null);
    };

    return (
        <div style={{ marginLeft: '80px' }}>
        <div>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            position: 'fixed',
            top: '10px',
            left: '10px',
            backgroundColor: '#008080',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            fontSize: '14px',
            cursor: 'pointer',
            zIndex: 1100,
          }}
        >
          Back
        </button>
        <div>
            <h3>Activity List</h3>
            <ul>
                {activities.map((activity) => (
                    <li key={activity._id}>
                        <p>{activity.name}</p>
                        <button onClick={() => onEdit(activity)}>Edit</button>
                        <button onClick={() => handleDelete(activity._id)}>Delete</button>
                        <button onClick={() => handleView(activity)}>View</button> {/* View button */}
                    </li>
                ))}
            </ul>

            {/* Modal or details section for the selected activity */}
            {selectedActivity && (
                <div>
                    <h3>Activity Details</h3>
                    <p><strong>Name:</strong> {selectedActivity.name}</p>
                    <p><strong>Date:</strong> {selectedActivity.date}</p>
                    <p><strong>Time:</strong> {selectedActivity.time}</p>
                    <p><strong>Location:</strong> {selectedActivity.location}</p>
                    <p><strong>Price:</strong> {selectedActivity.price}</p>
                    <p><strong>Category:</strong> {selectedActivity.category ? selectedActivity.category.activityType : 'N/A'}</p>
                    <p><strong>Discount:</strong> {selectedActivity.specialDiscounts}</p>
                    <p><strong>Booking Open:</strong> {selectedActivity.bookingOpen ? 'Yes' : 'No'}</p>
                    <p><strong>Tags:</strong> {selectedActivity.tags ? selectedActivity.tags.map(tag => tag.tag).join(', ') : 'No tags'}</p>

                    <button onClick={closeView}>Close</button> {/* Close button */}
                </div>
            )}

            {editingActivity && (
                <div>
                    <h3>Edit Activity</h3>
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <label>Date:</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <label>Time:</label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <label>Location:</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <label>Price:</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <label>Category:</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleFormChange}
                            >
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category.activityType}>
                                        {category.activityType}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Tags:</label>
                            <div>
                                {tags.map((tag) => (
                                    <div key={tag._id}>
                                        <input
                                            type="checkbox"
                                            id={`tag-${tag._id}`}
                                            name="tags"
                                            value={tag.tag}
                                            checked={formData.tags.includes(tag.tag)}
                                            onChange={handleTagChange}
                                        />
                                        <label htmlFor={`tag-${tag._id}`}>{tag.tag}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label>Discount:</label>
                            <input
                                type="text"
                                name="discount"
                                value={formData.discount}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <label>Booking Open:</label>
                            <input
                                type="checkbox"
                                name="bookingOpen"
                                checked={formData.bookingOpen}
                                onChange={(e) =>
                                    setFormData({ ...formData, bookingOpen: e.target.checked })
                                }
                            />
                        </div>
                        <button type="submit">Update Activity</button>
                    </form>
                </div>
            )}
        </div>
        </div>
        </div>
    );
};

export default ActivityList2;
