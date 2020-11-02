import axios from "axios";

const api = axios.create({
  baseURL: "http://serverdonationdo-com.umbler.net/",
});

export default api;