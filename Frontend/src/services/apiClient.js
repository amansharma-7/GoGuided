import axios from "axios";

const instance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? `${import.meta.env.VITE_BACKEND_URL}/api/v1`
      : "/api/v1",
  withCredentials: true, // ✅ Cookie support
});

export default instance;
