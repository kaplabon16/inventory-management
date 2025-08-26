import axios from "axios"

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5043/api/inventory"

// Inventory CRUD
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

// Custom ID functions
export const getCustomIDs = async (inventoryId) => {
  const res = await axios.get(`${API_URL}/${inventoryId}/custom-ids`, { withCredentials: true })
  return res.data
}

export const createCustomID = async (inventoryId, data) => {
  const res = await axios.post(`${API_URL}/${inventoryId}/custom-ids`, data, { withCredentials: true })
  return res.data
}

export const deleteCustomID = async (inventoryId, id) => {
  const res = await axios.delete(`${API_URL}/${inventoryId}/custom-ids/${id}`, { withCredentials: true })
  return res.data
}
