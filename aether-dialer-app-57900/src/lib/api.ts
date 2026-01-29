import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_PROMPTS_API_BASE, // from .env
  withCredentials: true,
});