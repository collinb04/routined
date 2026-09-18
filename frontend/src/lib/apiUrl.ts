// Backend origin for '/api' and '/auth' requests. Empty in local dev — the
// Vite proxy (vite.config.ts) makes those paths same-origin, so requests
// stay relative. Set to the backend's deployed URL in prod, where frontend
// and backend are separate Cloud Run services.
export const API_URL = import.meta.env.VITE_API_URL ?? ''
