import React, { useState, useEffect } from 'react'; // Importing React and hooks
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { MdDelete } from 'react-icons/md'; // Importing delete icon from react-icons

const UsersTable = () => {
  const [users, setUsers] = useState([]); // State for users
  const [totalUsers, setTotalUsers] = useState(0); // State for total users
  const [newUsersThisMonth, setNewUsersThisMonth] = useState(0); // State for new users this month

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
        const fetchedUsers = response.data;
        setUsers(fetchedUsers);
        setTotalUsers(fetchedUsers.length);

        // Get the current month (0-11)
        const currentMonth = new Date().getMonth();

        // Filter users that joined this month
        const newUsers = fetchedUsers.filter(user => {
          const joinMonth = new Date(user.createdAt).getMonth();
          return joinMonth === currentMonth;
        });
        setNewUsersThisMonth(newUsers.length);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  // Function to handle user deletion
  const handleDelete = async (username) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4000/Admin/${username}`);
      setUsers(users.filter(user => user.username !== username));
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  return (
    <div className="App">
      <h1>Admin Accounts</h1>
      
      {/* Display total users and new users this month */}
      <div className="user-stats" style={{ marginBottom: '20px' }}>
        <p><strong>Total Users:</strong> {totalUsers}</p>
        <p><strong>New Users This Month:</strong> {newUsersThisMonth}</p>
      </div>

      {/* Data table */}
      <DataTable
        columns={columns}
        data={users}
        title="Admin List"
        pagination
        dense
      />
    </div>
  );
};

export default UsersTable;
