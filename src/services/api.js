import axios from 'axios';

const API_URL = 'https://my-json-server.typicode.com/sailokesh-hub/temp-server/users';

export const getUsers = async () => {
  return axios.get(API_URL);
};

export const addUser = async (user) => {
  return axios.post(API_URL, user);
};

export const updateUser = async (id, user) => {
  return axios.put(`${API_URL}/${id}`, user);
};

export const deleteUser = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
