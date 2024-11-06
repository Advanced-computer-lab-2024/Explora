import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

export default function CreateProfile() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [previousWork, setPreviousWork] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('name', name);
    formData.append('mobile', mobile);
    formData.append('yearsOfExperience', yearsOfExperience);
    formData.append('previousWork', previousWork);
    formData.append('image', image); // This is the file field
    formData.append('termsAccepted', termsAccepted); // Checkbox value

    try {
      const response = await axios.post('http://localhost:4000/api/tour_guide_profile/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important to set this header for file uploads
        },
      });

      console.log('Profile created:', response.data);
      setMessage('Profile successfully created!');

      // Redirect to the profile view page with the correct state
      // Corrected navigate route using template literals
      navigate(`/view-profile/${response.data._id}`, { state: { profile: response.data } });

    } catch (error) {
      console.error('Error creating profile:', error);
      setMessage('Failed to create profile. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <h1>Create a New Profile</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '300px' }}>
        <input type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="tel" placeholder="Enter your mobile number" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
        <input type="number" placeholder="Years of Experience" value={yearsOfExperience} onChange={(e) => setYearsOfExperience(e.target.value)} />
        <input placeholder="Previous work" value={previousWork} onChange={(e) => setPreviousWork(e.target.value)} />
        <input 
          type="file" 
          onChange={(e) => setImage(e.target.files[0])} 
          required // Make sure an image is selected
        />
        <label>
          <input 
            type="checkbox" 
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)} 
          />
            I accept the terms and conditions
        </label>
        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
