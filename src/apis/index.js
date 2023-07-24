import axios from "axios";
//change the ip into your ip address before the :8000
//my router ip is 192.168.8.139
const BASE_URL = "http://192.168.8.139:8000/api";
const instance = axios.create({
  baseURL: BASE_URL,
});

// instance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
export default instance;
