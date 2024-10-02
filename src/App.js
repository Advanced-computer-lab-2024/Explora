// src/App.js
import React, { useState } from 'react';
import MuseumForm from './components/MuseumForm';
import MuseumList from './components/MuseumList';

function App() {
    const [museums, setMuseums] = useState([]);

    const handleAddMuseum = (newMuseum) => {
        setMuseums([...museums, newMuseum]);
    };

    return (
        <div>
            <h1>Tourism Governor</h1>
            <MuseumForm onSubmit={handleAddMuseum} />
            <MuseumList museums={museums} />
        </div>
    );
}

export default App;
