import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const FlaggedEvents = () => {
  const [events, setEvents] = useState([
    { id: 1, name: 'City Tour', flagged: false },
    { id: 2, name: 'Museum Exhibition', flagged: false },
    { id: 3, name: 'Beach Party', flagged: false },
  ]);

  const columns = [
    {
      name: 'Event Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Flagged',
      selector: row => (row.flagged ? 'Yes' : 'No'),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <button onClick={() => toggleFlag(row.id)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
          {row.flagged ? 'Unflag' : 'Flag'}
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const toggleFlag = (id) => {
    setEvents(events.map(event =>
      event.id === id ? { ...event, flagged: !event.flagged } : event
    ));
  };

  return (
    <div className="App">
      <h1>Flagged Events</h1>
      <DataTable
        columns={columns}
        data={events}
        title="Manage Events"
        pagination
        dense
      />
    </div>
  );
};

export default FlaggedEvents;
