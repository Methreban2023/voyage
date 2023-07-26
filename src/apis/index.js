import axios from "axios";
//change the ip into your ip address before the :8000
//my router ip is 192.168.8.139
// const BASE_URL = "http://192.168.8.139:8000";
const BASE_URL = "http://localhost:8000";
const instance = axios.create({
  baseURL: BASE_URL + "/api",
});

export { BASE_URL };
export default instance;
