import axios from 'axios'

const api = axios.create({
  baseURL: 'https://server.donationdo.com.br:21241/'
  //baseURL: 'http://localhost:3333/'
});

export default api;