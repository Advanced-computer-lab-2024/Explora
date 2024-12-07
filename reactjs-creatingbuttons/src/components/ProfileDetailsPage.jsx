import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileDetailsPage = () => {
    const [profile, setProfile] = useState({
        email: '',
        mobileNumber: '',
        nationality: '',
        dateOfBirth: '',
        job: '',
        username: '', // Will be read-only
        wallet: 0, // Will be read-only
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const touristId = localStorage.getItem('userId');
        // Fetch profile details
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/tourists/id/${touristId}`); // Replace with your API endpoint
                setProfile(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        const touristId = localStorage.getItem('userId');

        e.preventDefault();
        try {
            const { wallet, ...editableFields } = profile; // Exclude wallet
            await axios.put(`http://localhost:4000/api/tourists/${touristId}`, editableFields); // Replace with your API endpoint
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
    const formStyle = {
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
        fontFamily: "Arial, sans-serif",
    };

    const labelStyle = {
        display: "block",
        marginBottom: "10px",
        fontWeight: "bold",
        color: "#333",
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        marginBottom: "20px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "16px",
        boxSizing: "border-box",
    };

    const buttonStyle = {
        padding: "10px 20px",
        backgroundColor: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    };

    const buttonHoverStyle = {
        ...buttonStyle,
        backgroundColor: "#45a049",
    };

    const [hover, setHover] = React.useState(false);
    if (loading) return <p>Loading...</p>;

  
    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <label style={labelStyle}>
                Email:
                <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    style={inputStyle}
                />
            </label>
            <label style={labelStyle}>
                Mobile Number:
                <input
                    type="text"
                    name="mobileNumber"
                    value={profile.mobileNumber}
                    onChange={handleChange}
                    style={inputStyle}
                />
            </label>
            <label style={labelStyle}>
                Nationality:
                <input
                    type="text"
                    name="nationality"
                    value={profile.nationality}
                    onChange={handleChange}
                    style={inputStyle}
                />
            </label>
            <label style={labelStyle}>
                Date of Birth:
                <input
                    type="date"
                    name="dateOfBirth"
                    value={profile.dateOfBirth.slice(0, 10)} // Format to YYYY-MM-DD
                    onChange={handleChange}
                    style={inputStyle}
                />
            </label>
            <label style={labelStyle}>
                Job:
                <input
                    type="text"
                    name="job"
                    value={profile.job}
                    onChange={handleChange}
                    style={inputStyle}
                />
            </label>
            <label style={labelStyle}>
                Username: (uneditable)
                <input
                    type="text"
                    name="username"
                    value={profile.username}
                    readOnly
                    style={inputStyle}
                />
            </label>
            <label style={labelStyle}>
                Wallet ($):(uneditable)
                <input
                    type="text"
                    name="wallet"
                    value={profile.wallet}
                    readOnly
                    style={inputStyle}
                />
            </label>
            <button
                type="submit"
                style={hover ? buttonHoverStyle : buttonStyle}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                Save
            </button>
        </form>
    );
};

export default ProfileDetailsPage;
