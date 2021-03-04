import axios from "axios";

const api = axios.create({
  baseURL: "https://donationdo.com.br/api/",
  //baseURL: "http://192.168.1.106:3333/"
});

export default api;