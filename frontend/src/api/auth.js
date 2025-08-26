import axios from "axios"

const API_URL = import.meta.env.REACT_APP_BACKEND_URL || "http://localhost:5043/api/auth"

export const login = async (email, password) => {
  const res = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true })
  return res.data
}

export const register = async (username, email, password) => {
  const res = await axios.post(`${API_URL}/register`, { username, email, password })
  return res.data
}

export const logout = async () => {
  const res = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true })
  return res.data
}

export const socialLogin = async (provider, code) => {
  const res = await axios.post(`${API_URL}/social/${provider}`, { code }, { withCredentials: true })
  return res.data
}

export const getCurrentUser = async () => {
  const res = await axios.get(`${API_URL}/me`, { withCredentials: true })
  return res.data
}
