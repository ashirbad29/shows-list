import Axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_READ_ACCESS_TOKEN = import.meta.env.VITE_API_ACCESS_TOKEN;

const axios = Axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export default axios;
