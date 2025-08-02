import axios from "axios";

const instance = axios.create({
  baseURL: "/api/v1", // ✅ Netlify can proxy this
  withCredentials: true, // ✅ Cookie support
});

export default instance;
