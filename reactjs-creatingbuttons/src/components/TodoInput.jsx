import { useNavigate } from 'react-router-dom';

export default function TodoInput() {
  const navigate = useNavigate();

  return (
    <header style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}>
      <button
        style={{ width: '220px', height: '60px', margin: '10px' }}
        onClick={() => navigate('/create-profile')}
      >
        Create Profile
      </button>

      <button
        style={{ width: '220px', height: '60px', margin: '10px' }}
        onClick={() => navigate('/tour-guide-itinerary')}
      >
        Tour Guide Itinerary
      </button>

      <button
        style={{ width: '220px', height: '60px', margin: '10px' }}
        onClick={() => navigate('/tourist-itinerary')}
      >
        Tourist Itinerary
      </button>

      {/* New button for Account Deletion Request */}
      <button
        style={{ width: '220px', height: '73px', margin: '10px' }}
        onClick={() => navigate('/request-account-deletion')}
      >
        Request Account Deletion
      </button>

      <button onClick={() => navigate('/change-password')}>Change My Password</button>
      <button onClick={() => navigate('/upload-image')}>
        Upload Profile Picture
      </button>

      {/* New button for Activate / De-activate Itinerary */}
      <button
        style={{ width: '220px', height: '60px', margin: '10px' }}
        onClick={() => navigate('/itineraries-table')}
      >
        Activate / De-activate Itinerary
      </button>
    </header>
  );
}
