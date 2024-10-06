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
        onClick={() => navigate('/update-profile')}
      >
        Update Profile
      </button>

      <button
        style={{ width: '220px', height: '60px', margin: '10px' }}
        onClick={() => navigate('/view-profile')} 
      >
        View Profile
      </button>

      <button
        style={{ width: '220px', height: '60px', margin: '10px' }}
        onClick={() => navigate('/tour-guide-itinerary')}
      >
        Tour Guide Itinerary
      </button>

      {/* New button for Tourist Itinerary */}
      <button
        style={{ width: '220px', height: '60px', margin: '10px' }}
        onClick={() => navigate('/tourist-itinerary')}
      >
        Tourist Itinerary
      </button>
    </header>
  );
}

