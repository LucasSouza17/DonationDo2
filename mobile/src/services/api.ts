import axios from "axios";

const api = axios.create({
  baseURL: 'http://192.168.1.106:3333/'
//  baseURL: "https://server.donationdo.com.br:21241/",
});

export default api;