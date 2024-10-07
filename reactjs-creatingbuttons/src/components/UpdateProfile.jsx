import { useEffect, useState } from 'react';
import axios from 'axios';

export default function UpdateProfile() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [previousWork, setPreviousWork] = useState('');
  const [message, setMessage] = useState('');  // For displaying success or error messages
  const [profileId, setProfileId] = useState(''); // Will store the profile ID

  useEffect(() => {
    // Fetch the user profile when the component mounts
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/tour_guide_profile/me', {
          headers: {
            'Authorization': `Bearer YOUR_TOKEN_HERE`, // Include your actual token
          },
        });

        const profile = response.data; // Response data
        setProfileId(profile._id); // Automatically get the user ID
        setEmail(profile.email);
        setName(profile.name);
        setMobile(profile.mobile);
        setYearsOfExperience(profile.yearsOfExperience);
        setPreviousWork(profile.previousWork);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setMessage("Error fetching profile data.");
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProfile = {};

    if (email) updatedProfile.email = email;
    if (password) updatedProfile.password = password;
    if (name) updatedProfile.name = name;
    if (mobile) updatedProfile.mobile = mobile;
    if (yearsOfExperience) updatedProfile.yearsOfExperience = yearsOfExperience;
    if (previousWork) updatedProfile.previousWork = previousWork;

    if (Object.keys(updatedProfile).length === 0) {
      setMessage('No fields to update.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:4000/api/tour_guide_profile/me/${profileId}`, updatedProfile, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`, // Include your actual token
          'Content-Type': 'application/json',
        },
      });

      console.log('Profile updated:', response.data);
      setMessage("Profile successfully updated!");
      // Optionally, you can fetch the updated profile again or navigate back to the profile view
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile. Please try again.");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <h1>Update Your Profile</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '300px' }}>
        <input
          type="email"
          placeholder="Update your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input
          type="password"
          placeholder="Update your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input
          type="text"
          placeholder="Update your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input
          type="tel"
          placeholder="Update your mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input
          type="number"
          placeholder="Update years of experience"
          value={yearsOfExperience}
          onChange={(e) => setYearsOfExperience(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input
          placeholder="Update previous work"
          value={previousWork}
          onChange={(e) => setPreviousWork(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>
          Submit Updates
        </button>
      </form>
      {message && <p style={{ marginTop: '15px', fontSize: '16px', color: message.includes("success") ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
}
