const ENV = import.meta.env as any

const API_BASE: string = ENV.VITE_API_BASE_URL || ''
const API_PREFIX: string = ENV.VITE_API_PREFIX || '/api'

// In dev: we callen via proxy-pad (bv. /api), in prod rechtstreeks naar de backend basis-URL.
export const API_URL: string = ENV.DEV ? API_PREFIX : API_BASE

export { API_BASE as RAW_API_BASE, API_PREFIX }
