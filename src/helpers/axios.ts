import axios from "axios";

export const AxiosInstanse = axios.create({
  baseURL: "http://localhost:3584",
  timeout: 15000,
});
