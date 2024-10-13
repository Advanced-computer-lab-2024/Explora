import React, { useEffect, useState } from 'react';
import AdminComplaintCard from '../../components/AdminComplaintCard/AdminComplaintCard';
import './adminComplaint.css';

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc'); // Default sort order
  const [statusFilter, setStatusFilter] = useState('All'); // Default filter status

  // Fetch complaints from the backend
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/complaints/sort/?order=${sortOrder}&status=${statusFilter}` // Fetch with sorting and filtering
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, [sortOrder, statusFilter]); // Fetch data when sortOrder or statusFilter changes

  // Handle updating a complaint
  const handleUpdate = async (updatedComplaint) => {
    try {
      const complaintId = updatedComplaint.id; // Ensure you include the id in the updatedComplaint object

      // Update reply if it exists
      if (updatedComplaint.reply) {
        const response = await fetch(
          `http://localhost:4000/complaints/reply/${complaintId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              reply: updatedComplaint.reply,
            }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to update complaint reply');
        }
      }

      // Update status if it exists
      if (updatedComplaint.status) {
        const response = await fetch(
          `http://localhost:4000/complaints/status/${complaintId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              status: updatedComplaint.status,
            }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to update complaint status');
        }
      }
      const response = await fetch(
        `http://localhost:4000/complaints/sort/?order=${sortOrder}&status=${statusFilter}`
      );
      const updatedData = await response.json();
      setComplaints(updatedData);

    } catch (error) {
      console.error('Error updating complaint:', error);
    }
  };

  return (
    <div className="admin-complaints">
      <h2>Admin Complaints</h2>

      <div className="filters">
        <label htmlFor="status-filter">Filter by Status:</label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>

        <label htmlFor="sort-order">Sort by Date:</label>
        <select
          id="sort-order"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {complaints.length === 0 ? (
        <p className="no-complaints">No complaints available.</p>
      ) : (
        complaints.map((complaint) => (
          <AdminComplaintCard
            key={complaint._id} // Use _id as the unique key from MongoDB
            title={complaint.title}
            body = {complaint.body}
            date={complaint.date}
            status={complaint.status}
            reply = {complaint.reply}
            onUpdate={handleUpdate} // Pass the update handler
            id={complaint._id} // Pass the complaint ID for updates
          />
        ))
      )}
    </div>
  );
};

export default AdminComplaints;
