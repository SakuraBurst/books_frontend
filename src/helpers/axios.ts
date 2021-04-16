import axios from "axios";

export const AxiosInstanse = axios.create({
  baseURL: "http://192.168.0.144:3584",
  timeout: 15000,
});
