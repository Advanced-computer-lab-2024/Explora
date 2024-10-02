// src/App.js
import React, { useState } from 'react';
import MuseumForm from './components/MuseumForm';
import MuseumList from './components/MuseumList';
import MyActivities from './components/MyActivities';
import './index.css';

function App() {
    const [museums, setMuseums] = useState([]);

    const handleAddMuseum = (newMuseum) => {
        setMuseums([...museums, newMuseum]);
    };

    return (
        <div className="App">
            <header>
                <h1>Tourism Governor Dashboard</h1>
            </header>
            <main>
                {/* Museum management */}
                <h2>Add and Manage Museums</h2>
                <MuseumForm onSubmit={handleAddMuseum} />
                <MuseumList museums={museums} />

                {/* Created Activities section */}
                <h2>My Created Activities</h2>
                <MyActivities />
            </main>
        </div>
    );
}

export default App;
