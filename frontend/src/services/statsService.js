import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/stats`;

export const getStats = () => {
  return axios.get(API_URL);
};
