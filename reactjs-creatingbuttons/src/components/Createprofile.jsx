import { useState } from 'react';
import axios from 'axios';
import logo from '../assets/cropped_image.png';
import { useNavigate } from 'react-router-dom';
const buttonStyle = {
  backgroundColor: '#008080',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  width: '100%',
  textAlign: 'center',
  cursor: 'pointer'
};

export default function CreateProfile() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [previousWork, setPreviousWork] = useState('');
  const [image, setImage] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);


  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState({});
  const [users, setUsers] = useState([]); // State for users
  const [totalUsers, setTotalUsers] = useState(0); // State for total users
  const [newUsersThisMonth, setNewUsersThisMonth] = useState(0); // State for new users this month
  const [message, setMessage] = useState('');
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [badgeLevel, setBadgeLevel] = useState('');
  const [guideRatings, setGuideRatings] = useState({});
  const [guideComments, setGuideComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHistoryOptionsVisible, setIsHistoryOptionsVisible] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
  const handleMouseEnterHistory = () => setIsHistoryOptionsVisible(true);
  const handleMouseLeaveHistory = () => setTimeout(() => setIsHistoryOptionsVisible(false), 900);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage('Please select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('name', name);
    formData.append('mobile', mobile);
    formData.append('yearsOfExperience', yearsOfExperience);
    formData.append('previousWork', previousWork);
    formData.append('image', image);
    formData.append('termsAccepted', termsAccepted);

    try {
      const response = await axios.post('http://localhost:4000/api/tour_guide_profile/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Profile created:', response.data);
      setMessage('Profile successfully created!');
      navigate(`/view-profile/${response.data._id}`, { state: { profile: response.data } });
    } catch (error) {
      console.error('Error creating profile:', error.response || error.message);
      setMessage('Failed to create profile. Please try again.');
    }
  };

  const backButtonStyle = {
    padding: '10px',
    cursor: 'pointer',
    backgroundColor: '#ccc',
  };

  return (
    <div>
    <nav
 style={{
   display: 'flex',
   alignItems: 'center',
   padding: '1px 5px',
   backgroundColor: '#008080',
   color: 'white',
   position: 'fixed',
   top: 0,
   width: '100%',
   zIndex: 1000,
   justifyContent: 'space-between',
 }}
>
 <img src={logo} alt="Logo" style={{ height: '80px', marginRight: '10px' }} />

 {/* Navigation Links */}
 <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
   <a href="/to-do" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
   <a href="/itinerariesList" style={{ color: 'white', textDecoration: 'none' }}>View Itineraries</a>
   <a href="/flag-notification" style={{ color: 'white', textDecoration: 'none' }}>Notifications</a>

   


 </div>

 {/* SVG Icon */}
 <div style={{ marginLeft: 'auto', marginRight: '60px' }}>
   <svg
     onClick={toggleDropdown}
     xmlns="http://www.w3.org/2000/svg"
     width="54"
     height="54"
     viewBox="0 0 24 24"
     style={{ cursor: 'pointer', color: 'white' }}
   >
     <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z" fill="white" />
   </svg>
   {/* Dropdown Menu */}
   {isDropdownOpen && (
     <div
       style={{
         position: 'absolute',
         top: '80px',
         right: '0',
         backgroundColor: '#008080',
         color: 'white',
         borderRadius: '5px',
         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
         width: '200px',
         padding: '10px 0',
         zIndex: 1000,
       }}
       onMouseEnter={handleMouseEnterHistory}
       onMouseLeave={handleMouseLeaveHistory}
     >
       <button
         onClick={() => navigate('/create-profile')}
         style={buttonStyle}
       >
         Create Profile
       </button>
      

       <button
         onClick={() => navigate('/create-itinerary')}
         style={buttonStyle}
       >
         Create Itinerary
       </button>
       <button
         onClick={() => navigate('/')}
         style={buttonStyle}
       >
         Log Out
       </button>
      
       <button
         onClick={() => navigate('/change-password')}
         style={buttonStyle}
       >
         Change Password
       </button>
       <button
         onClick={() => navigate('/request-account-deletion')}
         style={buttonStyle}
       >
         Request Account Deletion
       </button>
       <button
         onClick={() => navigate('/view-number-of-tourists')}
         style={buttonStyle}
       >
Tourist Report              </button>
<button
         onClick={() => navigate('/sales')}
         style={buttonStyle}
       >
Sales Report              </button>
       
     

       {isHistoryOptionsVisible && (
         <div
           style={{
             position: 'absolute',
             top: '80px',
             right: '220px',
             backgroundColor: '#008080',
             color: 'white',
             borderRadius: '5px',
             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
             width: '200px',
             padding: '10px 0',
             zIndex: 1000,
           }}
         >
       

           
         </div>
       )}
     </div>
   )}
 </div>
</nav>
<div style={{ marginTop: '80px' }}>
</div>
    <div style={{ padding: '20px', background: '#f7f7f7' }}>
      <button style={backButtonStyle} onClick={() => navigate('/to-do')}>
        Back
      </button>

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
            required
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
    </div>
    </div>
  );
}
