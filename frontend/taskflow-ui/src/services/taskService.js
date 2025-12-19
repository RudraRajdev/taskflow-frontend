import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// GET all tasks
export const getTasks = () =>
  axios.get(`${API_URL}task`);

// ADD task
export const addTask = (task) =>
  axios.post(`${API_URL}task/add`, task);

// DELETE all tasks
export const deleteAll = () =>
  axios.delete(`${API_URL}task/deleteAll`);

// DELETE single task
export const deleteTask = (id) =>
  axios.delete(`${API_URL}task/delete/${id}`);

// UPDATE task
export const updateTask = (id, updatedTask) =>
  axios.put(`${API_URL}task/${id}`, updatedTask);
