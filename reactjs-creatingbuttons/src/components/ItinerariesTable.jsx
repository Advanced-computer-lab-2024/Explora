import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { MdToggleOn, MdToggleOff } from 'react-icons/md';

const ItinerariesTable = () => {
  const [itineraries, setItineraries] = useState([
    { id: 1, title: 'City Tour', bookings: true, isActive: true },
    { id: 2, title: 'Museum Day', bookings: false, isActive: true },
    { id: 3, title: 'Historical Walk', bookings: true, isActive: true },
  ]);

  const toggleActivation = (id) => {
    setItineraries((prev) =>
      prev.map((itinerary) =>
        itinerary.id === id
          ? { ...itinerary, isActive: !itinerary.isActive }
          : itinerary
      )
    );
  };

  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Bookings',
      selector: row => (row.bookings ? 'Yes' : 'No'),
      sortable: true,
    },
    {
      name: 'Status',
      cell: row => (
        <button
          onClick={() => toggleActivation(row.id)}
          style={{ border: 'none', background: 'none', cursor: 'pointer' }}
          disabled={!row.bookings} // Disable if no bookings
        >
          {row.isActive ? (
            <MdToggleOn color="green" size={24} />
          ) : (
            <MdToggleOff color="gray" size={24} />
          )}
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="App">
      <h1>Itineraries Management</h1>
      <DataTable
        columns={columns}
        data={itineraries.filter(itinerary => itinerary.isActive || itinerary.bookings)}
        title="Itineraries List"
        pagination
        dense
      />
    </div>
  );
};

export default ItinerariesTable;
