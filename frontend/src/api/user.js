import axios from "axios"

const API_URL = import.meta.env.REACT_APP_BACKEND_URL || "http://localhost:5043/api/user"

export const getUser = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`, { withCredentials: true })
  return res.data
}

export const getMyProfile = async () => {
  const res = await axios.get(`${API_URL}/me`, { withCredentials: true })
  return res.data
}

export const updateUser = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data, { withCredentials: true })
  return res.data
}

export const getAllUsers = async () => {
  const res = await axios.get(API_URL, { withCredentials: true })
  return res.data
}
