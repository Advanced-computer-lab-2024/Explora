import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function ProfileView() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const initialProfile = state?.profile;
  const [profile, setProfile] = useState(initialProfile);
  const [message, setMessage] = useState('');

  if (!profile) {
    return <p>No profile data available. Something went wrong.</p>;
  }

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.put(`http://localhost:4000/api/tour_guide_profile/me/${profile._id}`, profile, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`, // Include your actual token
          'Content-Type': 'application/json',
        },
      });

      setMessage("Profile successfully updated!");
      setProfile(response.data); // Update the state with the updated profile
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile. Please try again.");
    }
  };

  return (
    <div>
      <button onClick={() => navigate(-2)} style={{ padding: '10px', marginBottom: '20px', cursor: 'pointer' }}>
        Back
      </button>
      <h1>Profile Details</h1>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Email</td>
              <td>
                <input 
                  type="email" 
                  name="email" 
                  value={profile.email} 
                  onChange={handleEdit} 
                />
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>
                <label>
                  <input
                    type="password"
                    name="newPassword"
                    value={profile.newPassword || ""}
                    onChange={handleEdit}
                    placeholder="Enter a new password"
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td>Username</td>
              <td>
                <span>{profile.username}</span> {/* Display username as text */}
              </td>
            </tr>
            <tr>
              <td>Name</td>
              <td>
                <input 
                  type="text" 
                  name="name" 
                  value={profile.name} 
                  onChange={handleEdit} 
                />
              </td>
            </tr>
            <tr>
              <td>Mobile</td>
              <td>
                <input 
                  type="tel" 
                  name="mobile" 
                  value={profile.mobile} 
                  onChange={handleEdit} 
                />
              </td>
            </tr>
            <tr>
              <td>Years of Experience</td>
              <td>
                <input 
                  type="number" 
                  name="yearsOfExperience" 
                  value={profile.yearsOfExperience} 
                  onChange={handleEdit} 
                />
              </td>
            </tr>
            <tr>
              <td>Previous Work</td>
              <td>
                <input 
                  type="text" 
                  name="previousWork" 
                  value={profile.previousWork} 
                  onChange={handleEdit} 
                />
              </td>
            </tr>
            <tr>
              <td>IsAccepted</td>
              <td>
                <span>{profile.IsAccepted ? "Accepted" : "Not Accepted"}</span> {/* Display based on the boolean value */}
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Update Profile</button>
      </form>
      
      {message && <p style={{ color: message.includes("success") ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
}