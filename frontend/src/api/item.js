import axios from "axios"

const API_URL = import.meta.env.REACT_APP_BACKEND_URL || "http://localhost:5043/api/item"

export const getItems = async (inventoryId) => {
  const res = await axios.get(`${API_URL}?inventoryId=${inventoryId}`, { withCredentials: true })
  return res.data
}

export const getItem = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`, { withCredentials: true })
  return res.data
}

export const createItem = async (data) => {
  const res = await axios.post(API_URL, data, { withCredentials: true })
  return res.data
}

export const updateItem = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data, { withCredentials: true })
  return res.data
}

export const deleteItem = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, { withCredentials: true })
  return res.data
}

export const likeItem = async (id) => {
  const res = await axios.post(`${API_URL}/${id}/like`, {}, { withCredentials: true })
  return res.data
}
