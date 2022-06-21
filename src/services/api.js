import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.oriflamme.vincentcottalorda.me/",
});

export default api;
