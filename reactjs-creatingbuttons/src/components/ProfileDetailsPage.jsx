import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'; // User icon import
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const EditIcon = () => (
  <svg
    clipRule="evenodd"
    fillRule="evenodd"
    strokeLineJoin="round"
    strokeMiterlimit="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '24px', height: '24px', fill: 'white' }} // White color for the icon
  >
    <path d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.75c0-.414.336-.75.75-.75s.75.336.75.75v9.25c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm-2.011 6.526c-1.045 3.003-1.238 3.45-1.238 3.84 0 .441.385.626.627.626.272 0 1.108-.301 3.829-1.249zm.888-.889 3.22 3.22 8.408-8.4c.163-.163.245-.377.245-.592 0-.213-.082-.427-.245-.591-.58-.578-1.458-1.457-2.039-2.036-.163-.163-.377-.245-.591-.245-.213 0-.428.082-.592.245z" fillRule="nonzero" />
  </svg>
);

const ProfileDetailsPage = () => {
    const [profileData, setProfileData] = useState({
        email: 'tourist@example.com',
        username: 'touristUser',
        nationality: 'USA',
        dob: '1990-01-01',
        jobStatus: 'job',
        wallet: '1000.00$',
        level: '1' // Added user level
    });

    const [isEditable, setIsEditable] = useState(false);

    const navigate = useNavigate(); // Hook to navigate between pages

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleEditToggle = (e) => {
        e.preventDefault();
        setIsEditable(!isEditable);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Profile updated:', profileData);
        setIsEditable(false);
    };

    // Navigation functions for buttons
    const handleChangePassword = () => {
        navigate('/change-password');
    };

    const handleFileComplaint = () => {
        navigate('/file-complaint');
    };

    const handleRequestAccountDeletion = () => {
        navigate('/request-account-deletion');
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#ffffff',
                padding: '20px',
            }}
        >
            {/* Single parent container div */}
            <div
                style={{
                    maxWidth: '900px',
                    width: '100%',
                    padding: '20px',
                    background: '#ffffff',
                    borderRadius: '10px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column', // Changed to column to stack profile details and form
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                {/* Profile Info Section */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        marginBottom: '20px', // Added margin for spacing between sections
                    }}
                >
                    {/* Profile Info (icon, username, wallet, level) */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <FontAwesomeIcon
                            icon={faUserCircle}
                            style={{
                                fontSize: '80px',
                                color: '#008080',
                                marginBottom: '20px',
                            }}
                        />
                        <h1 style={{ fontWeight: 'bold', fontSize: '36px', marginBottom: '10px' }}>
                            {profileData.username}
                        </h1>
                        <p style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'normal' }}>
                            Wallet: {profileData.wallet}
                        </p>
                        <p style={{ fontSize: '16px', fontWeight: 'normal' }}>
                            Level: {profileData.level}
                        </p>
                    </div>

                    {/* Buttons Section */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <button
                            style={{
                                marginBottom: '20px',
                                padding: '10px 20px',
                                background: '#008080',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                        >
                            Redeem Points
                        </button>
                        <button
                            onClick={handleChangePassword} // Navigate to change password page
                            style={{
                                marginBottom: '20px',
                                padding: '10px 20px',
                                background: '#008080',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                        >
                            Change Password
                        </button>
                        <button
                            onClick={handleFileComplaint} // Navigate to file complaint page
                            style={{
                                marginBottom: '20px',
                                padding: '10px 20px',
                                background: '#008080',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                        >
                            File a Complaint
                        </button>
                        <button
                            onClick={handleRequestAccountDeletion} // Navigate to account deletion page
                            style={{
                                padding: '10px 20px',
                                background: '#008080',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                        >
                            Request Account Deletion
                        </button>
                    </div>
                </div>

                {/* Profile Form Section */}
                <div
                    style={{
                        maxWidth: '600px',
                        width: '100%',
                        padding: '20px',
                        background: '#ffffff',
                        borderRadius: '10px',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                >
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        {/* Form Inputs */}
                        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={profileData.email}
                                    onChange={handleChange}
                                    disabled={!isEditable}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        marginTop: '5px',
                                        border: '1px solid #ddd',
                                        borderRadius: '5px',
                                    }}
                                />
                            </label>
                        </div>

                        {/* Other Form Fields */}
                        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
                            <label>
                                Nationality:
                                <select
                                    name="nationality"
                                    value={profileData.nationality}
                                    onChange={handleChange}
                                    disabled={!isEditable}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        marginTop: '5px',
                                        border: '1px solid #ddd',
                                        borderRadius: '5px',
                                    }}
                                >
                                    <option value="USA">USA</option>
                                    <option value="Canada">Canada</option>
                                </select>
                            </label>
                        </div>

                        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
                            <label>
                                Date of Birth:
                                <input
                                    type="date"
                                    name="dob"
                                    value={profileData.dob}
                                    onChange={handleChange}
                                    disabled={!isEditable}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        marginTop: '5px',
                                        border: '1px solid #ddd',
                                        borderRadius: '5px',
                                    }}
                                />
                            </label>
                        </div>

                        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
                            <label>
                                Job Status:
                                <select
                                    name="jobStatus"
                                    value={profileData.jobStatus}
                                    onChange={handleChange}
                                    disabled={!isEditable}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        marginTop: '5px',
                                        border: '1px solid #ddd',
                                        borderRadius: '5px',
                                    }}
                                >
                                    <option value="Unemployed">Unemployed</option>
                                    <option value="Student">Student</option>
                                    <option value="Employed">Employed</option>
                                </select>
                            </label>
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            <button
                                type="button"
                                onClick={handleEditToggle}
                                style={{
                                    width: '100%',
                                    padding: '10px 0',
                                    background: '#008080',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                }}
                            >
                                <EditIcon /> {/* The white edit icon */}
                            </button>
                            {isEditable && (
                                <button
                                    type="submit"
                                    style={{
                                        width: '100%',
                                        padding: '10px 0',
                                        background: '#008080',
                                        color: '#ffffff',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                        marginTop: '10px',
                                    }}
                                >
                                    Save Profile
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetailsPage;
