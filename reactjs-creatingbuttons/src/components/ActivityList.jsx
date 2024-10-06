import React from 'react';

export default function ActivityList({ activities, editActivity, deleteActivity }) {
  return (
    <ul>
      {activities.map((activity, index) => (
        <li key={index}>
          {activity.date} - {activity.time} - {activity.location} - {activity.price}
          <button onClick={() => editActivity(index)}>Edit</button>
          <button onClick={() => {
            if (window.confirm('Are you sure you want to delete this activity?')) {
              deleteActivity(index);
            }
          }}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
