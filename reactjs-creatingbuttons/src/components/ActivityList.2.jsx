import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActivityList2 = ({ onEdit }) => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/activity');
            setActivities(response.data);
        } catch (err) {
            console.error(err);
            alert('Failed to fetch activities.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/activity/${id}`);
            fetchActivities(); // Refresh the list after deleting
            alert('Activity deleted successfully');
        } catch (err) {
            console.error(err);
            alert('Failed to delete activity.');
        }
    };

    return (
        <div>
            <h3>Activity List</h3>
            <ul>
                {activities.map((activity) => (
                    <li key={activity._id}>
                        <p>{activity.name}</p>
                        <button onClick={() => onEdit(activity)}>Edit</button>
                        <button onClick={() => handleDelete(activity._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActivityList2;

