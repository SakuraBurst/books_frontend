import axios from "axios";

export const AxiosInstanse = axios.create({
  baseURL: "http://localhost:3585",
  timeout: 1000,
});
