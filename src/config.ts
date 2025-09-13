// src/config.ts
const ENV = import.meta.env

const API_BASE = (ENV.VITE_API_BASE_URL || '').trim() // leeg = same-origin
const API_PREFIX = (ENV.VITE_API_PREFIX || '/api').trim()

// If API_BASE is empty, use same-origin '/api'; else join base+prefix
export const API_URL = API_BASE
  ? `${API_BASE.replace(/\/$/, '')}${API_PREFIX.startsWith('/') ? '' : '/'}${API_PREFIX}`
  : (API_PREFIX.startsWith('/') ? API_PREFIX : `/${API_PREFIX}`)

export { API_BASE as RAW_API_BASE, API_PREFIX }
