import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TouristReport = ({ itineraryId }) => {
    const [totalTourists, setTotalTourists] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTouristCount = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/tour-guide/tourist-count/${itineraryId}`);
                setTotalTourists(response.data.totalTourists);
                setLoading(false);
            } catch (err) {
                setError('Error fetching tourist count');
                setLoading(false);
            }
        };

        fetchTouristCount();
    }, [itineraryId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h3>Total Tourists for Itinerary {itineraryId}: {totalTourists}</h3>
        </div>
    );
};

export default TouristReport;
