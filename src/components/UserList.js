import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(null); // For success or error messages
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://my-json-server.typicode.com/sailokesh-hub/temp-server/users')
      .then((response) => {
        setUsers(response.data);
        setMessage(null); // Clear any previous messages
      })
      .catch(() => {
        setMessage({ type: 'error', text: 'Failed to fetch users. Please try again later.' });
      });
  }, []);

  const handleDeleteUser = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id)); // Update local state
        setMessage({ type: 'success', text: 'User deleted successfully!' });
      })
      .catch(() => {
        setMessage({ type: 'error', text: 'Failed to delete user. Please try again later.' });
      });
  };

  return (
    <div>
      <h1 className="text-center">Users</h1>
      {message && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
          {message.text}
        </div>
      )}
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={() => navigate('/add-user')}>
          Add New User
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/edit-user/${user.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
