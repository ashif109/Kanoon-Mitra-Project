// Centralized API Configuration for Kanoon Mitra
// Supports local development (http://localhost:3400) and Vercel deployment via VITE_API_URL environment variable

export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3400"
).replace(/\/$/, "");
