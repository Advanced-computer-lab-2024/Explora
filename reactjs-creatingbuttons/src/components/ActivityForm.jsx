import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActivityForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        time: '',
        location: '',
        price: '',
        category: '',
        tags: [],
        discount: '',
        bookingOpen: false,
    });

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [message, setMessage] = useState('');

    // Fetch categories and tags on component mount
    useEffect(() => {
        const fetchCategoriesAndTags = async () => {
            try {
                const categoryResponse = await axios.get('http://localhost:4000/ActivityCategories');
                const tagResponse = await axios.get('http://localhost:4000/PrefrenceTag');
                setCategories(categoryResponse.data);
                setTags(tagResponse.data);
            } catch (error) {
                console.error('Error fetching categories or tags:', error);
                setMessage('Error fetching categories or tags.');
            }
        };
        fetchCategoriesAndTags();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleTagChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevData) => {
            const updatedTags = checked
                ? [...prevData.tags, value] // Add the tag to the array if checked
                : prevData.tags.filter((tag) => tag !== value); // Remove the tag if unchecked
            return {
                ...prevData,
                tags: updatedTags,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const advertiserId = localStorage.getItem('userId');
        if (!advertiserId) {
            setMessage('Advertiser ID is missing. Please log in first.');
            return;
        }

        try {
            // Prepare the data
            const data = {
                advertiserId,
                name: formData.name,
                date: formData.date,
                time: formData.time,
                location: formData.location,
                price: parseFloat(formData.price), // Ensure it's a number
                category: formData.category, // The category name will be sent
                tags: formData.tags, // Tags will be sent as an array of tag names
                specialDiscounts: formData.discount, // This will be sent as a string
                bookingOpen: formData.bookingOpen,
            };

            // Log the data before sending to the server
            console.log('Data to be sent to server:', data);

            // Send data to the backend
            const response = await axios.post(`http://localhost:4000/Activity/create/${advertiserId}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data) {
                setMessage('Activity created successfully!');
                setFormData({
                    name: '',
                    date: '',
                    time: '',
                    location: '',
                    price: '',
                    category: '',
                    tags: [],
                    discount: '',
                    bookingOpen: false,
                });
            }
        } catch (error) {
            console.error('Error submitting activity:', error);
            setMessage('Error submitting activity, please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Date:</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Time:</label>
                <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Location:</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Category:</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category.activityType}>
                            {category.activityType}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Tags:</label>
                {tags.map((tag) => (
                    <div key={tag._id}>
                        <input
                            type="checkbox"
                            value={tag.tag}
                            checked={formData.tags.includes(tag.tag)}
                            onChange={handleTagChange}
                        />
                        <label>{tag.tag}</label>
                    </div>
                ))}
            </div>
            <div>
                <label>Special Discounts:</label>
                <input
                    type="text"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Booking Open:</label>
                <input
                    type="checkbox"
                    name="bookingOpen"
                    checked={formData.bookingOpen}
                    onChange={(e) => setFormData({ ...formData, bookingOpen: e.target.checked })}
                />
            </div>
            <button type="submit">Create Activity</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default ActivityForm;