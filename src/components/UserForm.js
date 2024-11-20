import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });
  const [message, setMessage] = useState(null); // For success or error messages

  useEffect(() => {
    if (id) {
      axios
        .get(`https://my-json-server.typicode.com/sailokesh-hub/temp-server/users/${id}`)
        .then((response) => {
          setFormData(response.data);
          setMessage(null);
        })
        .catch(() => {
          setMessage({ type: 'error', text: 'Failed to fetch user data. Please try again later.' });
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      axios
        .put(`https://my-json-server.typicode.com/sailokesh-hub/temp-server/users/${id}`, formData)
        .then(() => {
          setMessage({ type: 'success', text: 'User updated successfully!' });
          setTimeout(() => navigate('/users'), 1500);
        })
        .catch(() => {
          setMessage({ type: 'error', text: 'Failed to update user. Please try again later.' });
        });
    } else {
      axios
        .post('https://my-json-server.typicode.com/sailokesh-hub/temp-server/users', formData)
        .then(() => {
          setMessage({ type: 'success', text: 'User added successfully!' });
          setTimeout(() => navigate('/users'), 1500);
        })
        .catch(() => {
          setMessage({ type: 'error', text: 'Failed to add user. Please try again later.' });
        });
    }
  };

  return (
    <div className="card p-4 shadow">
      <h2 className="text-center">{id ? 'Edit User' : 'Add User'}</h2>
      {message && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Department</label>
          <input
            type="text"
            name="department"
            className="form-control"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          {id ? 'Update User' : 'Add User'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
