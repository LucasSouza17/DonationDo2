import axios from "axios";

const api = axios.create({
  baseURL: "https://donationdo.com.br/api/",
});

export default api;