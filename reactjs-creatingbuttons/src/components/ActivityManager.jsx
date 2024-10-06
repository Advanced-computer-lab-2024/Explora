import React, { useState } from 'react';
import ActivityForm from './ActivityForm';
import ActivityList from './ActivityList';

export default function ActivityManager() {
  const [activities, setActivities] = useState([]);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const addActivity = (activity) => {
    setActivities([...activities, activity]);
  };

  const editActivity = (index) => {
    setCurrentActivity(activities[index]);
    setIsEditing(true);
  };

  const updateActivity = (updatedActivity) => {
    const updatedActivities = activities.map((activity, index) =>
      index === currentActivity.index ? updatedActivity : activity
    );
    setActivities(updatedActivities);
    setCurrentActivity(null);
    setIsEditing(false);
  };

  const deleteActivity = (index) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  return (
    <header>
    <div>
      <h1>Activity Manager</h1>
      <ActivityForm
        addActivity={addActivity}
        currentActivity={currentActivity}
        isEditing={isEditing}
        updateActivity={updateActivity}
      />
      <ActivityList
        activities={activities}
        editActivity={editActivity}
        deleteActivity={deleteActivity}
      />
    </div>
    </header>
  );
}
