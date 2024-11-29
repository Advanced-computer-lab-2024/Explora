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

     

      {/* New button for Account Deletion Request */}
      <button
        style={{ width: '220px', height: '73px', margin: '10px' }}
        onClick={() => navigate('/request-account-deletion')}
      >
        Request Account Deletion
      </button>

    {/* New button for View Sales */}
    <button
        style={{ width: '220px', height: '73px', margin: '10px' }}
        onClick={() => navigate('/sales')}
      >
        View Sales
      </button>

      {/* New button for View number of tourists */}
    <button
        style={{ width: '220px', height: '73px', margin: '10px' }}
        onClick={() => navigate('/view-number-of-tourists')}
      >
        View number of tourists
      </button>
         </header>
  );
}
