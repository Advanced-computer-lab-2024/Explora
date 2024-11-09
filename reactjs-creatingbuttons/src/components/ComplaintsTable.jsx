import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const ComplaintsTable = () => {
  const [complaints, setComplaints] = useState([
    { id: 1, complaint: 'Issue with product delivery', status: 'Pending' },
    { id: 2, complaint: 'Refund request not processed', status: 'Resolved' },
    { id: 3, complaint: 'Incorrect product received', status: 'Pending' },
    // Add more hardcoded complaints as needed
  ]);

  const columns = [
    {
      name: 'Complaint ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Complaint',
      selector: row => row.complaint,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
    }
  ];

  return (
    <div className="App">
      <h1>My Complaints</h1>
      <DataTable
        columns={columns}
        data={complaints}
        title="Issued Complaints"
        pagination
        dense
      />
    </div>
  );
}

export default ComplaintsTable;
