import axios from "axios";

const BASE_URL = "http://192.168.8.104:8000";
// const BASE_URL = "http://localhost:8000";

const instance = axios.create({
  baseURL: BASE_URL + "/api",
});

export { BASE_URL };
export default instance;
