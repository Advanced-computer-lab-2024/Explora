import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function CreateProfile() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [previousWork, setPreviousWork] = useState('');
  const [message, setMessage] = useState('');  // For displaying success or error messages

  const navigate = useNavigate(); // Define navigate using useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    const profileData = { email, username, password, name, mobile, yearsOfExperience, previousWork };

    // Making a POST request to the backend API to create the profile
    fetch('http://localhost:4000/api/tour_guide_profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    })
    
      .then((response) => response.json())
      .then((data) => {
        console.log("Profile created:", data);
        setMessage("Profile successfully created!");
        // Clear the form
        setEmail('');
        setUsername('');
        setPassword('');
        setName('');
        setMobile('');
        setYearsOfExperience('');
        setPreviousWork('');
      })
      .catch((error) => {
        console.error("Error creating profile:", error);
        setMessage("Failed to create profile. Please try again.");
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      {/* Move the Back button to the top-left */}
      <button 
        style={{ 
          position: 'absolute', 
          top: '20px', 
          left: '20px', 
          padding: '10px', 
          fontSize: '16px', 
          cursor: 'pointer' 
        }} 
        onClick={() => navigate('/')} // Navigate back to the TodoInput page
      >
        Back
      </button>
      <h1>Create a New Profile</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '300px' }}>
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
          required
        />
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
          required
        />
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
          required
        />
        <input
          type="tel"
          placeholder="Enter your mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
          required
        />
        <input
          type="number"
          placeholder="Years of Experience"
          value={yearsOfExperience}
          onChange={(e) => setYearsOfExperience(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input
          placeholder="Previous work"
          value={previousWork}
          onChange={(e) => setPreviousWork(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
      {/* Displaying success or error message */}
      {message && <p style={{ marginTop: '15px', fontSize: '16px', color: message.includes("success") ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
}