import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getTasks = () => axios.get(API_URL);
export const addTask = (task) => axios.post(`${API_URL}/add`, task);
export const deleteAll = () => axios.delete(`${API_URL}/deleteAll`);
export const deleteTask = (id) => axios.delete(`${API_URL}/delete/${id}`);
export const updateTask = (id, updatedTask) => axios.put(`${API_URL}/${id}`, updatedTask);
