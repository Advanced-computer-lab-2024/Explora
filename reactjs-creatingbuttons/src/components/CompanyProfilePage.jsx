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
        onClick={() => navigate('/advertisers/create')}
      >
        Create new Profile
      </button>

      <button
        style={{ width: '220px', height: '60px', margin: '10px' }}
        onClick={() => navigate('/advact')}
      >
        Create new activity
      </button>

      {/* New button for Tourist Itinerary */}
      <button
        style={{ width: '220px', height: '60px', margin: '10px' }}
        onClick={() => navigate('/advertisers')}
      >
        View profiles
      </button>
    </header>
  );
}