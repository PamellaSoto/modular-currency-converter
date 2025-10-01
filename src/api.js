import axios from "axios";

const api = axios.create({
  baseURL: `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_EXCHANGERATE_API}/pair/`
});

export default api;
