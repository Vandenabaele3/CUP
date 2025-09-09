import axios from 'axios'
import { API_URL } from '../config'

export const http = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

http.interceptors.response.use(
  (r) => r,
  (e) => Promise.reject(e)
)
