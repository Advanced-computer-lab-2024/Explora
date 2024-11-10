import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { MdDelete, MdEdit } from 'react-icons/md';
import PlaceForm from './PlaceForm';

export default function PlaceManager() {
  // Hardcoded initial data
  const [places, setPlaces] = useState([
    {
      name: 'The Louvre',
      description: 'Famous art museum in Paris, France.',
      location: 'Paris, France',
      openingHours: '9 AM - 6 PM',
      ticketPrices: { foreigner: 17, native: 15, student: 12 },
    },
    {
      name: 'Colosseum',
      description: 'Ancient Roman gladiatorial arena.',
      location: 'Rome, Italy',
      openingHours: '8 AM - 5 PM',
      ticketPrices: { foreigner: 16, native: 14, student: 10 },
    },
  ]);

  const [currentPlace, setCurrentPlace] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Columns for the DataTable
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Description',
      selector: row => row.description,
    },
    {
      name: 'Location',
      selector: row => row.location,
      sortable: true,
    },
    {
      name: 'Opening Hours',
      selector: row => row.openingHours,
    },
    {
      name: 'Ticket Prices',
      selector: row => `Foreigner: $${row.ticketPrices.foreigner}, Native: $${row.ticketPrices.native}, Student: $${row.ticketPrices.student}`,
    },
    {
      name: 'Edit',
      cell: row => (
        <button onClick={() => handleEdit(row)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
          <MdEdit color="blue" size={20} />
        </button>
      ),
      ignoreRowClick: true,
      button: true,
    },
    {
      name: 'Delete',
      cell: row => (
        <button onClick={() => handleDelete(row.name)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
          <MdDelete color="red" size={20} />
        </button>
      ),
      ignoreRowClick: true,
      button: true,
    },
  ];

  // Delete Handler
  const handleDelete = (name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);
    if (confirmDelete) {
      setPlaces(places.filter(place => place.name !== name));
    }
  };

  // Edit Handler
  const handleEdit = (place) => {
    setCurrentPlace(place);
    setIsEditing(true);
  };

  // Add/Update Place
  const savePlace = (place) => {
    if (isEditing) {
      setPlaces(places.map(p => (p.name === currentPlace.name ? place : p)));
      setIsEditing(false);
    } else {
      setPlaces([...places, place]);
    }
    setCurrentPlace(null);
  };

  return (
    <div>
      <PlaceForm savePlace={savePlace} currentPlace={currentPlace} isEditing={isEditing} />
      <DataTable
        columns={columns}
        data={places}
        title="Museums & Historical Places"
        pagination
        dense
      />
    </div>
  );
}
