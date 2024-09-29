import React, { useState, useEffect } from 'react';

const TouristProfile = () => {
    // Assuming the data will be fetched from an API or preset as below
    const [profileData, setProfileData] = useState({
        email: 'tourist@example.com',
        username: 'touristUser',
        nationality: 'USA',
        dob: '1990-01-01',
        jobStatus: 'job',
        wallet: '1000.00' // This is not editable
    });

    const [isEditable, setIsEditable] = useState(false);

    // Simulate fetching data from an API
    useEffect(() => {
        // You can use fetch or axios to retrieve profile data from the backend
        // and update the state with the real data from the server.
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleEditToggle = () => {
        setIsEditable(!isEditable);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can add the logic to update the profile by making an API request here
        console.log('Profile Updated:', profileData);
        setIsEditable(false); // Disable editing after submitting
    };

    return (
        <div>
            <h2>Your Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={profileData.email} 
                        onChange={handleChange} 
                        disabled={!isEditable} 
                        required 
                    />
                </div>

                <div>
                    <label>Username:</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={profileData.username} 
                        onChange={handleChange} 
                        disabled={!isEditable} 
                        required 
                    />
                </div>

                <div>
                    <label>Nationality:</label>
                    <input 
                        type="text" 
                        name="nationality" 
                        value={profileData.nationality} 
                        onChange={handleChange} 
                        disabled={!isEditable} 
                        required 
                    />
                </div>

                <div>
                    <label>Date of Birth:</label>
                    <input 
                        type="date" 
                        name="dob" 
                        value={profileData.dob} 
                        onChange={handleChange} 
                        disabled={!isEditable} 
                        required 
                    />
                </div>

                <div>
                    <label>Job/Student Status:</label>
                    <select 
                        name="jobStatus" 
                        value={profileData.jobStatus} 
                        onChange={handleChange} 
                        disabled={!isEditable}
                        required
                    >
                        <option value="job">Job</option>
                        <option value="student">Student</option>
                    </select>
                </div>

                <div>
                    <label>Wallet (Non-Editable):</label>
                    <input 
                        type="text" 
                        name="wallet" 
                        value={profileData.wallet} 
                        disabled 
                    />
                </div>

                {isEditable ? (
                    <button type="submit">Save Changes</button>
                ) : (
                    <button type="button" onClick={handleEditToggle}>Edit Profile</button>
                )}
            </form>
        </div>
    );
};

export default TouristProfile;
