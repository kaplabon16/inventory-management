import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://your-backend-url.com/api/auth',
  withCredentials: true
})

export default instance
