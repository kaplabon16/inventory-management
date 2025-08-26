import axios from "axios"

const API_URL = import.meta.env.REACT_APP_BACKEND_URL || "http://localhost:5043/api/inventory"

export const getInventories = async () => {
  const res = await axios.get(API_URL, { withCredentials: true })
  return res.data
}

export const getInventory = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`, { withCredentials: true })
  return res.data
}

export const createInventory = async (data) => {
  const res = await axios.post(API_URL, data, { withCredentials: true })
  return res.data
}

export const updateInventory = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data, { withCredentials: true })
  return res.data
}

export const deleteInventory = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, { withCredentials: true })
  return res.data
}
