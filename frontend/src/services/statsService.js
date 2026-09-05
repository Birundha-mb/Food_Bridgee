import axios from "axios";

const API_URL = "http://localhost:5000/api/stats";

export const getStats = () => {
  return axios.get(API_URL);
};