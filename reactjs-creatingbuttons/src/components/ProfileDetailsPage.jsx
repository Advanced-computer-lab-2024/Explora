import React, { useState } from 'react';

const ProfileDetailsPage = () => {
    // State to store the profile data
    const [profileData, setProfileData] = useState({
        email: 'tourist@example.com',
        username: 'touristUser', // Non-editable
        password: 'tourist@123',
        nationality: 'USA',
        dob: '1990-01-01',
        jobStatus: 'job',
        wallet: '1000.00$' // Non-editable
    });

    // State to toggle between edit mode and view mode
    const [isEditable, setIsEditable] = useState(false);

    // Handle changes in form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    // Toggle between edit and view mode
    const handleEditToggle = (e) => {
        e.preventDefault();
        setIsEditable(!isEditable);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Profile updated:', profileData);
        setIsEditable(false); // Stop editing after saving
    };

    return (
        <div>
            <h2>Profile Details</h2>
            <form onSubmit={handleSubmit}>
                {/* Email Field */}
                <div>
                    <label>Email: </label>
                    <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        disabled={!isEditable}
                    />
                </div>

                {/* Username Field */}
                <div>
                    <label>Username: </label>
                    <input
                        type="text"
                        name="username"
                        value={profileData.username}
                        disabled
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        name="password"
                        value={profileData.password}
                        onChange={handleChange}
                        disabled={!isEditable}
                    />
                </div>

                {/* Nationality Field */}
                <div>
                    <label>Nationality: </label>
                    <select
                        name="nationality"
                        className="styled-select"
                        value={profileData.nationality}
                        onChange={handleChange}
                        disabled={!isEditable}
                    >
                        <option value="USA">USA</option>
                        <option value="Canada">Canada</option>
                        {/* Add more options as needed */}
                    </select>
                </div>

                {/* Date of Birth Field */}
                <div>
                    <label>Date of Birth: </label>
                    <input
                        type="date"
                        name="dob"
                        value={profileData.dob}
                        onChange={handleChange}
                        disabled={!isEditable}
                    />
                </div>

                {/* Job/Student Status Field */}
                <div>
                    <label>Job Status: </label>
                    <select
                        name="jobStatus"
                        className="styled-select"
                        value={profileData.jobStatus}
                        onChange={handleChange}
                        disabled={!isEditable}
                    >
                        <option value="Unemployed">Unemployed</option>
                        <option value="Student">Student</option>
                        <option value="Employed">Employed</option>
                    </select>
                </div>

                {/* Wallet Field (Non-Editable) */}
                <div>
                    <label>Wallet: </label>
                    <input
                        type="text"
                        name="wallet"
                        value={profileData.wallet}
                        disabled
                    />
                </div>

                {/* Button to toggle between editing and saving */}
                <button type="button" onClick={handleEditToggle}>
                    {isEditable ? "Cancel" : "Edit Profile"}
                </button>
                {isEditable && (
                    <button type="submit">
                        Save Profile
                    </button>
                )}
            </form>
        </div>
    );
};

export default ProfileDetailsPage;
