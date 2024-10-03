import logo from './logo.svg';
import './App.css';
import React from 'react';
import TouristProfile from '/Users/youssefelhaddad/Explora/my-app/src/TouristProfile'; // Adjust path if necessary
import SearchPage from './TouristSearch';

function App() {
  return (
      <div className="App">
          <h1>Tourist Profile Page</h1>
          <TouristProfile />
          <SearchPage />
      </div>
  );
}

export default App;