import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/donations`,
});

export const createDonation = async (data) => {
  return API.post("/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getDonations = async () => {
  return API.get("/");
};

export const updateDonationStatus = async (id, status) => {
  return API.put(`/${id}`, {
    status,
  });
};

export const acceptDonation = async (id, acceptedBy) => {
  return API.put(`/accept/${id}`, {
    acceptedBy,
  });
};
