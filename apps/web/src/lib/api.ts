import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config.__retry) {
      error.config.__retry = true;
      await api.post("/auth/refresh");
      return api(error.config);
    }
    return Promise.reject(error);
  },
);
