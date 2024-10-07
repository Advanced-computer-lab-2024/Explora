import React, { useState, useEffect } from 'react'; // Importing React and hooks
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { MdDelete } from 'react-icons/md'; // Importing delete icon from react-icons

const UsersTable = () => {
  const [users, setUsers] = useState([]); // Move useState inside the component

  const columns = [
    {
      name: 'ID',
      selector: row => row._id,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => row.username,
      sortable: true,
    },
    {
      name: 'Role',
      selector: row => row.role,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <button onClick={() => handleDelete(row.username)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
          <MdDelete color="red" size={20} />
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // Fetch data from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/users');
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  // Function to handle user deletion
  const handleDelete = async (username) => {
    // Show a confirmation dialog to the user
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
  
    // If the user clicked "Cancel", exit the function
    if (!confirmDelete) {
      return;
    }
  
    try {
      await axios.delete(`http://localhost:4000/Admin/${username}`);
      // Remove the deleted user from the local state
      setUsers(users.filter(user => user.username !== username));
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };
  

  return (
    <div className="App">
      <h1>Admin Accounts</h1>
      <DataTable
        columns={columns}
        data={users}
        title="Admin List"
        pagination
        dense
      />
    </div>
  );
}

export default UsersTable;