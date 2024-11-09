import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const ComplaintsTable = ({ userId }) => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const userId = '672e76a1725baf5ea88f0224'; // Example user ID
        // Fetch complaints for the provided user ID
        const response = await axios.get(`http://localhost:4000/complaints/user/${userId}`);
        setComplaints(response.data); // Assuming the backend sends back the complaints array
      } catch (error) {
        console.error("Error fetching complaints", error);
      }
    };

    fetchComplaints();
  }, [userId]); // Dependency array ensures the effect runs when userId changes

  const columns = [
    {
      name: 'Complaint ID',
      selector: row => row._id, // Assuming 'id' is the field name for complaint ID
      sortable: true,
    },
    {
      name: 'Complaint',
      selector: row => row.body, // Assuming 'complaint' is the field name for the complaint description
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status, // Assuming 'status' is the field name for the complaint status
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
